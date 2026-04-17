"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Sparkles, Save, Link as LinkIcon, Image as ImageIcon, Plus, Trash2, ChevronDown, Mail, MessageCircle, MapPin, ArrowRight, ArrowLeft, CheckCircle2, Eye, X } from 'lucide-react';
import Link from 'next/link';
import { savePortfolio } from '../actions';
import { SocialIcon, PLATFORMS } from '@/components/SocialIcon';
import { THEMES } from '../themes';
import { ThemeLayouts } from '@/components/themes';

const MALAYALAM_BIOS = [
  "Freelance Editor by day, Cinephile by night 🎬",
  "Oru cheriya developer, valiya swapnangal 🚀 (Small developer, big dreams)",
  "Pani edukuvam, poya kanum... 💼 (Working, watch me go...)",
  "Tech enthusiast. Chunk bros > Code bugs 🐛",
  "Design aanu ente everything 🎨",
];

function EditorContent() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const totalSteps = 5;
  const [formData, setFormData] = useState({
    name: 'Alex Doe',
    username: 'alex',
    careerField: 'Fullstack Engineer',
    bio: 'Creative Developer & Designer crafting next-generation digital experiences.',
    malayalamTagline: 'Oru cheriya developer, valiya swapnangal 🚀',
    contactEmail: 'hello@alexdoe.com',
    whatsapp: '+919876543210',
    location: 'Kochi, Kerala',
    skills: 'Next.js, Tailwind, MongoDB',
    theme: 'bento-dark',
    socialLinks: [
      { platform: 'GitHub', url: 'https://github.com/alexdoe' },
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/alexdoe' },
      { platform: 'Instagram', url: 'https://instagram.com/alexdoe' }
    ],
    projects: [
      { title: "Bento Portfolio", description: "A highly customizable personal site.", link: "https://klresume.in", image: '' }
    ],
    education: [
      { school: 'CUSAT', degree: 'B.Tech CS', year: '2022' }
    ],
    experience: [
      { company: 'Tech Solutions', role: 'Dev Intern', duration: '6 Months', description: 'Worked on React components.' }
    ],
    image: '',
  });

  const [newSocial, setNewSocial] = useState({ platform: 'GitHub', url: '' });
  const [newProject, setNewProject] = useState({ title: '', description: '', link: '', image: '' });
  const [newEdu, setNewEdu] = useState({ school: '', degree: '', year: '' });
  const [newExp, setNewExp] = useState({ company: '', role: '', duration: '', description: '' });

  useEffect(() => {
    const themeParam = searchParams.get('theme');
    if (themeParam && THEMES[themeParam]) {
      setFormData(prev => ({ ...prev, theme: themeParam }));
      setCurrentStep(5); // Jump to design step to show it
    }
  }, [searchParams]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProjectImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProject((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const generateBio = () => {
    const randomBio = MALAYALAM_BIOS[Math.floor(Math.random() * MALAYALAM_BIOS.length)];
    setFormData((prev) => ({ ...prev, malayalamTagline: randomBio }));
  };

  const addSocialLink = () => {
    if (newSocial.url.trim() !== '') {
      setFormData(prev => ({
        ...prev,
        socialLinks: [...prev.socialLinks, newSocial]
      }));
      setNewSocial({ platform: 'GitHub', url: '' });
    }
  };

  const removeSocialLink = (index) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index)
    }));
  };

  const addProject = () => {
    if (newProject.title.trim()) {
      setFormData(prev => ({
        ...prev,
        projects: [...prev.projects, newProject]
      }));
      setNewProject({ title: '', description: '', link: '', image: '' });
    }
  };

  const removeProject = (index) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const addEducation = () => {
    if (newEdu.school.trim() && newEdu.degree.trim()) {
      setFormData(prev => ({
        ...prev,
        education: [...prev.education, newEdu]
      }));
      setNewEdu({ school: '', degree: '', year: '' });
    }
  };

  const removeEducation = (index) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const addExperience = () => {
    if (newExp.company.trim() && newExp.role.trim()) {
      setFormData(prev => ({
        ...prev,
        experience: [...prev.experience, newExp]
      }));
      setNewExp({ company: '', role: '', duration: '', description: '' });
    }
  };

  const removeExperience = (index) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    try {
      const response = await savePortfolio(formData);
      if (response && response.success === false) {
        alert(response.message || "Action failed to save portfolio.");
      } else {
        alert(response?.message || "Portfolio saved efficiently!");
      }
    } catch (error) {
      console.error(error);
      alert("Error saving data! If you uploaded a large image, it might exceed the server limits.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleClaimUrl = () => {
    const url = `${window.location.origin}/${formData.username}`;
    navigator.clipboard.writeText(url);
    alert(`URL Copied to clipboard! 🚀\n${url}`);
  };

  return (
    <main className="min-h-screen p-4 md:p-8 flex flex-col items-center bg-[url('/grid.svg')]">
      <div className="absolute inset-0 bg-black/80 z-[-1]"></div>
      
      <header className="w-full max-w-4xl mx-auto mb-8 flex justify-between items-center px-4">
        <h1 className="text-2xl font-black tracking-tighter bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          KL RESUME
        </h1>
        <div className="flex items-center gap-3">
          <button onClick={() => setShowPreview(true)} className="glassmorphism px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-white/10 transition text-sm text-white border border-white/10">
            <Eye className="w-4 h-4" />
            Preview
          </button>
          {/* <button onClick={handleClaimUrl} className="bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition text-sm text-white border border-white/5">
            <LinkIcon className="w-4 h-4" />
            Share
          </button> */}
        </div>
      </header>

      <div className="w-full max-w-4xl mx-auto relative px-4 pb-20">
        {/* The Editor Sidebar (Wizard) */}
        <div className="bento-card flex flex-col min-h-[600px] shadow-2xl border-white/5 bg-zinc-900/40 backdrop-blur-3xl">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                Customize Portfolio
              </h2>
              <p className="text-xs text-zinc-400 mt-2 font-semibold uppercase tracking-widest">
                Step {currentStep} of {totalSteps}: {['Identity', 'Career Legacy', 'Social Hub', 'Proof of Work', 'Launch Engine'][currentStep - 1]}
              </p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full h-1 bg-zinc-800 rounded-full mb-8 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 ease-out" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="flex-1">
            
            {/* STEP 1: PERSONAL INFO */}
            {currentStep === 1 && (
              <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Profile Picture</label>
                  <div className="flex items-center gap-4 bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3">
                    <label className="cursor-pointer bg-zinc-700 hover:bg-zinc-600 text-white text-xs font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition">
                      <ImageIcon className="w-4 h-4" />
                      Upload Image
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                    {formData.image && <span className="text-xs text-green-400 font-semibold">Image loaded!</span>}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Username (URL)</label>
                  <div className="flex items-center bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-purple-500">
                    <span className="text-zinc-500">klresume.in/</span>
                    <input type="text" name="username" value={formData.username} onChange={handleInputChange} className="bg-transparent border-none outline-none flex-1 text-white" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Career Field / Role</label>
                  <input type="text" name="careerField" value={formData.careerField} onChange={handleInputChange} placeholder="e.g. Flutter Developer / Architect" className="bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Professional Bio</label>
                  <textarea name="bio" value={formData.bio} onChange={handleInputChange} placeholder="Summary of your expertise..." className="bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 h-24 resize-none text-white"></textarea>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Malayalam Tagline</label>
                    <button type="button" onClick={generateBio} className="text-xs text-purple-400 hover:text-purple-300 font-medium">Auto-Generate 🔮</button>
                  </div>
                  <input type="text" name="malayalamTagline" value={formData.malayalamTagline} onChange={handleInputChange} className="bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white" />
                </div>
              </div>
            )}

            {/* STEP 2: CAREER LEGACY (EXPERIENCE & EDUCATION) */}
            {currentStep === 2 && (
              <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
                
                {/* WORK EXPERIENCE */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">Work Experience</label>
                  <div className="flex flex-col gap-3">
                    {formData.experience.map((exp, index) => (
                      <div key={index} className="flex justify-between items-start bg-zinc-800/50 border border-zinc-700 rounded-xl p-3">
                        <div>
                          <p className="text-sm font-bold text-white">{exp.role} @ {exp.company}</p>
                          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{exp.duration}</p>
                        </div>
                        <button type="button" onClick={() => removeExperience(index)} className="text-red-400 hover:bg-red-500/20 p-2 rounded-lg transition ml-2">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2 mt-2 bg-zinc-800/30 p-3 rounded-2xl border border-zinc-700/50">
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" placeholder="Company" value={newExp.company} onChange={(e) => setNewExp({...newExp, company: e.target.value})} className="bg-zinc-800 border border-zinc-700 text-xs text-white rounded-lg px-3 py-2 outline-none" />
                      <input type="text" placeholder="Role" value={newExp.role} onChange={(e) => setNewExp({...newExp, role: e.target.value})} className="bg-zinc-800 border border-zinc-700 text-xs text-white rounded-lg px-3 py-2 outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" placeholder="Duration (e.g. 2022 - Present)" value={newExp.duration} onChange={(e) => setNewExp({...newExp, duration: e.target.value})} className="bg-zinc-800 border border-zinc-700 text-xs text-white rounded-lg px-3 py-2 outline-none" />
                      <button type="button" onClick={addExperience} className="bg-purple-600/20 text-purple-400 border border-purple-500/30 text-[10px] font-black uppercase rounded-lg px-3 py-2 hover:bg-purple-600 hover:text-white transition">Add Exp</button>
                    </div>
                    <textarea placeholder="Briefly describe what you did..." value={newExp.description} onChange={(e) => setNewExp({...newExp, description: e.target.value})} className="bg-zinc-800 border border-zinc-700 text-xs text-white rounded-lg px-3 py-2 outline-none h-16 resize-none" />
                  </div>
                </div>

                {/* EDUCATION */}
                <div className="flex flex-col gap-2 border-t border-zinc-800/50 pt-4">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">Education</label>
                  <div className="flex flex-col gap-3">
                    {formData.education.map((edu, index) => (
                      <div key={index} className="flex justify-between items-center bg-zinc-800/50 border border-zinc-700 rounded-xl px-3 py-2">
                        <div className="overflow-hidden">
                          <p className="text-sm font-bold text-white truncate">{edu.degree}</p>
                          <p className="text-[10px] text-zinc-500 truncate">{edu.school} &bull; {edu.year}</p>
                        </div>
                        <button type="button" onClick={() => removeEducation(index)} className="text-red-400 hover:bg-red-500/20 p-2 rounded-lg transition ml-2 flex-shrink-0">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-2 bg-zinc-800/30 p-2 rounded-2xl border border-zinc-700/50">
                    <input type="text" placeholder="School" value={newEdu.school} onChange={(e) => setNewEdu({...newEdu, school: e.target.value})} className="bg-zinc-800 border border-zinc-700 text-[10px] text-white rounded-lg px-2 py-2 outline-none" />
                    <input type="text" placeholder="Degree" value={newEdu.degree} onChange={(e) => setNewEdu({...newEdu, degree: e.target.value})} className="bg-zinc-800 border border-zinc-700 text-[10px] text-white rounded-lg px-2 py-2 outline-none" />
                    <input type="text" placeholder="Year" value={newEdu.year} onChange={(e) => setNewEdu({...newEdu, year: e.target.value})} className="bg-zinc-800 border border-zinc-700 text-[10px] text-white rounded-lg px-2 py-2 outline-none" />
                    <button type="button" onClick={addEducation} className="col-span-3 bg-zinc-700 text-white text-[10px] font-bold py-2 rounded-lg hover:bg-zinc-600 transition">Add Education</button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: CONTACT & SOCIALS */}
            {currentStep === 3 && (
              <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Public Contact Email</label>
                  <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleInputChange} placeholder="hello@example.com" className="bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-zinc-500" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">WhatsApp (with country code)</label>
                  <input type="text" name="whatsapp" value={formData.whatsapp || ''} onChange={handleInputChange} placeholder="+919876543210" className="bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-zinc-500" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Location</label>
                  <input type="text" name="location" value={formData.location || ''} onChange={handleInputChange} placeholder="Kochi, Kerala" className="bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-zinc-500" />
                </div>

                <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-zinc-800/50">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">Social Hub</label>
                  <div className="flex flex-col gap-2">
                    {formData.socialLinks.map((link, index) => (
                      <div key={index} className="flex justify-between items-center bg-zinc-800/50 border border-zinc-700 rounded-xl px-3 py-2">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <SocialIcon platform={link.platform} className="w-4 h-4 text-purple-400 flex-shrink-0" />
                          <span className="text-sm font-semibold text-zinc-300 truncate">{link.platform}</span>
                          <span className="text-xs text-zinc-500 truncate">- {link.url}</span>
                        </div>
                        <button type="button" onClick={() => removeSocialLink(index)} className="text-red-400 hover:bg-red-500/20 p-2 rounded-lg transition ml-2">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 mt-2 bg-zinc-800/30 p-2 rounded-2xl border border-zinc-700/50">
                    <div className="relative w-full sm:w-1/3">
                      <select
                        value={newSocial.platform}
                        onChange={(e) => setNewSocial({ ...newSocial, platform: e.target.value })}
                        className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 shadow-inner text-sm text-zinc-200 rounded-xl pl-4 pr-10 py-3 appearance-none outline-none focus:ring-2 focus:ring-purple-500 transition cursor-pointer"
                      >
                        {PLATFORMS.map((p) => (
                          <option key={p} value={p} className="bg-zinc-900 text-white">{p}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                    </div>
                    <input
                      type="url"
                      placeholder="Paste URL here..."
                      value={newSocial.url}
                      onChange={(e) => setNewSocial({ ...newSocial, url: e.target.value })}
                      className="bg-zinc-800 border border-zinc-700 text-sm text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 flex-1 transition"
                    />
                    <button
                      type="button"
                      onClick={addSocialLink}
                      disabled={!newSocial.url.trim()}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 text-white shadow-lg font-bold py-3 px-5 rounded-xl flex items-center justify-center transition shrink-0"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: SKILLS & PROJECTS */}
            {currentStep === 4 && (
              <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Top Skills (comma separated)</label>
                  <input type="text" name="skills" value={formData.skills} onChange={handleInputChange} className="bg-zinc-800/50 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white" />
                </div>

                <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-zinc-800/50">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">Projects Showcase</label>
                  <div className="flex flex-col gap-3 mt-2">
                    {formData.projects.map((proj, index) => (
                      <div key={index} className="flex flex-col gap-2 bg-zinc-800/50 border border-zinc-700 rounded-xl p-3 relative group overflow-hidden">
                        {proj.image && (
                          <div className="w-full h-24 mb-2 rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800 shrink-0">
                            <img src={proj.image} className="w-full h-full object-cover" alt="Project thumb" />
                          </div>
                        )}
                        <h4 className="text-white font-bold text-sm pr-8 truncate">{proj.title}</h4>
                        <p className="text-zinc-400 text-xs line-clamp-2">{proj.description}</p>
                        {proj.link && <a href={proj.link} target="_blank" className="text-purple-400 text-xs hover:underline truncate">{proj.link}</a>}
                        
                        <button type="button" onClick={() => removeProject(index)} className="absolute top-3 right-3 text-red-400 hover:bg-red-500/20 p-1.5 rounded-lg transition sm:opacity-0 group-hover:opacity-100 flex items-center justify-center">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2 mt-2 bg-zinc-800/30 p-3 rounded-2xl border border-zinc-700/50">
                    <label className="cursor-pointer bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 text-xs font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition outline-none">
                      <ImageIcon className="w-4 h-4" />
                      {newProject.image ? "Thumbnail Selected ✔" : "Upload Thumbnail (Optional)"}
                      <input type="file" accept="image/*" onChange={handleProjectImageUpload} className="hidden" />
                    </label>
                    <input
                      type="text"
                      placeholder="Project Title (e.g. Aesthetic Notes App)"
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      className="bg-zinc-800 border border-zinc-700 text-sm text-white rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      type="url"
                      placeholder="Project Link URL"
                      value={newProject.link}
                      onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                      className="bg-zinc-800 border border-zinc-700 text-sm text-white rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <textarea
                      placeholder="Short description..."
                      value={newProject.description}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                      className="bg-zinc-800 border border-zinc-700 text-sm text-white rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500 resize-none h-16"
                    />
                    <button
                      type="button"
                      onClick={addProject}
                      disabled={!newProject.title.trim()}
                      className="mt-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 text-white text-sm font-bold py-2 rounded-xl flex items-center justify-center gap-2 transition"
                    >
                      <Plus className="w-4 h-4" /> Add Project
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: DESIGN & DEPLOYMENT */}
            {currentStep === 5 && (
              <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-white uppercase tracking-widest">Select Portfolio Theme</label>
                  <p className="text-xs text-zinc-400 mb-2">Choose from 10 radically different aesthetics. The Live Preview on the right will instantly rebuild your entire layout!</p>
                  
                  <div className="grid grid-cols-2 gap-3 pb-4">
                    {Object.entries(THEMES).map(([key, t]) => (
                      <button
                        key={key}
                        onClick={() => setFormData(prev => ({...prev, theme: key}))}
                        type="button"
                        className={`p-3 rounded-xl border text-left transition ${
                          formData.theme === key 
                            ? 'bg-purple-500/20 border-purple-500 text-white scale-[1.02]' 
                            : 'bg-zinc-800/50 border-zinc-700 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                        }`}
                      >
                        <p className="font-bold text-sm tracking-tight">{t.name}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="items-center text-center py-6 border-t border-zinc-800/50">
                  <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-black text-white">You're Ready to Publish!</h3>
                  <button 
                    type="button"
                    disabled={isSaving} 
                    onClick={handleSave} 
                    className="mt-6 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black py-4 px-6 rounded-2xl flex justify-center items-center gap-2 hover:from-purple-500 hover:to-pink-500 shadow-xl shadow-purple-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                  >
                    <Save className="w-5 h-5" />
                    {isSaving ? "Saving Portfolio..." : "Deploy Portfolio"}
                  </button>
                </div>
              </div>
            )}

            {/* Navigation Controls */}
            <div className={`flex justify-between items-center mt-10 pt-6 border-t border-zinc-800/50 ${currentStep === 5 ? 'hidden' : ''}`}>
              <button 
                type="button" 
                onClick={() => setCurrentStep(prev => prev - 1)} 
                className={`px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-bold rounded-xl transition flex items-center gap-2 ${currentStep === 1 ? 'opacity-0 pointer-events-none' : ''}`}
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>

              {currentStep < totalSteps && (
                <button 
                  type="button" 
                  onClick={() => setCurrentStep(prev => prev + 1)} 
                  className="px-6 py-2.5 bg-white text-black hover:bg-zinc-200 text-sm font-bold rounded-xl transition flex items-center gap-2"
                >
                  Next Step <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </form>
        </div>
      </div>

      {/* FULL-VIEWPORT PREVIEW SYSTEM */}
      {showPreview && (
        <div className="fixed inset-0 z-[100] flex flex-col animate-in fade-in zoom-in-95 duration-300 bg-black">
          {/* Preview Navigation Bar */}
          <div className="w-full h-14 bg-zinc-900 border-b border-white/10 flex items-center justify-between px-6 shrink-0 relative z-[110]">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
              <div className="bg-black/40 border border-white/10 px-4 py-1 rounded-lg text-xs font-mono text-zinc-400 select-all">
                klresume.in/{formData.username || 'your-url'}
              </div>
            </div>

            <div className="flex items-center gap-4">
               <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest hidden md:block">
                 Viewing: <span className="text-purple-400">{THEMES[formData.theme]?.name}</span>
               </span>
               <button 
                 onClick={() => setShowPreview(false)}
                 className="flex items-center gap-2 bg-white text-black px-4 py-1.5 rounded-lg text-xs font-black uppercase hover:bg-zinc-200 transition active:scale-95"
               >
                 <X className="w-4 h-4" /> Exit
               </button>
            </div>
          </div>

          {/* Actual Rendering Area */}
          <div className="flex-1 w-full overflow-y-auto overflow-x-hidden hide-scrollbar bg-white">
            <div className="w-full relative min-h-full">
                    {(() => {
                      const LayoutComponent = ThemeLayouts[formData.theme] || ThemeLayouts['bento-dark'];
                      const skillsArray = typeof formData.skills === 'string' ? formData.skills.split(',').map(s => s.trim()) : formData.skills;
                      return <LayoutComponent data={{ ...formData, portfolio: { ...formData, skills: skillsArray } }} />
                    })()}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default function OnboardingEditor() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white font-black italic">LOADING_ENGINE...</div>}>
      <EditorContent />
    </Suspense>
  );
}
