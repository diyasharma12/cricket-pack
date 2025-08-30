import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useStore } from "../store/useStore";

export default function Navbar() {
  const credits = useStore((s) => s.credits);
  const audioMuted = useStore((s) => s.audioMuted);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="w-full pl-8 pr-4 py-4 flex justify-between items-center backdrop-blur-xl border-b border-slate-700/30">
      {/* Navigation Icons */}
      <div className="flex items-center gap-8 pl-16"  >
        <Link to="/" className="flex flex-col items-center group">
          <img
            src="/shop.png"
            alt="Shop"
            className={`transition-all duration-300 ease-in-out group-hover:scale-125 ${
              isActive("/") ? "w-12 h-12" : "w-8 h-8 opacity-80"
            }`}
          />
        </Link>
        <Link to="/collection" className="flex flex-col items-center group">
          <img
            src="/collection.png"
            alt="Collection"
            className={`transition-all duration-300 ease-in-out group-hover:scale-125 ${
              isActive("/collection") ? "w-12 h-12" : "w-8 h-8 opacity-80"
            }`}
          />
        </Link>
        <Link to="/settings" className="flex flex-col items-center group">
          <img
            src="/setting.png"
            alt="Settings"
            className={`transition-all duration-300 ease-in-out group-hover:scale-125 ${
              isActive("/settings") ? "w-12 h-12" : "w-8 h-8 opacity-80"
            }`}
          />
        </Link>
      </div>

      {/* Right section with credits + mute toggle */}
      <div className="flex items-center gap-4">
        {/* Credits */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-slate-800/60 to-slate-700/60 border border-slate-600/40 shadow-lg">
          <img src="/diamond.png" alt="Credits" className="w-5 h-5" />
          <span className="text-cricket-gold font-bold text-lg">
            {credits.toLocaleString()}
          </span>
        </div>

        {/* Mute toggle */}
        <div
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            audioMuted
              ? "bg-red-500/20 text-red-400 border border-red-500/30"
              : "bg-green-500/20 text-green-400 border border-green-500/30"
          }`}
        >
          {audioMuted ? "🔇 Muted" : "🔊 Sound On"}
        </div>
      </div>
    </nav>
  );
}
