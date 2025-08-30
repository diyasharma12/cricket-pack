import { create } from "zustand";
import { persist } from 'zustand/middleware'
import { PACKS } from '../utils/rng'

const rarityValue = { common: 1, rare: 5, epic: 20, legend: 100 }
const rarityMultiplier = { common: 1, rare: 2, epic: 5, legend: 10 }

export const useStore = create(persist((set,get) => ({
  credits: 5000,             // in-game currency
  collection: {
    // Demo players to show the collection working - all 10 players
    'p1': { player: {id:'p1',name:'Virat Kohli',role:'BAT',team:'India',rating:95,rarity:'legend',stats:{runs:12345,avg:58.2,sr:92.5,matches:254},photo:'p1.png'}, count: 1 },
    'p2': { player: {id:'p2',name:'Jasprit Bumrah',role:'BOWL',team:'India',rating:92,rarity:'legend',stats:{wickets:128,avg:22.1,eco:4.6,matches:72},photo:'p2.png'}, count: 1 },
    'p3': { player: {id:'p3',name:'Rohit Sharma',role:'BAT',team:'India',rating:89,rarity:'epic',stats:{runs:9200,avg:49.2,sr:88.9,matches:243},photo:'p3.png'}, count: 2 },
    'p4': { player: {id:'p4',name:'Ravindra Jadeja',role:'AR',team:'India',rating:87,rarity:'epic',stats:{runs:2500,wickets:220,avg:35.2,matches:168},photo:'p4.png'}, count: 1 },
    'p5': { player: {id:'p5',name:'KL Rahul',role:'BAT',team:'India',rating:84,rarity:'rare',stats:{runs:2000,avg:45.5,sr:85.2,matches:72},photo:'p5.png'}, count: 1 },
    'p6': { player: {id:'p6',name:'Babar Azam',role:'BAT',team:'Pakistan',rating:91,rarity:'legend',stats:{runs:3480,avg:56.1,sr:89.2,matches:92},photo:'p6.png'}, count: 1 },
    'p7': { player: {id:'p7',name:'Shaheen Afridi',role:'BOWL',team:'Pakistan',rating:88,rarity:'epic',stats:{wickets:76,avg:24.1,eco:4.8,matches:36},photo:'p7.png'}, count: 1 },
    'p8': { player: {id:'p8',name:'Mohammad Rizwan',role:'WK',team:'Pakistan',rating:85,rarity:'epic',stats:{runs:1200,catches:28,stumpings:8,matches:59},photo:'p8.png'}, count: 1 },
    'p9': { player: {id:'p9',name:'Steve Smith',role:'BAT',team:'Australia',rating:93,rarity:'legend',stats:{runs:4800,avg:60.0,sr:85.2,matches:142},photo:'p9.png'}, count: 1 },
    'p10': { player: {id:'p10',name:'Pat Cummins',role:'BOWL',team:'Australia',rating:90,rarity:'epic',stats:{wickets:190,avg:22.5,eco:4.9,matches:85},photo:'p10.png'}, count: 1 },
  },            // { playerId: { player, count } }
  scrap: 0,                  // conversion for duplicates
  audioMuted: false,
  packsOpened: 0,            // total packs opened
  legendaryPulls: 0,         // legendary cards pulled
  lastPackResults: [],       // results from last pack opening
  
  addCredits: (amt) => set(state => ({ credits: state.credits + amt })),
  toggleAudio: () => set(state => ({ audioMuted: !get().audioMuted })),
  
  addToCollection: (player) => set(state => {
    const coll = {...get().collection}
    if (coll[player.id]) {
      // duplicate: increase count & give scrap
      coll[player.id].count += 1
      const bonus = rarityValue[player.rarity] || 1
      return { collection: coll, scrap: get().scrap + bonus }
    } else {
      coll[player.id] = { player, count: 1 }
      return { collection: coll }
    }
  }),
  
  addPackResults: (results) => set(state => {
    const legendaryCount = results.filter(p => p.rarity === 'legend').length
    return { 
      lastPackResults: results,
      packsOpened: get().packsOpened + 1,
      legendaryPulls: get().legendaryPulls + legendaryCount
    }
  }),
  
  spendCredits: (amt) => set(state => {
    if (get().credits >= amt) return { credits: get().credits - amt }
    return { }
  }),
  
  // Convert scrap to credits
  convertScrapToCredits: (scrapAmount) => set(state => {
    if (get().scrap >= scrapAmount) {
      const credits = Math.floor(scrapAmount * 0.5) // 2 scrap = 1 credit
      return { 
        scrap: get().scrap - scrapAmount,
        credits: get().credits + credits
      }
    }
    return {}
  }),
  
  // Upgrade player (convert duplicates to better version)
  upgradePlayer: (playerId) => set(state => {
    const coll = {...get().collection}
    const player = coll[playerId]
    if (player && player.count >= 3) {
      // Remove 3 copies and give bonus scrap
      coll[playerId].count -= 3
      const bonus = rarityValue[player.player.rarity] * 5
      return { 
        collection: coll, 
        scrap: get().scrap + bonus 
      }
    }
    return {}
  }),
  
  // Get collection statistics
  getCollectionStats: () => {
    const state = get()
    const collection = state.collection
    const totalCards = Object.values(collection).reduce((sum, item) => sum + item.count, 0)
    const uniquePlayers = Object.keys(collection).length
    const legendaryCount = Object.values(collection).filter(item => item.player.rarity === 'legend').length
    const epicCount = Object.values(collection).filter(item => item.player.rarity === 'epic').length
    
    return {
      totalCards,
      uniquePlayers,
      legendaryCount,
      epicCount,
      scrap: state.scrap,
      credits: state.credits,
      packsOpened: state.packsOpened,
      legendaryPulls: state.legendaryPulls
    }
  },
  
  clearCollection: () => set({ collection: {}, scrap: 0, packsOpened: 0, legendaryPulls: 0 })
}), { name: 'cricket-pack-store' }))
