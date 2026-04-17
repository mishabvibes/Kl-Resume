'use server'
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function savePortfolio(formData) {
  try {
    await dbConnect();
    
    const { name, username, bio, malayalamTagline, skills, socialLinks, image, projects } = formData;
    
    // Format the skills array
    const skillsArray = typeof skills === 'string' ? skills.split(',').map(s => s.trim()) : skills;

    // We use findOneAndUpdate with upsert: true to insert or update the user based on their username.
    // NOTE: This uses a mock email because we haven't implemented complete NextAuth flow yet.
    await User.findOneAndUpdate(
      { username },
      {
        name,
        username,
        email: `${username}@mock.email.com`,
        image,
        portfolio: {
          bio,
          malayalamTagline,
          skills: skillsArray,
          socialLinks,
          projects
        }
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    
    return { success: true, message: 'Portfolio saved to MongoDB successfully! 🚀' };
  } catch (error) {
    console.error("Database save error:", error);
    return { success: false, message: 'Failed to save portfolio.' };
  }
}
