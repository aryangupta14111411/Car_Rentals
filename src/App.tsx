import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Hero } from './components/Hero'
import { Fleet } from './components/Fleet'
import { Services } from './components/Services'
import { WhyChooseUs } from './components/WhyChooseUs'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { supabase } from '@/integrations/supabase/client'
import { Session, User } from '@supabase/supabase-js'
import { LogOut, User as UserIcon, Car } from 'lucide-react'
import { Button } from './components/ui/button'
import { toast } from 'sonner'

export default function App() {
  const navigate = useNavigate()
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
      }
    )

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast.error('Error logging out')
    } else {
      toast.success('Logged out successfully')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* User Menu - Fixed Top Right */}
      {user && (
        <div className="fixed top-4 right-4 z-[101] flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/my-rentals')}
            className="bg-background/90 backdrop-blur-sm shadow-lg border-border gap-2"
          >
            <Car className="w-4 h-4" />
            My Rentals
          </Button>
          <div className="flex items-center gap-2 bg-background/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-border">
            <UserIcon className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground truncate max-w-[120px]">
              {user.user_metadata?.full_name || user.email?.split('@')[0]}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
      
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
