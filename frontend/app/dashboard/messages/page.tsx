'use client';

import React, { useState } from 'react';
import { MessageSquare, Send, User, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
  sender: string;
  role: string;
  text: string;
  time: string;
  isSelf: boolean;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'Dr. Ananya Sharma',
      role: 'IIT Delhi CRT',
      text: 'Namaskar Rameshwar ji! We reviewed the water TDS report for Khandala Borewell #4. Our team has prepared the initial gravity-assisted filter schematic.',
      time: '10:30 AM',
      isSelf: false,
    },
    {
      sender: 'Rameshwar Patil',
      role: 'Gram Vikas Committee',
      text: 'Dhanyawad Doctor Madam. Gram Panchayat has identified the primary school pump house as the installation location with 24-hour community access.',
      time: '11:15 AM',
      isSelf: true,
    },
    {
      sender: 'Vikramaditya Singhania',
      role: 'Tata Sustainability Council',
      text: 'Tata Foundation is approving Tranche 1 procurement (₹4.2 Lakh) upon VSO site verification this Friday.',
      time: '01:45 PM',
      isSelf: false,
    },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: 'You',
        role: 'Active Session',
        text: inputText,
        time: 'Just now',
        isSelf: true,
      },
    ]);
    setInputText('');
    toast.success('Message sent to project collaboration room.');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col">
      <div className="pb-3 border-b border-slate-800 flex-shrink-0">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-emerald-400" />
          Project Collaboration Room
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Direct channel connecting Gram Panchayat, Lead University Faculty, and CSR Funding Partners.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto bg-[#0d1424] border border-slate-800 rounded-2xl p-4 space-y-3.5">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${m.isSelf ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-center gap-2 mb-1 text-[11px] text-slate-400">
              <span className="font-bold text-slate-300">{m.sender}</span>
              <span>•</span>
              <span className="font-mono text-emerald-400">{m.role}</span>
              <span>•</span>
              <span>{m.time}</span>
            </div>
            <div
              className={`max-w-lg p-3 rounded-2xl text-xs leading-relaxed ${
                m.isSelf
                  ? 'bg-emerald-600 text-white rounded-br-none shadow-md'
                  : 'bg-slate-900 border border-slate-750 text-slate-200 rounded-bl-none'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="flex gap-2 flex-shrink-0">
        <input
          type="text"
          placeholder="Type a message or update on challenge progress..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-750 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
        />
        <button
          type="submit"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-lg cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          Send
        </button>
      </form>
    </div>
  );
}
