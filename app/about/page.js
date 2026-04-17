"use client";
import React from 'react';
import Link from 'next/link';
import { Heart, Shield, Zap, Target, Users, Code, Mail, ArrowLeft } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500/30">
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-pink-600/10 rounded-full blur-[120px]"></div>
      </div>

      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <ArrowLeft className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" />
            <span className="text-xl font-black tracking-tighter">ABOUT <span className="text-purple-500">KL</span></span>
          </Link>
          <Link href="/editor" className="bg-white text-black px-6 py-2 rounded-full text-sm font-black hover:bg-zinc-200 transition-all">
            CREATE NOW
          </Link>
        </div>
      </nav>

      <main className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <header className="mb-20 text-center">
            <h1 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase mb-6 leading-none">
              Empowering the next <br /> generation of <span className="text-purple-500">Kerala's</span> creators.
            </h1>
            <p className="text-xl text-zinc-400 font-medium">
              We built KL RESUME because your standard A4 paper CV doesn't tell your story.
            </p>
          </header>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
             <div className="space-y-6">
                <h2 className="text-3xl font-black uppercase italic tracking-tight flex items-center gap-3 underline decoration-purple-500 underline-offset-8">
                  <Target className="w-8 h-8 text-purple-500" /> Our Mission
                </h2>
                <p className="text-zinc-400 text-lg leading-relaxed">
                  To provide every student and young professional in Kerala with a world-class digital presence. We want to bridge the gap between regional talent and global opportunities by providing high-end design tools that are free and easy to use.
                </p>
             </div>
             <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-[2rem] flex flex-col justify-center">
                <div className="flex gap-4 mb-6">
                   <div className="h-12 w-12 bg-white/5 rounded-2xl flex items-center justify-center text-red-500"><Heart className="w-6 h-6 fill-red-500" /></div>
                   <div className="h-12 w-12 bg-white/5 rounded-2xl flex items-center justify-center text-blue-500"><Code className="w-6 h-6" /></div>
                   <div className="h-12 w-12 bg-white/5 rounded-2xl flex items-center justify-center text-purple-500"><Shield className="w-6 h-6" /></div>
                </div>
                <p className="text-zinc-500 font-bold italic text-sm">
                  "The internet is the new resume. We're just making sure your link is the hardest to ignore."
                </p>
             </div>
          </section>

          <section className="mb-32">
            <h2 className="text-2xl font-black uppercase mb-12 tracking-widest text-center">Core Principles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="p-8 bg-zinc-900/30 border border-zinc-800 rounded-3xl hover:bg-zinc-800/50 transition">
                  <Zap className="w-8 h-8 text-yellow-500 mb-6" />
                  <h3 className="text-xl font-bold mb-2">Speed</h3>
                  <p className="text-sm text-zinc-500 font-medium">Built with Next.js 14 for lightning fast hydration and smooth theme transitions.</p>
               </div>
               <div className="p-8 bg-zinc-900/30 border border-zinc-800 rounded-3xl hover:bg-zinc-800/50 transition">
                  <Shield className="w-8 h-8 text-emerald-500 mb-6" />
                  <h3 className="text-xl font-bold mb-2">Stability</h3>
                  <p className="text-sm text-zinc-500 font-medium">Powered by MongoDB for reliable data persistence across all devices.</p>
               </div>
               <div className="p-8 bg-zinc-900/30 border border-zinc-800 rounded-3xl hover:bg-zinc-800/50 transition">
                  <Users className="w-8 h-8 text-blue-500 mb-6" />
                  <h3 className="text-xl font-bold mb-2">Community</h3>
                  <p className="text-sm text-zinc-500 font-medium">Designed for the unique career paths of developers, artists, and creators.</p>
               </div>
            </div>
          </section>

          <section className="text-center bg-gradient-to-tr from-zinc-900 to-black p-12 md:p-24 rounded-[3rem] border border-zinc-800">
             <h2 className="text-3xl md:text-5xl font-black italic uppercase mb-8">Want to contribute?</h2>
             <p className="text-zinc-500 text-lg mb-12 max-w-xl mx-auto font-medium">
               We are constantly adding new themes and improving the engine. If you're a designer or developer, reach out!
             </p>
             <a href="mailto:hello@klresume.in" className="inline-flex items-center gap-2 text-white font-black hover:text-purple-400 transition underline underline-offset-4 decoration-2">
                <Mail className="w-5 h-5" /> contact@klresume.in
             </a>
          </section>
        </div>
      </main>

      <footer className="py-20 text-center border-t border-white/5">
         <p className="text-zinc-600 font-black text-xs uppercase tracking-[0.5em] mb-4">Made by the Kerala Developer Collective</p>
         <div className="flex justify-center gap-6">
            <Link href="/" className="text-zinc-400 hover:text-white transition text-xs font-black uppercase tracking-widest">Home</Link>
            <Link href="/showcase" className="text-zinc-400 hover:text-white transition text-xs font-black uppercase tracking-widest">Showcase</Link>
            <Link href="/editor" className="text-zinc-400 hover:text-white transition text-xs font-black uppercase tracking-widest italic">Create Site</Link>
         </div>
      </footer>
    </div>
  );
}
