import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MoveRight, MoveLeft, Globe, ShieldCheck, Cpu, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- HERO SLIDER DATA ---
const vehicles = [
  {
    id: 1,
    category: 'Earthmoving',
    title: 'EXCAVATOR',
    model: 'CAT 320-NextGen',
    image: 'https://assets.primecreative.com.au/s3/cougar-assets/momo-media/19447233/cat-next-gen-excavator-launch-6.jpg',
    stats: { power: '320 HP', weight: '22.5 Ton', capacity: '1.19 m³' }
  },
  {
    id: 2,
    category: 'Loading',
    title: 'WHEEL LOADER',
    model: 'Volvo L120H',
    image: 'https://desimachines.com/wp-content/uploads/2025/06/desi-machines-volvo-l120h-wheel-loader-featured.jpg-1.webp',
    stats: { power: '276 HP', weight: '20.7 Ton', capacity: '3.50 m³' }
  },
  {
    id: 3,
    category: 'Versatility',
    title: 'BACKHOE',
    model: 'JCB 3DX Super',
    image: 'https://images.91infra.com/construction-equipments/models/122/2029/jcb-3dx-2085766282.jpg',
    stats: { power: '92 HP', weight: '8.0 Ton', capacity: '1.00 m³' }
  }
];

// --- FEATURES MATRIX DATA ---
const features = [
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Global Deployment",
    description: "Our logistics matrix ensures critical components are air-freighted to any industrial sector worldwide within 48 hours. Zero operational latency."
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "OEM Authenticated",
    description: "Every part entering our vault is cryptographically verified against manufacturer databases. We do not deal in aftermarket approximations."
  },
  {
    icon: <Cpu className="w-8 h-8" />,
    title: "Predictive Analytics",
    description: "Advanced wear-and-tear forecasting. Order replacements before hardware failure occurs, maximizing fleet uptime and revenue."
  }
];

