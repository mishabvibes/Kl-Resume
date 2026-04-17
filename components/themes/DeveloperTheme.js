import React from 'react';
import { Mail, MessageCircle, MapPin, ExternalLink, ArrowUpRight, Github, BookOpen, Star, GitBranch, Layers } from 'lucide-react';
import { SocialIcon } from '../SocialIcon';

export default function DeveloperTheme({ data }) {
  const { portfolio } = data;

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans pb-20 selection:bg-[#58a6ff66] overflow-x-hidden">
      
      {/* GitHub Style Top Nav Mock */}
      <div className="w-full bg-[#161b22] border-b border-[#30363d] py-3 px-4 md:px-8 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3 md:gap-4">
          <Github className="w-6 h-6 md:w-8 md:h-8 text-white" />
          <nav className="hidden md:flex items-center gap-4 text-sm font-semibold text-white">
            <span className="hover:text-[#8b949e] cursor-pointer transition-colors">Product</span>
            <span className="hover:text-[#8b949e] cursor-pointer transition-colors">Solutions</span>
            <span className="hover:text-[#8b949e] cursor-pointer transition-colors">Open Source</span>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#30363d] border border-[#444c56]"></div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-8 pt-8 flex flex-col md:flex-row gap-4 md:gap-8">
        
        {/* Left Sidebar (Profile Info) */}
        <div className="w-full md:w-[296px] shrink-0">
          <div className="relative mb-6 flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0">
            <div className="relative group">
               <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-full md:h-auto md:aspect-square rounded-full md:rounded-lg border border-[#30363d] overflow-hidden shadow-2xl relative z-10 transition-transform hover:scale-[1.01]">
                {data.image ? (
                  <img src={data.image} alt={data.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-[#21262d] flex items-center justify-center text-[#8b949e] text-xs font-bold">404_AVATAR</div>
                )}
              </div>
              <div className="absolute bottom-0 right-0 md:bottom-4 md:right-[-12px] bg-[#0d1117] border border-[#30363d] p-1.5 rounded-full z-20 shadow-xl hidden sm:block">
                <span className="text-sm">⚡</span>
              </div>
            </div>
            
            <div className="md:mt-4 text-left">
              <h1 className="text-xl md:text-2xl font-bold text-[#c9d1d9] leading-tight">{data.name}</h1>
              <p className="text-lg md:text-xl text-[#8b949e] font-light mb-0 md:mb-4">{data.username}</p>
            </div>
          </div>

          <p className="text-[#c9d1d9] text-base leading-relaxed mb-6 px-1">{portfolio?.bio}</p>

          <div className="flex flex-col gap-2 mb-6">
            {portfolio?.contactEmail && (
              <a href={`mailto:${portfolio.contactEmail}`} className="w-full bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-[#c9d1d9] font-semibold py-2 px-4 rounded-md transition text-center text-sm shadow-sm active:bg-[#282e37]">
                Connect via Email
              </a>
            )}
            {portfolio?.whatsapp && (
              <a href={`https://wa.me/${portfolio.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" className="w-full bg-[#238636] hover:bg-[#2ea043] text-white font-semibold py-2 px-4 rounded-md transition text-center text-sm shadow-sm flex items-center justify-center gap-2 active:bg-[#2a913d]">
                 <MessageCircle className="w-4 h-4 text-white/80" /> WhatsApp Ping
              </a>
            )}
          </div>

          <div className="space-y-3 mb-8 pt-4 border-t border-[#30363d]">
             {portfolio?.malayalamTagline && (
              <div className="flex items-center gap-2 text-[#c9d1d9] text-sm">
                <BookOpen className="w-4 h-4 text-[#8b949e]" /> <span className="italic">"{portfolio.malayalamTagline}"</span>
              </div>
            )}
            {portfolio?.location && (
              <div className="flex items-center gap-2 text-[#c9d1d9] text-sm">
                <MapPin className="w-4 h-4 text-[#8b949e]" /> {portfolio.location}
              </div>
            )}
            <div className="flex items-center gap-2 text-[#c9d1d9] text-sm">
               <Layers className="w-4 h-4 text-[#8b949e]" /> <span className="font-semibold text-[#58a6ff]">View Analytics</span>
            </div>
          </div>

          <div className="mb-8 hidden md:block">
            <h3 className="text-sm font-semibold text-[#8b949e] mb-3">Links</h3>
            <div className="flex flex-col gap-2">
              {portfolio?.socialLinks?.map((link, idx) => (
                <a key={idx} href={link.url} target="_blank" className="flex items-center gap-2 text-[#58a6ff] hover:underline text-sm font-semibold group">
                  <ExternalLink className="w-4 h-4 text-[#8b949e] group-hover:text-[#58a6ff] transition-colors" /> {link.platform}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          
          {/* Tabs - Now more responsive */}
          <div className="w-full border-b border-[#30363d] mb-6 flex overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 px-4 py-3 border-b-2 border-[#f78166] text-[#c9d1d9] font-semibold text-sm cursor-pointer whitespace-nowrap">
              <BookOpen className="w-4 h-4 text-[#8b949e]" /> Overview
            </div>
            <div className="flex items-center gap-2 px-4 py-3 text-[#c9d1d9] hover:bg-[#21262d] rounded-t-md cursor-pointer transition text-sm whitespace-nowrap opacity-60">
              <Github className="w-4 h-4 text-[#8b949e]" /> Repositories <span className="bg-[#30363d] text-[#c9d1d9] text-xs px-2 py-0.5 rounded-full">{portfolio?.projects?.length || 0}</span>
            </div>
          </div>

          <div className="mb-8 border border-[#30363d] rounded-md overflow-hidden bg-[#0d1117]">
            <div className="bg-[#161b22] px-4 py-2 border-b border-[#30363d] flex items-center justify-between">
               <div className="flex items-center gap-2 text-xs font-semibold text-[#8b949e]">
                 <span className="text-[#c9d1d9]">{data.username}</span> / README.md
               </div>
               <ExternalLink className="w-3 h-3 text-[#8b949e]" />
            </div>
            <div className="p-4 md:p-6 text-[#c9d1d9]">
              <h2 className="text-base md:text-xl border-b border-[#30363d] pb-2 font-semibold mb-4 flex items-center gap-2 uppercase tracking-wide">
                <Layers className="w-5 h-5 text-[#f78166]" /> Expert Stacks
              </h2>
              <div className="flex flex-wrap gap-2">
                {portfolio?.skills?.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-[#21262d] border border-[#30363d] rounded-full text-xs font-semibold text-[#58a6ff] hover:border-[#58a6ff] transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <h3 className="text-base font-semibold text-[#c9d1d9] mb-4 flex items-center justify-between lg:px-1">
             <span>Pinned Projects</span>
             <span className="text-xs text-[#8b949e] font-normal hover:text-[#58a6ff] cursor-pointer">Customize your pins</span>
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {portfolio?.projects?.map((project, idx) => (
              <div key={idx} className="border border-[#30363d] rounded-md p-4 bg-[#0d1117] flex flex-col h-full hover:border-[#8b949e] transition shadow-sm group">
                <div className="flex items-center gap-2 mb-3">
                  <Github className="w-4 h-4 text-[#8b949e]" />
                  <a href={project.link || '#'} target="_blank" className="font-semibold text-[#58a6ff] hover:underline whitespace-nowrap overflow-hidden text-ellipsis text-sm md:text-base">
                    {project.title}
                  </a>
                  <span className="ml-auto border border-[#30363d] rounded-full px-2 py-0.5 text-[10px] text-[#8b949e] font-bold uppercase tracking-tight">Public</span>
                </div>
                
                {project.image && (
                  <div className="w-full relative aspect-video overflow-hidden rounded-md border border-[#30363d] mb-4 bg-black">
                    <img src={project.image} alt="" className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                       <p className="text-[10px] text-white font-black flex items-center gap-2">DEPLOYED_APP <ArrowUpRight className="w-3 h-3 text-[#58a6ff]" /></p>
                    </div>
                  </div>
                )}
                
                <p className="text-[#8b949e] text-xs leading-relaxed mb-6 flex-1 line-clamp-3 font-medium">{project.description}</p>
                
                <div className="flex items-center gap-6 text-[10px] md:text-xs text-[#8b949e] mt-auto font-bold tracking-tight">
                  <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#f1e05a]"></span> JS_CORE</div>
                  <div className="flex items-center gap-1.5 hover:text-[#58a6ff] cursor-pointer transition-colors"><Star className="w-4 h-4" /> 1.{idx + 4}k</div>
                  <div className="flex items-center gap-1.5 hover:text-[#58a6ff] cursor-pointer transition-colors"><GitBranch className="w-4 h-4" /> {idx * 2 + 10}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
