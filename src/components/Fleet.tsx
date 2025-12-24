'use client'

import { motion } from 'framer-motion'
import { Users, Fuel, Settings, Star } from 'lucide-react'
import { Button } from './ui/button'
import scorpioNImage from '@/assets/scorpio-n.png'

export function Fleet() {
  const cars = [
    {
      name: 'Mercedes-Benz C-Class',
      category: 'Luxury Sedan',
      image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=600&h=400&fit=crop&auto=format',
      price: 89,
      rating: 4.9,
      seats: 5,
      transmission: 'Automatic',
      fuel: 'Hybrid',
      featured: true,
    },
    {
      name: 'BMW X5',
      category: 'Premium SUV',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop&auto=format',
      price: 129,
      rating: 4.8,
      seats: 7,
      transmission: 'Automatic',
      fuel: 'Diesel',
      featured: false,
    },
    {
      name: 'Porsche 911',
      category: 'Sports Car',
      image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop&auto=format',
      price: 299,
      rating: 5.0,
      seats: 2,
      transmission: 'Automatic',
      fuel: 'Petrol',
      featured: true,
    },
    {
      name: 'Tesla Model 3',
      category: 'Electric',
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&h=400&fit=crop&auto=format',
      price: 99,
      rating: 4.9,
      seats: 5,
      transmission: 'Automatic',
      fuel: 'Electric',
      featured: false,
    },
    {
      name: 'Range Rover Sport',
      category: 'Luxury SUV',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop&auto=format',
      price: 179,
      rating: 4.8,
      seats: 5,
      transmission: 'Automatic',
      fuel: 'Diesel',
      featured: false,
    },
    {
      name: 'Audi A4',
      category: 'Executive Sedan',
      image: 'https://images.unsplash.com/photo-1606664913908-68a6a009f3aa?w=600&h=400&fit=crop&auto=format',
      price: 75,
      rating: 4.7,
      seats: 5,
      transmission: 'Automatic',
      fuel: 'Petrol',
      featured: false,
    },
    {
      name: 'Mahindra Scorpio-N',
      category: 'SUV',
      image: scorpioNImage,
      price: 200,
      rating: 4.8,
      seats: 7,
      transmission: 'Automatic',
      fuel: 'Petrol',
      featured: false,
    },
  ]

  return (
    <section id="fleet" className="relative py-24 bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Our Fleet
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Choose Your Perfect Ride
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From luxury sedans to powerful SUVs, our diverse fleet has the perfect vehicle for every occasion and preference.
          </p>
        </motion.div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car, index) => (
            <motion.div
              key={car.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {car.featured && (
                  <div className="absolute top-4 left-4 bg-accent-orange text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Featured
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
                  <Star className="w-4 h-4 text-accent-gold fill-accent-gold" />
                  <span className="text-sm font-semibold text-foreground">{car.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4">
                  <span className="text-sm text-primary font-medium">{car.category}</span>
                  <h3 className="font-heading text-xl font-bold text-foreground mt-1">{car.name}</h3>
                </div>

                {/* Features */}
                <div className="flex items-center gap-4 text-muted-foreground text-sm mb-6">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{car.seats}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Settings className="w-4 h-4" />
                    <span>{car.transmission}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Fuel className="w-4 h-4" />
                    <span>{car.fuel}</span>
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <span className="text-2xl font-bold text-foreground">${car.price}</span>
                    <span className="text-muted-foreground text-sm">/day</span>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Book Now
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Button 
            variant="outline" 
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8"
          >
            View All Vehicles
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
