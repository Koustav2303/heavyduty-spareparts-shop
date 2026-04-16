import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Wrench, HardHat, RefreshCw, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Safe SplitText for GSAP transforms
const SplitText = ({ text, className = '' }) => {
  return (
    <span className="inline-flex flex-wrap overflow-hidden pb-4">
      {text.split(' ').map((word, i) => (
        <span key={i} className="inline-flex overflow-hidden mr-3 pb-2">
          {word.split('').map((char, j) => (
            <span 
              key={j} 
              className={`inline-block reveal-char ${className}`}
              style={{ opacity: 0, transform: 'translateY(120%) rotate(10deg)' }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
};

const About = () => {
  const containerRef = useRef(null);
  const triggerRef = useRef(null);

  useGSAP(() => {
    // 1. Initial Hero Cinematic Load
    const tl = gsap.timeline();
    
    tl.to('.hero-overlay', {
      opacity: 0.6,
      duration: 2,
      ease: 'power2.inOut'
    })
    .to('.hero-bg', {
      scale: 1,
      duration: 3,
      ease: 'power3.out'
    }, 0)
    .to('.hero-char', {
      y: '0%',
      rotation: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.02,
      ease: 'expo.out'
    }, 0.5)
    .to('.scroll-indicator', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'back.out(2)'
    }, 1.5);

    // 2. Sticky Scroll & Image Masking (The "God-Tier" Effect)
    const visuals = gsap.utils.toArray('.scroll-visual');
    const texts = gsap.utils.toArray('.scroll-text');

    visuals.forEach((visual, index) => {
      // Cinematic image wipe
      gsap.fromTo(visual.querySelector('.img-mask'),
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: visual,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1,
          }
        }
      );

      // Image subtle scale on scroll
      gsap.fromTo(visual.querySelector('img'),
        { scale: 1.2 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: visual,
            start: 'top 100%',
            end: 'bottom 0%',
            scrub: true,
          }
        }
      );
    });

    // Stagger text elements as they enter
    texts.forEach((textBlock) => {
      gsap.fromTo(textBlock,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textBlock,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

  }, { scope: containerRef });

  const timelineData = [
    {
      id: '01',
      title: 'Current Paradigm',
      subtitle: 'Premium Spares Division',
      description: 'Our foundational operation. We command the supply chain for OEM and high-end aftermarket components. When heavy machinery halts, our logistics network ensures immediate deployment of critical parts to minimize operational downtime.',
      icon: <Wrench className="w-6 h-6" />,
      image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=2070&auto=format&fit=crop',
      active: true
    },
    {
      id: '02',
      title: 'Phase II Integration',
      subtitle: 'Certified Engineering Fleet',
      description: 'Parts require precision installation. We are architecting a global fleet of certified heavy-machinery engineers. From complex hydraulic diagnostics to complete powertrain overhauls, expert service will soon be dispatched directly to your site.',
      icon: <HardHat className="w-6 h-6" />,
      image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop',
      active: false
    },
    {
      id: '03',
      title: 'Phase III Expansion',
      subtitle: 'Machinery Exchange Matrix',
      description: 'The ultimate evolution. A highly vetted, cryptographically secure marketplace for the acquisition and liquidation of second-hand heavy vehicles. Every machine rigorously inspected, verified, and certified by our internal engineering vanguard.',
      icon: <RefreshCw className="w-6 h-6" />,
      image: 'https://www.truck1.eu/img/xxl/44688/New-JCB-3DX-SUPER-backhoe-loader-India_44688_1483288841127.jpg',
      active: false
    }
  ];

  return (
    <div ref={containerRef} className="bg-[#050505] text-white font-sans selection:bg-amber-500 selection:text-black">
      
      {/* 1. Immersive Hero Section */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <div 
          className="hero-bg absolute inset-0 w-full h-full bg-cover bg-center scale-125"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1541888087545-d81fc10b31e9?q=80&w=2070&auto=format&fit=crop)' }}
        />
        <div className="hero-overlay absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/80 to-[#050505] opacity-100" />
        
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto mt-20">
          <div className="overflow-hidden mb-6 flex justify-center items-center gap-4">
            <div className="h-[1px] w-12 bg-amber-500/50" />
            <span className="text-amber-500 font-bold tracking-[0.4em] text-xs md:text-sm uppercase">
              Corporate Overview
            </span>
            <div className="h-[1px] w-12 bg-amber-500/50" />
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-[8rem] font-black uppercase tracking-tighter leading-[0.85] text-white drop-shadow-2xl">
            <SplitText text="Engineering The Future" className="hero-char" />
          </h1>
        </div>

        <div className="scroll-indicator absolute bottom-12 flex flex-col items-center gap-2 opacity-0 translate-y-8">
          <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Scroll to Initiate</span>
          <ChevronDown className="w-5 h-5 text-amber-500 animate-bounce" />
        </div>
      </section>

      {/* 2. Master ScrollTrigger Layout (Sticky on Desktop, Stacked on Mobile) */}
      <section ref={triggerRef} className="relative w-full max-w-[100rem] mx-auto px-6 md:px-12 lg:px-24 pb-32">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Left Column: Sticky Text Manifesto */}
          <div className="lg:w-1/2 lg:sticky top-0 lg:h-screen flex flex-col justify-center pt-24 lg:pt-0 z-20">
            <h2 className="scroll-text text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-8">
              Beyond <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700">Hardware.</span>
            </h2>
            <p className="scroll-text text-lg md:text-xl font-light text-zinc-400 leading-relaxed mb-12 max-w-xl">
              We are not just a marketplace; we are an industrial ecosystem. Currently dominating the supply of critical spare components, we are actively architecting the infrastructure to deploy certified engineers and facilitate verified heavy machinery exchanges globally.
            </p>

            {/* Navigation/Progress dots for visual flair */}
            <div className="hidden lg:flex flex-col gap-6 absolute left-[-40px] top-1/2 -translate-y-1/2">
               {timelineData.map((_, i) => (
                 <div key={i} className="w-1.5 h-12 bg-white/10 rounded-full relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full bg-amber-500 opacity-50" style={{ height: i === 0 ? '100%' : '0%' }} />
                 </div>
               ))}
            </div>
          </div>

          {/* Right Column: Scrolling Visuals & Glassmorphic Cards */}
          <div className="lg:w-1/2 flex flex-col gap-24 lg:gap-48 lg:py-48 z-10">
            {timelineData.map((item, index) => (
              <div key={item.id} className="scroll-visual relative group">
                
                {/* Cinematic Image Masking Container */}
                <div className="relative w-full aspect-[4/5] md:aspect-video lg:aspect-[4/5] overflow-hidden rounded-2xl mb-8">
                  <div className="img-mask absolute inset-0 w-full h-full bg-zinc-900">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Gradient Overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
                  </div>
                  
                  {/* Floating Number Badge */}
                  <div className="absolute top-6 left-6 w-16 h-16 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 flex items-center justify-center text-xl font-black text-amber-500 shadow-2xl">
                    {item.id}
                  </div>
                </div>

                {/* Glassmorphic Data Card */}
                <div className={`relative -mt-24 mx-4 md:mx-12 p-8 md:p-10 rounded-2xl backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] overflow-hidden transition-colors duration-500 ${item.active ? 'bg-amber-500/5 hover:bg-amber-500/10' : 'bg-white/[0.02] hover:bg-white/[0.05]'}`}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-3 rounded-xl ${item.active ? 'bg-amber-500/20 text-amber-500' : 'bg-white/5 text-zinc-400'}`}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-1">
                        {item.title}
                      </h4>
                      <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                        {item.subtitle}
                      </h3>
                    </div>
                  </div>
                  <p className="text-zinc-400 font-light leading-relaxed text-sm md:text-base">
                    {item.description}
                  </p>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};

export default About;