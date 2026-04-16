import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { MoveRight, MoveLeft } from 'lucide-react';

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

// Upgraded text splitter with safe inline styles for GSAP
const SplitText = ({ text, className = '' }) => {
  return (
    <span className="inline-flex overflow-hidden pb-4">
      {text.split('').map((char, i) => (
        <span 
          key={i} 
          className={`inline-block reveal-char ${className}`}
          style={{ 
            opacity: 0, 
            transform: 'translateY(120%) rotate(12deg) skewX(-10deg)' 
          }}
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

  // Maintain references dynamically
  slideRefs.current = [];
  const addToRefs = (el) => {
    if (el && !slideRefs.current.includes(el)) slideRefs.current.push(el);
  };

  // Parallax Mouse Tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 20; // 20px movement
      const yPos = (clientY / window.innerHeight - 0.5) * 20;

      gsap.to('.bg-image', {
        x: xPos,
        y: yPos,
        duration: 1.5,
        ease: 'power3.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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

    // Setup incoming layout
    gsap.set(incoming, { zIndex: 20 });
    gsap.set(inImg, { 
      clipPath: direction === 'next' ? 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' : 'polygon(0 0, 0 0, 0 100%, 0 100%)',
      scale: 1.2,
      filter: 'brightness(2) contrast(1.2)' 
    });
    gsap.set(inChars, { y: '120%', rotation: 12, skewX: -10, opacity: 0 });
    gsap.set(inStats, { y: 40, opacity: 0, scale: 0.95 });
    gsap.set(inLine, { scaleX: 0, transformOrigin: 'left' });

    // Cinematic Transition Sequence
    tl.to(inImg, {
      clipPath: 'polygon(0% 0, 100% 0, 100% 100%, 0% 100%)',
      filter: 'brightness(1) contrast(1)',
      duration: 1.6,
      ease: 'power4.inOut',
    }, 0)
    .to(outImg, {
      scale: 1.05,
      filter: 'brightness(0.2)',
      duration: 1.6,
      ease: 'power4.inOut',
    }, 0)
    .to(inImg, {
      scale: 1,
      duration: 3,
      ease: 'power2.out',
    }, 0.5)
    
    // Aggressive typography spring
    .to(inChars, {
      y: '0%',
      rotation: 0,
      skewX: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.02,
      ease: 'expo.out'
    }, 0.8)
    .to(inLine, {
      scaleX: 1,
      duration: 1.2,
      ease: 'expo.inOut'
    }, 1)
    .to(inStats, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1,
      stagger: 0.1,
      ease: 'back.out(1.5)'
    }, 1.1)

    // Outgoing typography sweep
    .to(outChars, {
      y: '-120%',
      rotation: -10,
      opacity: 0,
      duration: 0.6,
      stagger: 0.01,
      ease: 'power3.in'
    }, 0)
    .to(outStats, {
      y: -20,
      opacity: 0,
      scale: 0.95,
      duration: 0.5,
      stagger: 0.05,
      ease: 'power2.in'
    }, 0);
  };

  const handleNext = () => changeSlide((current + 1) % vehicles.length, 'next');
  const handlePrev = () => changeSlide(current === 0 ? vehicles.length - 1 : current - 1, 'prev');

  useGSAP(() => {
    const firstSlide = slideRefs.current[0];
    gsap.set(firstSlide, { zIndex: 10 });
    
    gsap.to(firstSlide.querySelector('.bg-image'), {
      scale: 1,
      duration: 4,
      ease: 'power2.out'
    });

    gsap.to(firstSlide.querySelectorAll('.reveal-char'), {
      y: '0%',
      rotation: 0,
      skewX: 0,
      opacity: 1,
      duration: 1.5,
      stagger: 0.03,
      ease: 'expo.out',
      delay: 0.5
    });

    gsap.to(firstSlide.querySelector('.reveal-line'), {
      scaleX: 1,
      duration: 1.5,
      ease: 'expo.inOut',
      delay: 0.8
    });

    gsap.to(firstSlide.querySelectorAll('.reveal-stat'), {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1.2,
      stagger: 0.1,
      ease: 'back.out(1.5)',
      delay: 1.2
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative h-screen w-full bg-[#050505] overflow-hidden text-white font-sans selection:bg-amber-500 selection:text-black">
      
      {/* Texture Overlay for cinematic grit */}
      <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      {vehicles.map((vehicle, index) => (
        <div 
          key={vehicle.id} 
          ref={addToRefs}
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: index === 0 ? 10 : 0 }}
        >
          {/* Parallax Image Wrapper */}
          <div className="absolute inset-[-5%] w-[110%] h-[110%]">
            <div 
              className="bg-image absolute inset-0 w-full h-full bg-cover bg-center scale-110"
              style={{ backgroundImage: `url(${vehicle.image})` }}
            />
          </div>
          
          {/* Cinematic Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/90 via-[#050505]/30 to-transparent" />

          {/* Main Content Payload */}
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

            {/* High-End Glassmorphic Stats Panel */}
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

      {/* Premium Navigation Controls */}
      <div className="absolute bottom-12 right-6 md:right-24 z-50 flex items-center gap-8">
        
        {/* Pagination indicator */}
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

        {/* Action Buttons */}
        <div className="flex items-center p-1.5 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl">
          <button 
            onClick={handlePrev}
            className="w-14 h-14 flex items-center justify-center rounded-full hover:bg-white/10 transition-all duration-300 text-zinc-400 hover:text-white group"
          >
            <MoveLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
          </button>
          
          <div className="w-[1px] h-6 bg-white/10 mx-2" />

          <button 
            onClick={handleNext}
            className="w-14 h-14 flex items-center justify-center rounded-full hover:bg-amber-500 hover:text-black transition-all duration-300 text-white group"
          >
            <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default Home;