// Upgraded text splitter with safe inline styles for GSAP
const SplitText = ({ text, className = '' }) => {
  return (
    <span className="inline-flex overflow-hidden pb-4">
      {text.split('').map((char, i) => (
        <span 
          key={i} 
          className={`inline-block reveal-char ${className}`}
          style={{ opacity: 0, transform: 'translateY(120%) rotate(12deg) skewX(-10deg)' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

const Home = () => {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef(null);
  const slideRefs = useRef([]);
  const isAnimating = useRef(false);

  // Maintain references dynamically for the hero
  slideRefs.current = [];
  const addToRefs = (el) => {
    if (el && !slideRefs.current.includes(el)) slideRefs.current.push(el);
  };

  // Parallax Mouse Tracking for Hero
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 20; 
      const yPos = (clientY / window.innerHeight - 0.5) * 20;

      gsap.to('.bg-image', { x: xPos, y: yPos, duration: 1.5, ease: 'power3.out' });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // --- HERO ANIMATION LOGIC ---
  const changeSlide = (newIndex, direction) => {
    if (isAnimating.current || newIndex === current) return;
    isAnimating.current = true;

    const outgoing = slideRefs.current[current];
    const incoming = slideRefs.current[newIndex];
    
    const outImg = outgoing.querySelector('.bg-image');
    const inImg = incoming.querySelector('.bg-image');
    const inChars = incoming.querySelectorAll('.reveal-char');
    const outChars = outgoing.querySelectorAll('.reveal-char');
    const inStats = incoming.querySelectorAll('.reveal-stat');
    const outStats = outgoing.querySelectorAll('.reveal-stat');
    const inLine = incoming.querySelector('.reveal-line');

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrent(newIndex);
        isAnimating.current = false;
        gsap.set(outgoing, { zIndex: 0 });
        gsap.set(incoming, { zIndex: 10 });
      }
    });

    gsap.set(incoming, { zIndex: 20 });
    gsap.set(inImg, { 
      clipPath: direction === 'next' ? 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' : 'polygon(0 0, 0 0, 0 100%, 0 100%)',
      scale: 1.2, filter: 'brightness(2) contrast(1.2)' 
    });
    gsap.set(inChars, { y: '120%', rotation: 12, skewX: -10, opacity: 0 });
    gsap.set(inStats, { y: 40, opacity: 0, scale: 0.95 });
    gsap.set(inLine, { scaleX: 0, transformOrigin: 'left' });

    tl.to(inImg, { clipPath: 'polygon(0% 0, 100% 0, 100% 100%, 0% 100%)', filter: 'brightness(1) contrast(1)', duration: 1.6, ease: 'power4.inOut' }, 0)
      .to(outImg, { scale: 1.05, filter: 'brightness(0.2)', duration: 1.6, ease: 'power4.inOut' }, 0)
      .to(inImg, { scale: 1, duration: 3, ease: 'power2.out' }, 0.5)
      .to(inChars, { y: '0%', rotation: 0, skewX: 0, opacity: 1, duration: 1.2, stagger: 0.02, ease: 'expo.out' }, 0.8)
      .to(inLine, { scaleX: 1, duration: 1.2, ease: 'expo.inOut' }, 1)
      .to(inStats, { y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.1, ease: 'back.out(1.5)' }, 1.1)
      .to(outChars, { y: '-120%', rotation: -10, opacity: 0, duration: 0.6, stagger: 0.01, ease: 'power3.in' }, 0)
      .to(outStats, { y: -20, opacity: 0, scale: 0.95, duration: 0.5, stagger: 0.05, ease: 'power2.in' }, 0);
  };

  const handleNext = () => changeSlide((current + 1) % vehicles.length, 'next');
  const handlePrev = () => changeSlide(current === 0 ? vehicles.length - 1 : current - 1, 'prev');

  // --- SCROLL ANIMATION LOGIC ---
  useGSAP(() => {
    // 1. Initial Hero Load
    const firstSlide = slideRefs.current[0];
    gsap.set(firstSlide, { zIndex: 10 });
    gsap.to(firstSlide.querySelector('.bg-image'), { scale: 1, duration: 4, ease: 'power2.out' });
    gsap.to(firstSlide.querySelectorAll('.reveal-char'), { y: '0%', rotation: 0, skewX: 0, opacity: 1, duration: 1.5, stagger: 0.03, ease: 'expo.out', delay: 0.5 });
    gsap.to(firstSlide.querySelector('.reveal-line'), { scaleX: 1, duration: 1.5, ease: 'expo.inOut', delay: 0.8 });
    gsap.to(firstSlide.querySelectorAll('.reveal-stat'), { y: 0, opacity: 1, scale: 1, duration: 1.2, stagger: 0.1, ease: 'back.out(1.5)', delay: 1.2 });

    // 2. Infinite Marquee Animation
    gsap.to('.marquee-track', {
      xPercent: -50,
      ease: 'none',
      duration: 25,
      repeat: -1
    });

    // 3. ScrollTrigger for Features Matrix
    gsap.fromTo('.feature-card', 
      { y: 100, opacity: 0 },
      { 
        y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.features-grid', start: 'top 80%', toggleActions: 'play none none reverse' }
      }
    );
    gsap.fromTo('.feature-header',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.features-section', start: 'top 80%' }}
    );

    // 4. Parallax CTA ScrollTrigger
    gsap.fromTo('.cta-bg-layer', 
      { y: -100, scale: 1.1 },
      { y: 100, scale: 1, ease: 'none', scrollTrigger: { trigger: '.cta-section', start: 'top bottom', end: 'bottom top', scrub: true }}
    );
    gsap.fromTo('.cta-content',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'power4.out', scrollTrigger: { trigger: '.cta-section', start: 'top 60%' }}
    );

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative bg-[#050505] overflow-x-hidden text-white font-sans selection:bg-amber-500 selection:text-black">
      
      {/* Cinematic Grit Overlay (Global) */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      {/* =========================================
          SECTION 1: THE HERO SLIDER (100vh)
          ========================================= */}
      <section className="relative h-screen w-full overflow-hidden z-10">
        {vehicles.map((vehicle, index) => (
          <div 
            key={vehicle.id} 
            ref={addToRefs}
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: index === 0 ? 10 : 0 }}
          >
            <div className="absolute inset-[-5%] w-[110%] h-[110%]">
              <div 
                className="bg-image absolute inset-0 w-full h-full bg-cover bg-center scale-110"
                style={{ backgroundImage: `url(${vehicle.image})` }}
              />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/90 via-[#050505]/30 to-transparent" />

            <div className="absolute inset-0 flex flex-col justify-end pb-32 md:pb-40 px-6 md:px-24 z-20">
              <div className="overflow-hidden mb-4 flex items-center gap-4">
                <span 
                  className="reveal-char inline-block text-amber-500 font-bold tracking-[0.4em] text-xs md:text-sm uppercase"
                  style={{ opacity: 0, transform: 'translateY(120%)' }}
                >
                  {vehicle.category}
                </span>
                <div className="reveal-line h-[1px] w-12 bg-amber-500/50 scale-x-0 origin-left" />
              </div>
              
              <h1 className="text-6xl md:text-[10rem] font-black uppercase tracking-tighter leading-[0.85] mb-6 -ml-2 text-white drop-shadow-2xl">
                <SplitText text={vehicle.title} />
              </h1>
              
              <div className="overflow-hidden mb-16">
                <span 
                  className="reveal-char inline-block text-2xl md:text-4xl font-light text-zinc-300 tracking-tight"
                  style={{ opacity: 0, transform: 'translateY(120%)' }}
                >
                  {vehicle.model}
                </span>
              </div>

              <div className="flex flex-wrap gap-4 md:gap-8 max-w-3xl">
                {Object.entries(vehicle.stats).map(([key, value]) => (
                  <div 
                    key={key} 
                    className="reveal-stat flex-1 min-w-[120px] bg-white/[0.02] hover:bg-white/[0.05] transition-colors duration-500 backdrop-blur-3xl border border-white/10 p-6 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] relative group"
                    style={{ opacity: 0, transform: 'translateY(40px)' }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                    <p className="text-zinc-500 text-[10px] md:text-xs uppercase tracking-[0.2em] mb-2 font-semibold">{key}</p>
                    <p className="text-2xl md:text-3xl font-black text-white tracking-tight">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Hero Navigation Controls */}
        <div className="absolute bottom-12 right-6 md:right-24 z-50 flex items-center gap-8">
          <div className="hidden md:flex items-center gap-4 text-xs font-bold tracking-[0.3em] uppercase">
            <span className="text-white">0{current + 1}</span>
            <div className="w-12 h-[1px] bg-white/20 relative">
               <div 
                 className="absolute top-0 left-0 h-full bg-amber-500 transition-all duration-700 ease-in-out"
                 style={{ width: `${((current + 1) / vehicles.length) * 100}%` }}
               />
            </div>
            <span className="text-zinc-600">0{vehicles.length}</span>
          </div>
          <div className="flex items-center p-1.5 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl">
            <button onClick={handlePrev} className="w-14 h-14 flex items-center justify-center rounded-full hover:bg-white/10 transition-all duration-300 text-zinc-400 hover:text-white group">
              <MoveLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            </button>
            <div className="w-[1px] h-6 bg-white/10 mx-2" />
            <button onClick={handleNext} className="w-14 h-14 flex items-center justify-center rounded-full hover:bg-amber-500 hover:text-black transition-all duration-300 text-white group">
              <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================
          SECTION 2: OEM PARTNERS MARQUEE
          ========================================= */}
      <section className="relative py-8 md:py-12 bg-white/[0.01] border-y border-white/5 overflow-hidden flex whitespace-nowrap z-10">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-20" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-20" />
        
        {/* We duplicate the content to make an infinite seamless loop */}
        <div className="marquee-track flex items-center gap-16 md:gap-32 px-8">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-16 md:gap-32">
              {['CATERPILLAR', 'VOLVO', 'KOMATSU', 'JCB', 'HITACHI', 'BOBCAT', 'JOHN DEERE', 'LIEBHERR'].map((brand, j) => (
                <div key={j} className="flex items-center gap-4 group">
                  <div className="w-2 h-2 bg-amber-500/20 group-hover:bg-amber-500 rotate-45 transition-colors duration-500" />
                  <span className="text-3xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-zinc-700 to-zinc-900 group-hover:from-white group-hover:to-zinc-500 transition-all duration-500 uppercase">
                    {brand}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* =========================================
          SECTION 3: THE OPERATIONAL MATRIX
          ========================================= */}
      <section className="features-section relative py-32 md:py-48 px-6 md:px-12 lg:px-24 max-w-[120rem] mx-auto z-10">
        <div className="feature-header mb-20 md:mb-32">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-amber-500/50" />
            <span className="text-amber-500 font-bold tracking-[0.4em] text-xs uppercase">Infrastructure</span>
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-black uppercase tracking-tighter leading-none max-w-4xl text-white">
            Engineered For <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-800">Endurance.</span>
          </h2>
          <p className="mt-8 text-lg md:text-xl text-zinc-500 font-light max-w-2xl leading-relaxed">
            Downtime is catastrophic. We have constructed a global supply chain optimized purely for speed, precision, and absolute hardware reliability.
          </p>
        </div>

        <div className="features-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="feature-card relative group bg-white/[0.02] border border-white/5 hover:border-white/20 p-10 md:p-14 rounded-3xl overflow-hidden transition-all duration-700 hover:bg-white/[0.04]"
            >
              <div className="absolute top-0 right-0 p-8 text-8xl font-black text-white/[0.02] pointer-events-none group-hover:text-amber-500/5 transition-colors duration-700">
                0{idx + 1}
              </div>
              <div className="relative z-10">
                <div className="mb-8 inline-flex p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-colors duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4 group-hover:text-amber-500 transition-colors duration-500">
                  {feature.title}
                </h3>
                <p className="text-zinc-400 font-light leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================
          SECTION 4: THE VAULT CTA
          ========================================= */}
      <section className="cta-section relative h-[80vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden border-t border-white/10 z-10">
        {/* Deep Parallax Background */}
        <div className="absolute inset-[-10%] w-[120%] h-[120%] z-0">
          <div 
            className="cta-bg-layer absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1587302482343-7f2122d26f63?q=80&w=2070&auto=format&fit=crop)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-[#050505]" />
        </div>

        <div className="cta-content relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-8 animate-pulse">
            <div className="w-4 h-4 bg-amber-500 rounded-full" />
          </div>
          
          <h2 className="text-5xl md:text-8xl lg:text-[9rem] font-black uppercase tracking-tighter leading-[0.8] mb-10 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
            Access The Vault
          </h2>
          
          <p className="text-lg md:text-2xl text-zinc-400 font-light mb-12 max-w-2xl">
            Enter our secure matrix to requisition OEM parts. Full schematic filtering and global stock routing activated.
          </p>

          <Link 
            to="/shop" 
            className="group relative inline-flex items-center gap-4 px-10 py-5 bg-amber-500 text-black font-black text-sm uppercase tracking-[0.3em] overflow-hidden rounded-xl"
          >
            <div className="absolute inset-0 w-0 bg-white transition-all duration-500 ease-out group-hover:w-full z-0" />
            <span className="relative z-10">Initiate Protocol</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;