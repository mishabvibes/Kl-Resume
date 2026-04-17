import React from 'react';
import { SocialIcon } from '../SocialIcon';

export default function TerminalTheme({ data }) {
  const { portfolio } = data;
  const date = new Date().toDateString();

  return (
    <div className="min-h-screen bg-[#050505] text-[#33ff00] font-mono p-2 md:p-8 pb-20 selection:bg-[#33ff00] selection:text-black">
      <div className="max-w-4xl mx-auto border border-[#33ff00]/50 p-1 bg-black shadow-[0_0_40px_rgba(51,255,0,0.15)] rounded-lg overflow-hidden">
        
        {/* Terminal Header */}
        <div className="bg-[#1a1a1a] border-b border-[#33ff00]/30 p-2 md:p-3 text-[10px] md:text-xs flex justify-between items-center">
          <div className="flex gap-1.5 md:gap-2">
            <span className="w-2.5 h-2.5 md:w-3 md:h-3 bg-[#ff5f56] rounded-full shadow-[0_0_5px_rgba(255,95,86,0.5)]"></span>
            <span className="w-2.5 h-2.5 md:w-3 md:h-3 bg-[#ffbd2e] rounded-full shadow-[0_0_5px_rgba(255,189,46,0.5)]"></span>
            <span className="w-2.5 h-2.5 md:w-3 md:h-3 bg-[#27c93f] rounded-full shadow-[0_0_5px_rgba(39,201,63,0.5)]"></span>
          </div>
          <span className="uppercase opacity-70 font-bold tracking-widest truncate ml-4">TERMINAL -- root@{data.username || "user"} -- bash</span>
        </div>

        <div className="p-4 md:p-10">
          <p className="mb-8 opacity-50 text-[10px] md:text-xs leading-relaxed">
            SYSTEM VERSION: 2.0.4-LTS (KERALA_NODE_CLUSTER)<br />
            LAST LOGIN: {date} FROM 127.0.0.1
          </p>
          
          {/* Section: Whoami */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-white opacity-80 shrink-0">user@{data.username || "user"}:~$</span>
              <span className="font-bold text-[#33ff00] animate-pulse">whoami --verbose</span>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 pl-2 md:pl-6 border-l border-[#33ff00]/20">
              {data.image && (
                <div className="w-24 h-24 md:w-32 md:h-32 border border-[#33ff00]/50 p-1 shrink-0 bg-black relative group self-center md:self-start">
                   <div className="absolute inset-0 bg-[#33ff00]/10 mix-blend-overlay group-hover:opacity-0 transition-opacity"></div>
                   <img src={data.image} alt="avatar" className="w-full h-full object-cover filter grayscale sepia-[0.3] contrast-125" />
                   <div className="absolute bottom-0 right-0 p-1 bg-[#33ff00] text-black text-[8px] font-bold">UID: 007</div>
                </div>
              )}
              <div className="text-center md:text-left">
                <h1 className="text-2xl md:text-4xl font-black mb-2 uppercase tracking-tight text-white shadow-[0_2px_10px_rgba(51,255,0,0.1)]">{data.name}</h1>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] md:text-xs mb-6 justify-center md:justify-start">
                  <span className="text-white font-bold">&gt; ROLE: <span className="text-[#33ff00]">FULLSTACK_ENGINEER</span></span>
                  {portfolio?.location && <span className="text-white font-bold">&gt; LOC: <span className="text-[#33ff00]">{portfolio.location}</span></span>}
                </div>
                {portfolio?.malayalamTagline && <p className="text-[#33ff00]/70 mb-4 text-xs md:text-sm italic font-bold">/* {portfolio.malayalamTagline} */</p>}
                <p className="text-xs md:text-base leading-relaxed max-w-xl text-white/90 border-t border-[#33ff00]/10 pt-4">{portfolio?.bio}</p>
              </div>
            </div>
          </div>

          {/* Section: Skills */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-white opacity-80">user@{data.username || "user"}:~$</span>
              <span className="font-bold text-[#33ff00]">ls -la bin/stack/</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pl-2 md:pl-6">
              {portfolio?.skills?.map((skill, index) => (
                <div key={index} className="flex items-center gap-2 group cursor-default">
                  <span className="text-xs text-white opacity-40 group-hover:text-[#33ff00] transition-colors">-rwxr-xr-x</span>
                  <span className="text-xs md:text-sm text-white font-bold group-hover:text-[#33ff00] transition-colors">{skill}.dll</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Projects */}
          {portfolio?.projects?.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-8">
                <span className="text-white opacity-80">user@{data.username || "user"}:~$</span>
                <span className="font-bold text-[#33ff00]">cat var/www/projects.md</span>
              </div>
              <div className="pl-2 md:pl-6 flex flex-col gap-8">
                {portfolio.projects.map((project, idx) => (
                  <div key={idx} className="border border-[#33ff00]/20 p-4 md:p-6 hover:bg-[#33ff00]/5 transition-all relative group overflow-hidden">
                    <div className="absolute top-0 right-0 px-2 py-1 bg-[#33ff00]/10 text-[8px] md:text-[10px] text-white/50 group-hover:text-[#33ff00] transition-colors">PROJECT_BLOCK_0{idx + 1}</div>
                    <h4 className="text-lg md:text-2xl font-black mb-3 text-white uppercase group-hover:translate-x-1 transition-transform">{project.title}</h4>
                    <p className="text-white/70 text-xs md:text-sm mb-6 leading-relaxed max-w-2xl">{project.description}</p>
                    {project.image && (
                      <div className="border border-[#33ff00]/30 mb-6 bg-black p-1 group-hover:border-[#33ff00] transition-all overflow-hidden max-h-[300px]">
                        <img src={project.image} className="w-full h-full object-cover filter brightness-90 grayscale-[0.2] contrast-125" alt="" />
                      </div>
                    )}
                    {project.link && (
                      <a href={project.link} target="_blank" className="inline-flex items-center gap-2 border border-[#33ff00] px-4 py-2 text-[10px] md:text-xs font-black hover:bg-[#33ff00] hover:text-black transition-all active:scale-95">
                        RUN_EXECUTABLE.exe &gt;
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Contact */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-white opacity-80">user@{data.username || "user"}:~$</span>
              <span className="font-bold text-[#33ff00]">chmod +x ./connect_api</span>
            </div>
            <div className="pl-2 md:pl-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {portfolio?.contactEmail && (
                <a href={`mailto:${portfolio.contactEmail}`} className="border border-[#33ff00]/50 p-3 text-center hover:bg-[#33ff00] hover:text-black hover:shadow-[0_0_15px_rgba(51,255,0,0.3)] transition-all font-black uppercase text-[10px] md:text-xs">
                  MAIL_CLIENT.bin
                </a>
              )}
              {portfolio?.whatsapp && (
                <a href={`https://wa.me/${portfolio.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" className="border border-[#33ff00]/50 p-3 text-center hover:bg-[#33ff00] hover:text-black hover:shadow-[0_0_15px_rgba(51,255,0,0.3)] transition-all font-black uppercase text-[10px] md:text-xs">
                  WA_PROTOCOL.sh
                </a>
              )}
              {portfolio?.socialLinks?.map((link, idx) => (
                <a key={idx} href={link.url} target="_blank" className="border border-[#33ff00]/20 p-3 text-center hover:bg-[#33ff00]/80 hover:text-black transition-all font-black uppercase text-[10px] md:text-xs flex items-center justify-center gap-2 truncate">
                  <SocialIcon platform={link.platform} className="w-3 h-3 md:w-4 md:h-4 text-inherit" /> {link.platform}
                </a>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-12 mb-4">
            <span className="text-white opacity-60">root@{data.username || "user"}:/var/www#</span>
            <span className="w-2.5 h-6 bg-[#33ff00] animate-[pulse_1s_infinite]"></span>
          </div>

        </div>
      </div>
    </div>
  );
}
