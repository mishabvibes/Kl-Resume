import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { LogOut, ShieldCheck } from 'lucide-react';
import { adminLogoutAction } from './actions';
import AdminDashboardClient from '@/components/admin/AdminDashboardClient';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const token = cookies().get('admin_token');
  const secretKey = process.env.ADMIN_SECRET || 'fallback-secret-klresume';
  
  if (!token || token.value !== secretKey) {
    redirect('/admin/login');
  }

  await dbConnect();
  // Fetch users with full lean and serialized IDs
  const usersRaw = await User.find({}).sort({ createdAt: -1 }).lean();
  const users = JSON.parse(JSON.stringify(usersRaw));
  
  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans p-6 md:p-10 selection:bg-purple-500/30">
      <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
             <img src="/favicon/android-chrome-192x192.png" alt="KL Logo" className="w-14 h-14 rounded-2xl shadow-xl shadow-purple-500/10" />
             <div className="absolute -bottom-1 -right-1 bg-purple-600 rounded-full p-1 border-2 border-zinc-950">
                <ShieldCheck className="w-3 h-3 text-white" />
             </div>
          </div>
          <div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent uppercase italic tracking-tighter">CENTRAL_INTELLIGENCE</h1>
            <p className="text-zinc-500 font-bold uppercase tracking-[0.2em] text-[10px] mt-1 italic">Authorized Personnel Only // KL_ADMIN_SEC_v2</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-zinc-900 border border-white/5 px-4 py-2 rounded-2xl flex items-center gap-3">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
             <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">System_Status: Optimal</span>
          </div>
          <form action={adminLogoutAction}>
            <button type="submit" className="glassmorphism hover:bg-white/10 px-5 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition text-zinc-400 hover:text-white border border-white/5">
              Terminate Session
            </button>
          </form>
        </div>
      </header>

      <AdminDashboardClient initialUsers={users} />
    </div>
  );
}
