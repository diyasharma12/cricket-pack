import React from 'react'
import { motion } from 'framer-motion'

export default function Card({player, revealed}) {
  const getRarityColors = (rarity) => {
    switch(rarity) {
      case 'common': return {
        bg: 'from-slate-600 to-slate-800',
        border: 'border-slate-500',
        glow: 'shadow-slate-500/30',
        accent: 'text-slate-300',
        frame: 'from-slate-700/80 to-slate-900/80'
      }
      case 'rare': return {
        bg: 'from-fifa-royal-blue to-fifa-royal-blue-dark',
        border: 'border-fifa-royal-blue-light',
        glow: 'shadow-fifa-royal-blue-light/50',
        accent: 'text-blue-200',
        frame: 'from-fifa-royal-blue/90 to-fifa-royal-blue-dark/90'
      }
      case 'epic': return {
        bg: 'from-purple-600 to-purple-800',
        border: 'border-purple-400',
        glow: 'shadow-purple-400/60',
        accent: 'text-purple-200',
        frame: 'from-purple-700/90 to-purple-900/90'
      }
      case 'legend': return {
        bg: 'from-fifa-gold to-fifa-gold-dark',
        border: 'border-fifa-gold',
        glow: 'shadow-fifa-gold/70',
        accent: 'text-yellow-100',
        frame: 'from-fifa-gold/90 to-fifa-gold-dark/90'
      }
      default: return {
        bg: 'from-slate-600 to-slate-800',
        border: 'border-slate-500',
        glow: 'shadow-slate-500/30',
        accent: 'text-slate-300',
        frame: 'from-slate-700/80 to-slate-900/80'
      }
    }
  }

  const rarityColors = getRarityColors(player.rarity)
  
  return (
    <motion.div
      layout
      initial={{ rotateY: 0 }}
      animate={{ rotateY: revealed ? 180 : 0 }}
      transition={{ duration: 0.9 }}
      style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
      className="w-48 h-72 relative"
    >
      {/* Background Frame */}
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <img 
          src="/background.png" 
          alt="Card Frame" 
          className="w-full h-full object-cover opacity-100"
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${rarityColors.frame} rounded-xl`}></div>
      </div>

      {/* back */}
      <div className="absolute inset-0 rounded-xl overflow-hidden"
           style={{ 
             WebkitBackfaceVisibility:'hidden', 
             backfaceVisibility:'hidden', 
             transformStyle:'preserve-3d',
             transform: 'rotateY(0deg)'
           }}>
        <div className="w-full h-full bg-gradient-to-br from-fifa-black to-fifa-royal-blue-dark flex items-center justify-center border-2 border-fifa-royal-blue shadow-2xl">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-fifa-gold to-fifa-gold-dark rounded-full flex items-center justify-center shadow-lg animate-pulse-glow">
              <img src="/logo.png" alt="Logo" className="w-12 h-12" />
            </div>
            <div className="text-xl font-bold text-fifa-white mb-2">Cricket Pack</div>
            <div className="text-sm text-fifa-royal-blue-light">Flip to reveal your player</div>
            <div className="mt-4 w-8 h-8 mx-auto border-2 border-fifa-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>

      {/* front - rotated 180deg so it shows when container rotates */}
      <div className="absolute inset-0 rounded-xl overflow-hidden"
           style={{ 
             transform: 'rotateY(180deg)', 
             WebkitBackfaceVisibility:'hidden', 
             backfaceVisibility:'hidden',
             transformStyle:'preserve-3d'
           }}>
        <div className={`w-full h-full bg-gradient-to-br ${rarityColors.bg} border-2 ${rarityColors.border} shadow-2xl ${rarityColors.glow} p-4 flex flex-col justify-between relative`}>
          {/* Background Frame Overlay */}
          <div className="absolute inset-0 rounded-xl overflow-hidden">
            <img 
              src="/background.png" 
              alt="Card Frame" 
              className="w-full h-full object-cover opacity-100"
            />
          </div>

          {/* Header */}
          <div className="flex justify-between items-start relative z-10">
            <div className="bg-fifa-black/60 backdrop-blur-sm px-3 py-1 rounded-lg border border-fifa-gold/30">
              <div className="text-xs font-bold text-fifa-white">#{player.rating}</div>
            </div>
            <div className={`text-xs font-bold uppercase px-2 py-1 rounded-lg bg-fifa-white/20 backdrop-blur-sm ${rarityColors.accent}`}>
              {player.rarity}
            </div>
          </div>

          {/* Player image */}
          <div className="flex-1 flex items-center justify-center relative z-10">
            <div className="w-28 h-28 bg-fifa-white/10 rounded-full flex items-center justify-center shadow-inner backdrop-blur-sm border-2 border-fifa-gold/30">
              <img 
                src={`/${player.photo}`} 
                alt={player.name} 
                className="w-24 h-24 object-cover rounded-full border-2 border-fifa-white/40"
              />
            </div>
            {/* Rarity glow effect */}
            <div className={`absolute inset-0 rounded-full ${rarityColors.glow} opacity-50 animate-pulse`}></div>
          </div>

          {/* Player info */}
          <div className="text-center relative z-10">
            <div className="font-bold text-fifa-white text-lg mb-1">{player.name}</div>
            <div className="text-sm text-fifa-royal-blue-light mb-2">{player.role} • {player.team}</div>
            
            {/* Rating badge */}
            <div className="flex justify-center mb-3">
              <div className="bg-fifa-black/60 backdrop-blur-sm px-3 py-1 rounded-lg border border-fifa-gold/30">
                <div className="text-sm font-bold text-fifa-white">Rating: {player.rating}</div>
              </div>
            </div>

            {/* Key stats */}
            <div className="space-y-1">
              {player.role === 'BAT' && (
                <>
                  <div className="flex justify-between text-xs">
                    <span className="text-fifa-royal-blue-light">Runs:</span>
                    <span className="text-fifa-white font-medium">{player.stats.runs?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-fifa-royal-blue-light">Avg:</span>
                    <span className="text-fifa-white font-medium">{player.stats.avg}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-fifa-royal-blue-light">SR:</span>
                    <span className="text-fifa-white font-medium">{player.stats.sr}</span>
                  </div>
                </>
              )}
              {player.role === 'BOWL' && (
                <>
                  <div className="flex justify-between text-xs">
                    <span className="text-fifa-royal-blue-light">Wickets:</span>
                    <span className="text-fifa-white font-medium">{player.stats.wickets}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-fifa-royal-blue-light">Avg:</span>
                    <span className="text-fifa-white font-medium">{player.stats.avg}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-fifa-royal-blue-light">Eco:</span>
                    <span className="text-fifa-white font-medium">{player.stats.eco}</span>
                  </div>
                </>
              )}
              {player.role === 'AR' && (
                <>
                  <div className="flex justify-between text-xs">
                    <span className="text-fifa-royal-blue-light">Runs:</span>
                    <span className="text-fifa-white font-medium">{player.stats.runs?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-fifa-royal-blue-light">Wickets:</span>
                    <span className="text-fifa-white font-medium">{player.stats.wickets}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-fifa-royal-blue-light">Avg:</span>
                    <span className="text-fifa-white font-medium">{player.stats.avg}</span>
                  </div>
                </>
              )}
              {player.role === 'WK' && (
                <>
                  <div className="flex justify-between text-xs">
                    <span className="text-fifa-royal-blue-light">Runs:</span>
                    <span className="text-fifa-white font-medium">{player.stats.runs?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-fifa-royal-blue-light">Catches:</span>
                    <span className="text-fifa-white font-medium">{player.stats.catches}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-fifa-royal-blue-light">Stumpings:</span>
                    <span className="text-fifa-white font-medium">{player.stats.stumpings}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-fifa-gold/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-fifa-gold/50 to-transparent"></div>
        </div>
      </div>
    </motion.div>
  )
}
