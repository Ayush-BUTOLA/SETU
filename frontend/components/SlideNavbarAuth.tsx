'use client';

import React, { useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export type UserRole =
  | "Citizen / Community"
  | "University / Faculty"
  | "CSR / Industry Partner";

export interface RoleOption {
  id: string;
  label: UserRole;
  sub: string;
}

/**
 * Exactly the 3 requested personas (Govt / Nodal Officer excluded per user instruction)
 */
export const DEFAULT_ROLES: RoleOption[] = [
  {
    id: "citizen",
    label: "Citizen / Community",
    sub: "Submit local challenges with GPS & photo evidence",
  },
  {
    id: "university",
    label: "University / Faculty",
    sub: "Accept challenges, lead capability-matched R&D",
  },
  {
    id: "csr",
    label: "CSR / Industry Partner",
    sub: "Fund & mentor pilots under Schedule VII",
  },
];

export interface SlideNavbarAuthProps {
  open: boolean;
  onClose: () => void;
  roles?: RoleOption[];
  theme?: "dark" | "paper";
  initialRole?: UserRole;
}

export function SlideNavbarAuth({
  open,
  onClose,
  roles = DEFAULT_ROLES,
  theme = "dark",
  initialRole,
}: SlideNavbarAuthProps) {
  const router = useRouter();
  const reduced = useReducedMotion();

  // Keyboard accessibility: Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  const handleSelectRole = (roleLabel: UserRole) => {
    onClose();
    router.push(`/login?role=${encodeURIComponent(roleLabel)}`);
  };

  // Spring animation physics
  const slideVariants = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        hidden: { x: "100%" },
        visible: {
          x: 0,
          transition: { type: "spring" as const, stiffness: 350, damping: 36 },
        },
        exit: {
          x: "100%",
          transition: { duration: 0.22, ease: "easeIn" as const },
        },
      };

  const isDark = theme === "dark";

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className={`fixed inset-0 z-[200] backdrop-blur-sm ${
              isDark ? "bg-black/75" : "bg-black/40"
            }`}
          />

          {/* Slide-out Drawer Panel */}
          <motion.aside
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Select Persona"
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`fixed top-0 right-0 bottom-0 w-[min(500px,100vw)] z-[201] flex flex-col p-6 sm:p-10 overflow-y-auto shadow-2xl transition-colors ${
              isDark
                ? "bg-zinc-950 border-l border-white/10 text-zinc-100"
                : "bg-[#fffef7] border-l border-[#aaaaaa] text-[#000000]"
            }`}
          >
            {/* Top Bar */}
            <div className="flex justify-between items-center mb-8">
              <span
                className={`text-[11px] font-mono uppercase tracking-[0.2em] ${
                  isDark ? "text-zinc-400" : "text-[#666666]"
                }`}
              >
                Step 01 // Select Persona
              </span>

              <button
                onClick={onClose}
                aria-label="Close drawer"
                className={`w-8 h-8 rounded-full border flex items-center justify-center text-lg transition-colors cursor-pointer ${
                  isDark
                    ? "border-white/20 hover:border-white/60 bg-white/5 hover:bg-white/10 text-zinc-300"
                    : "border-[#aaaaaa] hover:border-black bg-transparent text-black"
                }`}
              >
                ×
              </button>
            </div>

            {/* Persona Selection (Exactly 3 options) */}
            <div>
              <h2
                className={`text-2xl sm:text-3xl font-light tracking-tight mb-2 ${
                  isDark ? "text-white" : "text-[#000000]"
                }`}
              >
                Select your role in the closed loop.
              </h2>
              <p
                className={`text-xs mb-6 ${
                  isDark ? "text-zinc-400" : "text-[#666666]"
                }`}
              >
                Choose your verified access mode to participate in the network.
              </p>

              <div className="flex flex-col gap-3">
                {roles.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => handleSelectRole(r.label)}
                    className={`group p-4 sm:p-5 rounded-xl border text-left transition-all cursor-pointer ${
                      isDark
                        ? "border-white/10 hover:border-emerald-400/60 bg-zinc-900/40 hover:bg-emerald-500/5"
                        : "border-[#aaaaaa] hover:border-black bg-transparent hover:bg-black/[0.02]"
                    }`}
                  >
                    <div
                      className={`text-sm sm:text-base font-medium flex items-center justify-between transition-colors ${
                        isDark
                          ? "text-white group-hover:text-emerald-300"
                          : "text-[#000000]"
                      }`}
                    >
                      <span>{r.label}</span>
                      <ArrowRight
                        className={`size-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all ${
                          isDark ? "text-emerald-400" : "text-black"
                        }`}
                      />
                    </div>
                    <div
                      className={`text-xs mt-1 ${
                        isDark ? "text-zinc-400" : "text-[#666666]"
                      }`}
                    >
                      {r.sub}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default SlideNavbarAuth;
