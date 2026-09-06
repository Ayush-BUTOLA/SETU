'use client';

import React, { useState, useEffect } from 'react';
import { Settings, User, Bell, Shield, KeyRound, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function SettingsPage() {
  const [user, setUser] = useState({
    name: 'Rameshwar Patil',
    organization: 'Gram Vikas Committee, Satara',
    email: 'citizen@setu.org',
    role: 'Citizen / Community',
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem('setu_user');
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem('setu_user', JSON.stringify(user));
      toast.success('Account preferences and profile updated successfully!');
    } catch {
      toast.error('Could not save settings.');
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="pb-4 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
          <Settings className="w-6 h-6 text-slate-400" />
          Settings & Account Profile
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage your verified SETU persona details, notifications, and block affiliation.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-[#0d1424] border border-slate-800 p-6 rounded-2xl space-y-5 shadow-lg">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-750 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Official Organization / Gram Panchayat</label>
            <input
              type="text"
              value={user.organization}
              onChange={(e) => setUser({ ...user, organization: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-750 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-750 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Assigned Persona Role</label>
            <div className="px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-emerald-400 font-mono font-semibold">
              {user.role} (Verified by District Nodal Officer)
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-lg cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
