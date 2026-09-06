'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  tag: string;
}

const FAQS: FaqItem[] = [
  {
    tag: 'ARCHITECTURE',
    question: 'Is SETU just a grievance portal?',
    answer:
      'No. A grievance portal terminates at registration or administrative escalation. SETU is a closed-loop execution system connecting validated community challenges with academic R&D ownership, industry/CSR co-sponsorship, real-world field pilots, and multi-party independent outcome verification.',
  },
  {
    tag: 'GOVERNANCE',
    question: 'Why use AI?',
    answer:
      'AI is used specifically where language diversity, semantic ambiguity, and scale make manual processing slow: structuring multi-lingual voice/text intake, detecting semantic duplicates across districts, assisting urgency prioritization, and ranking institutional capability. AI does not receive autonomous execution or approval authority.',
  },
  {
    tag: 'ACCOUNTABILITY',
    question: 'What if the AI is wrong?',
    answer:
      'Every AI recommendation operates under human-in-the-loop governance. District moderators and university coordinators can override any recommendation with a single click. The recommendation, contributing signals, confidence score, and human override justification are permanently logged for auditability.',
  },
  {
    tag: 'VERIFICATION',
    question: 'How do you prove impact?',
    answer:
      'Through our Triangle of Trust framework: (1) Technical lab and sensor telemetry compared against pre-pilot baselines, (2) Affected citizen community confirmation that the deployment took place, and (3) Official institutional/nodal officer certification. No outcome receives a VSO badge without verifiable evidence.',
  },
  {
    tag: 'INTEGRITY',
    question: 'How do you stop spam and frivolous submissions?',
    answer:
      'Through multi-layer screening: verified mobile OTP intake, mandatory GPS coordinates, photographic/video evidence requirements, automated semantic clustering against existing challenges, and district coordinator review before challenge acceptance.',
  },
  {
    tag: 'PRIVACY',
    question: 'How will citizen data be protected?',
    answer:
      'SETU implements strict data minimization, role-based access control (RBAC), and encryption at rest and in transit. Public map views fuzz exact residential coordinates, and personal identifiable information (PII) is accessible only to authorized field verification coordinators.',
  },
  {
    tag: 'MATCHING',
    question: 'How does a university get matched to a problem?',
    answer:
      'Using an explainable, weighted capability model considering: department domain fit, faculty patent and publication history, laboratory testing equipment, previous field projects, student capacity, and deployment proximity—not simple geographic proximity.',
  },
  {
    tag: 'INFRASTRUCTURE',
    question: 'How does SETU scale nationwide?',
    answer:
      'Through modular services, logical district and state tenant boundaries, stateless API services, object storage for media evidence, and asynchronous processing workers designed for low-bandwidth rural connectivity and horizontal cloud scaling.',
  },
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="divide-y divide-[#d9ddd5]">
      {FAQS.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="py-6 first:pt-0 last:pb-0">
            <button
              onClick={() => toggle(i)}
              className="w-full text-left flex items-start justify-between gap-4 group cursor-pointer focus:outline-none"
              aria-expanded={isOpen}
            >
              <div className="space-y-1.5">
                <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#6f7772] group-hover:text-[#267f68] transition-colors">
                  {faq.tag} // 0{i + 1}
                </span>
                <h3 className="text-lg sm:text-xl font-semibold text-[#101312] group-hover:text-[#267f68] transition-colors leading-snug">
                  {faq.question}
                </h3>
              </div>
              <div
                className={`w-8 h-8 rounded-full border border-[#d9ddd5] flex items-center justify-center shrink-0 transition-transform duration-300 ${
                  isOpen ? 'rotate-180 bg-[#101312] text-white border-[#101312]' : 'group-hover:border-[#101312]'
                }`}
              >
                <ChevronDown className="size-4" />
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <p className="mt-4 text-sm sm:text-base text-[#59615c] leading-relaxed max-w-3xl pr-8">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default FaqAccordion;
