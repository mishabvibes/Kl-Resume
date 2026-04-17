import { notFound } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { ThemeLayouts } from '@/components/themes';

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

  const themeKey = user.theme || 'bento-dark';
  const LayoutComponent = ThemeLayouts[themeKey] || ThemeLayouts['bento-dark'];

  return (
    <>
      <LayoutComponent data={user} />
      
      {/* Footer / Branding mark - Relative to prevent overlap */}
      <div className="text-center py-10 w-full relative z-50 bg-inherit border-t border-black/5 dark:border-white/5">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold opacity-30 hover:opacity-100 transition uppercase tracking-widest hover:scale-105 active:scale-95">
          <Sparkles className="w-4 h-4 text-purple-500" />
          <span className="mix-blend-difference">Powered by KL Resume</span>
        </Link>
      </div>
    </>
  );
}
