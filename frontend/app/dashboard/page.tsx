'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Compass,
  GraduationCap,
  FileCheck2,
  Handshake,
  TrendingUp,
  Clock,
  CheckCircle2,
  CheckCircle,
  Award,
  Layers,
  Wrench,
  ChevronRight,
  MoreVertical,
  ExternalLink,
  PlusCircle,
  Camera,
  Send,
  X,
  Sparkles,
  Building2,
  Search,
  Users,
  Activity,
  Droplets,
  Recycle,
  HeartPulse,
} from 'lucide-react';
import { toast } from 'sonner';

export default function SetuDashboardPage() {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'verified' | 'development'>('all');

  // Submit challenge form
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Water & Sanitation');
  const [location, setLocation] = useState('Satara Rural District');
  const [description, setDescription] = useState('');

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Please enter a challenge title.');
      return;
    }
    setIsReportModalOpen(false);
    toast.success('Challenge reported with GPS & photo evidence! Dispatched to Block Nodal Officer.');
    setTitle('');
    setDescription('');
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* ────────────────── MAIN GREETING ────────────────── */}
      <section className="flex flex-col space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 font-sans">
          Hi, Dojo 👋
        </h1>
        <p className="text-slate-500 text-sm">
          Here’s what’s happening with your community impact today.
        </p>
      </section>

      {/* ────────────────── KPI CARDS (3-CARD BENTO GRID) ────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Open Challenges */}
        <div className="bg-white p-8 rounded-3xl flex flex-col space-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-slate-100/60 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <MapPin className="w-6 h-6 stroke-[1.75]" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 font-sans">Open Challenges</p>
            <p className="text-3xl font-black text-slate-900 mt-1">24</p>
          </div>
          <div className="flex items-center text-xs text-emerald-600 font-bold">
            <TrendingUp className="w-4 h-4 mr-1 stroke-[2.5]" />
            +4 this month
          </div>
        </div>

        {/* Card 2: Active Projects */}
        <div className="bg-white p-8 rounded-3xl flex flex-col space-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-slate-100/60 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
            <Wrench className="w-6 h-6 stroke-[1.75]" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 font-sans">Active Projects</p>
            <p className="text-3xl font-black text-slate-900 mt-1">08</p>
          </div>
          <p className="text-xs text-slate-500">3 currently in development</p>
        </div>

        {/* Card 3: Verified Impact */}
        <div className="bg-white p-8 rounded-3xl flex flex-col space-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-slate-100/60 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
            <CheckCircle className="w-6 h-6 stroke-[1.75]" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 font-sans">Verified Impact</p>
            <p className="text-3xl font-black text-slate-900 mt-1">12</p>
          </div>
          <p className="text-xs text-slate-500">+5 outcomes this month</p>
        </div>
      </section>

      {/* ────────────────── ASYMMETRIC MAIN CONTENT (4/12 & 8/12) ────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ────────────────── LEFT COLUMN (4/12) ────────────────── */}
        <div className="lg:col-span-4 space-y-8">
          {/* Quick Actions */}
          <div className="space-y-4">
            <h2 className="font-bold text-xl text-slate-900 font-sans">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Action 1: Report a Challenge */}
              <button
                type="button"
                onClick={() => setIsReportModalOpen(true)}
                className="group flex flex-col items-center justify-center p-6 bg-[#f0f4f7] rounded-2xl hover:bg-blue-600 hover:text-white transition-all text-center cursor-pointer shadow-xs hover:shadow-md duration-200"
              >
                <MapPin className="w-7 h-7 mb-2 text-slate-700 group-hover:text-white transition-colors stroke-[1.75]" />
                <span className="text-xs font-bold font-sans">Report a Challenge</span>
              </button>

              {/* Action 2: Explore Challenges */}
              <Link
                href="/dashboard/explore"
                className="group flex flex-col items-center justify-center p-6 bg-[#f0f4f7] rounded-2xl hover:bg-blue-600 hover:text-white transition-all text-center cursor-pointer shadow-xs hover:shadow-md duration-200"
              >
                <Compass className="w-7 h-7 mb-2 text-slate-700 group-hover:text-white transition-colors stroke-[1.75]" />
                <span className="text-xs font-bold font-sans">Explore Challenges</span>
              </Link>

              {/* Action 3: Find a University */}
              <Link
                href="/dashboard/universities"
                className="group flex flex-col items-center justify-center p-6 bg-[#f0f4f7] rounded-2xl hover:bg-blue-600 hover:text-white transition-all text-center cursor-pointer shadow-xs hover:shadow-md duration-200"
              >
                <GraduationCap className="w-7 h-7 mb-2 text-slate-700 group-hover:text-white transition-colors stroke-[1.75]" />
                <span className="text-xs font-bold font-sans">Find a University</span>
              </Link>

              {/* Action 4: My Challenges */}
              <Link
                href="/dashboard/my-challenges"
                className="group flex flex-col items-center justify-center p-6 bg-[#f0f4f7] rounded-2xl hover:bg-blue-600 hover:text-white transition-all text-center cursor-pointer shadow-xs hover:shadow-md duration-200"
              >
                <FileCheck2 className="w-7 h-7 mb-2 text-slate-700 group-hover:text-white transition-colors stroke-[1.75]" />
                <span className="text-xs font-bold font-sans">My Challenges</span>
              </Link>

              {/* Action 5: Industry / CSR Connect (Spans 2 columns) */}
              <Link
                href="/dashboard/industry"
                className="col-span-2 group flex items-center justify-center p-5 bg-[#f0f4f7] rounded-2xl hover:bg-blue-600 hover:text-white transition-all text-center cursor-pointer shadow-xs hover:shadow-md duration-200"
              >
                <Handshake className="w-6 h-6 mr-3 text-slate-700 group-hover:text-white transition-colors stroke-[1.75]" />
                <span className="text-xs font-bold font-sans">Industry / CSR Connect</span>
              </Link>
            </div>
          </div>

          {/* Recent Activity (Whitespace separation, no divider lines) */}
          <div className="space-y-4">
            <h2 className="font-bold text-xl text-slate-900 font-sans">Recent Activity</h2>
            <div className="bg-blue-50/40 p-6 rounded-3xl space-y-6 border border-blue-100/40">
              {/* Activity 1 */}
              <div className="flex items-start space-x-3.5">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 stroke-[2]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Challenge Submitted</p>
                  <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                    &ldquo;Water shortage reported in your community.&rdquo;
                  </p>
                  <span className="text-[11px] text-slate-400 mt-1 block">2 hours ago</span>
                </div>
              </div>

              {/* Activity 2 */}
              <div className="flex items-start space-x-3.5">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 stroke-[2]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Challenge Verified</p>
                  <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                    &ldquo;Your waste-management challenge has been verified.&rdquo;
                  </p>
                  <span className="text-[11px] text-slate-400 mt-1 block">Yesterday</span>
                </div>
              </div>

              {/* Activity 3 */}
              <div className="flex items-start space-x-3.5">
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <GraduationCap className="w-4 h-4 stroke-[2]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">University Matched</p>
                  <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                    &ldquo;University team has shown interest in your challenge.&rdquo;
                  </p>
                  <span className="text-[11px] text-slate-400 mt-1 block">2 days ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ────────────────── RIGHT COLUMN (8/12) ────────────────── */}
        <div className="lg:col-span-8 space-y-6">
          {/* Active & Upcoming Projects Header */}
          <div className="flex justify-between items-end">
            <h2 className="font-bold text-xl text-slate-900 font-sans">
              Active &amp; Upcoming Projects
            </h2>
            <Link
              href="/dashboard/projects"
              className="text-blue-600 text-sm font-bold hover:underline"
            >
              View All
            </Link>
          </div>

          {/* Large Rounded Card with Project List Rows */}
          <div className="bg-white rounded-3xl p-3 space-y-2 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-slate-100/60">
            {/* Project Row 1 */}
            <div className="flex items-center justify-between p-5 hover:bg-[#f0f4f7] transition-colors rounded-2xl group cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs">
                  <Droplets className="w-6 h-6 stroke-[1.75]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    Rural Water Quality Monitoring
                  </p>
                  <p className="text-xs text-slate-500 font-sans">
                    University-led • CSR Supported
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                    In Development
                  </span>
                  <p className="text-[10px] text-slate-400 font-sans mt-1">Stage: R&amp;D • TRL-5</p>
                </div>
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100">
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>

            {/* Project Row 2 */}
            <div className="flex items-center justify-between p-5 hover:bg-[#f0f4f7] transition-colors rounded-2xl group cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shadow-xs">
                  <Recycle className="w-6 h-6 stroke-[1.75]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    Smart Waste Management
                  </p>
                  <p className="text-xs text-slate-500 font-sans">
                    University-led • Industry Supported
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-100">
                    Pilot
                  </span>
                  <p className="text-[10px] text-slate-400 font-sans mt-1">Stage: Field Deployment</p>
                </div>
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100">
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>

            {/* Project Row 3 */}
            <div className="flex items-center justify-between p-5 hover:bg-[#f0f4f7] transition-colors rounded-2xl group cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-xs">
                  <HeartPulse className="w-6 h-6 stroke-[1.75]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    Low-Cost Rural Healthcare Device
                  </p>
                  <p className="text-xs text-slate-500 font-sans">
                    University-led
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                    Validation
                  </span>
                  <p className="text-[10px] text-slate-400 font-sans mt-1">Stage: Field Validation</p>
                </div>
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100">
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>

            {/* Timeline Rail Visualization (Subtle decorative element) */}
            <div className="h-1.5 w-full bg-[#eaeff2] mt-4 relative overflow-hidden rounded-full">
              <div className="absolute left-0 top-0 h-full w-2/5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" />
            </div>
          </div>

          {/* ────────────────── IMPACT OVERVIEW CARD ────────────────── */}
          <div className="bg-white p-6 rounded-3xl relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-slate-100/60">
            {/* Background Decorative Verification Watermark */}
            <div className="absolute -top-4 -right-4 p-8 opacity-[0.07] pointer-events-none">
              <Award className="w-36 h-36 text-blue-600" />
            </div>

            <h3 className="text-sm font-bold text-slate-900 mb-4 font-sans">Impact Overview</h3>
            <div className="flex flex-wrap gap-3">
              <div className="bg-purple-100/60 text-purple-900 px-4 py-2 rounded-full flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
                <span className="text-xs font-bold font-sans">12 Verified Outcomes</span>
              </div>
              <div className="bg-blue-100/60 text-blue-900 px-4 py-2 rounded-full flex items-center space-x-2">
                <span className="text-xs font-bold font-sans">08 Active Pilots</span>
              </div>
              <div className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full flex items-center space-x-2">
                <span className="text-xs font-bold font-sans">24 Open Challenges</span>
              </div>
            </div>
          </div>

          {/* ────────────────── SETU UPDATES CARD ────────────────── */}
          <div className="bg-blue-50/50 p-6 rounded-3xl space-y-4 border border-blue-100/50">
            <h3 className="text-sm font-bold text-slate-900 font-sans">SETU Updates</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <span className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-900">New University Joined</p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    A new university has joined the SETU innovation network.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 pt-2 border-t border-blue-100/60">
                <span className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-900">CSR Opportunity</p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    New funding opportunity available for verified civic challenges.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 pt-2 border-t border-blue-100/60">
                <span className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-900">Impact Milestone</p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    3 new Verified Societal Outcomes were recorded this week.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ────────────────── SUBMIT MODAL (Triggered via Quick Action) ────────────────── */}
      {isReportModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 border border-slate-100 my-8">
            <button
              onClick={() => setIsReportModalOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                <MapPin className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Report a Community Challenge</h2>
              <p className="text-xs text-slate-500 mt-1">
                Provide local details to connect with engineering squads and CSR pilot support.
              </p>
            </div>

            <form onSubmit={handleReportSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Challenge Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Water shortage in Phaltan hamlet"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-[#f0f4f7] rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 border-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Sector</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#f0f4f7] rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 border-none"
                  >
                    <option>Water & Sanitation</option>
                    <option>Smart Waste Management</option>
                    <option>Rural Healthcare Devices</option>
                    <option>Agricultural Cold Storage</option>
                    <option>Rural Energy & Solar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#f0f4f7] rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/20 border-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Description</label>
                <textarea
                  rows={3}
                  placeholder="Explain the problem and who is affected in your community..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#f0f4f7] rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 border-none"
                />
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Camera className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">GPS Evidence Attached</p>
                    <p className="text-[11px] text-slate-500">17.6805° N, 74.0183° E</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-blue-600 bg-white px-2.5 py-1 rounded-full shadow-xs">
                  Ready
                </span>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(false)}
                  className="px-5 py-2.5 rounded-full text-xs font-bold text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
