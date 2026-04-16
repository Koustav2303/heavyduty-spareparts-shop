import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  Search,
  ShoppingCart,
  Filter,
  Settings2,
  Fingerprint,
  Box,
} from "lucide-react";

const SplitText = ({ text, className = "" }) => (
  <span className="inline-flex overflow-hidden pb-2">
    {text.split("").map((char, i) => (
      <span
        key={i}
        className={`inline-block reveal-char ${className}`}
        style={{ opacity: 0, transform: "translateY(100%)" }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ))}
  </span>
);

// Enriched machinery data with technical specs
const partsData = [
  {
    id: "EX-HYD-01",
    name: "Main Hydraulic Pump",
    category: "Hydraulics",
    vehicle: "Excavator",
    price: "$4,200",
    stock: "In Stock",
    specs: "350 Bar | 45kg",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "WL-ENG-02",
    name: "Turbocharger Assembly",
    category: "Engine",
    vehicle: "Wheel Loader",
    price: "$1,850",
    stock: "In Stock",
    specs: "120k RPM | 8.5kg",
    image:
      "https://images.unsplash.com/photo-1597762107711-37905a8f4e6f?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "BH-TRS-03",
    name: "Power Shuttle Trans",
    category: "Transmission",
    vehicle: "Backhoe Loader",
    price: "$3,100",
    stock: "Low Stock",
    specs: "4-Speed | 185kg",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "EX-UND-04",
    name: "Heavy-Duty Track Link",
    category: "Undercarriage",
    vehicle: "Excavator",
    price: "$240",
    stock: "In Stock",
    specs: "Forged Steel | 12kg",
    image:
      "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "WL-HYD-05",
    name: "Steering Cylinder Kit",
    category: "Hydraulics",
    vehicle: "Wheel Loader",
    price: "$720",
    stock: "In Stock",
    specs: "Dual-Act | 28kg",
    image:
      "https://images.unsplash.com/photo-1504913659239-6abc1e715e2e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "BH-ATT-06",
    name: "Standard GP Bucket",
    category: "Attachments",
    vehicle: "Backhoe Loader",
    price: "$1,150",
    stock: "Out of Stock",
    specs: "1.0 m³ | High-Tensile",
    image:
      "https://images.unsplash.com/photo-1541888087545-d81fc10b31e9?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "EX-ENG-07",
    name: "Fuel Injector Bank",
    category: "Engine",
    vehicle: "Excavator",
    price: "$890",
    stock: "In Stock",
    specs: "Common Rail | 2.1kg",
    image:
      "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "EX-HYD-08",
    name: "Hydraulic Control Valve",
    category: "Hydraulics",
    vehicle: "Excavator",
    price: "$2,750",
    stock: "In Stock",
    specs: "6-Spool | 32kg",
    image:
      "https://images.unsplash.com/photo-1581093458791-9f3c3900dfd7?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "WL-ENG-09",
    name: "Air Intake Filter System",
    category: "Engine",
    vehicle: "Wheel Loader",
    price: "$320",
    stock: "In Stock",
    specs: "Dual Stage | 5kg",
    image:
      "https://images.unsplash.com/photo-1581091215367-59ab6b7f5b4b?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "BH-TRS-10",
    name: "Torque Converter Unit",
    category: "Transmission",
    vehicle: "Backhoe Loader",
    price: "$2,400",
    stock: "Low Stock",
    specs: "Hydraulic Drive | 95kg",
    image:
      "https://images.unsplash.com/photo-1604147706283-d7119d3df3d3?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "EX-UND-11",
    name: "Track Roller Assembly",
    category: "Undercarriage",
    vehicle: "Excavator",
    price: "$180",
    stock: "In Stock",
    specs: "Sealed Bearing | 18kg",
    image:
      "https://images.unsplash.com/photo-1529429611279-7bbd3c3f67b8?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "WL-HYD-12",
    name: "Hydraulic Hose Kit",
    category: "Hydraulics",
    vehicle: "Wheel Loader",
    price: "$260",
    stock: "In Stock",
    specs: "High Pressure | 6kg",
    image:
      "https://images.unsplash.com/photo-1581092334631-7f3c9c5e1a9f?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "BH-ATT-13",
    name: "Heavy Duty Ripper Tooth",
    category: "Attachments",
    vehicle: "Backhoe Loader",
    price: "$540",
    stock: "In Stock",
    specs: "Alloy Steel | 14kg",
    image:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "EX-ENG-14",
    name: "Radiator Cooling Module",
    category: "Engine",
    vehicle: "Excavator",
    price: "$1,200",
    stock: "Low Stock",
    specs: "Aluminum Core | 22kg",
    image:
      "https://images.unsplash.com/photo-1581091870622-1e7c88b9f03d?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "WL-UND-15",
    name: "Axle Drive Shaft",
    category: "Undercarriage",
    vehicle: "Wheel Loader",
    price: "$980",
    stock: "In Stock",
    specs: "Hardened Steel | 35kg",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "BH-HYD-16",
    name: "Boom Lift Cylinder",
    category: "Hydraulics",
    vehicle: "Backhoe Loader",
    price: "$1,650",
    stock: "In Stock",
    specs: "Double Acting | 48kg",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "EX-ATT-17",
    name: "Rock Breaker Hammer",
    category: "Attachments",
    vehicle: "Excavator",
    price: "$5,400",
    stock: "Out of Stock",
    specs: "Hydraulic | 210kg",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1000&auto=format&fit=crop",
  },
];

const categories = [
  "All",
  "Hydraulics",
  "Engine",
  "Transmission",
  "Undercarriage",
  "Attachments",
];
const vehicleFilters = ["All", "Excavator", "Backhoe Loader", "Wheel Loader"];

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeVehicle, setActiveVehicle] = useState("All");
  const [isScrolled, setIsScrolled] = useState(false);
  const containerRef = useRef(null);
  const gridRef = useRef(null);

  const filteredParts = partsData.filter((part) => {
    return (
      (activeCategory === "All" || part.category === activeCategory) &&
      (activeVehicle === "All" || part.vehicle === activeVehicle)
    );
  });

  // Handle sticky filter bar styling
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 250);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.to(".reveal-char", {
        y: "0%",
        opacity: 1,
        duration: 1,
        stagger: 0.02,
        ease: "expo.out",
        delay: 0.1,
      }).fromTo(
        ".control-bar",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        0.4,
      );
    },
    { scope: containerRef },
  );

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".part-card");
      gsap.set(cards, { y: 20, opacity: 0, scale: 0.95 });
      gsap.to(cards, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.03,
        ease: "back.out(1.2)",
      });
    },
    { scope: gridRef, dependencies: [activeCategory, activeVehicle] },
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#050505] text-white pt-28 pb-24 px-4 lg:px-8 relative overflow-hidden font-sans"
    >
      {/* Precision Grid Background Overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-[120rem] mx-auto relative z-10">
        <header className="mb-10 text-center flex flex-col items-center">
          <div className="flex items-center gap-3 mb-2">
            <Fingerprint className="w-4 h-4 text-amber-500" />
            <span className="text-amber-500 font-bold tracking-[0.5em] text-[10px] uppercase">
              Secure Global Inventory
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-none">
            <SplitText text="SYSTEM COMPONENTS" />
          </h1>
        </header>

        {/* Sticky Command Center */}
        <div
          className={`control-bar sticky top-20 z-40 flex flex-col xl:flex-row gap-4 mb-10 transition-all duration-300 ${isScrolled ? "bg-black/80 backdrop-blur-2xl border-white/10 shadow-2xl shadow-black p-4 rounded-2xl mx-auto max-w-7xl border" : "bg-transparent border-transparent"}`}
        >
          <div className="flex flex-col lg:flex-row justify-between gap-4 w-full">
            {/* Search Input */}
            <div className="relative w-full lg:w-80 shrink-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="SEARCH ID OR SPEC..."
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-[10px] font-bold tracking-[0.2em] uppercase focus:outline-none focus:border-amber-500/50 transition-all text-white placeholder-zinc-600"
              />
            </div>

            {/* Vehicle Selector (Compact) */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
              <Settings2 size={14} className="text-zinc-600 ml-2" />
              {vehicleFilters.map((v) => (
                <button
                  key={v}
                  onClick={() => setActiveVehicle(v)}
                  className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-[0.15em] transition-all duration-300 border ${
                    activeVehicle === v
                      ? "bg-white text-black border-white"
                      : "bg-white/[0.02] text-zinc-500 border-white/5 hover:border-white/20"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>

            {/* System Category Selector (Compact) */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0 pl-2 border-l border-white/10">
              <Filter size={14} className="text-zinc-600 ml-2" />
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`whitespace-nowrap px-4 py-2 rounded-lg text-[9px] font-bold tracking-[0.15em] uppercase transition-all duration-300 ${
                    activeCategory === c
                      ? "text-amber-500 bg-amber-500/10"
                      : "text-zinc-500 hover:text-white"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* High-Density Grid (Reduced Card Size via layout cols) */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-5"
        >
          {filteredParts.length > 0 ? (
            filteredParts.map((part) => (
              <div
                key={part.id}
                className="part-card group relative bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden hover:border-amber-500/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(245,158,11,0.05)] flex flex-col"
              >
                {/* Image Section - Widescreen Ratio */}
                <div className="relative h-40 overflow-hidden bg-black/40">
                  {/* Tech Grid Overlay (Reveals on Hover) */}
                  <div
                    className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(245, 158, 11, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(245, 158, 11, 0.5) 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                  />

                  <img
                    src={part.image}
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 mix-blend-luminosity group-hover:mix-blend-normal"
                  />

                  {/* Stock Indicator Pill */}
                  <div className="absolute top-3 right-3 z-20">
                    <div
                      className={`flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/80 backdrop-blur-md border ${part.stock === "In Stock" ? "border-emerald-500/20 text-emerald-500" : part.stock === "Low Stock" ? "border-amber-500/20 text-amber-500" : "border-red-500/20 text-red-500"}`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${part.stock === "In Stock" ? "bg-emerald-500" : part.stock === "Low Stock" ? "bg-amber-500" : "bg-red-500"} animate-pulse`}
                      />
                      <span className="text-[8px] font-bold uppercase tracking-widest">
                        {part.stock}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Condensed Data Payload */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="text-zinc-500 text-[8px] font-black uppercase tracking-[0.2em] mb-1 block">
                        {part.id} // {part.vehicle}
                      </span>
                      <h3 className="text-base font-bold text-white tracking-tight leading-snug group-hover:text-amber-500 transition-colors line-clamp-1">
                        {part.name}
                      </h3>
                    </div>
                  </div>

                  {/* Technical Micro-Specs */}
                  <div className="flex items-center gap-2 mb-4 bg-white/[0.02] border border-white/5 p-2 rounded-lg w-fit">
                    <Box className="w-3 h-3 text-zinc-500" />
                    <span className="text-[9px] font-medium text-zinc-400 tracking-widest">
                      {part.specs}
                    </span>
                  </div>

                  {/* Footer / Cart Action */}
                  <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xl font-black text-white tracking-tighter">
                      {part.price}
                    </span>

                    {/* Expanding Add to Cart Button */}
                    <button className="flex items-center justify-center gap-2 h-9 px-3 bg-white/5 rounded-lg border border-white/10 hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all duration-300 group/btn overflow-hidden">
                      <ShoppingCart
                        size={14}
                        className="text-zinc-400 group-hover/btn:text-black transition-colors"
                      />
                      <span className="w-0 overflow-hidden opacity-0 group-hover/btn:w-20 group-hover/btn:opacity-100 transition-all duration-300 text-[9px] font-bold uppercase tracking-widest whitespace-nowrap">
                        Add to Cart
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-24 text-center border border-white/5 rounded-2xl bg-white/[0.01]">
              <Settings2 className="w-8 h-8 text-zinc-700 mx-auto mb-4 animate-spin-slow" />
              <p className="text-zinc-500 uppercase tracking-[0.3em] font-bold text-xs">
                Awaiting hardware configuration match
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
