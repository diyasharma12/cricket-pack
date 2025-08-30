import React from 'react'
import { motion } from 'framer-motion'

export default function OddsTooltip({pack}) {
  const getRarityColor = (rarity) => {
    switch(rarity) {
      case 'common': return 'text-slate-400'
      case 'rare': return 'text-blue-400'
      case 'epic': return 'text-purple-400'
      case 'legend': return 'text-cricket-gold'
      default: return 'text-slate-400'
    }
  }

  const getRarityIcon = (rarity) => {
    switch(rarity) {
      case 'common': return '⚪'
      case 'rare': return '🔵'
      case 'epic': return '🟣'
      case 'legend': return '⭐'
      default: return '⚪'
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full right-0 mt-2 w-64 bg-gradient-to-br from-slate-900 to-slate-800 p-4 rounded-xl border border-slate-600/50 shadow-2xl backdrop-blur-sm z-50"
    >
      {/* Header */}
      <div className="text-center mb-3">
        <div className="text-lg font-bold text-white">{pack.name} Pack</div>
        <div className="text-sm text-slate-300">Contains {pack.count} Player Cards</div>
        <div className="text-xs text-slate-400 mt-1">Drop Rates</div>
      </div>

      {/* Odds */}
      <div className="space-y-2">
        {Object.entries(pack.odds).map(([rarity, percentage]) => (
          <div key={rarity} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">{getRarityIcon(rarity)}</span>
              <span className={`font-medium capitalize ${getRarityColor(rarity)}`}>
                {rarity}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-16 bg-slate-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    rarity === 'legend' ? 'bg-cricket-gold' :
                    rarity === 'epic' ? 'bg-purple-500' :
                    rarity === 'rare' ? 'bg-blue-500' :
                    'bg-slate-500'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-white font-bold text-sm w-8 text-right">
                {percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-slate-600/50">
        <div className="text-xs text-slate-400 text-center">
          Higher tier packs have better odds for rare players
        </div>
      </div>

      {/* Arrow */}
      <div className="absolute -top-2 right-4 w-4 h-4 bg-slate-900 rotate-45 border-l border-t border-slate-600/50"></div>
    </motion.div>
  )
}
