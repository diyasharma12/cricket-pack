// RNG utilities for pack draws
export const PACKS = {
  bronze: {
    name: 'Bronze',
    price: 100,
    count: 5,
    odds: { common: 70, rare: 25, epic: 4.5, legend: 0.5 }
  },
  silver: {
    name: 'Silver',
    price: 300,
    count: 5,
    odds: { common: 40, rare: 45, epic: 13, legend: 2 }
  },
  gold: {
    name: 'Gold',
    price: 800,
    count: 5,
    odds: { common: 20, rare: 50, epic: 25, legend: 5 }
  }
}

function chooseRarity(odds) {
  const r = Math.random()*100
  let cum = 0
  for (const [tier, pct] of Object.entries(odds)) {
    cum += pct
    if (r <= cum) return tier
  }
  // fallback
  return 'common'
}

export function openPack(packKey, players) {
  const pack = PACKS[packKey]
  if (!pack) throw new Error('Invalid pack')
  const drawn = []
  for (let i=0;i<pack.count;i++){
    const rarity = chooseRarity(pack.odds)
    // filter players by rarity, fallback to common
    const pool = players.filter(p => p.rarity === rarity)
    const poolFallback = pool.length ? pool : players.filter(p => p.rarity === 'common')
    const pick = poolFallback[Math.floor(Math.random()*poolFallback.length)]
    drawn.push({...pick})
  }
  return drawn
}
