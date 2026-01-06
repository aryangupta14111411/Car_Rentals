'use client'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Car, Clock, IndianRupee, Timer, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/integrations/supabase/client'
import { toast } from '@/hooks/use-toast'
import { Toaster } from '@/components/ui/toaster'

interface Booking {
  id: string
  car_name: string
  car_image: string | null
  price_per_hour: number
  start_time: string
  end_time: string | null
  status: string
}

export default function MyRentals() {
  const navigate = useNavigate()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update current time every second for real-time calculation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        navigate('/auth')
        return
      }

      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        toast({
          title: 'Error fetching bookings',
          description: error.message,
          variant: 'destructive',
        })
      } else {
        setBookings(data || [])
      }
      setLoading(false)
    }

    fetchBookings()

    // Subscribe to realtime updates
    const channel = supabase
      .channel('bookings-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookings'
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setBookings(prev => [payload.new as Booking, ...prev])
          } else if (payload.eventType === 'UPDATE') {
            setBookings(prev => prev.map(b => 
              b.id === (payload.new as Booking).id ? payload.new as Booking : b
            ))
          } else if (payload.eventType === 'DELETE') {
            setBookings(prev => prev.filter(b => b.id !== (payload.old as Booking).id))
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [navigate])

  const calculateHoursElapsed = (startTime: string, endTime: string | null): number => {
    const start = new Date(startTime)
    const end = endTime ? new Date(endTime) : currentTime
    const diffMs = end.getTime() - start.getTime()
    return Math.max(0, diffMs / (1000 * 60 * 60))
  }

  const formatDuration = (hours: number): string => {
    const h = Math.floor(hours)
    const m = Math.floor((hours - h) * 60)
    const s = Math.floor(((hours - h) * 60 - m) * 60)
    return `${h}h ${m}m ${s}s`
  }

  const handleEndRental = async (bookingId: string) => {
    const { error } = await supabase
      .from('bookings')
      .update({ 
        status: 'completed',
        end_time: new Date().toISOString()
      })
      .eq('id', bookingId)

    if (error) {
      toast({
        title: 'Error ending rental',
        description: error.message,
        variant: 'destructive',
      })
    } else {
      toast({
        title: 'Rental Completed!',
        description: 'Your rental has been ended successfully.',
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
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
            Back to Home
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-8">
            My Rentals
          </h1>

          {bookings.length === 0 ? (
            <div className="text-center py-16">
              <Car className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">No rentals yet</h2>
              <p className="text-muted-foreground mb-6">Start by booking a car from our fleet.</p>
              <Button onClick={() => navigate('/')}>
                Browse Cars
              </Button>
            </div>
          ) : (
            <div className="grid gap-6">
              {bookings.map((booking, index) => {
                const hoursElapsed = calculateHoursElapsed(booking.start_time, booking.end_time)
                const currentCharge = Math.ceil(hoursElapsed) * booking.price_per_hour
                const isActive = booking.status === 'active'

                return (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`bg-card rounded-2xl border ${isActive ? 'border-primary' : 'border-border'} overflow-hidden`}
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Car Image */}
                      {booking.car_image && (
                        <div className="md:w-64 h-48 md:h-auto">
                          <img 
                            src={booking.car_image} 
                            alt={booking.car_name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      {/* Booking Details */}
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Car className="w-5 h-5 text-primary" />
                              <h3 className="font-heading text-xl font-bold text-foreground">
                                {booking.car_name}
                              </h3>
                            </div>
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                              isActive 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                            }`}>
                              {isActive ? (
                                <>
                                  <Timer className="w-3 h-3" />
                                  Active
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="w-3 h-3" />
                                  Completed
                                </>
                              )}
                            </span>
                          </div>
                          
                          {isActive && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEndRental(booking.id)}
                              className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                            >
                              End Rental
                            </Button>
                          )}
                        </div>

                        {/* Time Info */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Started</p>
                            <p className="text-sm font-medium text-foreground">
                              {new Date(booking.start_time).toLocaleString()}
                            </p>
                          </div>
                          {booking.end_time && (
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Ended</p>
                              <p className="text-sm font-medium text-foreground">
                                {new Date(booking.end_time).toLocaleString()}
                              </p>
                            </div>
                          )}
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Rate</p>
                            <p className="text-sm font-medium text-foreground">
                              Rs.{booking.price_per_hour}/hour
                            </p>
                          </div>
                        </div>

                        {/* Real-time Charge Display */}
                        <div className={`rounded-xl p-4 ${isActive ? 'bg-primary/10' : 'bg-secondary/50'}`}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Clock className={`w-6 h-6 ${isActive ? 'text-primary animate-pulse' : 'text-muted-foreground'}`} />
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  {isActive ? 'Time Elapsed' : 'Total Duration'}
                                </p>
                                <p className="text-xl font-bold text-foreground font-mono">
                                  {formatDuration(hoursElapsed)}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">
                                {isActive ? 'Current Charge' : 'Total Charge'}
                              </p>
                              <p className={`text-2xl font-bold flex items-center gap-1 ${isActive ? 'text-primary' : 'text-foreground'}`}>
                                <IndianRupee className="w-5 h-5" />
                                {currentCharge.toLocaleString()}
                              </p>
                              {isActive && (
                                <p className="text-xs text-muted-foreground">
                                  ({Math.ceil(hoursElapsed)} hours × Rs.{booking.price_per_hour})
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  )
}
