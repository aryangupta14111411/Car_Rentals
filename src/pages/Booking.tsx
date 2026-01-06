'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { ArrowLeft, Car, Clock, CreditCard, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        navigate('/auth')
        return
      }
      setUser(user)
    }
    checkUser()
  }, [navigate])

  const handleStartRental = async () => {
    if (!user) {
      navigate('/auth')
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

    // Navigate to my rentals page
    setTimeout(() => {
      navigate('/my-rentals')
    }, 1500)
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
            Start Your Rental
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

          {/* Rental Info */}
          <div className="bg-card rounded-2xl p-6 border border-border mb-8">
            <h2 className="font-heading text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              How It Works
            </h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">1</span>
                <span>Click "Start Rental" to begin your hourly rental</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">2</span>
                <span>Track your time and charges in real-time on the "My Rentals" page</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">3</span>
                <span>End your rental anytime and pay only for the hours used</span>
              </li>
            </ul>
          </div>

          {/* Start Rental Button */}
          <Button 
            onClick={handleStartRental}
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2 h-14 text-lg"
            size="lg"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground"></div>
            ) : (
              <>
                <Play className="w-5 h-5" />
                Start Rental Now
              </>
            )}
          </Button>

          <p className="text-center text-sm text-muted-foreground mt-4">
            You will be charged Rs.{pricePerHour} per hour. Minimum charge: 1 hour.
          </p>
        </motion.div>
      </main>
    </div>
  )
}
