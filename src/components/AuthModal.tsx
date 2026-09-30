import React, { useState } from 'react';
import {
  Building2,
  Lock,
  Mail,
  User,
  ShieldCheck,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  Zap,
} from 'lucide-react';
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from '../firebase';
import { saveUserProfile } from '../services/evaluationService';
import { UserAccount } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onSuccess: (user: UserAccount) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [department, setDepartment] = useState('Group Sourcing & Procurement');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  // Direct 1-click Instant Demo login for Media Prima Executive: Nur Fatihana
  const handleQuickDemoLogin = async () => {
    setLoading(true);
    setErrorMsg('');
    const demoEmail = 'fatihana@mediaprima.com.my';
    const demoPass = 'MediaPrima2025!';
    const demoName = 'Nur Fatihana';
    const demoDept = 'Group Sourcing & Procurement';
    const demoRole = 'Executive';

    try {
      let uid = '';
      try {
        const userCredential = await signInWithEmailAndPassword(auth, demoEmail, demoPass);
        uid = userCredential.user.uid;
      } catch (signInErr: any) {
        // If not registered yet, auto-create seamlessly
        if (
          signInErr.code === 'auth/user-not-found' ||
          signInErr.code === 'auth/invalid-credential' ||
          signInErr.code === 'auth/invalid-login-credentials'
        ) {
          try {
            const newCred = await createUserWithEmailAndPassword(auth, demoEmail, demoPass);
            await updateProfile(newCred.user, { displayName: demoName });
            uid = newCred.user.uid;
          } catch (createErr) {
            console.warn('Firebase user registration fallback:', createErr);
            uid = 'demo-fatihana-' + Date.now();
          }
        } else {
          console.warn('Sign-in fallback:', signInErr);
          uid = 'demo-fatihana-' + Date.now();
        }
      }

      const profile: UserAccount = {
        uid: uid || 'demo-fatihana-mediaprima',
        email: demoEmail,
        displayName: demoName,
        organization: 'Media Prima Berhad',
        department: demoDept,
        role: demoRole,
      };

      try {
        await saveUserProfile(profile);
      } catch (e) {
        console.warn('Could not save demo profile to Firestore:', e);
      }

      onSuccess(profile);
    } catch (err: any) {
      console.error('Instant Demo Login error:', err);
      // Fallback guarantees quick testing works seamlessly
      const fallbackProfile: UserAccount = {
        uid: 'demo-fatihana-mediaprima',
        email: demoEmail,
        displayName: demoName,
        organization: 'Media Prima Berhad',
        department: demoDept,
        role: demoRole,
      };
      onSuccess(fallbackProfile);
    } finally {
      setLoading(false);
    }
  };

  // Quick autofill into the form if user wants to see values
  const handleAutofillDemo = () => {
    setEmail('fatihana@mediaprima.com.my');
    setPassword('MediaPrima2025!');
    setDisplayName('Nur Fatihana');
    setDepartment('Group Sourcing & Procurement');
    setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (isSignUp) {
        if (!displayName.trim()) {
          setErrorMsg('Please enter your full name.');
          setLoading(false);
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName });

        const profile: UserAccount = {
          uid: userCredential.user.uid,
          email: userCredential.user.email || email,
          displayName,
          organization: 'Media Prima Berhad',
          department,
          role: 'Executive',
        };

        await saveUserProfile(profile);
        onSuccess(profile);
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const profile: UserAccount = {
          uid: userCredential.user.uid,
          email: userCredential.user.email || email,
          displayName: userCredential.user.displayName || email.split('@')[0],
          organization: 'Media Prima Berhad',
          department,
          role: 'Executive',
        };
        await saveUserProfile(profile);
        onSuccess(profile);
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      let message = 'Authentication error. Please check your credentials.';
      if (
        err.code === 'auth/user-not-found' ||
        err.code === 'auth/wrong-password' ||
        err.code === 'auth/invalid-credential' ||
        err.code === 'auth/invalid-login-credentials'
      ) {
        message = 'Invalid email or password. Please verify your credentials.';
      } else if (err.code === 'auth/email-already-in-use') {
        message = 'This email is already registered under Media Prima Berhad. Please sign in.';
      } else if (err.code === 'auth/weak-password') {
        message = 'Password must be at least 6 characters.';
      } else if (err.code === 'auth/invalid-email') {
        message = 'Invalid email address format.';
      }
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden relative">
        {/* Top Media Prima Berhad Brand Header */}
        <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 p-6 text-white text-center relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-blue-500/20 rounded-full blur-xl pointer-events-none" />
          <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-indigo-500/20 rounded-full blur-xl pointer-events-none" />

          {/* Top Row: Media Prima Berhad Branding Badge */}
          <div className="flex items-center justify-center mb-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-100 text-xs font-semibold">
              <Building2 className="w-3.5 h-3.5 text-blue-300" />
              <span className="tracking-wide uppercase font-bold text-[11px]">Corporate Procurement Portal</span>
            </div>
          </div>

          <h2 className="text-xl font-black tracking-tight text-white">
            TenderTab v2.0 Executive
          </h2>
          <p className="text-xs text-blue-200 mt-1 max-w-xs mx-auto">
            Multi-Option Tender Evaluation &amp; TCO Suite — Media Prima Berhad
          </p>

          {/* Sign In / Create Account Switch Tabs */}
          <div className="grid grid-cols-2 p-1 bg-black/20 rounded-xl mt-5 border border-white/10 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(false);
                setErrorMsg('');
              }}
              className={`py-1.5 rounded-lg transition-all cursor-pointer ${
                !isSignUp ? 'bg-white text-blue-950 shadow-sm font-extrabold' : 'text-blue-200 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSignUp(true);
                setErrorMsg('');
              }}
              className={`py-1.5 rounded-lg transition-all cursor-pointer ${
                isSignUp ? 'bg-white text-blue-950 shadow-sm font-extrabold' : 'text-blue-200 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Dedicated Quick Demo Access Button (Nur Fatihana, Executive) */}
        <div className="mx-6 mt-5 p-4 bg-gradient-to-r from-blue-50 via-indigo-50 to-sky-50 rounded-2xl border border-blue-200/90 shadow-sm">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-1.5 text-blue-950 font-bold text-xs">
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Instant 1-Click Executive Access</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-700 text-white shadow-xs">
              Fast Access
            </span>
          </div>

          <div className="bg-white/95 rounded-xl p-2.5 border border-blue-100/90 flex items-center justify-between gap-3 mb-3 shadow-xs">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 text-xs">Nur Fatihana</span>
                <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 text-[10px] font-bold rounded">
                  Executive
                </span>
              </div>
              <p className="text-[11px] text-slate-500 truncate">
                fatihana@mediaprima.com.my &bull; Media Prima Berhad
              </p>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              Active
            </span>
          </div>

          {/* 1-Click Instant Sign-In Button */}
          <button
            type="button"
            disabled={loading}
            onClick={handleQuickDemoLogin}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 active:from-blue-900 active:to-indigo-900 text-white font-bold text-xs shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 transition hover:scale-[1.01] active:scale-[0.99] disabled:opacity-75 cursor-pointer"
          >
            <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
            <span>
              {loading ? 'Authenticating...' : 'Instant Sign In as Nur Fatihana'}
            </span>
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </button>

          <div className="mt-2 text-center">
            <button
              type="button"
              onClick={handleAutofillDemo}
              className="text-[10px] text-blue-700 hover:text-blue-900 underline font-semibold transition cursor-pointer"
            >
              Autofill form credentials instead
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 pt-4">
          <div className="mb-4 text-center">
            <h3 className="text-sm font-bold text-slate-900">
              {isSignUp ? 'Create New Officer Account' : 'Welcome Back'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {isSignUp
                ? 'Register with your corporate email to access evaluations.'
                : 'Enter your Media Prima Berhad credentials to continue.'}
            </p>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            {isSignUp && (
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={e => setDisplayName(e.target.value)}
                    placeholder="e.g. Nur Fatihana"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Corporate Email <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="fatihana@mediaprima.com.my"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                />
              </div>
            </div>

            {isSignUp && (
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Department
                </label>
                <select
                  value={department}
                  onChange={e => setDepartment(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800"
                >
                  <option value="Group Sourcing & Procurement">Group Sourcing &amp; Procurement</option>
                  <option value="Digital Workplace & IT Ops">Digital Workplace &amp; IT Ops</option>
                  <option value="Group Financial Control">Group Financial Control</option>
                  <option value="Administration & Facilities">Administration &amp; Facilities</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full pl-9 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-900 active:bg-black text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition disabled:opacity-75 cursor-pointer"
            >
              <span>
                {loading
                  ? 'Processing...'
                  : isSignUp
                  ? 'Create Media Prima Account'
                  : 'Sign In to Media Prima'}
              </span>
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Secured with Enterprise SSL &amp; Firebase Auth — Media Prima Berhad</span>
          </div>
        </div>
      </div>
    </div>
  );
};
