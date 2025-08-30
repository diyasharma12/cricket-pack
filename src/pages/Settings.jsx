import React from 'react'
import Navbar from '../components/Navbar'
import { useStore } from '../store/useStore'

export default function Settings(){
  const audioMuted = useStore(s => s.audioMuted)
  const toggleAudio = useStore(s => s.toggleAudio)
  const credits = useStore(s => s.credits)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">
      <Navbar/>
      <main className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cricket-gold to-yellow-400 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-xl text-slate-300">
            Customize your CricketPacks experience
          </p>
        </div>

        {/* Settings Cards */}
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Audio Settings */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/30">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Audio Settings</h3>
                <p className="text-slate-300">Control sound effects and music</p>
              </div>
              <button 
                onClick={toggleAudio} 
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  audioMuted 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {audioMuted ? '🔇 Unmute' : '🔊 Mute'}
              </button>
            </div>
          </div>

          {/* Credits Info */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/30">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-4">Your Credits</h3>
              <div className="bg-gradient-to-r from-slate-700 to-slate-600 rounded-xl p-6 border border-slate-500/30">
                <div className="text-4xl font-bold text-cricket-gold mb-2">
                  {credits.toLocaleString()}
                </div>
                <div className="text-slate-300 mb-4">Available Credits</div>
                <p className="text-sm text-slate-400">
                  Demo credits provided for testing pack opening functionality. 
                  In a real game, you would earn credits through gameplay or purchase them.
                </p>
              </div>
            </div>
          </div>

          {/* Game Info */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/30">
            <h3 className="text-xl font-bold text-white mb-4">Game Information</h3>
            <div className="space-y-3 text-slate-300">
              <div className="flex justify-between">
                <span>Version:</span>
                <span className="text-cricket-gold">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span>Total Players:</span>
                <span className="text-cricket-gold">50+</span>
              </div>
              <div className="flex justify-between">
                <span>Pack Types:</span>
                <span className="text-cricket-gold">4</span>
              </div>
              <div className="flex justify-between">
                <span>Rarity Levels:</span>
                <span className="text-cricket-gold">4</span>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-br from-blue-800/30 to-purple-800/30 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
            <h3 className="text-xl font-bold text-white mb-4">💡 Pro Tips</h3>
            <ul className="space-y-2 text-slate-300">
              <li>• Higher tier packs have better odds for rare players</li>
              <li>• Legendary players are extremely rare and valuable</li>
              <li>• Check your collection regularly to see your progress</li>
              <li>• Each pack contains exactly 5 player cards</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
