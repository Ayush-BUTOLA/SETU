import React from 'react';
import Link from 'next/link';

const footerLinks = [
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'About', href: '/about' },
  { label: 'Explore Challenges', href: '/explore-challenges' },
  { label: 'Impact Stories', href: '/impact-stories' },
  { label: 'For Universities & Industry', href: '/for-universities-industry' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

export default function SiteFooter() {
  return (
    <footer className="bg-[#090b0b] text-[#f5f6f1] pt-16 pb-10 px-6 sm:px-12">
      <div className="max-w-[1180px] mx-auto">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-10 border-b border-white/10 pb-12">
          {/* Brand */}
          <div className="max-w-xs">
            <Link
              href="/"
              className="flex items-center gap-2.5 mb-4 w-fit hover:opacity-80 transition-opacity"
              aria-label="SETU home"
            >
              <span className="w-9 h-9 rounded-full bg-white text-black font-serif flex items-center justify-center text-lg font-normal">
                S
              </span>
              <span className="tracking-[0.18em] font-extrabold text-[15px] text-white">SETU</span>
            </Link>
            <p className="text-[13px] text-[#89918c] leading-relaxed">
              Connecting communities with the people, knowledge, and resources needed to create lasting solutions.
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-10 gap-y-3">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[12px] font-mono uppercase tracking-[0.1em] text-[#89918c] hover:text-[#9de7cf] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-8">
          <p className="text-[11px] font-mono text-[#6f7772] tracking-widest uppercase">
            © {new Date().getFullYear()} SETU
          </p>
          <p className="text-[11px] font-mono text-[#6f7772] tracking-widest uppercase">
            No fake metrics. No unverified claims.
          </p>
        </div>
      </div>
    </footer>
  );
}
