import { Link as LinkIcon, Instagram, Github, Linkedin, Youtube, Twitter, Gitlab, Discord, Dribbble, Codepen, Figma, Framer, Twitch, PenTool, Code, Monitor } from 'lucide-react';

export const PLATFORMS = [
  'GitHub', 'GitLab', 'Bitbucket', 'Stack Overflow', 'Dev.to', 'Hashnode', 'CodePen', 'Replit',
  'Dribbble', 'Behance', 'ArtStation', 'Pinterest', 'Awwwards', 'Adobe Portfolio',
  'LinkedIn', 'X', 'Reddit', 'Discord', 'Medium', 'Instagram',
  'Upwork', 'Fiverr', 'Freelancer', 'Toptal', 'Contra', 'Other'
];

export const SocialIcon = ({ platform, className }) => {
  if (!platform) return <LinkIcon className={className} />;
  const p = platform.toLowerCase();
  if (p.includes('github')) return <Github className={className} />;
  if (p.includes('linkedin')) return <Linkedin className={className} />;
  if (p.includes('instagram')) return <Instagram className={className} />;
  if (p.includes('youtube')) return <Youtube className={className} />;
  if (p.includes('x') || p.includes('twitter')) return <Twitter className={className} />;
  if (p.includes('gitlab')) return <Gitlab className={className} />;
  if (p.includes('discord')) return <Discord className={className} />;
  if (p.includes('dribbble')) return <Dribbble className={className} />;
  if (p.includes('codepen')) return <Codepen className={className} />;
  if (p.includes('figma')) return <Figma className={className} />;
  if (p.includes('framer')) return <Framer className={className} />;
  if (p.includes('twitch')) return <Twitch className={className} />;
  if (p.includes('behance') || p.includes('artstation') || p.includes('portfolio') || p.includes('awwwards') || p.includes('pinterest')) return <PenTool className={className} />;
  if (p.includes('stack overflow') || p.includes('replit') || p.includes('dev.to') || p.includes('hashnode') || p.includes('bitbucket')) return <Code className={className} />;
  if (p.includes('upwork') || p.includes('fiverr') || p.includes('freelancer') || p.includes('toptal') || p.includes('contra') || p.includes('reddit') || p.includes('medium')) return <Monitor className={className} />;
  return <LinkIcon className={className} />;
};
