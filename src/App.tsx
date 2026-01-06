import { useState, useEffect } from 'react'
import { Hero } from './components/Hero'
import { Fleet } from './components/Fleet'
import { Services } from './components/Services'
import { WhyChooseUs } from './components/WhyChooseUs'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { AuthModal } from './components/AuthModal'
import { supabase } from '@/integrations/supabase/client'
import { Session } from '@supabase/supabase-js'

export default function App() {
  const [showAuth, setShowAuth] = useState(false)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session)
        if (session) {
          setShowAuth(false)
        }
      }
    )

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (!session) {
        setShowAuth(true)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AuthModal 
        open={showAuth} 
        onOpenChange={setShowAuth}
        onSuccess={() => setShowAuth(false)}
      />
      <main className="relative" role="main">
        <section id="hero" aria-label="Hero section">
          <Hero />
        </section>
        <section id="garage" aria-label="Garage section">
          <Fleet />
        </section>
        <section id="services" aria-label="Services section">
          <Services />
        </section>
        <section id="why-us" aria-label="Why choose us section">
          <WhyChooseUs />
        </section>
        <section id="about" aria-label="About section">
          <About />
        </section>
        <section id="contact" aria-label="Contact section">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  )
}
