'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { Button } from './ui/button'

export function Contact() {
  return (
    <section id="contact" className="relative py-24 bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Contact Us</span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mt-4 mb-6">Get in Touch</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out to us anytime.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            {[
              { icon: Phone, title: 'Phone', info: '+1 (555) 123-4567', sub: 'Mon-Sun, 24/7' },
              { icon: Mail, title: 'Email', info: 'hello@driveelite.com', sub: 'We reply within 24 hours' },
              { icon: MapPin, title: 'Main Office', info: '123 Auto Drive, Los Angeles, CA', sub: 'Open for walk-ins' },
              { icon: Clock, title: 'Working Hours', info: '24/7 Service Available', sub: 'Including holidays' },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-4 bg-card rounded-xl border border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">{item.title}</div>
                  <div className="text-foreground">{item.info}</div>
                  <div className="text-sm text-muted-foreground">{item.sub}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-card rounded-2xl p-8 border border-border">
            <h3 className="font-heading font-bold text-xl mb-6">Send us a Message</h3>
            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                <input type="email" placeholder="Your Email" className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>
              <input type="text" placeholder="Subject" className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              <textarea placeholder="Your Message" rows={4} className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none" />
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6">Send Message</Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
