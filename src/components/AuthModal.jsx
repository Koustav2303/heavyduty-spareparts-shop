import { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { X, Mail, Lock, User, ShieldAlert, Fingerprint, Loader2 } from 'lucide-react';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [operatorName, setOperatorName] = useState('');

  const containerRef = useRef(null);
  const modalRef = useRef(null);
  const backdropRef = useRef(null);

  // Lock background scrolling when the matrix is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle Entrance Animations
  useGSAP(() => {
    if (isOpen) {
      const tl = gsap.timeline();
      tl.fromTo(backdropRef.current, 
        { opacity: 0, backdropFilter: 'blur(0px)' }, 
        { opacity: 1, backdropFilter: 'blur(12px)', duration: 0.5, ease: 'power2.out' }
      )
      .fromTo(modalRef.current,
        { scale: 0.9, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.5)' },
        '-=0.3'
      )
      .fromTo('.auth-element',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' },
        '-=0.2'
      );
    }
  }, [isOpen]);

  // Handle Exit Animations cleanly before triggering the parent onClose
  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(modalRef.current, { scale: 0.95, opacity: 0, y: 20, duration: 0.3, ease: 'power2.in' })
      .to(backdropRef.current, { opacity: 0, backdropFilter: 'blur(0px)', duration: 0.3, ease: 'power2.in' }, '-=0.2');
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate a network authentication request (e.g., waiting for backend response)
    setTimeout(() => {
      setIsLoading(false);
      // Once authenticated, run the close animation to reveal the homepage
      handleClose();
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Heavy Cinematic Backdrop */}
      <div 
        ref={backdropRef}
        className="absolute inset-0 bg-[#050505]/90"
      />

      {/* Modal Container */}
      <div 
        ref={modalRef}
        className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-32 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(245, 158, 11, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(245, 158, 11, 0.3) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        
        {/* Header */}
        <div className="relative z-10 px-8 pt-8 pb-6 border-b border-white/5 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Fingerprint className="w-4 h-4 text-amber-500" />
              <span className="text-amber-500 font-bold tracking-[0.4em] text-[10px] uppercase">
                System Access
              </span>
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white">
              {isLogin ? 'Authenticate' : 'Initialize'}
            </h2>
          </div>
          
          <button 
            onClick={handleClose}
            className="p-2 bg-white/5 rounded-full text-zinc-500 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-white/5 bg-white/[0.02]">
          <button 
            type="button"
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${isLogin ? 'text-amber-500 border-b-2 border-amber-500 bg-amber-500/5' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            Login
          </button>
          <button 
            type="button"
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${!isLogin ? 'text-amber-500 border-b-2 border-amber-500 bg-amber-500/5' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            Create Protocol
          </button>
        </div>

        {/* Dynamic Form Payload */}
        <div className="p-8 relative z-10 bg-gradient-to-b from-transparent to-black/50">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {!isLogin && (
              <div className="auth-element relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-amber-500 transition-colors" />
                <input 
                  type="text" 
                  required
                  value={operatorName}
                  onChange={(e) => setOperatorName(e.target.value)}
                  placeholder="OPERATOR NAME" 
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-xs font-bold tracking-widest uppercase text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all"
                />
              </div>
            )}

            <div className="auth-element relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-amber-500 transition-colors" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ENCRYPTED EMAIL" 
                className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-xs font-bold tracking-widest uppercase text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all"
              />
            </div>

            <div className="auth-element relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 group-focus-within:text-amber-500 transition-colors" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="ACCESS KEY (PASSWORD)" 
                className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-xs font-bold tracking-widest uppercase text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all"
              />
            </div>

            {isLogin && (
              <div className="auth-element flex justify-end">
                <a href="#" className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest hover:text-amber-500 transition-colors">
                  Reset Key?
                </a>
              </div>
            )}

            <button 
              type="submit"
              disabled={isLoading}
              className="auth-element w-full mt-4 flex items-center justify-center gap-2 py-4 bg-amber-500 text-black rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <ShieldAlert className="w-4 h-4" />
                  {isLogin ? 'Establish Link' : 'Register Operator'}
                </>
              )}
            </button>
          </form>

          {/* Secure Badge */}
          <div className="mt-8 flex items-center justify-center gap-2 opacity-50">
            <Lock className="w-3 h-3 text-zinc-500" />
            <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-500">
              256-bit AES Encrypted Connection
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;