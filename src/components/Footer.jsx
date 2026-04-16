import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Removed the failing social icon imports. Kept the stable functional ones.
import { ArrowUpRight, ArrowUp, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Bulletproof inline SVGs to bypass Vite/Lucide caching quirks
const SocialIcons = [
  {
    name: 'Facebook',
    icon: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
  },
  {
    name: 'Twitter',
    icon: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
  },
  {
    name: 'Instagram',
    icon: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
  },
  {
    name: 'Linkedin',
    icon: (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
  }
];

const Footer = () => {
  const footerRef = useRef(null);

  useGSAP(() => {
    // Cinematic scroll reveal for footer elements
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.fromTo('.footer-reveal', 
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
    )
    .fromTo('.footer-line',
      { scaleX: 0 },
      { scaleX: 1, duration: 1, ease: 'expo.inOut' },
      '-=0.5'
    );
  }, { scope: footerRef });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer ref={footerRef} className="relative bg-[#050505] text-white pt-24 pb-8 overflow-hidden font-sans border-t border-white/5">
      
      {/* Cinematic Ambient Backgrounds */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-amber-500/5 blur-[150px] rounded-[100%] pointer-events-none" />
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      <div className="max-w-[100rem] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top Section: Newsletter / CTA */}
        <div className="footer-reveal flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-20 bg-white/[0.02] backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-amber-500 font-bold tracking-[0.4em] text-[10px] uppercase">Comms Link</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white mb-2">
              Join The <span className="text-zinc-500">Vanguard</span>
            </h2>
            <p className="text-zinc-400 font-light text-sm md:text-base leading-relaxed">
              Subscribe to our encrypted frequency for the latest inventory drops, engineering protocols, and market shifts in heavy machinery.
            </p>
          </div>
          
          <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
            <div className="relative w-full sm:w-72">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input 
                type="email" 
                placeholder="ENTER EMAIL PROTOCOL..." 
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-[10px] font-bold tracking-[0.2em] uppercase focus:outline-none focus:border-amber-500/50 transition-all text-white placeholder-zinc-600"
              />
            </div>
            <button className="flex items-center justify-center gap-2 h-[46px] px-6 bg-amber-500 text-black rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-white transition-colors duration-300">
              Initialize
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Middle Section: Main Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Brand Column */}
          <div className="footer-reveal flex flex-col">
            <Link to="/" className="text-3xl font-black tracking-tighter uppercase text-amber-500 mb-6 block">
              Heavy<span className="text-white">Duty</span>
            </Link>
            <p className="text-zinc-500 text-xs font-light leading-relaxed mb-8 max-w-xs">
              The premier global infrastructure for heavy machinery spares, certified engineering, and vehicle exchanges. Built for endurance.
            </p>
            <div className="flex gap-4">
              {SocialIcons.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a key={idx} href="#" className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-zinc-400 hover:text-amber-500 hover:border-amber-500 hover:bg-amber-500/10 transition-all duration-300">
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-reveal flex flex-col">
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-6">Sitemap</h4>
            <ul className="space-y-4">
              {['Home', 'About Platform', 'Spares Vault', 'Engineering Fleet', 'Exchange Matrix'].map((link, idx) => (
                <li key={idx}>
                  <a href="#" className="text-zinc-400 text-sm hover:text-amber-500 transition-colors flex items-center gap-2 group">
                    <span className="w-0 h-[1px] bg-amber-500 group-hover:w-3 transition-all duration-300" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Inventory Systems */}
          <div className="footer-reveal flex flex-col">
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-6">Systems</h4>
            <ul className="space-y-4">
              {['High-Pressure Hydraulics', 'Heavy Powertrain', 'Undercarriage Core', 'Transmission & Drive', 'Attachments & Buckets'].map((link, idx) => (
                <li key={idx}>
                  <a href="#" className="text-zinc-400 text-sm hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="footer-reveal flex flex-col">
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-6">Global Support</h4>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li><span className="text-zinc-600 uppercase tracking-widest text-[10px] block mb-1">Logistics HQ</span> Sector 7G, Industrial Matrix<br/>Neo-Bengaluru, IN 560001</li>
              <li><span className="text-zinc-600 uppercase tracking-widest text-[10px] block mb-1 mt-4">Comm Line</span> +91 (800) 555-HEAVY</li>
              <li><span className="text-zinc-600 uppercase tracking-widest text-[10px] block mb-1 mt-4">Secure Mail</span> ops@heavyduty.network</li>
            </ul>
          </div>

        </div>

        {/* Bottom Section: Legal & Back to Top */}
        <div className="footer-line w-full h-[1px] bg-white/10 origin-left mb-8" />
        
        <div className="footer-reveal flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
            &copy; {new Date().getFullYear()} HeavyDuty Network. All Systems Operational.
          </p>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors">Terms of Service</a>
            
            {/* Scroll to Top Trigger */}
            <button 
              onClick={scrollToTop}
              className="ml-4 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all duration-300 group"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;