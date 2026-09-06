'use client';

import React, { useState, useEffect } from 'react';
import NumberFlow from '@number-flow/react';

export function KpiCounters() {
  const [vsoCount, setVsoCount] = useState(0);
  const [labsCount, setLabsCount] = useState(0);
  const [csrAmount, setCsrAmount] = useState(0);
  const [auditedPct, setAuditedPct] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVsoCount(127);
      setLabsCount(84);
      setCsrAmount(4.2);
      setAuditedPct(100);
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-6 bg-white/70 backdrop-blur-md p-8 rounded-3xl border border-[#9de7cf]/60 shadow-sm">
      <div>
        <div className="font-mono text-4xl sm:text-5xl font-extrabold text-[#18372e] tracking-tight flex items-baseline">
          <NumberFlow value={vsoCount} />
          <span>+</span>
        </div>
        <div className="font-mono text-xs uppercase tracking-wider text-[#267f68] mt-1 font-semibold">
          Verified Outcomes (VSOs)
        </div>
      </div>
      <div>
        <div className="font-mono text-4xl sm:text-5xl font-extrabold text-[#18372e] tracking-tight">
          <NumberFlow value={labsCount} />
        </div>
        <div className="font-mono text-xs uppercase tracking-wider text-[#267f68] mt-1 font-semibold">
          University Labs Active
        </div>
      </div>
      <div>
        <div className="font-mono text-4xl sm:text-5xl font-extrabold text-[#18372e] tracking-tight flex items-baseline">
          <span>₹</span>
          <NumberFlow value={csrAmount} format={{ minimumFractionDigits: 1, maximumFractionDigits: 1 }} />
          <span>&nbsp;Cr</span>
        </div>
        <div className="font-mono text-xs uppercase tracking-wider text-[#267f68] mt-1 font-semibold">
          CSR Capital Enabled
        </div>
      </div>
      <div>
        <div className="font-mono text-4xl sm:text-5xl font-extrabold text-[#18372e] tracking-tight flex items-baseline">
          <NumberFlow value={auditedPct} />
          <span>%</span>
        </div>
        <div className="font-mono text-xs uppercase tracking-wider text-[#267f68] mt-1 font-semibold">
          Audited Deployments
        </div>
      </div>
    </div>
  );
}
