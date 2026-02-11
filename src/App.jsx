import React, { useState, useEffect, useRef } from 'react'

export default function App() {
  const productVideoRef = useRef(null)

  // Helper: resolve public/ asset paths so they work with GitHub Pages base
  const base = import.meta.env.BASE_URL || '/'
  const asset = (p) => `${base}${encodeURI(p)}`

  // ✅ Hero video state (separate from carousel)
  const heroVideos = [asset('video2.mp4'), asset('video3.mp4')]
  const [heroVideoIndex, setHeroVideoIndex] = useState(0)
  const heroVideoRef = useRef(null)

  const [mobileOpen, setMobileOpen] = useState(false)
  
  // State for the nested carousel logic
  const [activeProductIndex, setActiveProductIndex] = useState(0)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [showDetail, setShowDetail] = useState(false)

  // State for random floating molecules with collision detection
  const [molecules, setMolecules] = useState([])
  const moleculePositions = useRef([])

  // Generate random molecules on mount
  useEffect(() => {
    const moleculeTypes = ['benzene', 'h2', 'o2', 'carbon', 'co2', 'h2o', 'hmf', 'furan', 'h2o2', 'fdca']
    const count = 300 // Increased from 50
    const newMolecules = []
    
    // Ensure equal distribution of each molecule type
    const typesPerMolecule = Math.floor(count / moleculeTypes.length)
    const remainder = count % moleculeTypes.length
    
    let moleculeIndex = 0
    
    // Add equal amounts of each type
    moleculeTypes.forEach((type, typeIndex) => {
      const countForThisType = typesPerMolecule + (typeIndex < remainder ? 1 : 0)
      
      for (let i = 0; i < countForThisType; i++) {
        newMolecules.push({
          id: moleculeIndex++,
          type: type,
          x: Math.random() * 100,
          y: Math.random() * 100,
          vx: (Math.random() - 0.5) * 0.3, // velocity x
          vy: (Math.random() - 0.5) * 0.3, // velocity y
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 2,
          opacity: 0.7 + Math.random() * 0.2, // Increased opacity for better visibility
          size: 1,
        })
      }
    })
    
    // Shuffle the array to randomize positions
    for (let i = newMolecules.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newMolecules[i], newMolecules[j]] = [newMolecules[j], newMolecules[i]]
    }
    
    setMolecules(newMolecules)
    moleculePositions.current = newMolecules
  }, [])

  // Animation loop for collision detection
  useEffect(() => {
    if (molecules.length === 0) return

    const animationFrame = () => {
      setMolecules(prevMolecules => {
        const updated = prevMolecules.map(mol => ({...mol}))
        
        // Update positions
        updated.forEach(mol => {
          mol.x += mol.vx
          mol.y += mol.vy
          mol.rotation += mol.rotationSpeed
          
          // Bounce off edges
          if (mol.x <= 0 || mol.x >= 100) mol.vx *= -1
          if (mol.y <= 0 || mol.y >= 100) mol.vy *= -1
          
          // Keep within bounds
          mol.x = Math.max(0, Math.min(100, mol.x))
          mol.y = Math.max(0, Math.min(100, mol.y))
        })
        
        // Check collisions
        for (let i = 0; i < updated.length; i++) {
          for (let j = i + 1; j < updated.length; j++) {
            const mol1 = updated[i]
            const mol2 = updated[j]
            
            const dx = mol2.x - mol1.x
            const dy = mol2.y - mol1.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            
            // Collision detected (molecules are within 3% of screen)
            if (distance < 3) {
              // Calculate collision response
              const angle = Math.atan2(dy, dx)
              const sin = Math.sin(angle)
              const cos = Math.cos(angle)
              
              // Rotate velocities
              const vx1 = mol1.vx * cos + mol1.vy * sin
              const vy1 = mol1.vy * cos - mol1.vx * sin
              const vx2 = mol2.vx * cos + mol2.vy * sin
              const vy2 = mol2.vy * cos - mol2.vx * sin
              
              // Swap velocities (elastic collision)
              const vx1Final = vx2
              const vx2Final = vx1
              
              // Rotate back
              mol1.vx = vx1Final * cos - vy1 * sin
              mol1.vy = vy1 * cos + vx1Final * sin
              mol2.vx = vx2Final * cos - vy2 * sin
              mol2.vy = vy2 * cos + vx2Final * sin
              
              // Add some randomness to make it more natural
              mol1.vx += (Math.random() - 0.5) * 0.1
              mol1.vy += (Math.random() - 0.5) * 0.1
              mol2.vx += (Math.random() - 0.5) * 0.1
              mol2.vy += (Math.random() - 0.5) * 0.1
              
              // Separate molecules to prevent sticking
              const overlap = 3 - distance
              const separateX = (dx / distance) * overlap * 0.5
              const separateY = (dy / distance) * overlap * 0.5
              
              mol1.x -= separateX
              mol1.y -= separateY
              mol2.x += separateX
              mol2.y += separateY
            }
          }
        }
        
        return updated
      })
    }

    const interval = setInterval(animationFrame, 50) // Update ~20 times per second
    return () => clearInterval(interval)
  }, [molecules.length])

  const slideshowRef = useRef(null);
  const [isSlideshowVisible, setIsSlideshowVisible] = useState(false);

  useEffect(() => {
    if (!slideshowRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSlideshowVisible(entry.intersectionRatio >= 0.4);
      },
      { threshold: [0, 0.25, 0.4, 0.75] }
    );

    observer.observe(slideshowRef.current);
    return () => observer.disconnect();
  }, []);

  // 1. Define Image Arrays for each product category (use asset() helper)
  const productImages = {
    0: [ // Electrolyzer
      asset('1-0.jpeg'),
      asset('electrolyzer-2.png'),
      asset('electrolyzer-3.png'),
      asset('video3.mp4'),
      asset('video4.mp4'),
    ],
    1: [ // Conversion Devices (Renamed) - includes stack.jpg
      asset('conversion-device-1.png'),
      asset('stack.jpg'),
      asset('conversion-device-2.png'),
      asset('3d-printer-1.png'),
      asset('3d-printer-2.png'),
      asset('3d-printer-3.png'),
      asset('conversion-device-3.png'),
    ],
    2: [ // Manufacturing
      asset('3-0.jpeg'),
      asset('4-7 (3).jpeg'),
          ],
    3: [ // Testing (Renamed)
      asset('4_1.png'),
      asset('4_2.png'),
      asset('4-3.png'),
      asset('4-4.png'),
      asset('4-5 (1).png'),
      asset('4-6 (1).png'),
    ]
  }

  const nextImageInSegment = () => {
    const images = productImages[activeProductIndex];
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImageInSegment = () => {
    const images = productImages[activeProductIndex];
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };


  // Product Data
  const products = [
    {
      id: 1,
      title: "Membraneless Microfluidic Electrolyzer",
      short: "Novel co-laminar flow technology eliminating physical membranes.",
      detail: "Our flagship membraneless microfluidic technology not only produce 99.99 % pure hydrogen from water electrolysis but also restricts the use of costlier membranes and their subsequent maintenance costs. On a scaled-up basis, we are also developing membraneless flow electrolyzer stack modules with a minimum power consumption of 7 mWh/mL and capable of producing ~90 % pure hydrogen gas @ 228 mL/h. The minimum weight of the electrolyzer stack is 50 gm with foot print area of ~20 cm 2 .",
    },
    {
      id: 2,
      // Renamed from 'Microfluidic Electrochemical Conversion Units'
      title: "Microfluidic Electrochemical Conversion Devices",
      short: "Tandem operations for fuel cells and specialized conversion.",
      detail: "Our state-of-the-art flow electrolyzers is suitable for electrochemical valorization of biomass derivatives into platform chemicals along with the co- production of hydrogen gas. Our patent technology is capable of continuous electrochemical conversion of biomass derivatives, e.g. hydroxy methyl furfural, into platform chemicals with selectivity ~70 % and conversion efficiency of 80 %.",
    },
    {
      id: 3,
      title: "Manufacturing Services",
      short: "3D Printing & Precision Material Coating.",
      // Updated Description
      detail: "We offer specialized services in the supply of 3D printed electrolyzer parts (flow plates, liquid liquid-distributors, gas-liquid separation units, and microfluidic flow channels, etc.). We also provide services in electrodeposited metal coatings, DC/RF sputtered electrodes, and catalyst-supported flow structures.",
    },
    {
      id: 4,
      // Renamed from 'Lab & Testing Services'
      title: "Testing of materials for energy conversions",
      short: "Material Characterization (SEM/EDX, TGA) & EC Testing.",
      detail: "Comprehensive testing of materials like “coefficient of thermal expansion”, conductivity measurements, thermo-gravimetric analysis (TGA), electrochemical property estimation, XRD/SEM, and fuel-cell testing for external users on a payment basis.",
    }
  ]
  const isCurrentSlideVideo = () => {
    const item =
      productImages[activeProductIndex]?.[activeImageIndex];
    return item?.endsWith(".mp4");
  };

  // 2. The Cycle Logic (video-aware)
  useEffect(() => {
    if (!isSlideshowVisible) return; // pause when not visible on screen
    if (isHovered || showDetail) return;

    // 🚫 Do NOT auto-cycle if current slide is a video
    if (isCurrentSlideVideo()) return;

    const interval = setInterval(() => {
      const currentImages = productImages[activeProductIndex] || [];

      if (activeImageIndex < currentImages.length - 1) {
        setActiveImageIndex(prev => prev + 1);
      } else {
        setActiveImageIndex(0);
        setActiveProductIndex(prev => (prev + 1) % products.length);
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [activeImageIndex, activeProductIndex, isSlideshowVisible, isHovered, showDetail]);


  useEffect(() => {
    const currentItem =
      productImages[activeProductIndex]?.[activeImageIndex]

    if (currentItem?.endsWith(".mp4") && productVideoRef.current) {
      productVideoRef.current.load()
      productVideoRef.current
        .play()
        .catch(() => {
          // autoplay may be blocked until user interaction
        })
    }
  }, [activeProductIndex, activeImageIndex])


  // Manual Navigation Helpers
  const nextSlide = () => {
    setActiveImageIndex(0)
    setActiveProductIndex((prev) => (prev + 1) % products.length)
    setShowDetail(false)
  }
  const prevSlide = () => {
    setActiveImageIndex(0)
    setActiveProductIndex((prev) => (prev - 1 + products.length) % products.length)
    setShowDetail(false)
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* HEADER */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            
            {/* Logo Area */}
            <div className="flex items-center gap-4">
              <a href="#home" className="flex items-center gap-3 group">
                <img 
                  src={asset('logo.png')} 
                  alt="H2DC12 Logo" 
                  className="h-16 w-auto object-contain transition-transform group-hover:scale-105" 
                />
                <div className="flex flex-col justify-center">
                  <span className="font-extrabold text-3xl tracking-tight text-slate-900 leading-none">
                    H2DC12 Avenue
                  </span>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-widest mt-1">
                    Decarbonize India
                  </span>
                </div>
              </a>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
              <a href="#products" className="hover:text-blue-700 transition-colors">Products & Services</a>
              <a href="#ips" className="hover:text-blue-700 transition-colors">IPs</a>
              <a href="#clients" className="hover:text-blue-700 transition-colors">Clients</a>
              <a href="#team" className="hover:text-blue-700 transition-colors">Team</a>
            </nav>

            <div className="hidden md:block">
              <a href="#contact" className="inline-flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-md">
                Contact Us
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden p-2 text-slate-600" onClick={()=>setMobileOpen(!mobileOpen)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>

          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileOpen && (
          <div className="md:hidden border-t bg-white absolute w-full shadow-xl z-50">
            <div className="px-6 py-4 flex flex-col gap-2">
              <a href="#products" onClick={()=>setMobileOpen(false)} className="block py-2 font-medium text-slate-600">Products & Services</a>
              <a href="#ips" onClick={()=>setMobileOpen(false)} className="block py-2 font-medium text-slate-600">IPs</a>
              <a href="#clients" onClick={()=>setMobileOpen(false)} className="block py-2 font-medium text-slate-600">Clients</a>
              <a href="#team" onClick={()=>setMobileOpen(false)} className="block py-2 font-medium text-slate-600">Team</a>
              <a href="#contact" onClick={()=>setMobileOpen(false)} className="block py-2 font-bold text-blue-700">Contact Us</a>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* HERO SECTION with Video Background */}
        <section
  id="home"
  className="relative pt-32 pb-48 overflow-hidden z-0"
>
          
          {/* Animated Chemical Structures Background */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <svg className="absolute inset-0 w-full h-full">
              <defs>
                {/* Benzene Ring - Enhanced Visibility */}
                <g id="benzene">
                  <polygon points="40,0 80,20 80,60 40,80 0,60 0,20" fill="none" stroke="#3b82f6" strokeWidth="4" opacity="0.8"/>
                  <circle cx="40" cy="0" r="6" fill="#3b82f6" opacity="0.9"/>
                  <circle cx="80" cy="20" r="6" fill="#3b82f6" opacity="0.9"/>
                  <circle cx="80" cy="60" r="6" fill="#3b82f6" opacity="0.9"/>
                  <circle cx="40" cy="80" r="6" fill="#3b82f6" opacity="0.9"/>
                  <circle cx="0" cy="60" r="6" fill="#3b82f6" opacity="0.9"/>
                  <circle cx="0" cy="20" r="6" fill="#3b82f6" opacity="0.9"/>
                  <circle cx="40" cy="40" r="20" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeDasharray="4,4" opacity="0.7"/>
                </g>
                
                {/* H2 Molecule - Enhanced */}
                <g id="h2">
                  <circle cx="0" cy="0" r="14" fill="#ef4444" opacity="0.85"/>
                  <circle cx="35" cy="0" r="14" fill="#ef4444" opacity="0.85"/>
                  <line x1="14" y1="0" x2="21" y2="0" stroke="#ef4444" strokeWidth="5" opacity="0.9"/>
                  <text x="-6" y="7" fill="white" fontSize="16" fontWeight="bold">H</text>
                  <text x="29" y="7" fill="white" fontSize="16" fontWeight="bold">H</text>
                </g>
                
                {/* O2 Molecule - Enhanced */}
                <g id="o2">
                  <circle cx="0" cy="0" r="16" fill="#10b981" opacity="0.85"/>
                  <circle cx="40" cy="0" r="16" fill="#10b981" opacity="0.85"/>
                  <line x1="16" y1="0" x2="24" y2="0" stroke="#10b981" strokeWidth="5" opacity="0.9"/>
                  <text x="-7" y="7" fill="white" fontSize="16" fontWeight="bold">O</text>
                  <text x="33" y="7" fill="white" fontSize="16" fontWeight="bold">O</text>
                </g>
                
                {/* Carbon Chain - Enhanced */}
                <g id="carbon">
                  <circle cx="0" cy="0" r="11" fill="#64748b" opacity="0.8"/>
                  <circle cx="35" cy="0" r="11" fill="#64748b" opacity="0.8"/>
                  <circle cx="70" cy="0" r="11" fill="#64748b" opacity="0.8"/>
                  <line x1="11" y1="0" x2="24" y2="0" stroke="#64748b" strokeWidth="4" opacity="0.85"/>
                  <line x1="46" y1="0" x2="59" y2="0" stroke="#64748b" strokeWidth="4" opacity="0.85"/>
                  <text x="-5" y="6" fill="white" fontSize="12" fontWeight="bold">C</text>
                  <text x="30" y="6" fill="white" fontSize="12" fontWeight="bold">C</text>
                  <text x="65" y="6" fill="white" fontSize="12" fontWeight="bold">C</text>
                </g>
                
                {/* CO2 Molecule - Enhanced */}
                <g id="co2">
                  <circle cx="0" cy="0" r="12" fill="#10b981" opacity="0.8"/>
                  <circle cx="35" cy="0" r="14" fill="#64748b" opacity="0.8"/>
                  <circle cx="70" cy="0" r="12" fill="#10b981" opacity="0.8"/>
                  <line x1="12" y1="0" x2="21" y2="0" stroke="#64748b" strokeWidth="4" opacity="0.85"/>
                  <line x1="49" y1="0" x2="58" y2="0" stroke="#64748b" strokeWidth="4" opacity="0.85"/>
                </g>
                
                {/* Water Molecule - Enhanced */}
                <g id="h2o">
                  <circle cx="18" cy="0" r="16" fill="#06b6d4" opacity="0.8"/>
                  <circle cx="0" cy="24" r="12" fill="#ef4444" opacity="0.8"/>
                  <circle cx="36" cy="24" r="12" fill="#ef4444" opacity="0.8"/>
                  <line x1="7" y1="16" x2="14" y2="7" stroke="#06b6d4" strokeWidth="4" opacity="0.85"/>
                  <line x1="29" y1="16" x2="22" y2="7" stroke="#06b6d4" strokeWidth="4" opacity="0.85"/>
                </g>
                
                {/* HMF (5-Hydroxymethylfurfural) - Enhanced */}
                <g id="hmf">
                  <circle cx="20" cy="0" r="12" fill="#f59e0b" opacity="0.85"/>
                  <circle cx="45" cy="18" r="12" fill="#f59e0b" opacity="0.85"/>
                  <circle cx="33" cy="42" r="12" fill="#f59e0b" opacity="0.85"/>
                  <circle cx="12" cy="42" r="12" fill="#f59e0b" opacity="0.85"/>
                  <circle cx="0" cy="18" r="12" fill="#ef4444" opacity="0.8"/>
                  <line x1="27" y1="7" x2="38" y2="16" stroke="#f59e0b" strokeWidth="4" opacity="0.8"/>
                  <line x1="42" y1="27" x2="36" y2="35" stroke="#f59e0b" strokeWidth="4" opacity="0.8"/>
                  <line x1="26" y1="44" x2="19" y2="44" stroke="#f59e0b" strokeWidth="4" opacity="0.8"/>
                  <line x1="9" y1="35" x2="5" y2="26" stroke="#f59e0b" strokeWidth="4" opacity="0.8"/>
                  <line x1="6" y1="20" x2="16" y2="7" stroke="#f59e0b" strokeWidth="4" opacity="0.8"/>
                  <text x="15" y="24" fill="white" fontSize="10" fontWeight="bold">HMF</text>
                </g>
                
                {/* Furan Ring - Enhanced */}
                <g id="furan">
                  <circle cx="22" cy="0" r="12" fill="#f59e0b" opacity="0.85"/>
                  <circle cx="46" cy="18" r="12" fill="#f59e0b" opacity="0.85"/>
                  <circle cx="34" cy="46" r="12" fill="#f59e0b" opacity="0.85"/>
                  <circle cx="12" cy="46" r="12" fill="#f59e0b" opacity="0.85"/>
                  <circle cx="0" cy="18" r="12" fill="#ef4444" opacity="0.8"/>
                  <line x1="28" y1="8" x2="39" y2="20" stroke="#f59e0b" strokeWidth="4" opacity="0.8"/>
                  <line x1="43" y1="27" x2="37" y2="38" stroke="#f59e0b" strokeWidth="4" opacity="0.8"/>
                  <line x1="27" y1="48" x2="19" y2="48" stroke="#f59e0b" strokeWidth="4" opacity="0.8"/>
                  <line x1="9" y1="38" x2="4" y2="26" stroke="#f59e0b" strokeWidth="4" opacity="0.8"/>
                  <line x1="6" y1="20" x2="17" y2="8" stroke="#f59e0b" strokeWidth="4" opacity="0.8"/>
                </g>
                
                {/* H2O2 (Hydrogen Peroxide) - Enhanced */}
                <g id="h2o2">
                  <circle cx="0" cy="0" r="12" fill="#ef4444" opacity="0.85"/>
                  <circle cx="24" cy="0" r="14" fill="#06b6d4" opacity="0.85"/>
                  <circle cx="48" cy="0" r="14" fill="#06b6d4" opacity="0.85"/>
                  <circle cx="72" cy="0" r="12" fill="#ef4444" opacity="0.85"/>
                  <line x1="12" y1="0" x2="24" y2="0" stroke="#06b6d4" strokeWidth="4" opacity="0.85"/>
                  <line x1="38" y1="0" x2="48" y2="0" stroke="#06b6d4" strokeWidth="4" opacity="0.85"/>
                  <line x1="62" y1="0" x2="60" y2="0" stroke="#06b6d4" strokeWidth="4" opacity="0.85"/>
                  <text x="26" y="18" fill="#06b6d4" fontSize="11" fontWeight="bold">H₂O₂</text>
                </g>
                
                {/* FDCA (2,5-Furandicarboxylic acid) - Enhanced */}
                <g id="fdca">
                  <circle cx="34" cy="0" r="12" fill="#f59e0b" opacity="0.85"/>
                  <circle cx="58" cy="18" r="12" fill="#f59e0b" opacity="0.85"/>
                  <circle cx="46" cy="46" r="12" fill="#f59e0b" opacity="0.85"/>
                  <circle cx="22" cy="46" r="12" fill="#f59e0b" opacity="0.85"/>
                  <circle cx="10" cy="18" r="12" fill="#ef4444" opacity="0.8"/>
                  <rect x="0" y="12" width="10" height="14" fill="#10b981" opacity="0.8" rx="2"/>
                  <rect x="60" y="12" width="10" height="14" fill="#10b981" opacity="0.8" rx="2"/>
                  <line x1="40" y1="8" x2="51" y2="20" stroke="#f59e0b" strokeWidth="4" opacity="0.8"/>
                  <line x1="55" y1="27" x2="49" y2="38" stroke="#f59e0b" strokeWidth="4" opacity="0.8"/>
                  <line x1="39" y1="48" x2="29" y2="48" stroke="#f59e0b" strokeWidth="4" opacity="0.8"/>
                  <line x1="19" y1="38" x2="13" y2="26" stroke="#f59e0b" strokeWidth="4" opacity="0.8"/>
                  <line x1="16" y1="20" x2="28" y2="8" stroke="#f59e0b" strokeWidth="4" opacity="0.8"/>
                  <text x="24" y="28" fill="white" fontSize="9" fontWeight="bold">FDCA</text>
                </g>
              </defs>
              
              {/* Dynamically Positioned Molecules with Collision Physics */}
              {molecules.map((molecule) => (
                <g 
                  key={molecule.id}
                  style={{
                    transform: `translate(${molecule.x}%, ${molecule.y}%) rotate(${molecule.rotation}deg)`,
                    opacity: molecule.opacity,
                    transition: 'transform 0.05s linear',
                    transformOrigin: 'center'
                  }}
                >
                  <use href={`#${molecule.type}`} x="0" y="0" />
                </g>
              ))}
            </svg>
          </div>
          
          {/* Background Video Layer */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-white/90 lg:bg-white/80 z-10"></div> {/* Overlay to ensure text readability */}
            <video
			  ref={productVideoRef}
			  src={productImages[activeProductIndex][activeImageIndex]}
			  autoPlay
			  muted
			  playsInline
			  className="h-full w-full object-cover"
			  onEnded={() => {
				const images = productImages[activeProductIndex];

				if (activeImageIndex < images.length - 1) {
				  // next image/video in the SAME product
				  setActiveImageIndex(prev => prev + 1);
				} else {
				  // move to NEXT product
				  setActiveImageIndex(0);
				  setActiveProductIndex(prev => (prev + 1) % products.length);
				}
			  }}
			/>
	 
          </div>

          <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 border border-green-200 text-green-800 text-xs font-bold uppercase tracking-wider mb-6">
                Incubated at IIT Delhi
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Pioneering Clean Energy with <span className="text-blue-700">Microfluidic Tech</span>
              </h1>
              <p className="mt-6 text-lg text-slate-700 leading-relaxed font-medium">
                <strong>H2DC12 Avenue Pvt. Ltd.</strong> is dedicated to the mission to <em>Decarbonize India</em>. 
                We address the primary challenge of green energy production costs by incorporating state of the art membrane-less microfluidic technology for green hydrogen production, fuel cell embedded power generation and platform chemical synthesis. 

              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a href="#products" className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-all shadow-lg shadow-blue-500/30">
                  Explore Products
                </a>
                <a href="#contact" className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-all">
                  Partner With Us
                </a>
              </div>

              {/* Stats Row */}
              <div className="mt-12 pt-8 border-t border-slate-300/50 grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-white/60 backdrop-blur-sm rounded-lg shadow-sm border border-slate-100">
                  <div className="text-2xl font-bold text-slate-900">₹2500</div>
                  <div className="text-xs font-bold text-slate-600 mt-1 uppercase">Per Cell Cost</div>
                </div>
                <div className="p-3 bg-white/60 backdrop-blur-sm rounded-lg shadow-sm border border-slate-100">
                  <div className="text-2xl font-bold text-slate-900">≈99%</div>
                  <div className="text-xs font-bold text-slate-600 mt-1 uppercase">H₂ Purity</div>
                </div>
                <div className="p-3 bg-white/60 backdrop-blur-sm rounded-lg shadow-sm border border-slate-100">
                  <div className="text-2xl font-bold text-slate-900">0%</div>
                  <div className="text-xs font-bold text-slate-600 mt-1 uppercase">Membrane Cost</div>
                </div>
              </div>
            </div>

            {/* Right Visual: Diagram */}
            <div className="relative hidden lg:block">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-slate-200 p-2">
                <div className="bg-slate-50 rounded-xl p-6 aspect-[4/3] flex items-center justify-center relative">
                  {/* SVG Diagram */}
                  <img
					src={asset('main_d.png')}
					alt="Electrolyzer schematic"
					className="w-full h-full object-contain p-2"
			      />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RECOGNITIONS SECTION (Unnamed as requested) */}
        <section className="py-12 bg-slate-50 border-y border-slate-200">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">
    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
       
       <div className="flex items-center gap-2">
         <img src={asset('iitd-logo.png')} alt="IIT Delhi" className="h-16 w-auto object-contain" />
         <span className="font-bold text-slate-600">Incubated at IIT Delhi</span>
       </div>
       
       <div className="flex items-center gap-2">
         <img src={asset('dst-logo.png')} alt="DST" className="h-16 w-auto object-contain" />
         <span className="font-bold text-slate-600">DST Supported</span>
       </div>
       
       <div className="flex items-center gap-2">
         <img src={asset('startup-india-logo.png')} alt="Startup India" className="h-16 w-auto object-contain" />
         <span className="font-bold text-slate-600">Startup India Recognized</span>
       </div>
       
    </div>
  </div>
</section>

        {/* PRODUCTS SLIDESHOW SECTION */}
        <section id="products" className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-base font-bold text-blue-700 uppercase tracking-wide">Our Portfolio</h2>
              <p className="mt-2 text-3xl font-bold text-slate-900">Products & Services</p>
            </div>

            {/* Carousel Container */}
            <div ref={slideshowRef} className="relative bg-slate-50 rounded-3xl shadow-lg border border-slate-200 overflow-hidden min-h-[600px] flex flex-col">
              
              {/* Image Display Area */}
              <div 
                className="relative h-80 bg-slate-100 flex items-center justify-center overflow-hidden group cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {productImages[activeProductIndex] && productImages[activeProductIndex][activeImageIndex] ? (
                   productImages[activeProductIndex][activeImageIndex].endsWith('.mp4') ? (
                     <video
  ref={productVideoRef}
  src={productImages[activeProductIndex][activeImageIndex]}
  autoPlay
  muted
  playsInline
  className="h-full w-full object-cover"
/>

                   ) : (
                     <img 
                       src={productImages[activeProductIndex][activeImageIndex]} 
                       alt={products[activeProductIndex].title} 
                       className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                     />
                   )
                ) : (
                  <div className="text-6xl">📷</div>
                )}
                
                {/* Progress Indicators */}
               <div className="absolute bottom-4 flex gap-1.5 z-10">
			  {productImages[activeProductIndex]?.map((_, idx) => (
				<button
				  key={idx}
				  onClick={(e) => {
					e.stopPropagation();
					setActiveImageIndex(idx);
				  }}
				  className={`h-1.5 rounded-full shadow-sm transition-all duration-300 ${
					idx === activeImageIndex
					  ? 'w-6 bg-blue-600'
					  : 'w-2 bg-slate-300 hover:bg-slate-400'
				  }`}
				  aria-label={`Go to image ${idx + 1}`}
				/>
			  ))}
			</div>
	 
			</div>

              {/* Text Content Area */}
              <div className="p-8 md:p-12 flex flex-col items-center justify-center text-center flex-1">
                <div className="mb-2 text-blue-600 font-bold text-sm tracking-wider uppercase">
                  {activeProductIndex + 1} / {products.length}
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                  {products[activeProductIndex].title}
                </h3>
                
                {!showDetail ? (
                  <div className="animate-fadeIn">
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
                      {products[activeProductIndex].short}
                    </p>
                    <button 
                      onClick={() => setShowDetail(true)}
                      className="px-6 py-2 bg-white border border-blue-600 text-blue-700 font-semibold rounded-full hover:bg-blue-50 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                ) : (
                  <div className="animate-fadeInUp bg-white p-6 rounded-xl shadow-sm border border-slate-100 max-w-3xl">
                    <p className="text-slate-700 leading-relaxed text-left">
                      {products[activeProductIndex].detail}
                    </p>
                    <button 
                      onClick={() => setShowDetail(false)}
                      className="mt-6 text-sm text-slate-500 underline hover:text-slate-800"
                    >
                      Show Less
                    </button>
                  </div>
                )}
              </div>

              {/* Navigation Arrows */}
              <button 
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-md text-slate-600 hover:text-blue-700 hover:scale-110 transition-all z-20"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-md text-slate-600 hover:text-blue-700 hover:scale-110 transition-all z-20"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </section>

        {/* CLIENTS SECTION (Blank/Placeholder) */}
        <section id="clients" className="py-20 bg-slate-50">
  <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
    <h2 className="text-3xl font-bold text-slate-900 mb-8">
      Our Clients
    </h2>

    <div className="p-12 rounded-xl bg-white border border-slate-200 shadow-sm">
      <div className="flex justify-center items-center opacity-100">

        <img
          src={asset('clients-logos.png')}
          alt="Our Clients and Partners"
          className="max-h-28 md:max-h-32 w-auto object-contain"
        />
      </div>
    </div>
  </div>
</section>


	{/* IPs Section */}
	<section id="ips" className="py-20 bg-white border-t border-slate-200">
	  <div className="max-w-7xl mx-auto px-6 lg:px-8">
		<h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
		  Intellectual Property
		</h2>

		<div className="grid md:grid-cols-2 gap-8 items-start">
		  {/* Patents */}
		  <div className="bg-slate-50 p-8 rounded-xl shadow-sm border-l-4 border-blue-600">
			<h3 className="text-xl font-bold text-slate-900 mb-4">
			  Patents Granted / Filed
			</h3>
			<ul className="space-y-3 text-slate-600">
			  <li className="flex gap-3 items-start">
				<span className="text-blue-600 font-bold mt-1">•</span>
				<span>
				  Electrochemical neutralization energy-assisted membrane-less
				  microfluidic reactor (No. 473731)
				</span>
			  </li>
			  <li className="flex gap-3 items-start">
				<span className="text-blue-600 font-bold mt-1">•</span>
				<span>
				  Membrane-less two-phase flow microfluidic electrolysis cell – fuel
				  cell tandem operation (No. 520772)
				</span>
			  </li>
			  <li className="flex gap-3 items-start">
				<span className="text-blue-600 font-bold mt-1">•</span>
				<span>
				  Device and method for continuous in situ separation of hydrogen
				  and oxygen (No. 529723)
				</span>
			  </li>
			  <li className="flex gap-3 items-start">
				<span className="text-blue-600 font-bold mt-1">•</span>
				<span>
				  Separator-free laminar flow reactor stack for alkaline water
				  electrolysis (Filed, 2026)
				</span>
			  </li>
			</ul>
		  </div>

		  {/* Publications */}
		  <div className="bg-slate-50 p-8 rounded-xl shadow-sm border-l-4 border-green-600">
			<h3 className="text-xl font-bold text-slate-900 mb-4">
			  Research Publications
			</h3>

			<ul className="space-y-4 text-slate-600">
			  <li className="flex gap-3 items-start">
				<span className="text-green-600 font-bold mt-1">•</span>
				<span>
				  Dixit, R. J., et al. <em>Electrocatalytic hydrogenation of furfural
				  using non-noble-metal electrocatalysts in alkaline medium.</em>{" "}
				  <strong>Green Chemistry</strong>, 23(11), 4201–4212 (2021).
				</span>
			  </li>
			  <li className="flex gap-3 items-start">
				<span className="text-green-600 font-bold mt-1">•</span>
				<span>
				  Dixit, R. J., et al. <em>Tuning product selectivity during
				  electrocatalytic hydrogenation of furfural through
				  oxygen vacancy control in metal oxides.</em>{" "}
				  <strong>Industrial & Engineering Chemistry Research</strong>,
				  63(12), 5039–5052 (2024).
				</span>
			  </li>
			  <li className="flex gap-3 items-start">
				<span className="text-green-600 font-bold mt-1">•</span>
				<span>
				  Dixit, R. J., et al. <em>Electrocatalytic hydrogenation of furfural
				  paired with photoelectrochemical oxidation of water and furfural
				  in batch and flow cells.</em>{" "}
				  <strong>Reaction Chemistry & Engineering</strong>, 6(12),
				  2342–2353 (2021).
				</span>
			  </li>
			  <li className="flex gap-3 items-start">
				<span className="text-green-600 font-bold mt-1">•</span>
				<span>
				  De, B. S., et al. <em>Hydrogen generation in additively manufactured
				  membraneless microfluidic electrolysis cell: Performance
				  evaluation and accelerated stress testing.</em>{" "}
				  <strong>Chemical Engineering Journal</strong>, 452, 139433 (2023).
				</span>
			  </li>
			  <li className="flex gap-3 items-start">
				<span className="text-green-600 font-bold mt-1">•</span>
				<span>
				  Singh, A., et al. <em>Co-generation of hydrogen and FDCA from
				  biomass-based HMF in a 3D-printed flow electrolyzer.</em>{" "}
				  <strong>Industrial & Engineering Chemistry Research</strong>,
				  63(49), 21180–21189 (2024).
				</span>
			  </li>
			  <li className="flex gap-3 items-start">
				<span className="text-green-600 font-bold mt-1">•</span>
				<span>
				  De, B. S., et al. <em>Experimental, equilibrium modelling, and
				  column design for the reactive separation of biomass-derived
				  2-furoic acid.</em>{" "}
				  <strong>The Canadian Journal of Chemical Engineering</strong>,
				  101(6), 3167–3179 (2023).
				</span>
			  </li>
			  <li className="flex gap-3 items-start">
				<span className="text-green-600 font-bold mt-1">•</span>
				<span>
				  De, B. S., et al. <em>Microfabrication of the ammonia
				  plasma-activated nickel nitride–nickel thin film for overall water
				  splitting in the microfluidic membraneless electrolyzer.</em>{" "}
				  <strong>ACS Applied Energy Materials</strong>, 4(9), 9639–9652
				  (2021).
				</span>
			  </li>
			</ul>
		  </div>
		</div>
	  </div>
	</section>

{/* Team Section */}
<section id="team" className="py-20 bg-slate-50">
  <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
    <h2 className="text-3xl font-bold text-slate-900 mb-12">Our Team</h2>

    {/* Row 1 */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
      {[
        {
          name: "Prof. Suddhasatwa Basu",
          role: "Mentor and Co-Founder",
          img: asset('member-1.png'),
          link: "https://scholar.google.co.in/citations?hl=en&user=yQuWxScAAAAJ",
        },
		{
          name: "Dr. Biswajit S. De",
          role: "Co-Founder",
          img: asset('member-4.png'),
          link: "https://scholar.google.com/citations?user=PP1CZUsAAAAJ&hl=en",
        },
        {
          name: "Dr. Aditya Singh",
          role: "Co-Founder",
          img: asset('member-5.png'),
          link: "https://scholar.google.com/citations?user=xsLCqucAAAAJ&hl=en",
        }, 
      ].map((member, i) => (
        <a
          key={i}
          href={member.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-6 rounded-xl bg-white border border-slate-100 hover:shadow-lg transition-shadow"
        >
          <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full border-4 border-slate-50 shadow-md">
            <img
              src={member.img}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="font-bold text-slate-900">{member.name}</h3>
          <p className="text-sm text-slate-500">{member.role}</p>
        </a>
      ))}
    </div>

    {/* Row 2 */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        {
          name: "Dr. Ramji Dixit",
          role: "Co-Founder",
          img: asset('member-8.png'),
          link: "https://scholar.google.com/citations?hl=en&user=je6n3a4AAAAJ",
        },
        {
          name: "Ajinkya Kotkar",
          role: "Director Business",
          img: asset('member-2.png'),
          link: "https://scholar.google.com/citations?user=cYsMyZoAAAAJ&hl=en",
        },
        {
          name: "Dr. Kedar Sahoo",
          role: "V.P. Tech.",
          img: asset('member-3.png'),
          link: "https://scholar.google.com/citations?user=bCDpafkAAAAJ&hl=en",
        },
      ].map((member, i) => (
        <a
          key={i}
          href={member.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-6 rounded-xl bg-white border border-slate-100 hover:shadow-lg transition-shadow"
        >
          <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full border-4 border-slate-50 shadow-md">
            <img
              src={member.img}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="font-bold text-slate-900">{member.name}</h3>
          <p className="text-sm text-slate-500">{member.role}</p>
        </a>
      ))}
    </div>
  </div>
</section>

		 
	        {/* FOOTER & CONTACT */}
        <footer id="contact" className="bg-slate-900 text-slate-400 py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
              
              {/* Contact Info */}
              <div>
                <h3 className="text-white font-bold text-lg mb-6">Contact Info</h3>
                <div className="space-y-4 text-sm">
                  <p className="leading-relaxed">
                    <strong className="text-white block mb-1">H2DC12 Avenue Pvt. Ltd.</strong>
                    A-33 S/F KH. No. 93/95, Gali No. 2,<br/>
                    New Usmanpur, Delhi - 110053
                  </p>
                  <p>CIN: U29300PN2021PTC204130</p>
                  <div className="flex items-center gap-3 pt-2">
                    <span className="text-blue-500 font-bold">Phone:</span>
                    <span>+91 90284 42757</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-blue-500 font-bold">Email:</span>
                    <span>h2dcavenue@gmail.com</span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
                <ul className="space-y-3 text-sm">
                  <li><a href="#products" className="hover:text-white transition-colors">Products & Services</a></li>
                  <li><a href="#ips" className="hover:text-white transition-colors">Intellectual Property</a></li>
                  <li><a href="#team" className="hover:text-white transition-colors">Team</a></li>
                  <li><a href="#clients" className="hover:text-white transition-colors">Clients</a></li>
                </ul>
              </div>

              {/* Inquiry Form */}
              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <h3 className="text-white font-bold text-lg mb-4">Send Inquiry</h3>
                <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                  />
                  <textarea 
                    rows="3"
                    placeholder="Message" 
                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
                  ></textarea>
                  <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold transition-colors">
                    Submit
                  </button>
                </form>
              </div>

            </div>
            
            <div className="pt-8 border-t border-slate-800 text-sm text-center">
              &copy; {new Date().getFullYear()} H2DC12 Avenue Private Limited. Decarbonize India.
            </div>
          </div>
        </footer>

      </main>
    </div>
  )
}

