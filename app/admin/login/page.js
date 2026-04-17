"use client";

import { useState } from 'react';
import { adminLoginAction } from '../actions';
import { useRouter } from 'next/navigation';
import { Lock, User } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await adminLoginAction(username, password);
      if (res.success) {
        router.push('/admin');
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[url('/grid.svg')] bg-zinc-950 flex flex-col justify-center items-center p-4">
      <div className="absolute inset-0 bg-black/80 z-[0]"></div>
      <div className="bento-card w-full max-w-md p-8 bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl relative overflow-hidden z-10">
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-purple-600/10 blur-[80px] pointer-events-none"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-white text-center mb-2 tracking-tight">Admin Portal</h1>
          <p className="text-zinc-400 text-sm text-center mb-8 font-medium">Restricted System Access</p>
          
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex bg-zinc-800/50 border border-zinc-700/80 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-purple-500 transition">
              <User className="w-5 h-5 text-zinc-500 mr-3 mt-0.5" />
              <input 
                type="text" 
                placeholder="Admin Username" 
                value={username} 
                onChange={e => setUsername(e.target.value)}
                className="bg-transparent border-none outline-none text-white w-full font-medium"
              />
            </div>
            <div className="flex bg-zinc-800/50 border border-zinc-700/80 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-purple-500 transition">
              <Lock className="w-5 h-5 text-zinc-500 mr-3 mt-0.5" />
              <input 
                type="password" 
                placeholder="Admin Password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                className="bg-transparent border-none outline-none text-white w-full font-medium"
              />
            </div>
            
            {error && <p className="text-red-400 text-xs font-bold text-center mt-2">{error}</p>}
            
            <button 
              type="submit" 
              disabled={loading}
              className="mt-4 bg-white hover:bg-zinc-200 text-black font-black py-4 rounded-xl shadow-lg shadow-white/10 transition disabled:opacity-50 tracking-wide uppercase text-sm"
            >
              {loading ? "Authenticating..." : "Login to System"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
