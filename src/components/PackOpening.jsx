import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Card from './Card'
import { openPack } from '../utils/rng'
import confetti from 'canvas-confetti'
import { useStore } from '../store/useStore'

export default function PackOpening({packKey, players, onClose}) {
  const [result, setResult] = useState([])
  const [revealed, setRevealed] = useState([])
  const [phase, setPhase] = useState('start') // start -> shake -> glow -> reveal -> summary
  const [currentRevealing, setCurrentRevealing] = useState(null)
  const [hasLegendary, setHasLegendary] = useState(false)
  const addToCollection = useStore(s => s.addToCollection)
  const addPackResults = useStore(s => s.addPackResults)
  const spendCredits = useStore(s => s.spendCredits)
  const audioMuted = useStore(s => s.audioMuted)

  // Sound effects
  const playSound = (soundName) => {
    if (audioMuted) return
    const sounds = {
      packShake: () => new Audio('/assets/sounds/pack_shake.mp3').play().catch(()=>{}),
      packGlow: () => new Audio('/assets/sounds/pack_glow.mp3').play().catch(()=>{}),
      cardFlip: () => new Audio('/assets/sounds/card_flip.mp3').play().catch(()=>{}),
      rareHit: () => new Audio('/assets/sounds/rare_hit.mp3').play().catch(()=>{}),
      legendaryHit: () => new Audio('/assets/sounds/legendary_hit.mp3').play().catch(()=>{})
    }
    sounds[soundName]?.()
  }

  useEffect(() => {
    const drawn = openPack(packKey, players)
    setResult(drawn)
    setHasLegendary(drawn.some(card => card.rarity === 'legend'))
    
    // Store pack results for statistics
    addPackResults(drawn)
    
    // Phase 1: Pack shake animation (2 seconds)
    setTimeout(() => {
      setPhase('shake')
      playSound('packShake')
    }, 1000)
    
    // Phase 2: Pack glow animation (1.5 seconds)
    setTimeout(() => {
      setPhase('glow')
      playSound('packGlow')
    }, 3000)
    
    // Phase 3: Start revealing cards
    setTimeout(() => {
      setPhase('reveal')
      revealCards(drawn)
    }, 4500)
  }, [])

  const revealCards = (drawn) => {
    let i = 0
    const interval = setInterval(() => {
      setCurrentRevealing(i)
      setRevealed(prev => [...prev, i])
      const card = drawn[i]
      
      // Play appropriate sound
      if (card.rarity === 'legend') {
        playSound('legendaryHit')
        // Epic confetti for legendary
        confetti({ 
          particleCount: 100, 
          spread: 70, 
          origin: { y: 0.6 },
          colors: ['#FFD700', '#FFA500', '#FF6B6B', '#4ECDC4']
        })
      } else if (card.rarity === 'epic') {
        playSound('rareHit')
        // Smaller confetti for epic
        confetti({ 
          particleCount: 50, 
          spread: 50, 
          origin: { y: 0.6 },
          colors: ['#8B5CF6', '#A855F7', '#C084FC']
        })
      } else {
        playSound('cardFlip')
      }
      
      // Add to collection
      addToCollection(card)
      i++
      
      if (i >= drawn.length) {
        clearInterval(interval)
        setCurrentRevealing(null)
        setTimeout(() => setPhase('summary'), 2000)
      }
    }, 1200) // Stagger reveals
  }

  if (!result.length) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 w-full max-w-6xl border border-slate-600/30 shadow-2xl relative"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-fifa-gold to-fifa-white bg-clip-text text-transparent">
              Opening {packKey.toUpperCase()} Pack
            </h2>
            <p className="text-fifa-royal-blue-light mt-1">
              {phase === 'start' && 'Preparing your pack...'}
              {phase === 'shake' && 'Pack is shaking with anticipation...'}
              {phase === 'glow' && 'Energy building up...'}
              {phase === 'reveal' && 'Revealing your amazing cricket players...'}
              {phase === 'summary' && 'Pack opening complete!'}
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="px-6 py-3 bg-gradient-to-r from-fifa-royal-blue to-fifa-royal-blue-dark hover:from-fifa-royal-blue-dark hover:to-fifa-royal-blue rounded-lg text-fifa-white transition-all duration-200 border border-fifa-gold/30 hover:border-fifa-gold font-bold relative z-50"
          >
            ✕ Close
          </button>
        </div>

        {/* Pack animation area */}
        <div className="min-h-[500px] flex justify-center items-center relative">
          <AnimatePresence mode="wait">
            {/* Phase 1: Initial Pack */}
            {phase === 'start' && (
              <motion.div 
                key="start"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative"
              >
                <div className="p-8 bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl border-2 border-slate-600 shadow-2xl">
                  <div className="w-64 h-36 bg-gradient-to-br from-cricket-gold to-yellow-600 rounded-xl shadow-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                    <div className="text-black font-bold text-2xl z-10">🎁 PACK</div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Phase 2: Pack Shaking */}
            {phase === 'shake' && (
              <motion.div 
                key="shake"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 3, -3, 0],
                  x: [0, 10, -10, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative"
              >
                <div className="p-8 bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl border-2 border-slate-600 shadow-2xl">
                  <div className="w-64 h-36 bg-gradient-to-br from-cricket-gold to-yellow-600 rounded-xl shadow-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                    <div className="text-black font-bold text-2xl z-10">🎁 PACK</div>
                  </div>
                </div>
                {/* Shake particles */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-cricket-gold rounded-full"
                      animate={{
                        x: [0, Math.random() * 100 - 50],
                        y: [0, Math.random() * 100 - 50],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        delay: i * 0.1
                      }}
                      style={{
                        left: `${20 + i * 10}%`,
                        top: `${20 + i * 10}%`
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Phase 3: Pack Glowing */}
            {phase === 'glow' && (
              <motion.div 
                key="glow"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: [1, 1.2, 1],
                  boxShadow: [
                    "0 0 20px rgba(255, 215, 0, 0.3)",
                    "0 0 40px rgba(255, 215, 0, 0.8)",
                    "0 0 60px rgba(255, 215, 0, 1)"
                  ]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative"
              >
                <div className="p-8 bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl border-2 border-cricket-gold shadow-2xl">
                  <div className="w-64 h-36 bg-gradient-to-br from-cricket-gold to-yellow-600 rounded-xl shadow-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
                    <div className="text-black font-bold text-2xl z-10">🎁 PACK</div>
                  </div>
                </div>
                {/* Glow particles */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 bg-cricket-gold rounded-full"
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                        rotate: [0, 360]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.1
                      }}
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Phase 4: Card Reveals */}
            {phase === 'reveal' && (
              <motion.div 
                key="reveal"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <div className="grid grid-cols-5 gap-6 justify-items-center">
                  {result.map((p, idx) => (
                    <motion.div
                      key={p.id + idx}
                      initial={{ scale: 0.8, opacity: 0, y: 50 }}
                      animate={{ 
                        scale: currentRevealing === idx ? [1, 1.1, 1] : 1,
                        opacity: 1,
                        y: 0
                      }}
                      transition={{ 
                        delay: idx * 0.2,
                        duration: 0.8,
                        type: "spring",
                        stiffness: 200
                      }}
                      className="relative"
                    >
                      <Card player={p} revealed={revealed.includes(idx)} />
                      {/* Highlight current revealing card */}
                      {currentRevealing === idx && (
                        <motion.div
                          className="absolute inset-0 border-4 border-cricket-gold rounded-xl"
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 0.5, repeat: 2 }}
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Progress indicator */}
        {phase === 'reveal' && (
          <div className="mt-8">
            <div className="flex justify-center items-center gap-2 mb-4">
              <span className="text-slate-300">Revealing cards...</span>
              <div className="flex gap-1">
                {result.map((_, idx) => (
                  <div 
                    key={idx}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      revealed.includes(idx) 
                        ? 'bg-cricket-gold scale-125' 
                        : 'bg-slate-600'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <motion.div 
                className="bg-gradient-to-r from-cricket-gold to-yellow-500 h-2 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${(revealed.length / result.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}

        {/* Summary */}
        {phase === 'summary' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 text-center"
          >
            <div className={`rounded-2xl p-6 border ${
              hasLegendary 
                ? 'bg-gradient-to-r from-cricket-gold/20 to-yellow-500/20 border-cricket-gold/50' 
                : 'bg-gradient-to-r from-green-800/30 to-emerald-800/30 border-green-500/30'
            }`}>
              <div className="text-4xl mb-4">{hasLegendary ? '🏆' : '🎉'}</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {hasLegendary ? 'LEGENDARY PULL!' : 'Pack Opened Successfully!'}
              </h3>
              <p className="text-slate-300 mb-4">
                All cards have been added to your collection. Duplicates are automatically converted to scrap.
              </p>
              
              {/* Rarity summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {['common', 'rare', 'epic', 'legend'].map(rarity => {
                  const count = result.filter(p => p.rarity === rarity).length
                  if (count === 0) return null
                  return (
                    <div key={rarity} className="bg-slate-800/50 rounded-lg p-3 border border-slate-600/30">
                      <div className="text-lg font-bold text-white">{count}</div>
                      <div className="text-sm text-slate-300 capitalize">{rarity}</div>
                    </div>
                  )
                })}
              </div>
            </div>
            
            <div className="mt-6 flex gap-4 justify-center">
              <button 
                onClick={onClose} 
                className="btn-primary px-8 py-3"
              >
                🎁 Open Another Pack
              </button>
              <button 
                onClick={onClose} 
                className="btn-secondary px-8 py-3"
              >
                View Collection
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
