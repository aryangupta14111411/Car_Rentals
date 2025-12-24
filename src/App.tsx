import { Hero } from './components/Hero'
import { Fleet } from './components/Fleet'
import { Services } from './components/Services'
import { WhyChooseUs } from './components/WhyChooseUs'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
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
