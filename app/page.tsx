import Header from './components/header'
import Hero from './components/hero'
import Features from './components/features'
import CTA from './components/cta'
import Footer from './components/footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Hero />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

