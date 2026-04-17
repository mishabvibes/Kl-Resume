import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  username: { type: String, unique: true, sparse: true },
  portfolio: {
    bio: String,
    socialLinks: [{
      platform: String,
      url: String,
    }],
    skills: [String],
    projects: [{
      title: String,
      description: String,
      link: String,
      image: String,
    }],
    malayalamTagline: String, // E.g. "Pani edukuvam, poya kanum..."
  },
  theme: { type: String, default: 'dark' }, // dark/light/bento
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
