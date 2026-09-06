'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import AuthSwitch from '@/components/ui/auth-switch';
import { ArrowLeft } from 'lucide-react';

function LoginContent() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex flex-col justify-between p-4 sm:p-6 md:p-8 relative overflow-hidden font-sans">
      {/* Top Bar Header */}
      <header className="relative z-20 flex items-center justify-between max-w-[900px] mx-auto w-full mb-3">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-bold tracking-wider text-sm text-white hover:opacity-90 transition-opacity drop-shadow"
          aria-label="Return to SETU"
        >
          <span className="w-8 h-8 rounded-full bg-white text-[#5568d3] font-serif flex items-center justify-center text-base font-bold shadow-md">
            S
          </span>
          <span className="tracking-[0.16em] font-extrabold text-[14px]">SETU</span>
        </Link>

        <div className="flex items-center gap-2.5">
          <Link
            href="/"
            className="flex items-center gap-1.5 bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white text-xs px-3.5 py-1.5 rounded-full font-mono uppercase tracking-wider transition-colors shadow-sm"
          >
            <ArrowLeft className="size-3" />
            <span>Return Home</span>
          </Link>
        </div>
      </header>

      {/* Center 21st.dev AuthSwitch Card */}
      <main className="relative z-20 flex-1 flex items-center justify-center my-auto py-4">
        <AuthSwitch />
      </main>

      {/* Footer minimal info */}
      <footer className="relative z-20 text-center text-xs text-white/70 font-mono py-2">
        SETU National Problem-to-Solution Knowledge Network • Verified Access
      </footer>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen w-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white font-mono">
        Loading...
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
