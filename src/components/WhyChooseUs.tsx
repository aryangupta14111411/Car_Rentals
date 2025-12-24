'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Star, Award, Users, ThumbsUp, Shield } from 'lucide-react'

export function WhyChooseUs() {
  const features = [
    {
      icon: Award,
      title: 'Award-Winning Service',
      description: 'Recognized as the top car rental service for 5 consecutive years.',
    },
    {
      icon: Shield,
      title: 'Fully Insured Fleet',
      description: 'Every vehicle comes with comprehensive insurance coverage.',
    },
    {
      icon: ThumbsUp,
      title: 'Best Price Guarantee',
      description: 'Found a lower price? We will match it, guaranteed.',
    },
    {
      icon: Users,
      title: 'Trusted by Thousands',
      description: 'Over 50,000 satisfied customers and counting.',
    },
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Business Traveler',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&auto=format',
      rating: 5,
      text: 'Exceptional service! The car was spotless and the pickup process was incredibly smooth. Will definitely use DriveElite again.',
    },
    {
      name: 'Michael Chen',
      role: 'Family Vacation',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format',
      rating: 5,
      text: 'Rented an SUV for our family trip. Great vehicle selection, fair prices, and the staff was very helpful with child seat installation.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Weekend Getaway',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&auto=format',
      rating: 5,
      text: 'The online booking was effortless and the car exceeded my expectations. Premium quality at reasonable rates!',
    },
  ]

  return (
    <section id="why-us" className="relative py-24 bg-background">
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
            Why Choose Us
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-6">
            The DriveElite Difference
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience why thousands of customers choose DriveElite for their car rental needs.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-heading text-2xl font-bold text-center text-foreground mb-10">
            What Our Customers Say
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-card rounded-2xl p-6 border border-border"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent-gold fill-accent-gold" />
                  ))}
                </div>
                
                {/* Text */}
                <p className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                {/* Author */}
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-16 border-t border-border"
        >
          <p className="text-center text-muted-foreground mb-8">Trusted by leading companies worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 opacity-50">
            {['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta'].map((company) => (
              <div key={company} className="text-2xl font-bold text-muted-foreground">
                {company}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
