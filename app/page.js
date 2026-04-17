"use client";
import React from 'react';
import Link from 'next/link';
import { Rocket, Sparkles, Zap, Shield, Globe, Cpu, Smartphone, Layout, ArrowRight, Star, Heart } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500/30 overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-pink-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-[30%] left-[20%] w-[20vw] h-[20vw] bg-blue-600/5 rounded-full blur-[100px]"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-lg flex items-center justify-center font-black text-white italic">KL</div>
            <span className="text-xl font-black tracking-tighter">RESUME</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-zinc-400">
            <Link href="/showcase" className="hover:text-white transition-colors">Showcase</Link>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
          </div>
          <Link href="/editor" className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-black hover:bg-zinc-200 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            CREATE NOW
          </Link>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black tracking-[0.2em] mb-8 text-purple-400 uppercase">
              <Sparkles className="w-3 h-3" /> The Gen-Z Portfolio Engine
            </div>
            <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter leading-none mb-8 bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent uppercase">
              Build your digital <br /> legacy in <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text">60 seconds.</span>
            </h1>
            <p className="max-w-2xl text-zinc-400 text-lg md:text-xl font-medium leading-relaxed mb-12">
              Transform your career narrative into a stunning, interactive one-page portfolio. Tailored for Kerala's youth, designed for the global stage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/editor" className="group bg-gradient-to-r from-purple-600 to-pink-600 p-[1px] rounded-2xl overflow-hidden active:scale-95 transition-transform">
                <div className="bg-black group-hover:bg-transparent px-10 py-5 rounded-[15px] flex items-center justify-center gap-2 font-black text-xl transition-all">
                  CLAIM YOUR URL <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              <div className="flex items-center gap-4 px-8 py-5 text-zinc-500 font-bold">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center text-[10px] font-black italic uppercase">
                      User_{i}
                    </div>
                  ))}
                </div>
                <span>Join 5,000+ creators</span>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Showcase Image */}
        <section className="px-6 mb-32">
          <Link href="/showcase" className="max-w-6xl mx-auto rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl relative group block">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-20"></div>
            <img
              src="/images/landing_hero_mockup.png"
              alt="Portfolio Themes Showcase"
              className="w-full h-auto transform group-hover:scale-105 transition-transform duration-[2s]"
            />
            <div className="absolute bottom-12 left-12 z-30 flex flex-wrap gap-4">
              {['View All Themes', 'Bento Grid', 'Cyber HUD', 'Hacker Terminal'].map(tag => (
                <span key={tag} className="px-4 py-2 bg-black/40 backdrop-blur-md border border-white/20 rounded-full text-xs font-black uppercase tracking-widest">{tag}</span>
              ))}
            </div>
          </Link>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-32 px-6 bg-zinc-950/50 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/5 border border-white/5 p-12 rounded-[2.5rem] hover:border-purple-500/30 transition-all group">
                <Zap className="w-12 h-12 text-purple-500 mb-8 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-black mb-4 uppercase">Insta-Ready</h3>
                <p className="text-zinc-500 font-medium leading-relaxed">Perfectly optimized for mobile. Share your unique link in your Instagram bio or WhatsApp about.</p>
              </div>
              <div className="bg-white/5 border border-white/5 p-12 rounded-[2.5rem] hover:border-pink-500/30 transition-all group">
                <Smartphone className="w-12 h-12 text-pink-500 mb-8 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-black mb-4 uppercase">Mobile First</h3>
                <p className="text-zinc-500 font-medium leading-relaxed">Built for the thumb. Every theme is designed to look premium on small screens first.</p>
              </div>
              <div className="bg-white/5 border border-white/5 p-12 rounded-[2.5rem] hover:border-blue-500/30 transition-all group">
                <Cpu className="w-12 h-12 text-blue-500 mb-8 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-black mb-4 uppercase">No Code</h3>
                <p className="text-zinc-500 font-medium leading-relaxed">Zero technical skills required. Just pick a theme, fill your data, and hit deploy.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div>
              <span className="text-4xl md:text-6xl font-black block mb-2 tracking-tighter italic">10+</span>
              <span className="text-xs font-black text-zinc-500 uppercase tracking-[0.3em]">Themes</span>
            </div>
            <div>
              <span className="text-4xl md:text-6xl font-black block mb-2 tracking-tighter italic">5K+</span>
              <span className="text-xs font-black text-zinc-500 uppercase tracking-[0.3em]">Signups</span>
            </div>
            <div>
              <span className="text-4xl md:text-6xl font-black block mb-2 tracking-tighter italic">100%</span>
              <span className="text-xs font-black text-zinc-500 uppercase tracking-[0.3em]">Free</span>
            </div>
            <div>
              <span className="text-4xl md:text-6xl font-black block mb-2 tracking-tighter italic">24/7</span>
              <span className="text-xs font-black text-zinc-500 uppercase tracking-[0.3em]">Support</span>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto bg-gradient-to-tr from-purple-600 to-pink-600 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-0 transition-opacity"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter leading-none mb-12 uppercase">Ready to start <br /> your journey?</h2>
              <Link href="/editor" className="inline-flex items-center gap-3 bg-white text-black px-12 py-6 rounded-2xl font-black text-2xl hover:bg-zinc-200 transition-all active:scale-95">
                GET STARTED <Rocket className="w-8 h-8" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center font-black text-black text-[10px] italic">KL</div>
              <span className="text-lg font-black tracking-tighter">RESUME</span>
            </div>
            <p className="text-zinc-500 text-sm font-bold">The #1 Portfolio Engine for Kerala's Creators.</p>
          </div>
          <div className="flex gap-8 text-xs font-black text-zinc-500 tracking-widest uppercase">
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/showcase" className="hover:text-white transition-colors">Themes</Link>
            <Link href="/editor" className="hover:text-white transition-colors">Editor</Link>
          </div>
          <div className="flex items-center gap-2 text-zinc-500 font-bold text-sm">
            Made with <Heart className="w-4 h-4 text-pink-500 fill-pink-500" /> in Kerala
          </div>
        </div>
      </footer>
    </div>
  );
}
