'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import StaggeredMenu from '@/components/StaggeredMenu';
import SiteFooter from '@/components/SiteFooter';
import ScrollReveal from '@/components/ScrollReveal';
import { CONTACT_REASONS, STAGGERED_MENU_ITEMS, STAGGERED_SOCIAL_ITEMS } from '@/lib/setu-data';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowRight, ArrowUpRight, MessageSquare, Building2, Lightbulb, HelpCircle } from 'lucide-react';
import { useAuthModal } from '@/context/AuthModalContext';

const REASON_ICONS = {
  'share-challenge': MessageSquare,
  'university-expertise': Building2,
  'industry-csr': Lightbulb,
  'general': HelpCircle,
};

const REASON_TILES = [
  {
    value: 'share-challenge',
    label: 'Share a community challenge',
    desc: 'You have a local problem that affects people in your area and want to bring it forward.',
  },
  {
    value: 'university-expertise',
    label: 'Bring university expertise',
    desc: 'Your institution has research capability or student teams that could help with real community challenges.',
  },
  {
    value: 'industry-csr',
    label: 'Explore industry or CSR collaboration',
    desc: 'Your company wants to support practical, evidence-based community problem-solving.',
  },
  {
    value: 'general',
    label: 'Ask a general question',
    desc: 'You want to learn more about how SETU works or what it does.',
  },
];

