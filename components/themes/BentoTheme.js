import React from 'react';
import { Mail, MessageCircle, MapPin, ExternalLink } from 'lucide-react';
import { SocialIcon } from '../SocialIcon';

export default function BentoTheme({ data }) {
  const { portfolio } = data;

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans pb-10 relative overflow-x-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[-10%] w-[100%] md:w-[50%] h-[50%] rounded-full bg-purple-600/10 blur-[100px]"></div>
        <div className="absolute bottom-[-5%] right-[-10%] w-[100%] md:w-[50%] h-[50%] rounded-full bg-pink-600/10 blur-[100px]"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 md:pt-20 relative z-10">
        
        {/* Header Bento */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="md:col-span-3 bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left transition-all hover:border-purple-500/30">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 p-1 shrink-0 shadow-lg">
              <div className="w-full h-full rounded-full bg-zinc-900 border-2 border-zinc-800 overflow-hidden flex justify-center items-center">
                {data.image ? <img src={data.image} className="w-full h-full object-cover" alt={data.name} /> : <span className="text-zinc-600 font-bold text-xs">No Image</span>}
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">{data.name}</h1>
              <div className="flex flex-wrap items-center gap-3 mb-4 justify-center md:justify-start">
                <p className="text-purple-400 text-base md:text-lg font-bold">@{data.username}</p>
                {portfolio?.location && (
                  <div className="flex items-center gap-1 text-zinc-500 text-xs md:text-sm font-bold bg-zinc-800/50 px-3 py-1 rounded-full border border-zinc-700/50">
                    <MapPin className="w-3 h-3" /> {portfolio.location}
                  </div>
                )}
              </div>
              {portfolio?.malayalamTagline && (
                <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-2xl text-zinc-300 text-xs md:text-sm font-semibold italic">
                  "{portfolio.malayalamTagline}"
                </div>
              )}
            </div>
          </div>

          <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-3xl p-6 shadow-2xl flex flex-col items-center justify-center hover:border-pink-500/30 transition-all">
             <div className="grid grid-cols-3 md:grid-cols-2 gap-3 w-full">
              {portfolio?.socialLinks?.slice(0, 4).map((link, idx) => (
                <a key={idx} href={link.url} target="_blank" className="flex items-center justify-center aspect-square bg-zinc-800/50 hover:bg-zinc-700/80 rounded-2xl transition-all border border-zinc-700/50 group">
                  <SocialIcon platform={link.platform} className="w-5 h-5 md:w-6 md:h-6 text-zinc-400 group-hover:text-white group-hover:scale-110 transition-all" />
                </a>
              ))}
              {portfolio?.socialLinks?.length > 4 && (
                <div className="flex items-center justify-center aspect-square bg-zinc-800/30 rounded-2xl text-xs font-bold text-zinc-500">
                  +{portfolio.socialLinks.length - 4}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bio & Skills */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          <div className="md:col-span-3 bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-3xl p-6 md:p-8 flex flex-col hover:border-white/10 transition-all">
            <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span> Bio
            </h3>
            <p className="text-base md:text-xl leading-relaxed font-medium opacity-90 text-zinc-300">{portfolio?.bio}</p>
            
            {(portfolio?.contactEmail || portfolio?.whatsapp) && (
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                {portfolio.contactEmail && (
                  <a href={`mailto:${portfolio.contactEmail}`} className="flex-1 bg-white hover:bg-zinc-200 text-black font-black py-3 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95">
                    <Mail className="w-4 h-4" /> Email
                  </a>
                )}
                {portfolio.whatsapp && (
                  <a href={`https://wa.me/${portfolio.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" className="flex-1 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 font-black py-3 px-6 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#25D366]/20 transition-all active:scale-95">
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </a>
                )}
              </div>
            )}
          </div>
          
          <div className="md:col-span-2 bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-3xl p-6 md:p-8 hover:border-white/10 transition-all">
            <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pink-500"></span> Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {portfolio?.skills?.map((skill, index) => (
                <span key={index} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs md:text-sm font-bold text-zinc-300 hover:bg-white/10 transition-all">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Projects */}
        {portfolio?.projects?.length > 0 && (
          <div className="mb-10">
            <div className="flex justify-between items-center px-2 mb-6">
              <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Projects
              </h3>
              <ExternalLink className="w-4 h-4 text-zinc-500" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {portfolio.projects.map((project, idx) => (
                <a key={idx} href={project.link || '#'} target="_blank" className="group bg-zinc-900/50 backdrop-blur-md border border-zinc-800 hover:border-purple-500/50 rounded-[2rem] p-4 md:p-5 transition-all block relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all">
                    <ExternalLink className="w-4 h-4 text-purple-400" />
                  </div>
                  {project.image && (
                    <div className="w-full bg-black rounded-2xl mb-4 overflow-hidden border border-zinc-800/50 aspect-video md:aspect-[16/10]">
                      <img src={project.image} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-70 group-hover:opacity-100" />
                    </div>
                  )}
                  <h4 className="text-xl font-black mb-2 group-hover:text-purple-400 transition-all text-zinc-100">{project.title}</h4>
                  <p className="text-xs md:text-sm leading-relaxed opacity-60 group-hover:opacity-90 text-zinc-400 line-clamp-2 md:line-clamp-none">{project.description}</p>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
