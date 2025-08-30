import React, { useState } from 'react'
import PackCard from '../components/PackCard'
import PackOpening from '../components/PackOpening'
import playersData from '../data/players.json'
import { PACKS } from '../utils/rng'
import Navbar from '../components/Navbar'
import { useStore } from '../store/useStore'

export default function Home() {
  const [opening, setOpening] = useState(null)
  const players = playersData
  const credits = useStore(s => s.credits)
  const spendCredits = useStore(s => s.spendCredits)

  function handleBuy(packKey) {
    const price = PACKS[packKey].price
    if (credits < price) {
      alert('Not enough credits')
      return
    }
    spendCredits(price)
    setOpening(packKey)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-fifa-black via-fifa-royal-blue-dark to-fifa-royal-blue relative overflow-hidden">
      <Navbar/>
      
      {/* Main Banner Background */}
      <div className="relative">
        {/* bg.jpg Banner with 50% opacity */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="/bg.jpg" 
            alt="Banner Background" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        
        <main className="container mx-auto px-6 py-8 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <img src="/logo.png" alt="Logo" className="w-20 h-20 animate-pulse-glow" />
          </div>
          <p className="text-xl text-fifa-royal-blue-light max-w-2xl mx-auto animate-slide-up">
            Discover amazing cricket players in our premium card packs. Each pack contains 5 unique player cards with varying rarities!
          </p>
        </div>

        {/* Pack Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {Object.keys(PACKS).map((k, index) => (
            <div key={k} className="animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
              <PackCard type={k} onBuy={handleBuy}/>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-fifa-royal-blue/30 to-fifa-black/50 backdrop-blur-sm rounded-2xl p-6 border border-fifa-gold/30 hover:border-fifa-gold/50 transition-all duration-300 hover:scale-105 animate-slide-up">
            <div className="text-center">
              <div className="text-4xl font-bold text-fifa-gold mb-2">5</div>
              <div className="text-fifa-royal-blue-light">Cards per Pack</div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-fifa-royal-blue/30 to-fifa-black/50 backdrop-blur-sm rounded-2xl p-6 border border-fifa-gold/30 hover:border-fifa-gold/50 transition-all duration-300 hover:scale-105 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="text-center">
              <div className="text-4xl font-bold text-fifa-gold mb-2">4</div>
              <div className="text-fifa-royal-blue-light">Rarity Levels</div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-fifa-royal-blue/30 to-fifa-black/50 backdrop-blur-sm rounded-2xl p-6 border border-fifa-gold/30 hover:border-fifa-gold/50 transition-all duration-300 hover:scale-105 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="text-center">
              <div className="text-4xl font-bold text-fifa-gold mb-2">∞</div>
              <div className="text-fifa-royal-blue-light">Players to Collect</div>
            </div>
          </div>
        </div>
        </main>
      </div>

      {opening && <PackOpening packKey={opening} players={players} onClose={() => setOpening(null)} />}
    </div>
  )
}
