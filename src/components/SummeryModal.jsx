import React from 'react'

export default function SummaryModal({items, onClose, onGoCollection}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-slate-900 p-6 rounded-2xl w-full max-w-2xl">
        <h3 className="text-xl font-bold">Pack Opened</h3>
        <p className="mt-2 text-sm opacity-80">You got:</p>
        <div className="mt-4 grid grid-cols-5 gap-3">
          {items.map(it => (
            <div key={it.id} className="p-2 rounded bg-slate-800">
              <img src={`/${it.photo}`} alt="" className="h-16 w-full object-cover"/>
              <div className="text-xs mt-1">{it.name}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-3 justify-end">
          <button className="px-4 py-2 bg-white/10 rounded" onClick={onClose}>Close</button>
          <button className="px-4 py-2 bg-yellow-500 rounded" onClick={onGoCollection}>View Collection</button>
        </div>
      </div>
    </div>
  )
}
