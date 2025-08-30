import React from 'react'
import { PACKS } from '../utils/rng'
import OddsTooltip from './OddsTooltip'
import clsx from 'clsx'

export default function PackCard({type, onBuy}) {
  const pack = PACKS[type]
  
  const getPackGradient = (packType) => {
    switch(packType) {
      case 'bronze': return 'from-fifa-royal-blue-dark to-fifa-black'
      case 'silver': return 'from-fifa-royal-blue to-fifa-royal-blue-dark'
      case 'gold': return 'from-fifa-gold to-fifa-gold-dark'
      default: return 'from-fifa-royal-blue-dark to-fifa-black'
    }
  }
  
  const getPackGlow = (packType) => {
    switch(packType) {
      case 'bronze': return 'shadow-fifa-royal-blue/30'
      case 'silver': return 'shadow-fifa-royal-blue-light/40'
      case 'gold': return 'shadow-fifa-gold/60'
      default: return 'shadow-fifa-royal-blue/30'
    }
  }

  const getPackBadge = (packType) => {
    switch(packType) {
      case 'bronze': return 'bronze.png'
      case 'silver': return 'silver.png'
      case 'gold': return 'gold.png'
      default: return 'bronze.png'
    }
  }
  
  return (
    <div className={clsx(
      "p-6 rounded-3xl w-80 relative group transition-all duration-300 hover:scale-105 hover:-translate-y-2 animate-hover-float",
      `bg-gradient-to-br ${getPackGradient(type)} border-2 border-fifa-gold/30`,
      `shadow-2xl ${getPackGlow(type)} hover:shadow-3xl`,
      "backdrop-blur-sm overflow-hidden"
    )}>
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-fifa-gold/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      
      {/* Pack badge */}
      <div className="absolute top-4 right-4 w-12 h-12 z-10">
        <img 
          src={`/${getPackBadge(type)}`} 
          alt={`${type} badge`} 
          className="w-full h-full object-contain drop-shadow-lg"
        />
      </div>
      
      {/* Pack image with enhanced styling */}
      <div className="relative mb-4">
        <div className="w-36 h-36 mx-auto bg-gradient-to-br from-fifa-white/10 to-fifa-white/5 rounded-2xl flex items-center justify-center shadow-inner border border-fifa-gold/20">
          <img 
            src="/logo.png" 
            alt="Pack" 
            className="h-20 w-20 object-contain drop-shadow-lg"
          />
        </div>
      </div>
      
      {/* Pack info */}
      <div className="text-center mb-6">
        <div className="text-2xl font-bold text-fifa-white mb-2">{pack.name}</div>
        <div className="text-sm text-fifa-royal-blue-light mb-1">Contains 5 Player Cards</div>
        <div className="flex items-center justify-center gap-2">
          <span className="text-fifa-royal-blue-light">Price:</span>
          <span className="text-fifa-gold font-bold text-xl">{pack.price.toLocaleString()}</span>
          <span className="text-fifa-royal-blue-light text-sm">credits</span>
        </div>
      </div>
      
      {/* Action button */}
      <div className="flex justify-center">
        <button 
          onClick={() => onBuy(type)} 
          className="w-full py-4 text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 bg-gradient-to-r from-fifa-gold to-fifa-gold-dark text-fifa-black rounded-xl border-2 border-fifa-gold hover:from-fifa-gold-dark hover:to-fifa-gold"
        >
          🎁 Open Pack
        </button>
      </div>
      
      {/* Odds tooltip */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <OddsTooltip pack={pack}/>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-fifa-gold to-transparent opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-fifa-gold to-transparent opacity-60"></div>
    </div>
  )
}
