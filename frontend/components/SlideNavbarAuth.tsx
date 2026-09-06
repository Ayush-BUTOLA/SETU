'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { OTPInput } from "input-otp";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { ArrowRight, Check } from "lucide-react";

export type UserRole =
  | "Citizen / Community"
  | "University / Faculty"
  | "CSR / Industry Partner"
  | "Govt / Nodal Officer";

type AuthStep = "role" | "email" | "otp" | "success";

export interface RoleOption {
  id: string;
  label: UserRole;
  sub: string;
}

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
  {
    id: "government",
    label: "Govt / Nodal Officer",
    sub: "Validate, oversee, and certify verified outcomes",
  },
];

export interface SlideNavbarAuthProps {
  open: boolean;
  onClose: () => void;
  onAuthenticated?: (role: UserRole, email: string) => void;
  initialRole?: UserRole;
  roles?: RoleOption[];
  theme?: "dark" | "paper";
}

export function SlideNavbarAuth({
  open,
  onClose,
  onAuthenticated,
  initialRole,
  roles = DEFAULT_ROLES,
  theme = "dark",
}: SlideNavbarAuthProps) {
  const [step, setStep] = useState<AuthStep>("role");
  const [role, setRole] = useState<UserRole>(initialRole || roles[0]?.label || "Citizen / Community");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const reduced = useReducedMotion();

  // Synchronize initialRole when passed
  useEffect(() => {
    if (initialRole) setRole(initialRole);
  }, [initialRole]);

  // Reset drawer state whenever it closes
  useEffect(() => {
    if (!open) {
      setStep("role");
      setOtp("");
    }
  }, [open]);

  // Keyboard accessibility: Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Verification & Confetti celebration
  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) {
      toast.error("Please enter the complete 6-digit verification code");
      return;
    }

    setStep("success");
    try {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.6 },
        colors: theme === "dark" ? ["#9de7cf", "#62c8f4", "#ffffff"] : ["#000000", "#a5ebd6", "#ffd001"],
      });
    } catch {
      // ignore if canvas unavailable
    }

    toast.success(`Verified credentials as ${role}`);
    setTimeout(() => {
      onAuthenticated?.(role, email);
      onClose();
    }, 1200);
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
            aria-label="Authentication Slide Nav"
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`fixed top-0 right-0 bottom-0 w-[min(460px,100vw)] z-[201] flex flex-col p-8 sm:p-10 overflow-y-auto shadow-2xl transition-colors ${
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
                {step === "role"
                  ? "Step 01 // Select Persona"
                  : step === "email"
                  ? "Step 02 // Institutional Email"
                  : "Step 03 // Verification"}
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

            {/* Step 1: Persona Selection */}
            {step === "role" && (
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
                      onClick={() => {
                        setRole(r.label);
                        setStep("email");
                      }}
                      className={`group p-4 rounded-xl border text-left transition-all cursor-pointer ${
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
            )}

            {/* Step 2: Institutional Email Entry */}
            {step === "email" && (
              <div>
                <h2
                  className={`text-2xl sm:text-3xl font-light tracking-tight mb-2 ${
                    isDark ? "text-white" : "text-[#000000]"
                  }`}
                >
                  Enter institutional email.
                </h2>
                <p
                  className={`text-xs mb-6 ${
                    isDark ? "text-zinc-400" : "text-[#666666]"
                  }`}
                >
                  Connecting as{" "}
                  <strong className={isDark ? "text-emerald-300 font-medium" : "text-black font-semibold"}>
                    {role}
                  </strong>
                  . Zero-friction OTP will be dispatched.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!email) return;
                    setStep("otp");
                    toast.info(`Passcode sent to ${email}`);
                  }}
                >
                  <input
                    type="email"
                    required
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@institute.ac.in or name@gov.in"
                    className={`w-full rounded-xl px-4 py-3.5 text-sm outline-none mb-6 font-mono border transition-all ${
                      isDark
                        ? "bg-zinc-900/60 border-white/15 focus:border-emerald-400 text-white placeholder:text-zinc-500"
                        : "bg-transparent border-[#aaaaaa] focus:border-black text-black placeholder:text-[#888888]"
                    }`}
                  />

                  <button
                    type="submit"
                    className={`w-full font-medium rounded-xl py-3.5 text-sm transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2 ${
                      isDark
                        ? "bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-semibold"
                        : "bg-[#000000] hover:bg-zinc-800 text-[#fffef7]"
                    }`}
                  >
                    <span>Request Passcode</span>
                    <ArrowRight className="size-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep("role")}
                    className={`w-full text-center text-xs mt-4 transition-colors cursor-pointer ${
                      isDark ? "text-zinc-400 hover:text-white" : "text-[#666666] hover:text-black"
                    }`}
                  >
                    ← Choose different role
                  </button>
                </form>
              </div>
            )}

            {/* Step 3: 6-Digit OTP Verification */}
            {step === "otp" && (
              <div>
                <h2
                  className={`text-2xl sm:text-3xl font-light tracking-tight mb-2 ${
                    isDark ? "text-white" : "text-[#000000]"
                  }`}
                >
                  Check your inbox.
                </h2>
                <p
                  className={`text-xs mb-6 ${
                    isDark ? "text-zinc-400" : "text-[#666666]"
                  }`}
                >
                  6-digit verification code sent to{" "}
                  <strong className={isDark ? "text-emerald-300" : "text-black"}>
                    {email}
                  </strong>
                </p>

                <form onSubmit={handleVerify}>
                  <div className="flex justify-center mb-6">
                    <OTPInput
                      maxLength={6}
                      value={otp}
                      onChange={setOtp}
                      autoFocus
                      containerClassName="flex gap-2 justify-between w-full"
                      render={({ slots }) => (
                        <>
                          {slots.map((slot, idx) => (
                            <div
                              key={idx}
                              className={`relative w-11 h-13 text-center flex items-center justify-center text-xl font-mono border rounded-lg transition-all ${
                                slot.isActive
                                  ? isDark
                                    ? "border-emerald-400 ring-2 ring-emerald-400/30 bg-zinc-900"
                                    : "border-black ring-2 ring-black/20 bg-white"
                                  : isDark
                                  ? "bg-zinc-900/80 border-white/15 text-white"
                                  : "bg-transparent border-[#aaaaaa] text-black"
                              }`}
                            >
                              {slot.char !== null ? (
                                <span className={isDark ? "text-white" : "text-black"}>{slot.char}</span>
                              ) : null}
                              {slot.hasFakeCaret && (
                                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                  <div className={`w-0.5 h-5 animate-pulse ${isDark ? "bg-emerald-400" : "bg-black"}`} />
                                </div>
                              )}
                            </div>
                          ))}
                        </>
                      )}
                    />
                  </div>

                  <button
                    type="submit"
                    className={`w-full font-semibold rounded-xl py-3.5 text-sm transition-all cursor-pointer shadow-lg ${
                      isDark
                        ? "bg-emerald-400 hover:bg-emerald-300 text-zinc-950"
                        : "bg-[#000000] hover:bg-zinc-800 text-[#fffef7]"
                    }`}
                  >
                    Verify &amp; Enter Platform →
                  </button>

                  <div
                    className={`flex justify-between items-center text-xs mt-5 ${
                      isDark ? "text-zinc-400" : "text-[#666666]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setStep("email")}
                      className="hover:underline cursor-pointer"
                    >
                      ← Edit email
                    </button>
                    <button
                      type="button"
                      onClick={() => toast.info("Demo Passcode: 123456")}
                      className={`cursor-pointer hover:underline ${
                        isDark ? "text-emerald-300" : "text-black"
                      }`}
                    >
                      Resend Code
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 4: Verification Success */}
            {step === "success" && (
              <div className="text-center py-12">
                <div
                  className={`size-14 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl border ${
                    isDark
                      ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                      : "bg-[#a5ebd6] border-emerald-400 text-black"
                  }`}
                >
                  <Check className="size-7" />
                </div>
                <h3
                  className={`text-2xl font-light mb-2 ${
                    isDark ? "text-white" : "text-[#000000]"
                  }`}
                >
                  Access Granted
                </h3>
                <p
                  className={`text-sm ${
                    isDark ? "text-zinc-400" : "text-[#666666]"
                  }`}
                >
                  Launching authenticated console as{" "}
                  <strong className={isDark ? "text-emerald-300 font-medium" : "text-black"}>
                    {role}
                  </strong>
                  ...
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default SlideNavbarAuth;
