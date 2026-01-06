-- Add KYC fields to profiles table for driving license verification
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS driving_license_number TEXT,
ADD COLUMN IF NOT EXISTS driving_license_expiry DATE,
ADD COLUMN IF NOT EXISTS driving_license_name TEXT,
ADD COLUMN IF NOT EXISTS kyc_verified BOOLEAN NOT NULL DEFAULT FALSE;