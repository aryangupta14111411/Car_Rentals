'use client'

import { motion } from 'framer-motion'
import { Shield, Clock, MapPin, Headphones, CreditCard, Car } from 'lucide-react'

export function Services() {
  const services = [
    {
      icon: Shield,
      title: 'Full Insurance Coverage',
      description: 'Comprehensive insurance included with every rental. Drive with complete peace of mind knowing you are fully protected.',
      color: 'bg-primary/10 text-primary',
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Pick up and drop off your vehicle any time, day or night. Our round-the-clock service fits your schedule perfectly.',
      color: 'bg-accent-emerald/10 text-accent-emerald',
    },
    {
      icon: MapPin,
      title: 'Multiple Locations',
      description: 'Convenient pick-up and drop-off points across major cities and airports. Find a location near you effortlessly.',
      color: 'bg-accent-orange/10 text-accent-orange',
    },
    {
      icon: Headphones,
      title: '24/7 Customer Support',
      description: 'Our dedicated support team is always ready to assist you. Get help whenever you need it, wherever you are.',
      color: 'bg-primary/10 text-primary',
    },
    {
      icon: CreditCard,
      title: 'Flexible Payment Options',
      description: 'Pay your way with multiple payment methods including credit cards, debit cards, and digital wallets.',
      color: 'bg-accent-emerald/10 text-accent-emerald',
    },
    {
      icon: Car,
      title: 'Free Delivery & Pickup',
      description: 'Enjoy complimentary vehicle delivery and pickup service. We bring the car to your doorstep.',
      color: 'bg-accent-orange/10 text-accent-orange',
    },
  ]

  return (
    <section id="services" className="relative py-24 bg-muted/30">
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
            Our Services
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Everything You Need for a Perfect Ride
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We go above and beyond to ensure your rental experience is seamless, convenient, and enjoyable from start to finish.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-background rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
            >
              <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-7 h-7" />
              </div>
              
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                {service.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-8 lg:p-12 text-center lg:text-left"
        >
          <div className="lg:flex items-center justify-between gap-8">
            <div className="mb-6 lg:mb-0">
              <h3 className="font-heading text-2xl lg:text-3xl font-bold text-primary-foreground mb-2">
                Need a Custom Solution?
              </h3>
              <p className="text-primary-foreground/80 text-lg">
                Contact us for corporate fleet management, long-term rentals, and special arrangements.
              </p>
            </div>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center justify-center bg-white text-primary font-semibold px-8 py-4 rounded-xl hover:bg-white/90 transition-colors"
            >
              Contact Our Team
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
