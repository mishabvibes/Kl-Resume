import { notFound } from 'next/navigation';
import { Calendar, ExternalLink, ArrowUpRight, Sparkles, Mail, MessageCircle, MapPin } from 'lucide-react';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Link from 'next/link';
import { SocialIcon } from '@/components/SocialIcon';
import { THEMES } from '../themes';

// Helper to fetch data
async function getUserData(username) {
  await dbConnect();
  
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
  
  if (username === 'alex' || username === 'demo') {
    return {
      name: 'Alex Doe',
      username: username,
      image: '',
      theme: 'bento-dark',
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

export async function generateMetadata({ params }) {
  const { username } = params;
  
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
  const activeTheme = THEMES[user.theme || 'bento-dark'] || THEMES['bento-dark'];

  return (
    <div className={`${activeTheme.bgWrapper}`}>
      
      {activeTheme.renderBlobs && (
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-pink-600/20 blur-[120px]"></div>
        </div>
      )}

      <main className="max-w-4xl mx-auto px-6 pt-20">
        
        {/* Header Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className={`md:col-span-2 flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left ${activeTheme.card}`}>
            
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 p-1 flex-shrink-0 shadow-lg">
              <div className="w-full h-full rounded-full bg-zinc-900 border-4 border-black overflow-hidden flex justify-center items-center">
                {user.image ? (
                  <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-zinc-600 font-bold">No Pic</span>
                )}
              </div>
            </div>
            
            <div className="z-10 flex-1">
              <h1 className={`${activeTheme.title}`}>
                {user.name}
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center justify-center md:justify-start gap-2 sm:gap-4 mb-4">
                <p className={`${activeTheme.accentText} text-lg font-medium`}>@{user.username}</p>
                {portfolio.location && (
                  <div className={`flex items-center gap-1.5 ${activeTheme.accentText} text-sm font-bold`}>
                    <MapPin className="w-4 h-4" /> {portfolio.location}
                  </div>
                )}
              </div>
              {portfolio.malayalamTagline && (
                <div className={`${activeTheme.taglineBadge}`}>
                  {portfolio.malayalamTagline}
                </div>
              )}
            </div>
          </div>

          <div className={`flex flex-col justify-center items-center gap-4 ${activeTheme.card}`}>
            <h3 className="text-sm font-bold opacity-50 uppercase tracking-widest w-full text-center md:text-left">Connect</h3>
            <div className="flex flex-wrap gap-3 w-full justify-center md:justify-start">
              {portfolio.socialLinks?.map((link, idx) => (
                <Link key={idx} href={link.url} target="_blank" className={`flex items-center justify-center p-4 transition group flex-1 min-w-[60px] ${activeTheme.socialIconBg}`}>
                  <SocialIcon platform={link.platform} className="w-6 h-6 opacity-70 group-hover:opacity-100 transition" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bio and Skills Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className={`flex flex-col ${activeTheme.card}`}>
            <h3 className="text-sm font-bold opacity-50 uppercase tracking-widest mb-4">About Me</h3>
            <p className="text-lg leading-relaxed font-medium mb-6 opacity-90 overflow-hidden text-ellipsis">
              {portfolio.bio}
            </p>
            {(portfolio.contactEmail || portfolio.whatsapp) && (
              <div className="mt-auto flex flex-col xl:flex-row gap-3 pt-4 border-t border-black/10 dark:border-white/10">
                {portfolio.contactEmail && (
                  <a href={`mailto:${portfolio.contactEmail}`} className={`flex-1 inline-flex items-center gap-2 justify-center py-3 px-6 transition text-sm ${activeTheme.primaryButton}`}>
                    <Mail className="w-4 h-4" /> Let's Connect
                  </a>
                )}
                {portfolio.whatsapp && (
                  <a href={`https://wa.me/${portfolio.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className={`flex-1 inline-flex items-center gap-2 justify-center py-3 px-6 transition text-sm ${activeTheme.primaryButton} !bg-[#25D366]/20 !text-[#25D366] !border border-[#25D366]/30 hover:!bg-[#25D366]/30`}>
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </a>
                )}
              </div>
            )}
          </div>
          
          <div className={`flex flex-col ${activeTheme.card}`}>
            <h3 className="text-sm font-bold opacity-50 uppercase tracking-widest mb-4">Skills & Arsenal</h3>
            <div className="flex flex-wrap gap-2">
              {portfolio.skills?.map((skill, index) => (
                <span key={index} className={`${activeTheme.skillBadge} whitespace-nowrap`}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Section */}
        {portfolio.projects?.length > 0 && (
          <div className="mb-10">
            <h3 className="text-sm font-bold opacity-50 uppercase tracking-widest mb-6 flex items-center justify-between px-2">
              <span>Featured Projects</span>
              <ExternalLink className="w-4 h-4" />
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {portfolio.projects.map((project, idx) => (
                <a key={idx} href={project.link || '#'} target="_blank" rel="noreferrer" className={`block ${activeTheme.projectCard}`}>
                  {project.image && (
                    <div className={`w-full flex justify-center items-center overflow-hidden ${activeTheme.projectThumb}`}>
                      <img src={project.image} alt={project.title} className="w-full h-auto object-cover max-h-[600px]" />
                    </div>
                  )}
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold opacity-90 transition">{project.title}</h4>
                    {project.link && <ArrowUpRight className="w-5 h-5 opacity-60 transition" />}
                  </div>
                  <p className="text-sm leading-relaxed mb-4 opacity-70">{project.description}</p>
                  {project.link && (
                    <span className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 transition ${activeTheme.taglineBadge}`}>
                      View Project <ArrowUpRight className="w-3 h-3" />
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>
        )}

      </main>
      
      {/* Footer / Branding mark */}
      <div className="text-center pb-8 pt-4">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold opacity-50 hover:opacity-100 transition uppercase tracking-widest">
          <Sparkles className="w-4 h-4" />
          Powered by KL Resume
        </Link>
      </div>

    </div>
  );
}
