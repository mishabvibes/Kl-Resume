import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { BarChart, Users, Trash2, Globe, LogOut, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { adminLogoutAction, deleteUserAction } from './actions';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const token = cookies().get('admin_token');
  const secretKey = process.env.ADMIN_SECRET || 'fallback-secret-klresume';
  
  if (!token || token.value !== secretKey) {
    redirect('/admin/login');
  }

  await dbConnect();
  const users = await User.find({}).sort({ createdAt: -1 }).lean();
  
  const totalUsers = users.length;
  const totalProjects = users.reduce((acc, user) => acc + (user.portfolio?.projects?.length || 0), 0);
  const totalLinks = users.reduce((acc, user) => acc + (user.portfolio?.socialLinks?.length || 0), 0);

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans p-6 md:p-10 selection:bg-purple-500/30">
      <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">KL Resume Admin</h1>
          <p className="text-zinc-500 font-semibold mt-1">Platform Analytics & Management Dashboard</p>
        </div>
        <form action={adminLogoutAction}>
          <button type="submit" className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 px-5 py-2.5 rounded-full text-sm font-bold transition text-zinc-300 hover:text-white">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </form>
      </header>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bento-card p-6 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-[-20%] right-[-10%] w-[150px] h-[150px] bg-purple-500/20 blur-[50px]"></div>
          <div className="flex items-center gap-3 mb-4 text-zinc-400 font-bold text-sm tracking-widest uppercase relative z-10">
            <Users className="w-5 h-5 text-purple-400" /> Total Users
          </div>
          <p className="text-6xl font-black relative z-10">{totalUsers}</p>
        </div>

        <div className="bento-card p-6 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-[-20%] right-[-10%] w-[150px] h-[150px] bg-pink-500/20 blur-[50px]"></div>
          <div className="flex items-center gap-3 mb-4 text-zinc-400 font-bold text-sm tracking-widest uppercase relative z-10">
            <BarChart className="w-5 h-5 text-pink-400" /> Uploaded Projects
          </div>
          <p className="text-6xl font-black relative z-10">{totalProjects}</p>
        </div>

        <div className="bento-card p-6 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-[-20%] right-[-10%] w-[150px] h-[150px] bg-blue-500/20 blur-[50px]"></div>
          <div className="flex items-center gap-3 mb-4 text-zinc-400 font-bold text-sm tracking-widest uppercase relative z-10">
            <Globe className="w-5 h-5 text-blue-400" /> Social Links Linked
          </div>
          <p className="text-6xl font-black relative z-10">{totalLinks}</p>
        </div>
      </div>

      {/* User Management Table */}
      <div className="bento-card overflow-hidden p-0 border border-zinc-800">
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            Registered Portfolios <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">{totalUsers}</span>
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-900/80 border-b border-zinc-800 text-xs uppercase tracking-widest text-zinc-500">
                <th className="p-5 font-bold">User</th>
                <th className="p-5 font-bold">URL Route</th>
                <th className="p-5 font-bold text-center">Projects</th>
                <th className="p-5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-zinc-500 font-bold">No users registered yet.</td>
                </tr>
              ) : users.map(user => (
                <tr key={user._id.toString()} className="border-b border-zinc-800/50 hover:bg-zinc-900/40 transition">
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-zinc-800 flex-shrink-0 overflow-hidden border border-zinc-700">
                        {user.image ? <img src={user.image} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600"></div>}
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">{user.name}</p>
                        <p className="text-xs text-zinc-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <Link href={`/${user.username}`} target="_blank" className="font-semibold text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1 group w-max">
                      /{user.username} <ArrowUpRight className="w-3 h-3 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition" />
                    </Link>
                  </td>
                  <td className="p-5 text-center">
                    <span className="bg-zinc-800/80 border border-zinc-700 text-zinc-300 text-xs font-bold px-3 py-1 rounded-full">
                      {user.portfolio?.projects?.length || 0}
                    </span>
                  </td>
                  <td className="p-5 text-right flex justify-end items-center h-full">
                    <form action={async () => {
                      'use server';
                      await deleteUserAction(user._id.toString());
                    }} className="inline-block mt-2">
                      <button type="submit" className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition border border-red-500/20 hover:border-red-500/50" title="Delete Portfolio">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
