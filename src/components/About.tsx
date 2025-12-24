'use client'

import { motion } from 'framer-motion'
import { Car, Users, MapPin, Clock } from 'lucide-react'

export function About() {
  return (
    <section id="about" className="relative py-24 bg-muted/30">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop&auto=format"
              alt="DriveElite car fleet"
              className="rounded-2xl shadow-2xl w-full"
            />
            <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-2xl shadow-xl">
              <div className="text-3xl font-bold">15+</div>
              <div className="text-sm opacity-80">Years Experience</div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">About Us</span>
            <h2 className="font-heading text-4xl font-bold text-foreground mt-4 mb-6">
              Your Trusted Partner for Premium Car Rentals
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Since 2009, DriveElite has been the go-to choice for discerning travelers seeking quality, reliability, and exceptional service. Our commitment to excellence has made us a leader in the car rental industry.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Car, value: '500+', label: 'Premium Vehicles' },
                { icon: Users, value: '50k+', label: 'Happy Customers' },
                { icon: MapPin, value: '25+', label: 'Locations' },
                { icon: Clock, value: '24/7', label: 'Support' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-xl text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
