'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutGrid,
  Compass,
  PlusCircle,
  FileCheck2,
  Briefcase,
  GraduationCap,
  Building2,
  Award,
  Settings,
  HelpCircle,
  Bell,
  Search,
  Menu,
  X,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  User,
  LogOut,
  MapPin,
  Camera,
  Send,
} from 'lucide-react';
import { toast } from 'sonner';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  isAction?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutGrid },
  { label: 'Discover Challenges', href: '/dashboard/explore', icon: Compass },
  { label: 'Submit a Challenge', href: '#submit-challenge', icon: PlusCircle, isAction: true },
  { label: 'My Challenges', href: '/dashboard/my-challenges', icon: FileCheck2 },
  { label: 'Projects & Pilots', href: '/dashboard/projects', icon: Briefcase },
  { label: 'Universities', href: '/dashboard/universities', icon: GraduationCap },
  { label: 'Industry & CSR', href: '/dashboard/industry', icon: Building2 },
  { label: 'Verified Impact', href: '/dashboard/impact', icon: Award },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Submit modal form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Water & Sanitation');
  const [newLocation, setNewLocation] = useState('Satara Rural District');
  const [newDescription, setNewDescription] = useState('');

  const isNavActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard' || pathname === '/dashboard/citizen';
    }
    return pathname.startsWith(href);
  };

  const handleNavClick = (item: NavItem, e: React.MouseEvent) => {
    if (item.isAction) {
      e.preventDefault();
      setIsSubmitModalOpen(true);
      setMobileOpen(false);
    } else {
      setMobileOpen(false);
    }
  };

  const handleChallengeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      toast.error('Please enter a challenge title.');
      return;
    }
    setIsSubmitModalOpen(false);
    toast.success('Local challenge submitted with GPS & photo evidence! Sent for Block Nodal verification.');
    setNewTitle('');
    setNewDescription('');
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#2c3437] font-sans antialiased">
      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-40 md:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ────────────────── LEFT SIDEBAR ────────────────── */}
      <aside
        className={`
          fixed left-0 top-0 h-screen w-64 bg-[#fbfcfd] border-r border-slate-200/70 flex flex-col py-8 px-6 space-y-2 z-50 transition-all duration-300 shadow-[2px_0_12px_rgba(0,0,0,0.015)]
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* SETU Brand */}
        <div className="flex items-center justify-between mb-8 px-1">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-black text-blue-600 tracking-tight font-sans">
              SETU
            </span>
            <span className="text-[10px] font-semibold text-blue-600/80 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
              Civic Hub
            </span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1 overflow-y-auto pr-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = !item.isAction && isNavActive(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(item, e)}
                className={`
                  flex items-center px-4 py-3 space-x-3 rounded-full text-sm font-medium transition-all duration-200
                  ${
                    active
                      ? 'bg-white text-blue-600 shadow-sm font-semibold'
                      : 'text-slate-500 hover:text-blue-600 hover:translate-x-1 hover:bg-white/60'
                  }
                `}
              >
                <Icon
                  className={`w-5 h-5 flex-shrink-0 ${
                    active ? 'text-blue-600' : 'text-slate-400'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section: Settings & Support */}
        <div className="pt-6 mt-auto border-t border-slate-200/80 space-y-1">
          <Link
            href="/dashboard/settings"
            onClick={() => setMobileOpen(false)}
            className={`flex items-center px-4 py-2.5 space-x-3 rounded-full text-sm font-medium transition-all duration-200 ${
              pathname.startsWith('/dashboard/settings')
                ? 'bg-white text-blue-600 shadow-sm font-semibold'
                : 'text-slate-500 hover:text-blue-600 hover:translate-x-1'
            }`}
          >
            <Settings className="w-4.5 h-4.5 text-slate-400" />
            <span>Settings</span>
          </Link>

          <button
            type="button"
            onClick={() => setShowHelpModal(true)}
            className="w-full flex items-center px-4 py-2.5 space-x-3 rounded-full text-sm font-medium text-slate-500 hover:text-blue-600 hover:translate-x-1 transition-all duration-200 text-left cursor-pointer"
          >
            <HelpCircle className="w-4.5 h-4.5 text-slate-400" />
            <span>Help & Support</span>
          </button>
        </div>
      </aside>

      {/* ────────────────── MAIN CONTENT CANVAS ────────────────── */}
      <main className="md:ml-64 min-h-screen flex flex-col bg-[#f7f9fb]">
        {/* ────────────────── TOP APP BAR ────────────────── */}
        <header className="sticky top-0 w-full z-40 bg-white/70 backdrop-blur-md shadow-[0_20px_40px_rgba(37,99,235,0.04)] border-b border-slate-100 flex justify-between items-center h-20 px-6 md:px-8">
          {/* Left: Mobile Menu + Search */}
          <div className="flex items-center space-x-4 flex-1">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 text-slate-500 hover:bg-blue-50/50 rounded-full transition-colors"
              aria-label="Toggle Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="relative w-full max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search challenges, projects, universities..."
                className="w-full pl-11 pr-4 py-2.5 bg-[#f0f4f7] rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-600/20 text-sm font-sans placeholder:text-slate-400 text-slate-700 transition-all"
              />
            </div>
          </div>

          {/* Right: Notifications, Help, User Profile */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2.5 text-slate-500 hover:bg-blue-50/50 hover:text-blue-600 rounded-full transition-colors active:scale-95 duration-200 cursor-pointer relative"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white" />
                </button>

                {/* Notifications Flyout */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                      <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                        Community Notifications
                      </span>
                      <span className="text-[10px] text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-full">
                        3 New
                      </span>
                    </div>
                    <div className="space-y-2.5 text-xs">
                      <div className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50/40 transition-colors">
                        <p className="font-bold text-slate-900">Challenge Verified</p>
                        <p className="text-slate-600 text-[11px] mt-0.5">
                          Water shortage report in Satara has been confirmed by Block Nodal Officer.
                        </p>
                        <span className="text-[10px] text-slate-400 mt-1 block">1 hour ago</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50/40 transition-colors">
                        <p className="font-bold text-slate-900">University Matched</p>
                        <p className="text-slate-600 text-[11px] mt-0.5">
                          IIT Delhi CRT team initiated prototype design for rural filter.
                        </p>
                        <span className="text-[10px] text-slate-400 mt-1 block">Yesterday</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => setShowHelpModal(true)}
                className="p-2.5 text-slate-500 hover:bg-blue-50/50 hover:text-blue-600 rounded-full transition-colors active:scale-95 duration-200 cursor-pointer"
                aria-label="Help"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Avatar & Metadata */}
            <div className="flex items-center space-x-3 border-l border-slate-200 pl-4 md:pl-6">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-900">Dojo</p>
                <p className="text-[10px] text-slate-500 font-medium">Citizen / Community</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-bold text-sm shadow-sm ring-2 ring-blue-600/10 cursor-pointer">
                D
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Container */}
        <div className="px-6 md:px-8 py-8 space-y-8 flex-1">
          {children}
        </div>
      </main>

      {/* ────────────────── SUBMIT CHALLENGE MODAL ────────────────── */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 border border-slate-100 my-8">
            <button
              onClick={() => setIsSubmitModalOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                <PlusCircle className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Submit a Local Challenge</h2>
              <p className="text-xs text-slate-500 mt-1">
                Share a real problem in your village or community to match with university R&D squads and CSR funding.
              </p>
            </div>

            <form onSubmit={handleChallengeSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Challenge Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Broken borewell pump and high fluoride contamination"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-[#f0f4f7] rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 border-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Sector
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#f0f4f7] rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 border-none"
                  >
                    <option>Water & Sanitation</option>
                    <option>Waste Management</option>
                    <option>Rural Energy & Solar</option>
                    <option>Agriculture & Cold Storage</option>
                    <option>Healthcare Devices</option>
                    <option>Roads & Transport</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Location / Village
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-[#f0f4f7] rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 border-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Description of the Problem
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe who is affected, how long this issue has persisted, and what immediate outcome is required."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#f0f4f7] rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 border-none"
                />
              </div>

              {/* Photo & GPS Evidence Mock */}
              <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Camera className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">GPS Coordinates Attached</p>
                    <p className="text-[11px] text-slate-500">17.6805° N, 74.0183° E (Satara)</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-blue-600 bg-white px-2.5 py-1 rounded-full shadow-xs">
                  Evidence Ready
                </span>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-5 py-2.5 rounded-full text-xs font-bold text-slate-500 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Challenge
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ────────────────── HELP MODAL ────────────────── */}
      {showHelpModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 border border-slate-100">
            <button
              onClick={() => setShowHelpModal(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 mb-2">How SETU Works</h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              SETU is India&apos;s problem-to-solution civic innovation network. Here is how your submissions turn into verified reality:
            </p>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start space-x-3">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <strong className="text-slate-900">Community Problem:</strong> Report local issues with photo & GPS proof.
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <strong className="text-slate-900">Verification:</strong> Block Nodal Officers verify authenticity in the field.
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <strong className="text-slate-900">University Match:</strong> Faculty & student squads claim challenges for R&D.
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                  4
                </span>
                <div>
                  <strong className="text-slate-900">CSR Pilot & Impact:</strong> Industry partners fund pilots under Schedule VII for measurable societal outcomes.
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowHelpModal(false)}
                className="px-5 py-2 rounded-full bg-blue-600 text-white text-xs font-bold"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
