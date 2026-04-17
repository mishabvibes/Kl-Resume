import { notFound } from 'next/navigation';
import { Calendar, ExternalLink, ArrowUpRight, Sparkles, Mail, MessageCircle, MapPin } from 'lucide-react';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Link from 'next/link';
import { SocialIcon } from '@/components/SocialIcon';

// Helper to fetch data
async function getUserData(username) {
  await dbConnect();
  
  // Note: During local dev or actual build without DB, we can return dummy data
  try {
    const user = await User.findOne({ username }).lean();
    if (user) {
      user._id = user._id.toString();
      user.createdAt = user.createdAt.toString();
      user.updatedAt = user.updatedAt.toString();
      return user;
    }
  } catch (error) {
    console.error(error);
  }
  
  // Return dummy data for demo purposes since we don't have seeded DB
  if (username === 'alex' || username === 'demo') {
    return {
      name: 'Alex Doe',
      username: username,
      image: '',
      portfolio: {
        bio: "Creative Developer & Designer crafting next-generation digital experiences. Exploring the boundaries of Gen-Z aesthetics and modern web tech.",
        malayalamTagline: "Oru cheriya developer, valiya swapnangal 🚀",
        contactEmail: "hello@alexdoe.com",
        whatsapp: "+919876543210",
        location: "Kochi, Kerala",
        skills: ["Next.js", "React", "MongoDB", "TailwindCSS", "Framer Motion"],
        projects: [
          { title: "Bento Portfolio", description: "A highly customizable personal site with dynamic social cards.", link: "#", image: "" },
          { title: "Aesthetic Notes App", description: "A minimal, offline-first notes application with a dark UI.", link: "#", image: "" },
        ],
        socialLinks: [
          { platform: 'GitHub', url: 'https://github.com/alexdoe' },
          { platform: 'LinkedIn', url: 'https://linkedin.com/in/alexdoe' },
          { platform: 'Instagram', url: 'https://instagram.com/alexdoe' }
        ]
      }
    };
  }
  
  return null;
}

// Generate the OpenGraph Metadata dynamically
export async function generateMetadata({ params }) {
  const { username } = params;
  
  // This will use the /api/og dynamic image route when shared
  return {
    title: `${username} | KL Resume`,
    description: `Check out ${username}'s professional portfolio on KL Resume.`,
    openGraph: {
      images: [`/api/og?username=${username}`],
    },
  };
}

export default async function DynamicPortfolioPage({ params }) {
  const { username } = params;
  const user = await getUserData(username);

  if (!user) {
    notFound();
  }

  const { portfolio } = user;

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-purple-500/30 pb-20">
      
      {/* Background blobs for Gen-Z glassmorphism aesthetic */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-pink-600/20 blur-[120px]"></div>
      </div>

      <main className="max-w-4xl mx-auto px-6 pt-20">
        {/* Header Section (Bento Grid Style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          
          {/* Main ID Card */}
          <div className="md:col-span-2 bento-card flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 p-1 flex-shrink-0">
              <div className="w-full h-full rounded-full bg-zinc-900 border-4 border-black group-hover:scale-95 transition duration-300 overflow-hidden flex justify-center items-center">
                {user.image ? (
                  <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-zinc-600 font-bold">No Pic</span>
                )}
              </div>
            </div>
            <div className="z-10">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
                {user.name}
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                <p className="text-zinc-400 font-medium text-lg">@{user.username}</p>
                {portfolio.location && (
                  <div className="flex items-center gap-1.5 text-zinc-500 text-sm font-semibold">
                    <MapPin className="w-4 h-4" /> {portfolio.location}
                  </div>
                )}
              </div>
              {portfolio.malayalamTagline && (
                <div className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl text-purple-200 text-sm font-semibold inline-block shadow-lg">
                  {portfolio.malayalamTagline}
                </div>
              )}
            </div>
          </div>

          {/* Socials Card */}
          <div className="bento-card flex flex-col justify-center items-center gap-4">
            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest w-full text-left">Connect</h3>
            <div className="flex flex-wrap gap-3 w-full justify-center md:justify-start">
              {portfolio.socialLinks?.map((link, idx) => (
                <Link key={idx} href={link.url} target="_blank" className="flex items-center justify-center p-4 bg-zinc-800/50 hover:bg-zinc-700/80 rounded-2xl transition group flex-1 min-w-[60px]">
                  <SocialIcon platform={link.platform} className="w-6 h-6 text-zinc-400 group-hover:text-white transition" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Second Row: Bio and Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bento-card flex flex-col">
            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-4">About Me</h3>
            <p className="text-zinc-300 text-lg leading-relaxed font-medium mb-6">
              {portfolio.bio}
            </p>
            {(portfolio.contactEmail || portfolio.whatsapp) && (
              <div className="mt-auto flex flex-col xl:flex-row gap-3 pt-4 border-t border-zinc-800/50">
                {portfolio.contactEmail && (
                  <a href={`mailto:${portfolio.contactEmail}`} className="flex-1 inline-flex items-center gap-2 justify-center bg-white hover:bg-zinc-200 text-black font-extrabold py-3 px-6 rounded-xl transition shadow-xl text-sm">
                    <Mail className="w-4 h-4" /> Let's Connect
                  </a>
                )}
                {portfolio.whatsapp && (
                  <a href={`https://wa.me/${portfolio.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="flex-1 inline-flex items-center gap-2 justify-center bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] font-extrabold py-3 px-6 border border-[#25D366]/30 rounded-xl transition text-sm">
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </a>
                )}
              </div>
            )}
          </div>
          
          <div className="bento-card flex flex-col">
            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-4">Skills & Arsenal</h3>
            <div className="flex flex-wrap gap-2">
              {portfolio.skills?.map((skill, index) => (
                <span key={index} className="px-4 py-2 bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700/50 rounded-xl text-sm font-semibold transition cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Third Row: Projects */}
        <div className="bento-card mb-10">
          <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-6 flex items-center justify-between">
            <span>Featured Projects</span>
            <ExternalLink className="w-4 h-4" />
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {portfolio.projects?.map((project, idx) => (
              <a key={idx} href={project.link || '#'} target="_blank" rel="noreferrer" className="group block p-5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-purple-500/50 transition">
                {project.image && (
                  <div className="w-full mb-5 rounded-xl overflow-hidden bg-zinc-950/50 border border-zinc-800/50 grayscale group-hover:grayscale-0 transition duration-500 flex justify-center items-center">
                    <img src={project.image} alt={project.title} className="w-full h-auto object-contain transform group-hover:scale-[1.02] transition duration-500 max-h-[600px]" />
                  </div>
                )}
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-xl font-bold text-zinc-100 group-hover:text-purple-400 transition">{project.title}</h4>
                  {project.link && <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-purple-400 transition" />}
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed mb-4">{project.description}</p>
                {project.link && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-purple-400 bg-purple-500/10 px-3 py-1.5 rounded-full group-hover:bg-purple-500/20 transition">
                    View Project <ArrowUpRight className="w-3 h-3" />
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>

      </main>
      
      {/* Footer / Branding mark */}
      <div className="text-center pb-8">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-white transition uppercase tracking-widest">
          <Sparkles className="w-4 h-4 text-purple-500" />
          Powered by KL Resume
        </Link>
      </div>

    </div>
  );
}
