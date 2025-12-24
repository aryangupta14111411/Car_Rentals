'use client'

import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { format, differenceInDays } from 'date-fns'
import { CalendarIcon, ArrowLeft, Car, Clock, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { toast } from '@/hooks/use-toast'
import { Toaster } from '@/components/ui/toaster'

export default function Booking() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  
  const carName = searchParams.get('car') || 'Vehicle'
  const pricePerDay = parseInt(searchParams.get('price') || '100')
  const carImage = searchParams.get('image') || ''
  
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  
  const totalDays = startDate && endDate ? Math.max(1, differenceInDays(endDate, startDate) + 1) : 0
  const totalPrice = totalDays * pricePerDay

  const handleBooking = () => {
    if (!startDate || !endDate) {
      toast({
        title: "Please select dates",
        description: "Choose both pickup and return dates to proceed.",
        variant: "destructive",
      })
      return
    }
    
    toast({
      title: "Booking Confirmed!",
      description: `Your ${carName} is booked from ${format(startDate, 'PPP')} to ${format(endDate, 'PPP')}.`,
    })
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
          className="max-w-4xl mx-auto"
        >
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-8">
            Book Your {carName}
          </h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Car Preview */}
            <div className="bg-card rounded-2xl overflow-hidden border border-border">
              {carImage && (
                <img 
                  src={carImage} 
                  alt={carName}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <Car className="w-5 h-5" />
                  <span className="font-semibold">{carName}</span>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  ${pricePerDay}<span className="text-sm text-muted-foreground font-normal">/day</span>
                </p>
              </div>
            </div>

            {/* Booking Form */}
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Select Rental Duration
              </h2>

              <div className="space-y-4">
                {/* Pickup Date */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Pickup Date
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : "Select pickup date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Return Date */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Return Date
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : "Select return date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        disabled={(date) => date < (startDate || new Date())}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Summary */}
                {totalDays > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-secondary/50 rounded-lg p-4 mt-6"
                  >
                    <h3 className="font-semibold text-foreground mb-3">Booking Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Duration</span>
                        <span className="text-foreground">{totalDays} day{totalDays > 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Rate</span>
                        <span className="text-foreground">${pricePerDay}/day</span>
                      </div>
                      <div className="border-t border-border pt-2 mt-2">
                        <div className="flex justify-between font-semibold">
                          <span className="text-foreground">Total</span>
                          <span className="text-primary text-lg">${totalPrice}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Book Button */}
                <Button 
                  onClick={handleBooking}
                  className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                  size="lg"
                >
                  <CreditCard className="w-4 h-4" />
                  Confirm Booking
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
