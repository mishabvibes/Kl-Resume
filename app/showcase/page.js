"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { THEMES } from '../themes';
import { ArrowLeft, Rocket, Sparkles, Layout, Palette, Code, Eye, Laptop } from 'lucide-react';

export default function ShowcasePage() {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const allTags = ['All', ...new Set(Object.values(THEMES).flatMap(t => t.tags))];
  
  const filteredThemes = Object.entries(THEMES).filter(([key, t]) => 
    activeFilter === 'All' || t.tags.includes(activeFilter)
  );

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500/30">
      {/* Background Blobs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-[20%] left-[-10%] w-[40vw] h-[40vw] bg-purple-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[30vw] h-[30vw] bg-blue-600/20 rounded-full blur-[100px]"></div>
      </div>

      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <ArrowLeft className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" />
            <span className="text-xl font-black tracking-tighter uppercase italic">The Showcase</span>
          </Link>
          <div className="flex gap-4">
             <Link href="/editor" className="hidden md:flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-black uppercase text-xs tracking-widest px-4">
               Start Creating
             </Link>
             <Link href="/editor" className="bg-white text-black text-xs md:text-sm px-3 md:px-6 py-2 rounded-full text-sm font-black hover:bg-zinc-200 transition-all flex items-center gap-2">
               CLONE A THEME
             </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="mb-16 text-center md:text-left">
            <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase mb-6 leading-none">
              Explore your <br /> next <span className="text-purple-500">Aesthetic.</span>
            </h1>
            <p className="text-xl text-zinc-500 font-medium max-w-2xl">
              From brutalist neon HUDs to soft frosted glass canvases. Pick a base that reflects your unique personality and professional drive.
            </p>
          </header>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-12 pb-6 border-b border-white/5">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeFilter === tag 
                  ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.3)]' 
                  : 'bg-zinc-900 text-zinc-500 hover:text-white hover:bg-zinc-800'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Theme Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredThemes.map(([key, t]) => (
              <div key={key} className="group relative bg-zinc-900/40 border border-zinc-800/50 rounded-[2.5rem] overflow-hidden hover:border-white/10 transition-all hover:translate-y-[-4px] flex flex-col">
                {/* Theme Mockup Preview (Simulated with Gradient/Icon) */}
                <div className={`w-full aspect-video p-8 flex items-center justify-center relative overflow-hidden bg-gradient-to-br transition-all duration-700 ${
                  t.color === 'purple' ? 'from-purple-900/40 to-black' :
                  t.color === 'blue' ? 'from-blue-900/40 to-black' :
                  t.color === 'emerald' ? 'from-emerald-900/40 to-black' :
                  t.color === 'indigo' ? 'from-indigo-900/40 to-black' :
                  t.color === 'pink' ? 'from-pink-900/40 to-black' :
                  t.color === 'yellow' ? 'from-yellow-900/40 to-black' :
                  t.color === 'orange' ? 'from-orange-900/40 to-black' :
                  t.color === 'sky' ? 'from-sky-900/40 to-black' :
                  'from-zinc-900 to-black'
                }`}>
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:20px_20px] opacity-30"></div>
                   <div className="w-24 h-24 rounded-full bg-white/5 backdrop-blur-3xl border border-white/10 flex items-center justify-center transition-transform group-hover:scale-110 duration-500">
                      {key === 'terminal-cli' ? <Code className="w-10 h-10 text-white" /> :
                       key === 'bento-grid' ? <Layout className="w-10 h-10 text-white" /> :
                       key === 'aurora-night' ? <Sparkles className="w-10 h-10 text-white" /> :
                       key === 'github-dev' ? <Laptop className="w-10 h-10 text-white" /> :
                       <Palette className="w-10 h-10 text-white" />
                      }
                   </div>
                   <div className="absolute bottom-6 right-6">
                      <div className="flex gap-2">
                        {t.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg text-[8px] font-black uppercase tracking-widest text-zinc-400">{tag}</span>
                        ))}
                      </div>
                   </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-4 group-hover:text-purple-400 transition-colors">{t.name}</h3>
                  <p className="text-zinc-500 text-sm font-medium leading-relaxed mb-8 flex-1">
                    {t.description}
                  </p>
                  <div className="flex gap-4 mt-auto">
                    <Link href={`/editor?theme=${key}`} className="flex-1 bg-white text-black text-center py-4 rounded-xl text-xs font-black uppercase hover:bg-zinc-200 transition-all active:scale-95">
                      CHOOSE THIS
                    </Link>
                    <Link 
                      href={`/editor?theme=${key}&preview=true`} 
                      className="flex items-center justify-center p-4 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition active:scale-95 group/preview"
                    >
                      <Eye className="w-5 h-5 group-hover/preview:scale-110 transition" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-32 p-12 md:p-24 bg-gradient-to-tr from-purple-900/20 to-zinc-900 border border-zinc-800 rounded-[3rem] text-center">
             <h2 className="text-3xl md:text-6xl font-black italic uppercase mb-8">Can't decide?</h2>
             <p className="text-zinc-500 text-lg mb-12 max-w-xl mx-auto font-medium">
               Don't worry. You can switch themes at any point in the editor with a single click. Your data automatically rebuilds for every style.
             </p>
             <Link href="/editor" className="inline-flex items-center gap-3 bg-white text-black px-12 py-6 rounded-2xl font-black text-2xl hover:bg-zinc-200 transition-all active:scale-95">
               GO TO EDITOR <Rocket className="w-8 h-8" />
             </Link>
          </div>
        </div>
      </main>

      <footer className="py-20 text-center border-t border-white/5 relative z-10">
         <div className="flex justify-center gap-12 mb-8">
            <Link href="/" className="text-zinc-500 hover:text-white transition text-[10px] font-black uppercase tracking-[0.3em]">Home</Link>
            <Link href="/about" className="text-zinc-500 hover:text-white transition text-[10px] font-black uppercase tracking-[0.3em]">Our Story</Link>
            <Link href="/editor" className="text-white transition text-[10px] font-black uppercase tracking-[0.3em] italic">Get Started</Link>
         </div>
         <p className="text-zinc-700 font-bold text-xs uppercase">&copy; 2026 KL RESUME PROJECT</p>
      </footer>
    </div>
  );
}
