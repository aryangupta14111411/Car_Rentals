'use client'

import { Car, Mail, Twitter, Instagram, Linkedin } from 'lucide-react'

export function Footer() {
  const socialLinks = [
    { Icon: Mail, href: 'mailto:aryandemat5@gmail.com' },
    { Icon: Twitter, href: '#' },
    { Icon: Instagram, href: '#' },
    { Icon: Linkedin, href: 'https://www.linkedin.com/in/aryan-gupta-840a41244/' },
  ]

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Car className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-heading font-bold text-xl">DriveElite</span>
            </div>
            <p className="text-background/70 mb-6">Premium car rental service with a fleet of 500+ vehicles across 25+ locations.</p>
            <div className="flex gap-4">
              {socialLinks.map(({ Icon, href }, i) => (
                <a key={i} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-background/70">
              {['Our Fleet', 'Services', 'About Us', 'Contact', 'FAQs'].map((link) => (
                <li key={link}><a href="#" className="hover:text-background transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          {/* Car Types */}
          <div>
            <h4 className="font-heading font-bold mb-4">Car Types</h4>
            <ul className="space-y-3 text-background/70">
              {['Economy Cars', 'Luxury Sedans', 'SUVs', 'Sports Cars', 'Electric Vehicles'].map((type) => (
                <li key={type}><a href="#" className="hover:text-background transition-colors">{type}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold mb-4">Contact Info</h4>
            <ul className="space-y-3 text-background/70">
              <li>7379995812</li>
              <li>aryandemat5@gmail.com</li>
              <li>Crossing Republic, 901016<br />Ghaziabad, Uttar Pradesh</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/60 text-sm">© 2024 DriveElite. All rights reserved.</p>
          <div className="flex gap-6 text-background/60 text-sm">
            <a href="#" className="hover:text-background">Privacy Policy</a>
            <a href="#" className="hover:text-background">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
