"use client";

import React, { useState, useMemo } from 'react';
import { 
  Users, BarChart3, Search, Filter, Download, 
  Trash2, Eye, ShieldCheck, Mail, MapPin, 
  ArrowUpRight, ChevronLeft, ChevronRight, 
  MoreHorizontal, Activity, Layers, Star,
  TrendingUp, MousePointer2, Smartphone, Monitor
} from 'lucide-react';
import Link from 'next/link';
import { deleteUserAction, updateUserAction } from '@/app/admin/actions';

export default function AdminDashboardClient({ initialUsers }) {
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterTheme, setFilterTheme] = useState('All');
  const [selectedUser, setSelectedUser] = useState(null);
  const itemsPerPage = 8;

  // --- Process Data ---
  const stats = useMemo(() => {
    const total = initialUsers.length;
    const withProjects = initialUsers.filter(u => u.portfolio?.projects?.length > 0).length;
    const withSocials = initialUsers.filter(u => u.portfolio?.socialLinks?.length > 0).length;
    const themeDist = initialUsers.reduce((acc, u) => {
      const t = u.theme || 'bento-dark';
      acc[t] = (acc[t] || 0) + 1;
      return acc;
    }, {});
    
    return { total, withProjects, withSocials, themeDist };
  }, [initialUsers]);

  const filteredUsers = useMemo(() => {
    return initialUsers.filter(user => {
      const matchesSearch = 
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTheme = filterTheme === 'All' || (user.theme || 'bento-dark') === filterTheme;
      
      return matchesSearch && matchesTheme;
    });
  }, [initialUsers, searchTerm, filterTheme]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // --- Handlers ---
  const handleExportCSV = () => {
    const headers = ['Name', 'Email', 'Username', 'Theme', 'Projects', 'Location'];
    const rows = filteredUsers.map(u => [
      u.name, 
      u.email, 
      u.username, 
      u.theme || 'bento-dark', 
      u.portfolio?.projects?.length || 0,
      u.portfolio?.location || 'N/A'
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(e => e.join(",")).join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "kl_resume_users.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDeleteUser = async (id) => {
    if (confirm('Are you sure you want to delete this portfolio? This cannot be undone.')) {
      await deleteUserAction(id);
    }
  };

  // --- Render Components ---

  const AnalyticsTab = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Creators', value: stats.total, icon: Users, color: 'text-purple-400', bg: 'bg-purple-500/10' },
          { label: 'Active Projects', value: stats.withProjects, icon: Layers, color: 'text-pink-400', bg: 'bg-pink-500/10' },
          { label: 'Connections', value: stats.withSocials, icon: Activity, icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Engagement', value: '84%', icon: MousePointer2, color: 'text-blue-400', bg: 'bg-blue-500/10' },
        ].map((item, idx) => (
          <div key={idx} className="bento-card p-6 border-white/5 bg-zinc-900/40 backdrop-blur-md">
            <div className={`w-12 h-12 ${item.bg} rounded-2xl flex items-center justify-center mb-4`}>
              <item.icon className={`w-6 h-6 ${item.color}`} />
            </div>
            <p className="text-zinc-500 text-xs font-black uppercase tracking-widest">{item.label}</p>
            <p className="text-4xl font-black mt-2 italic">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Simple Bar Chart for Themes */}
        <div className="bento-card p-8 bg-zinc-900/40 border-white/5 h-[400px] flex flex-col">
          <h3 className="text-xl font-black mb-8 flex items-center gap-2 uppercase tracking-tighter">
            <Star className="w-5 h-5 text-yellow-400" /> Theme Popularity
          </h3>
          <div className="flex-1 flex items-end gap-4 overflow-hidden">
            {Object.entries(stats.themeDist).map(([theme, count], idx) => {
               const height = (count / stats.total) * 100;
               return (
                 <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                   <div 
                     className="w-full bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-xl transition-all duration-1000 relative"
                     style={{ height: `${height}%` }}
                   >
                     <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {count}
                     </div>
                   </div>
                   <p className="text-[10px] font-black uppercase text-zinc-500 truncate max-w-full">{theme.replace('-',' ')}</p>
                 </div>
               );
            })}
          </div>
        </div>

        {/* Platform Stats */}
        <div className="bento-card p-8 bg-zinc-900/40 border-white/5 h-[400px]">
          <h3 className="text-xl font-black mb-8 flex items-center gap-2 uppercase tracking-tighter">
            <Monitor className="w-5 h-5 text-blue-400" /> Platform Access
          </h3>
          <div className="space-y-6">
            {[
              { label: 'Mobile App', value: '62%', icon: Smartphone, color: 'bg-blue-500' },
              { label: 'Desktop Web', value: '31%', icon: Monitor, color: 'bg-purple-500' },
              { label: 'Tablet Mode', value: '7%', icon: Layers, color: 'bg-pink-500' }
            ].map((p, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                  <span className="flex items-center gap-2"><p.icon className="w-4 h-4" /> {p.label}</span>
                  <span>{p.value}</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full ${p.color} transition-all duration-1000`} style={{ width: p.value }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const UsersTab = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-zinc-900/40 border border-white/5 p-4 rounded-3xl backdrop-blur-md">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search by name, email, or username..."
            className="w-full bg-black/40 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-semibold"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <select 
              className="bg-black/40 border border-white/10 rounded-2xl pl-12 pr-8 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-semibold appearance-none cursor-pointer uppercase tracking-widest"
              value={filterTheme}
              onChange={(e) => { setFilterTheme(e.target.value); setCurrentPage(1); }}
            >
              <option value="All">All Themes</option>
              {Object.keys(stats.themeDist).map(t => <option key={t} value={t}>{t.toUpperCase()}</option>)}
            </select>
          </div>
          
          <button 
            onClick={handleExportCSV}
            className="bg-white text-black px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-zinc-200 transition-all flex items-center gap-2 shrink-0"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="bento-card overflow-hidden p-0 border border-white/5 bg-zinc-900/40 backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/5 text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-black">
                <th className="p-6">User Identity</th>
                <th className="p-6">Resume Route</th>
                <th className="p-6 text-center">Projects</th>
                <th className="p-6 text-center">Status</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-12 text-center text-zinc-500 font-bold uppercase italic tracking-widest">No matching creators found.</td>
                </tr>
              ) : paginatedUsers.map(user => (
                <tr key={user._id.toString()} className="hover:bg-white/5 transition group">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex-shrink-0 overflow-hidden border border-white/10 group-hover:border-purple-500 transition-colors">
                        {user.image ? <img src={user.image} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600"></div>}
                      </div>
                      <div>
                        <p className="font-black text-white text-sm uppercase tracking-tight">{user.name}</p>
                        <p className="text-xs text-zinc-500 font-medium">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <Link href={`/${user.username}`} target="_blank" className="font-black text-purple-400 hover:text-purple-300 text-xs flex items-center gap-1 group w-max uppercase tracking-widest">
                      /{user.username} <ArrowUpRight className="w-3 h-3 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </td>
                  <td className="p-6 text-center text-sm font-black">
                     {user.portfolio?.projects?.length || 0}
                  </td>
                  <td className="p-6 text-center">
                    <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${user.portfolio ? 'bg-emerald-500/10 text-emerald-500' : 'bg-zinc-500/10 text-zinc-500'}`}>
                      {user.portfolio ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end items-center gap-2">
                      <button 
                        onClick={() => setSelectedUser(user)}
                        className="p-3 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white rounded-xl transition border border-white/5" 
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user._id.toString())}
                        className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition border border-red-500/20" 
                        title="Delete Account"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-white/5 flex justify-between items-center bg-black/20">
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
            Showing <span className="text-white">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="text-white">{Math.min(currentPage * itemsPerPage, filteredUsers.length)}</span> of <span className="text-white">{filteredUsers.length}</span> Creators
          </p>
          <div className="flex gap-2">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <div className="mb-10 flex flex-wrap gap-4 border-b border-white/5 pb-6">
        {[
          { id: 'users', label: 'Creators', icon: Users },
          { id: 'analytics', label: 'Intelligence', icon: BarChart3 },
          { id: 'logs', label: 'Audit Logs', icon: Activity }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === tab.id 
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' 
              : 'text-zinc-500 hover:text-white hover:bg-white/5'
            }`}
          >
            <tab.icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'users' && <UsersTab />}
      {activeTab === 'analytics' && <AnalyticsTab />}
      {activeTab === 'logs' && (
        <div className="bento-card p-12 text-center animate-in fade-in duration-500 border-white/5 bg-zinc-900/40">
           <Activity className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
           <p className="text-sm font-black uppercase tracking-tighter text-zinc-500 italic leading-none">Activity logging initializing...</p>
           <p className="text-[10px] text-zinc-600 font-bold mt-2 uppercase">Streaming real-time sector events</p>
        </div>
      )}

      {/* --- User Detail Modal --- */}
      {selectedUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
           <div className="w-full max-w-4xl bg-zinc-900 border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
              <div className="flex flex-col md:flex-row">
                 {/* Left Profile Card */}
                 <div className="w-full md:w-80 bg-black/40 p-8 border-r border-white/5">
                    <div className="w-32 h-32 rounded-[2rem] overflow-hidden border-2 border-purple-500 shadow-xl shadow-purple-500/20 mb-6 mx-auto md:mx-0">
                       {selectedUser.image ? <img src={selectedUser.image} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600"></div>}
                    </div>
                    <h4 className="text-2xl font-black italic uppercase tracking-tighter mb-1 leading-none">{selectedUser.name}</h4>
                    <p className="text-xs font-black text-purple-400 uppercase tracking-widest mb-6">@{selectedUser.username}</p>
                    
                    <div className="space-y-4">
                       <div className="flex items-center gap-3 text-xs text-zinc-400">
                          <Mail className="w-4 h-4 shrink-0" /> {selectedUser.email}
                       </div>
                       {selectedUser.portfolio?.location && (
                          <div className="flex items-center gap-3 text-xs text-zinc-400">
                             <MapPin className="w-4 h-4 shrink-0" /> {selectedUser.portfolio.location}
                          </div>
                       )}
                       <div className="flex items-center gap-3 text-xs text-zinc-400">
                          <Activity className="w-4 h-4 shrink-0" /> Joined {new Date(selectedUser.createdAt).toLocaleDateString()}
                       </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/5 text-center md:text-left">
                       <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-4">Active Aesthetic</h5>
                       <div className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-xl inline-block text-[10px] font-black text-purple-400 uppercase tracking-widest">
                          {selectedUser.theme || 'bento-dark'}
                       </div>
                    </div>
                 </div>

                 {/* Right Portfolio Details */}
                 <div className="flex-1 p-8 md:p-12 overflow-y-auto max-h-[80vh]">
                    <div className="flex justify-between items-start mb-10">
                       <h3 className="text-3xl font-black uppercase italic tracking-tighter leading-none">Creator <br /> Insights</h3>
                       <button 
                         onClick={() => setSelectedUser(null)}
                         className="p-3 hover:bg-white/10 rounded-2xl transition"
                       >
                         <X className="w-6 h-6" />
                       </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-6">
                          <div>
                             <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-4">Biography</h5>
                             <p className="text-sm text-zinc-300 leading-relaxed font-semibold italic">
                                {selectedUser.portfolio?.bio || 'No bio provided.'}
                             </p>
                          </div>
                          <div>
                             <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-4">Skills Stack</h5>
                             <div className="flex flex-wrap gap-2">
                                {selectedUser.portfolio?.skills?.map((s, i) => (
                                   <span key={i} className="px-3 py-1 bg-zinc-800 rounded-lg text-[10px] font-black uppercase text-zinc-400 border border-white/5">{s}</span>
                                ))}
                             </div>
                          </div>
                       </div>

                       <div className="space-y-6">
                          <div className="bento-card p-6 bg-black/20 border-white/5">
                             <h5 className="text-xs font-black uppercase mb-4 text-zinc-500">Resume Metrics</h5>
                             <div className="grid grid-cols-2 gap-4">
                                <div>
                                   <p className="text-2xl font-black italic">{selectedUser.portfolio?.projects?.length || 0}</p>
                                   <p className="text-[8px] font-black uppercase text-zinc-600">Projects</p>
                                </div>
                                <div>
                                   <p className="text-2xl font-black italic">{selectedUser.portfolio?.socialLinks?.length || 0}</p>
                                   <p className="text-[8px] font-black uppercase text-zinc-600">Socials</p>
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="mt-12 flex gap-4">
                       <Link 
                         href={`/${selectedUser.username}`} 
                         target="_blank"
                         className="flex-1 bg-white text-black text-center py-4 rounded-[1.5rem] font-black uppercase tracking-widest text-xs hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
                       >
                          View Live Site <ExternalLink className="w-4 h-4" />
                       </Link>
                       <button 
                         onClick={() => {
                            if(confirm("Confirm security lock?")) {
                               // Simulating a lock feature
                               alert("User account restricted.");
                            }
                         }}
                         className="px-8 bg-zinc-800 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-xs hover:bg-zinc-700 transition"
                       >
                         Lock
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

// Sub-components for clarity
function X({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function ExternalLink({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}