export default function ContactPage() {
  const { openAuth } = useAuthModal();
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    org: '',
    message: '',
    reason: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleTileSelect = (value: string) => {
    setSelectedReason(value);
    setFormData((f) => ({ ...f, reason: value }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.reason) {
      toast.error('Please select a reason for contacting SETU.');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success(
        'Thank you. Your message has been received. Someone from the SETU network will be in touch.'
      );
      setFormData({ name: '', email: '', org: '', message: '', reason: '' });
      setSelectedReason('');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#f5f6f1] text-[#101312]">
      <StaggeredMenu
        position="right"
        items={STAGGERED_MENU_ITEMS}
        socialItems={STAGGERED_SOCIAL_ITEMS}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#101312"
        openMenuButtonColor="#f5f6f1"
        changeMenuColorOnOpen={true}
        colors={['#09130f', '#132820', '#267f68']}
        accentColor="#9de7cf"
        isFixed={true}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-[72px] z-30 flex items-center justify-between px-6 sm:px-12 bg-[#f5f6f1]/90 backdrop-blur-md border-b border-[#d9ddd5]">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-bold text-[#101312] hover:opacity-70 transition-opacity"
          aria-label="Back to SETU home"
        >
          <span className="w-8 h-8 rounded-full bg-[#101312] text-white font-serif flex items-center justify-center text-base font-normal">
            S
          </span>
          <span className="tracking-[0.16em] font-extrabold text-[14px]">SETU</span>
        </Link>
        <div className="mr-16 sm:mr-24">
          <button
            type="button"
            onClick={() => openAuth()}
            className="flex items-center gap-2 bg-[#101312] text-white hover:bg-[#267f68] transition-all px-4 sm:px-5 py-2.5 rounded-full text-[11px] font-mono tracking-wider uppercase font-semibold shadow-md cursor-pointer"
          >
            <span>Login</span>
            <ArrowRight className="size-3.5" />
          </button>
        </div>
      </header>

      <main className="pt-[72px]">
        {/* Page intro */}
        <section className="py-16 sm:py-24 section-shell" aria-label="Contact SETU">
          <ScrollReveal>
            <p className="eyebrow text-[#6f7772] mb-4">GET IN TOUCH</p>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight max-w-xl">
              Reach out
              <br />
              <em
                className="font-normal text-[#267f68]"
                style={{ fontFamily: 'var(--font-lora), Georgia, serif', fontStyle: 'italic' }}
              >
                to SETU.
              </em>
            </h1>
            <p className="mt-4 text-base text-[#59615c] leading-relaxed max-w-lg">
              Choose why you are getting in touch, then fill out the form below.
              No contact details are shown here because SETU does not have verified public contact information to share.
            </p>
          </ScrollReveal>
        </section>

        {/* CTA tiles */}
        <section className="section-shell pb-12" aria-label="Contact reason selection">
          <p className="font-mono text-[11px] uppercase tracking-widest text-[#6f7772] mb-5">
            Why are you reaching out?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {REASON_TILES.map((tile) => {
              const Icon = REASON_ICONS[tile.value as keyof typeof REASON_ICONS];
              const isSelected = selectedReason === tile.value;
              return (
                <button
                  key={tile.value}
                  type="button"
                  onClick={() => handleTileSelect(tile.value)}
                  className={`p-5 rounded-2xl text-left border transition-all focus-visible:outline-2 focus-visible:outline-[#267f68] ${
                    isSelected
                      ? 'bg-[#267f68] border-[#267f68] text-white shadow-lg'
                      : 'bg-white border-[#d9ddd5] text-[#101312] hover:border-[#267f68] hover:shadow-sm'
                  }`}
                  aria-pressed={isSelected}
                  aria-label={tile.label}
                >
                  <Icon
                    className={`size-5 mb-3 ${isSelected ? 'text-[#9de7cf]' : 'text-[#267f68]'}`}
                    aria-hidden="true"
                  />
                  <h3 className={`font-mono text-xs uppercase tracking-wider font-bold mb-1.5 ${isSelected ? 'text-white' : 'text-[#101312]'}`}>
                    {tile.label}
                  </h3>
                  <p className={`text-xs leading-relaxed ${isSelected ? 'text-white/80' : 'text-[#59615c]'}`}>
                    {tile.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Contact form */}
        <section className="section-shell pb-24 sm:pb-32" aria-label="Contact form">
          <div className="max-w-2xl">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block font-mono text-[11px] uppercase tracking-wider text-[#6f7772] mb-2">
                    Name <span className="text-[#a16d67]" aria-label="required">*</span>
                  </label>
                  <Input
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                    className="bg-white border-[#d9ddd5] focus:border-[#267f68] font-sans text-sm"
                    aria-required="true"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block font-mono text-[11px] uppercase tracking-wider text-[#6f7772] mb-2">
                    Email <span className="text-[#a16d67]" aria-label="required">*</span>
                  </label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="bg-white border-[#d9ddd5] focus:border-[#267f68] font-sans text-sm"
                    aria-required="true"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-org" className="block font-mono text-[11px] uppercase tracking-wider text-[#6f7772] mb-2">
                  Organisation or role
                </label>
                <Input
                  id="contact-org"
                  name="org"
                  value={formData.org}
                  onChange={handleChange}
                  placeholder="University, company, community group, or your role"
                  className="bg-white border-[#d9ddd5] focus:border-[#267f68] font-sans text-sm"
                />
              </div>

              <div>
                <label htmlFor="contact-reason" className="block font-mono text-[11px] uppercase tracking-wider text-[#6f7772] mb-2">
                  Reason for contacting <span className="text-[#a16d67]" aria-label="required">*</span>
                </label>
                <Select
                  value={formData.reason}
                  onValueChange={(v) => { const val = v ?? ''; setFormData((f) => ({ ...f, reason: val })); setSelectedReason(val); }}
                >
                  <SelectTrigger
                    id="contact-reason"
                    className="bg-white border-[#d9ddd5] font-sans text-sm"
                    aria-required="true"
                  >
                    <SelectValue placeholder="Select a reason…" />
                  </SelectTrigger>
                  <SelectContent>
                    {CONTACT_REASONS.map((r) => (
                      <SelectItem key={r.value} value={r.value} className="font-sans text-sm">
                        {r.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="contact-message" className="block font-mono text-[11px] uppercase tracking-wider text-[#6f7772] mb-2">
                  Message <span className="text-[#a16d67]" aria-label="required">*</span>
                </label>
                <Textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Describe your challenge, question, or how you would like to get involved…"
                  className="bg-white border-[#d9ddd5] focus:border-[#267f68] font-sans text-sm resize-none"
                  aria-required="true"
                />
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-[#6f7772] leading-relaxed">
                This form does not yet connect to a live backend. Submitting it will confirm
                receipt in this browser only. No data is transmitted or stored.
              </p>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2.5 bg-[#267f68] hover:bg-[#18372e] disabled:opacity-60 text-white px-8 py-3.5 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer disabled:cursor-not-allowed"
                aria-label="Send your message to SETU"
              >
                {submitting ? 'Sending…' : 'Send Message'}
                {!submitting && <ArrowUpRight className="size-4" />}
              </button>
            </form>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
