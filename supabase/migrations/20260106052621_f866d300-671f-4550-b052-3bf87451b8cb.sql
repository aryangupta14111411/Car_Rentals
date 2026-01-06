-- Create a secure function to verify KYC that validates inputs server-side
CREATE OR REPLACE FUNCTION public.verify_kyc(
  p_license_number TEXT,
  p_license_name TEXT,
  p_license_expiry DATE
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
BEGIN
  -- Get the current user's ID
  v_user_id := auth.uid();
  
  -- Check if user is authenticated
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;
  
  -- Validate license number (basic format check)
  IF p_license_number IS NULL OR length(trim(p_license_number)) < 5 THEN
    RAISE EXCEPTION 'Invalid license number';
  END IF;
  
  -- Validate license name
  IF p_license_name IS NULL OR length(trim(p_license_name)) < 2 THEN
    RAISE EXCEPTION 'Invalid license name';
  END IF;
  
  -- Validate expiry date (must be in the future)
  IF p_license_expiry IS NULL OR p_license_expiry <= CURRENT_DATE THEN
    RAISE EXCEPTION 'License has expired or invalid expiry date';
  END IF;
  
  -- Update the profile with verified KYC
  UPDATE public.profiles
  SET 
    driving_license_number = trim(p_license_number),
    driving_license_name = trim(p_license_name),
    driving_license_expiry = p_license_expiry,
    kyc_verified = true,
    updated_at = now()
  WHERE id = v_user_id;
  
  RETURN true;
END;
$$;

-- Drop existing update policy
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- Create new policy that prevents direct updates to kyc_verified
CREATE POLICY "Users can update own profile (except kyc_verified)"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id 
  AND (
    -- Only allow update if kyc_verified is not being changed to true directly
    -- (the verify_kyc function uses SECURITY DEFINER so it bypasses RLS)
    kyc_verified = (SELECT kyc_verified FROM public.profiles WHERE id = auth.uid())
    OR kyc_verified = false
  )
);