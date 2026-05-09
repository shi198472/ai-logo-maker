'use client'
import { useState } from 'react'
import Hero from '@/components/Hero'
import Problem from '@/components/Problem'
import HowItWorks from '@/components/HowItWorks'
import Features from '@/components/Features'
import SocialProof from '@/components/SocialProof'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'
import LogoModal from '@/components/LogoModal'

export default function Home() {
  const [showModal, setShowModal] = useState(false)

  return (
    <main className="min-h-screen">
      <Hero onGetStarted={() => setShowModal(true)} />
      <Problem />
      <HowItWorks />
      <Features />
      <SocialProof />
      <Pricing />
      <FAQ />
      <FinalCTA onGetStarted={() => setShowModal(true)} />
      <Footer />
      <LogoModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </main>
  )
}
