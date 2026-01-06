'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Car, Clock, Play, FileCheck, IdCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/hooks/use-toast'
import { Toaster } from '@/components/ui/toaster'
import { supabase } from '@/integrations/supabase/client'

export default function Booking() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  
  const carName = searchParams.get('car') || 'Vehicle'
  const pricePerHour = parseInt(searchParams.get('price') || '100')
  const carImage = searchParams.get('image') || ''
  
  const [loading, setLoading] = useState(false)
  const [checkingKyc, setCheckingKyc] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [kycVerified, setKycVerified] = useState(false)
  const [showKycForm, setShowKycForm] = useState(false)
  
  // KYC form fields
  const [licenseNumber, setLicenseNumber] = useState('')
  const [licenseName, setLicenseName] = useState('')
  const [licenseExpiry, setLicenseExpiry] = useState('')

  useEffect(() => {
    const checkUserAndKyc = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        navigate('/auth')
        return
      }
      setUser(user)
      
      // Check if user has completed KYC
      const { data: profile } = await supabase
        .from('profiles')
        .select('kyc_verified, driving_license_number, driving_license_name, driving_license_expiry')
        .eq('id', user.id)
        .single()
      
      if (profile?.kyc_verified) {
        setKycVerified(true)
      }
      setCheckingKyc(false)
    }
    checkUserAndKyc()
  }, [navigate])

  const handleKycSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!licenseNumber || !licenseName || !licenseExpiry) {
      toast({
        title: "Missing Information",
        description: "Please fill in all driving license details.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    
    const { error } = await supabase
      .from('profiles')
      .update({
        driving_license_number: licenseNumber,
        driving_license_name: licenseName,
        driving_license_expiry: licenseExpiry,
        kyc_verified: true,
      })
      .eq('id', user.id)

    setLoading(false)

    if (error) {
      toast({
        title: "KYC Failed",
        description: error.message,
        variant: "destructive",
      })
      return
    }
    
    toast({
      title: "KYC Verified!",
      description: "Your driving license has been verified successfully.",
    })
    
    setKycVerified(true)
    setShowKycForm(false)
  }

  const handleStartRental = async () => {
    if (!user) {
      navigate('/auth')
      return
    }

    if (!kycVerified) {
      setShowKycForm(true)
      return
    }

    setLoading(true)
    
    const { error } = await supabase
      .from('bookings')
      .insert({
        user_id: user.id,
        car_name: carName,
        car_image: carImage,
        price_per_hour: pricePerHour,
        start_time: new Date().toISOString(),
        status: 'active'
      })

    setLoading(false)

    if (error) {
      toast({
        title: "Booking Failed",
        description: error.message,
        variant: "destructive",
      })
      return
    }
    
    toast({
      title: "Rental Started!",
      description: `Your ${carName} rental has begun. Track your charges in real-time on My Rentals.`,
    })

    setTimeout(() => {
      navigate('/my-rentals')
    }, 1500)
  }

  if (checkingKyc) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Fleet
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-8 text-center">
            {showKycForm ? 'Verify Your License' : 'Start Your Rental'}
          </h1>

          {/* Car Preview */}
          <div className="bg-card rounded-2xl overflow-hidden border border-border mb-8">
            {carImage && (
              <img 
                src={carImage} 
                alt={carName}
                className="w-full h-64 object-cover"
              />
            )}
            <div className="p-6">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Car className="w-5 h-5" />
                <span className="font-semibold text-lg">{carName}</span>
              </div>
              <p className="text-3xl font-bold text-foreground">
                Rs.{pricePerHour}<span className="text-sm text-muted-foreground font-normal">/hour</span>
              </p>
            </div>
          </div>

          {/* KYC Status Badge */}
          {kycVerified && (
            <div className="flex items-center justify-center gap-2 mb-6 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <FileCheck className="w-5 h-5 text-green-500" />
              <span className="text-green-500 font-medium">KYC Verified - License on file</span>
            </div>
          )}

          {/* KYC Form */}
          {showKycForm && !kycVerified && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl p-6 border border-border mb-8"
            >
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <IdCard className="w-5 h-5 text-primary" />
                Driving License Verification
              </h2>
              <p className="text-muted-foreground mb-6">
                Please provide your driving license details for verification. This is a one-time process.
              </p>
              
              <form onSubmit={handleKycSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="licenseName">Full Name (as on License)</Label>
                  <Input
                    id="licenseName"
                    value={licenseName}
                    onChange={(e) => setLicenseName(e.target.value)}
                    placeholder="Enter name as on driving license"
                    className="bg-background"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="licenseNumber">Driving License Number</Label>
                  <Input
                    id="licenseNumber"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    placeholder="e.g., DL-1234567890"
                    className="bg-background"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="licenseExpiry">License Expiry Date</Label>
                  <Input
                    id="licenseExpiry"
                    type="date"
                    value={licenseExpiry}
                    onChange={(e) => setLicenseExpiry(e.target.value)}
                    className="bg-background"
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowKycForm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground"></div>
                    ) : (
                      'Verify & Continue'
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Rental Info - only show when not in KYC form */}
          {!showKycForm && (
            <div className="bg-card rounded-2xl p-6 border border-border mb-8">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                How It Works
              </h2>
              <ul className="space-y-3 text-muted-foreground">
                {!kycVerified && (
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">1</span>
                    <span>Complete one-time KYC with your driving license</span>
                  </li>
                )}
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">{kycVerified ? '1' : '2'}</span>
                  <span>Click "Start Rental" to begin your hourly rental</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">{kycVerified ? '2' : '3'}</span>
                  <span>Track your time and charges in real-time on the "My Rentals" page</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">{kycVerified ? '3' : '4'}</span>
                  <span>End your rental anytime and pay only for the hours used</span>
                </li>
              </ul>
            </div>
          )}

          {/* Start Rental Button - only show when not in KYC form */}
          {!showKycForm && (
            <>
              <Button 
                onClick={handleStartRental}
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2 h-14 text-lg"
                size="lg"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground"></div>
                ) : kycVerified ? (
                  <>
                    <Play className="w-5 h-5" />
                    Start Rental Now
                  </>
                ) : (
                  <>
                    <IdCard className="w-5 h-5" />
                    Complete KYC & Start Rental
                  </>
                )}
              </Button>

              <p className="text-center text-sm text-muted-foreground mt-4">
                You will be charged Rs.{pricePerHour} per hour. Minimum charge: 1 hour.
              </p>
            </>
          )}
        </motion.div>
      </main>
    </div>
  )
}
