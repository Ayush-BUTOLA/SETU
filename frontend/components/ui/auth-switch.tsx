'use client';

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { User, Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

/**
 * Lightweight demonstration counter required by the prompt spec
 */
export const Component = () => {
  const [count, setCount] = useState(0);

  return (
    <div className={cn("flex flex-col items-center gap-4 p-4 rounded-lg bg-white/10 backdrop-blur-md text-white")}>
      <h1 className="text-2xl font-bold mb-2">Component Example</h1>
      <h2 className="text-xl font-semibold">{count}</h2>
      <div className="flex gap-2">
        <button
          onClick={() => setCount((prev) => prev - 1)}
          className="px-4 py-1 rounded bg-white/20 hover:bg-white/30 font-bold"
        >
          -
        </button>
        <button
          onClick={() => setCount((prev) => prev + 1)}
          className="px-4 py-1 rounded bg-white/20 hover:bg-white/30 font-bold"
        >
          +
        </button>
      </div>
    </div>
  );
};

import { DEMO_ACCOUNTS, getDashboardPathByRole, getAccountByEmailOrRole } from "@/lib/auth-config";

export interface AuthSwitchProps {
  role?: string;
  onSuccess?: (role: string, email: string) => void;
  className?: string;
}

/**
 * AuthSwitch — Authentic 21st.dev component with circular gradient sliding panel,
 * Sign In / Sign Up mode toggle, social SSO, and role integration.
 */
export function AuthSwitch({
  role = "Citizen / Community",
  onSuccess,
  className,
}: AuthSwitchProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const demoAccount = DEMO_ACCOUNTS[role] || DEMO_ACCOUNTS['Citizen / Community'];

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const router = useRouter();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInEmail) {
      toast.error("Please enter your email");
      return;
    }
    if (!signInPassword) {
      toast.error("Please enter your password");
      return;
    }
    const matchedAccount = getAccountByEmailOrRole(signInEmail, role);
    const dest = matchedAccount.dashboardPath;
    try {
      localStorage.setItem('setu_user', JSON.stringify({
        role: matchedAccount.role,
        email: signInEmail,
        name: matchedAccount.name,
        organization: matchedAccount.organization,
        loggedInAt: new Date().toISOString(),
      }));
    } catch {
      // ignore
    }
    toast.success(`Access granted! Loading ${matchedAccount.role} Dashboard...`);
    onSuccess?.(matchedAccount.role, signInEmail);
    setTimeout(() => {
      router.push(dest);
    }, 600);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpUsername) {
      toast.error("Please enter your username");
      return;
    }
    if (!signUpEmail) {
      toast.error("Please enter your email");
      return;
    }
    if (!signUpPassword) {
      toast.error("Please enter a password");
      return;
    }
    const dest = getDashboardPathByRole(role);
    try {
      localStorage.setItem('setu_user', JSON.stringify({
        role,
        email: signUpEmail,
        name: signUpUsername,
        organization: demoAccount.organization,
        loggedInAt: new Date().toISOString(),
      }));
    } catch {
      // ignore
    }
    toast.success(`Account registered! Loading ${role} Dashboard...`);
    onSuccess?.(role, signUpEmail);
    setTimeout(() => {
      router.push(dest);
    }, 600);
  };

  const handleSocialClick = (platform: string) => {
    const dest = getDashboardPathByRole(role);
    toast.info(`Connecting via ${platform}...`);
    setTimeout(() => {
      try {
        localStorage.setItem('setu_user', JSON.stringify({
          role,
          email: `${platform.toLowerCase()}@setu.org`,
          name: demoAccount.name,
          organization: demoAccount.organization,
          loggedInAt: new Date().toISOString(),
        }));
      } catch {
        // ignore
      }
      toast.success(`Connected as ${role}`);
      setTimeout(() => router.push(dest), 500);
    }, 600);
  };

  return (
    <div className={cn("auth-switch-wrapper w-full flex items-center justify-center", className)}>
      <style>{`
        .auth-card-container {
          position: relative;
          width: 100%;
          max-width: 900px;
          height: 550px;
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          overflow: hidden;
        }

        .auth-forms-container {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }

        .auth-signin-signup {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          left: 75%;
          width: 50%;
          transition: 1s 0.7s ease-in-out;
          display: grid;
          grid-template-columns: 1fr;
          z-index: 5;
        }

        .auth-form {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 0 4rem;
          transition: all 0.2s 0.7s;
          overflow: hidden;
          grid-column: 1 / 2;
          grid-row: 1 / 2;
        }

        .auth-form.sign-up-form {
          opacity: 0;
          z-index: 1;
        }

        .auth-form.sign-in-form {
          opacity: 1;
          z-index: 2;
        }

        .auth-title {
          font-size: 2.2rem;
          color: #333333;
          margin-bottom: 12px;
          font-weight: 700;
          font-family: inherit;
        }

        .auth-input-field {
          max-width: 380px;
          width: 100%;
          background-color: #f0f0f0;
          margin: 8px 0;
          height: 52px;
          border-radius: 52px;
          display: grid;
          grid-template-columns: 15% 85%;
          padding: 0 0.8rem;
          position: relative;
          transition: 0.3s;
        }

        .auth-input-field:focus-within {
          background-color: #e8e8e8;
          box-shadow: 0 0 0 2px #667eea;
        }

        .auth-input-field .icon-box {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666666;
          font-size: 1.1rem;
        }

        .auth-input-field input {
          background: none;
          outline: none;
          border: none;
          line-height: 1;
          font-weight: 500;
          font-size: 0.95rem;
          color: #333333;
          width: 100%;
        }

        .auth-input-field input::placeholder {
          color: #999999;
          font-weight: 400;
        }

        .auth-btn {
          width: 150px;
          background-color: #5568d3;
          border: none;
          outline: none;
          height: 48px;
          border-radius: 48px;
          color: #ffffff;
          text-transform: uppercase;
          font-weight: 600;
          margin: 14px 0 10px 0;
          cursor: pointer;
          transition: 0.3s ease;
          font-size: 0.85rem;
          letter-spacing: 0.05em;
          box-shadow: 0 4px 15px rgba(85, 104, 211, 0.35);
        }

        .auth-btn:hover {
          background-color: #4a5cc5;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(85, 104, 211, 0.45);
        }

        .auth-social-text {
          margin: 0.6rem 0;
          font-size: 0.85rem;
          color: #666666;
        }

        .auth-social-media {
          display: flex;
          justify-content: center;
          gap: 14px;
        }

        .auth-social-icon {
          height: 44px;
          width: 44px;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid #e0e0e0;
          border-radius: 50%;
          color: #667eea;
          font-size: 1.1rem;
          transition: 0.3s;
          cursor: pointer;
          background: #ffffff;
        }

        .auth-social-icon:hover {
          border-color: #764ba2;
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
        }

        .auth-panels-container {
          position: absolute;
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
        }

        .auth-panel {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          z-index: 6;
        }

        .auth-left-panel {
          pointer-events: all;
          padding: 3rem 16% 2rem 12%;
        }

        .auth-right-panel {
          pointer-events: none;
          padding: 3rem 12% 2rem 16%;
        }

        .auth-panel .auth-content {
          color: #ffffff;
          transition: transform 0.9s ease-in-out;
          transition-delay: 0.6s;
        }

        .auth-panel h3 {
          font-weight: 700;
          line-height: 1.1;
          font-size: 1.7rem;
          margin-bottom: 12px;
        }

        .auth-panel p {
          font-size: 0.9rem;
          line-height: 1.4;
          padding: 0.5rem 0 1.2rem 0;
          opacity: 0.95;
        }

        .auth-btn-transparent {
          background: transparent;
          border: 2px solid #ffffff;
          width: 130px;
          height: 42px;
          border-radius: 42px;
          font-weight: 600;
          font-size: 0.8rem;
          color: #ffffff;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: 0.3s ease;
        }

        .auth-btn-transparent:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
        }

        .auth-right-panel .auth-content {
          transform: translateX(800px);
        }

        /* ── Curved Circle Sliding Transformation ── */
        .auth-card-container:before {
          content: "";
          position: absolute;
          height: 2000px;
          width: 2000px;
          top: -10%;
          right: 48%;
          transform: translateY(-50%);
          background: linear-gradient(-45deg, #667eea 0%, #764ba2 100%);
          transition: 1.8s ease-in-out;
          border-radius: 50%;
          z-index: 6;
        }

        .auth-card-container.sign-up-mode:before {
          transform: translate(100%, -50%);
          right: 52%;
        }

        .auth-card-container.sign-up-mode .auth-left-panel .auth-content {
          transform: translateX(-800px);
        }

        .auth-card-container.sign-up-mode .auth-signin-signup {
          left: 25%;
        }

        .auth-card-container.sign-up-mode .auth-form.sign-up-form {
          opacity: 1;
          z-index: 2;
        }

        .auth-card-container.sign-up-mode .auth-form.sign-in-form {
          opacity: 0;
          z-index: 1;
        }

        .auth-card-container.sign-up-mode .auth-right-panel .auth-content {
          transform: translateX(0%);
        }

        .auth-card-container.sign-up-mode .auth-left-panel {
          pointer-events: none;
        }

        .auth-card-container.sign-up-mode .auth-right-panel {
          pointer-events: all;
        }

        /* Responsive Mobile Layout */
        @media (max-width: 870px) {
          .auth-card-container {
            min-height: 720px;
            height: auto;
          }

          .auth-signin-signup {
            width: 100%;
            top: 92%;
            transform: translate(-50%, -100%);
            transition: 1s 0.8s ease-in-out;
            left: 50%;
          }

          .auth-card-container.sign-up-mode .auth-signin-signup {
            left: 50%;
            top: 10%;
            transform: translate(-50%, 0);
          }

          .auth-panels-container {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr 2fr 1fr;
          }

          .auth-panel {
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            padding: 2.5rem 8%;
            grid-column: 1 / 2;
          }

          .auth-right-panel {
            grid-row: 3 / 4;
          }

          .auth-left-panel {
            grid-row: 1 / 2;
          }

          .auth-right-panel .auth-content {
            transform: translateY(300px);
          }

          .auth-card-container.sign-up-mode .auth-left-panel .auth-content {
            transform: translateY(-300px);
          }

          .auth-card-container.sign-up-mode .auth-right-panel .auth-content {
            transform: translateY(0px);
          }

          .auth-card-container:before {
            width: 1500px;
            height: 1500px;
            transform: translateX(-50%);
            left: 30%;
            bottom: 68%;
            right: initial;
            top: initial;
            transition: 2s ease-in-out;
          }

          .auth-card-container.sign-up-mode:before {
            transform: translate(-50%, 100%);
            bottom: 32%;
            right: initial;
          }
        }

        @media (max-width: 570px) {
          .auth-form {
            padding: 0 1.5rem;
          }
        }
      `}</style>

      {/* Main Auth Card */}
      <div className={cn("auth-card-container", isSignUp && "sign-up-mode")}>
        <div className="auth-forms-container">
          <div className="auth-signin-signup">
            {/* ── Sign In Form ── */}
            <form onSubmit={handleSignIn} className="auth-form sign-in-form">
              <h2 className="auth-title">Sign in</h2>

              <div className="auth-input-field">
                <div className="icon-box">
                  <Mail className="size-4 text-zinc-500" />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  required
                />
              </div>

              <div className="auth-input-field">
                <div className="icon-box">
                  <Lock className="size-4 text-zinc-500" />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="auth-btn">
                Login
              </button>

              <p className="auth-social-text">Or sign in with social platforms</p>

              <div className="auth-social-media">
                <SocialIcons onSelect={handleSocialClick} />
              </div>
            </form>

            {/* ── Sign Up Form ── */}
            <form onSubmit={handleSignUp} className="auth-form sign-up-form">
              <h2 className="auth-title">Sign up</h2>

              <div className="auth-input-field">
                <div className="icon-box">
                  <User className="size-4 text-zinc-500" />
                </div>
                <input
                  type="text"
                  placeholder="Username"
                  value={signUpUsername}
                  onChange={(e) => setSignUpUsername(e.target.value)}
                  required
                />
              </div>

              <div className="auth-input-field">
                <div className="icon-box">
                  <Mail className="size-4 text-zinc-500" />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  required
                />
              </div>

              <div className="auth-input-field">
                <div className="icon-box">
                  <Lock className="size-4 text-zinc-500" />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="auth-btn">
                Sign up
              </button>

              <p className="auth-social-text">Or sign up with social platforms</p>

              <div className="auth-social-media">
                <SocialIcons onSelect={handleSocialClick} />
              </div>
            </form>
          </div>
        </div>

        {/* ── Left & Right Sliding Panels ── */}
        <div className="auth-panels-container">
          <div className="auth-panel auth-left-panel">
            <div className="auth-content">
              <h3>New here?</h3>
              <p>
                Join us today and discover a world of possibilities. Create your account in seconds!
              </p>
              <button
                type="button"
                className="auth-btn-transparent"
                onClick={() => setIsSignUp(true)}
              >
                Sign up
              </button>
            </div>
          </div>

          <div className="auth-panel auth-right-panel">
            <div className="auth-content">
              <h3>One of us?</h3>
              <p>
                Welcome back! Sign in to continue your journey with us.
              </p>
              <button
                type="button"
                className="auth-btn-transparent"
                onClick={() => setIsSignUp(false)}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Brand SVG Social Icons
function SocialIcons({ onSelect }: { onSelect: (platform: string) => void }) {
  return (
    <>
      <button
        type="button"
        onClick={() => onSelect("Google")}
        className="auth-social-icon"
        aria-label="Sign in with Google"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => onSelect("Facebook")}
        className="auth-social-icon"
        aria-label="Sign in with Facebook"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => onSelect("Twitter")}
        className="auth-social-icon"
        aria-label="Sign in with Twitter"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#1DA1F2">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => onSelect("LinkedIn")}
        className="auth-social-icon"
        aria-label="Sign in with LinkedIn"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </button>
    </>
  );
}

export default AuthSwitch;
