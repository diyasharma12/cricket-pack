import React, { useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import { useStore } from '../store/useStore'

export default function Collection(){
  const coll = useStore(s => s.collection)
  const [filter, setFilter] = useState({ rarity: 'all', role: 'all', q: '' })
  const items = useMemo(() => {
    return Object.values(coll).map(c => ({...c.player, count: c.count}))
      .filter(p => (filter.rarity === 'all' || p.rarity === filter.rarity))
      .filter(p => (filter.role === 'all' || p.role === filter.role))
      .filter(p => p.name.toLowerCase().includes(filter.q.toLowerCase()))
  }, [coll, filter])

  return (
    <div className="min-h-screen bg-gradient-to-br from-fifa-black via-fifa-royal-blue-dark to-fifa-royal-blue">
      <Navbar/>
      <main className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img src="/logo.png" alt="Logo" className="w-16 h-16 animate-pulse-glow" />
          </div>
          <p className="text-xl text-fifa-royal-blue-light">
            Manage and view your cricket player collection
          </p>
        </div>

        {/* Filters */}
        <div className="bg-gradient-to-r from-fifa-royal-blue/30 to-fifa-black/50 backdrop-blur-sm rounded-2xl p-6 border border-fifa-gold/30 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1">
              <label className="block text-sm font-medium text-fifa-royal-blue-light mb-2">Search Players</label>
              <input 
                placeholder="Search by name..." 
                value={filter.q} 
                onChange={e=>setFilter(f=>({...f,q:e.target.value}))} 
                className="w-full bg-fifa-black/60 border border-fifa-gold/30 rounded-lg px-4 py-2 text-fifa-white placeholder-fifa-royal-blue-light focus:outline-none focus:ring-2 focus:ring-fifa-gold focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-fifa-royal-blue-light mb-2">Rarity</label>
              <select 
                value={filter.rarity} 
                onChange={e=>setFilter(f=>({...f,rarity:e.target.value}))} 
                className="bg-fifa-black/60 border border-fifa-gold/30 rounded-lg px-4 py-2 text-fifa-white focus:outline-none focus:ring-2 focus:ring-fifa-gold focus:border-transparent"
              >
                <option value="all">All Rarities</option>
                <option value="common">Common</option>
                <option value="rare">Rare</option>
                <option value="epic">Epic</option>
                <option value="legend">Legend</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-fifa-royal-blue-light mb-2">Role</label>
              <select 
                value={filter.role} 
                onChange={e=>setFilter(f=>({...f,role:e.target.value}))} 
                className="bg-fifa-black/60 border border-fifa-gold/30 rounded-lg px-4 py-2 text-fifa-white focus:outline-none focus:ring-2 focus:ring-fifa-gold focus:border-transparent"
              >
                <option value="all">All Roles</option>
                <option value="BAT">Batsman</option>
                <option value="BOWL">Bowler</option>
                <option value="AR">All-Rounder</option>
                <option value="WK">Wicket Keeper</option>
              </select>
            </div>
          </div>
        </div>

        {/* Collection Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-fifa-royal-blue/30 to-fifa-black/50 backdrop-blur-sm rounded-xl p-4 border border-fifa-gold/30 text-center hover:border-fifa-gold/50 transition-all duration-300 hover:scale-105 animate-slide-up">
            <div className="text-2xl font-bold text-fifa-gold">{items.length}</div>
            <div className="text-sm text-fifa-royal-blue-light">Unique Players</div>
          </div>
          <div className="bg-gradient-to-br from-fifa-royal-blue/30 to-fifa-black/50 backdrop-blur-sm rounded-xl p-4 border border-fifa-gold/30 text-center hover:border-fifa-gold/50 transition-all duration-300 hover:scale-105 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="text-2xl font-bold text-fifa-gold">{items.reduce((sum, p) => sum + p.count, 0)}</div>
            <div className="text-sm text-fifa-royal-blue-light">Total Cards</div>
          </div>
          <div className="bg-gradient-to-br from-fifa-royal-blue/30 to-fifa-black/50 backdrop-blur-sm rounded-xl p-4 border border-fifa-gold/30 text-center hover:border-fifa-gold/50 transition-all duration-300 hover:scale-105 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="text-2xl font-bold text-fifa-gold">{items.filter(p => p.rarity === 'legend').length}</div>
            <div className="text-sm text-fifa-royal-blue-light">Legendary</div>
          </div>
          <div className="bg-gradient-to-br from-fifa-royal-blue/30 to-fifa-black/50 backdrop-blur-sm rounded-xl p-4 border border-fifa-gold/30 text-center hover:border-fifa-gold/50 transition-all duration-300 hover:scale-105 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="text-2xl font-bold text-fifa-gold">{items.filter(p => p.rarity === 'epic').length}</div>
            <div className="text-sm text-fifa-royal-blue-light">Epic</div>
          </div>
        </div>

        {/* Player Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {items.map((p, index) => (
            <div key={p.id} className="relative rounded-xl p-4 border border-fifa-gold/30 hover:border-fifa-gold/50 transition-all duration-200 hover:scale-105 animate-slide-up overflow-hidden" style={{ animationDelay: `${index * 0.1}s` }}>
              {/* Background Frame */}
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <img 
                  src="/background.png" 
                  alt="Card Frame" 
                  className="w-full h-full object-cover opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-fifa-royal-blue/30 to-fifa-black/50 backdrop-blur-sm rounded-xl"></div>
              </div>
              
              <div className="relative z-10">
                <div className="relative mb-3">
                  <img 
                    src={`/${p.photo}`} 
                    alt={p.name} 
                    className="w-full h-48 object-cover object-top rounded-lg shadow-lg"
                  />
                  <div className="absolute top-2 right-2 bg-fifa-black/70 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-fifa-white">
                    {p.count}x
                  </div>
                  <div className={`absolute top-2 left-2 px-2 py-1 rounded-lg text-xs font-bold uppercase ${
                    p.rarity === 'legend' ? 'bg-fifa-gold text-fifa-black' :
                    p.rarity === 'epic' ? 'bg-purple-500 text-fifa-white' :
                    p.rarity === 'rare' ? 'bg-fifa-royal-blue-light text-fifa-white' :
                    'bg-slate-500 text-fifa-white'
                  }`}>
                    {p.rarity}
                  </div>
                </div>
                <div>
                  <div className="font-bold text-fifa-white text-lg mb-1">{p.name}</div>
                  <div className="text-sm text-fifa-royal-blue-light mb-2">{p.role} • {p.team}</div>
                  <div className="text-xs text-fifa-royal-blue-light">Rating: {p.rating}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <div className="text-2xl font-bold text-fifa-royal-blue-light mb-2">No players found</div>
            <div className="text-fifa-royal-blue-light">Try adjusting your filters or open some packs!</div>
          </div>
        )}
      </main>
    </div>
  )
}
