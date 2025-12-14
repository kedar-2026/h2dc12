import React, {useState} from 'react'

export default function App(){
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const [showDetail, setShowDetail] = useState(false)

  // Product Data
  const products = [
    {
      id: 1,
      title: "Membraneless Microfluidic Electrolyzer",
      short: "Novel co-laminar flow technology eliminating physical membranes.",
      detail: "Our flagship 5-cell stack features a membraneless microfluidic technique with high convective mass transport. It operates at 2.5V with a current density of ~1A/cm². The practical H2 collection rate is 228 mL/h with ~80% volumetric efficiency. Dimensions: 5cm x 4cm x 3.5cm.",
      // This will load the photo you put in the public folder
      image: "/stack.jpg", 
      icon: null 
    },
    {
      id: 2,
      title: "Microfluidic Electrochemical Conversion Units",
      short: "Tandem operations for fuel cells and specialized conversion.",
      detail: "These units utilize our patented 'Two-phase flow microfluidic electrolysis cell' technology. They allow for electrolysis-fuel cell tandem operations, facilitating easy gas collection and pressurized operations without complex membrane maintenance.",
      image: null,
      icon: "🔄"
    },
    {
      id: 3,
      title: "Manufacturing Services",
      short: "3D Printing & Precision Material Coating.",
      detail: "We offer specialized additive manufacturing for electrolyzer parts (flow plates, frames) with 2-week delivery. We also provide precision material coating services, including Pt-sputtered porous Ni electrodes and catalyst-supported flow structures.",
      image: null,
      icon: "🖨️"
    },
    {
      id: 4,
      title: "Lab & Testing Services",
      short: "Material Characterization (SEM/EDX, TGA) & EC Testing.",
      detail: "Comprehensive testing suite including Scanning Electron Microscopy (SEM/EDX), Thermogravimetric Analysis (TGA), elastomer thermal conductivity measurement, and full Electrochemical (EC) benchmarking for external clients.",
      image: null,
      icon: "🔬"
    }
  ]

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % products.length)
    setShowDetail(false)
  }
  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + products.length) % products.length)
    setShowDetail(false)
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* HEADER */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo Area */}
            <div className="flex items-center gap-3">
              <a href="#home" className="flex items-center gap-2 group">
                <div className="w-10 h-10 rounded-lg bg-blue-700 flex items-center justify-center shadow-lg group-hover:bg-blue-800 transition-all">
                  <span className="text-white font-bold text-lg">H2</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-lg leading-tight text-slate-900">H2DC12 Avenue</span>
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Decarbonize India</span>
                </div>
              </a>
            </div>

            {/* Desktop Nav - Centered/Right Adjusted */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
              <a href="#products" className="hover:text-blue-700 transition-colors">Products & Services</a>
              <a href="#ips" className="hover:text-blue-700 transition-colors">IPs</a>
              <a href="#team" className="hover:text-blue-700 transition-colors">Team</a>
            </nav>

            {/* Contact Button - Far Right */}
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
              <a href="#team" onClick={()=>setMobileOpen(false)} className="block py-2 font-medium text-slate-600">Team</a>
              <a href="#contact" onClick={()=>setMobileOpen(false)} className="block py-2 font-bold text-blue-700">Contact Us</a>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* HERO SECTION: Company Info */}
        <section id="home" className="relative pt-20 pb-24 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 border border-green-200 text-green-800 text-xs font-bold uppercase tracking-wider mb-6">
                Incubated at IIT Delhi
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Pioneering Clean Energy with <span className="text-blue-700">Microfluidic Tech</span>
              </h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                <strong>H2DC12 Avenue Pvt. Ltd.</strong> is dedicated to the mission to <em>Decarbonize India</em>. 
                We address the primary challenge of high hydrogen production costs by eliminating physical membranes and utilizing novel co-laminar flow mechanics.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a href="#products" className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-all shadow-lg shadow-blue-500/30">
                  Explore Products
                </a>
                <a href="#contact" className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-all">
                  Partner With Us
                </a>
              </div>

              {/* Updated Stats Row */}
              <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-white rounded-lg shadow-sm border border-slate-100">
                  <div className="text-2xl font-bold text-slate-900">₹2500</div>
                  <div className="text-xs font-bold text-slate-500 mt-1 uppercase">Per Cell Cost</div>
                </div>
                <div className="p-3 bg-white rounded-lg shadow-sm border border-slate-100">
                  <div className="text-2xl font-bold text-slate-900">90-99%</div>
                  <div className="text-xs font-bold text-slate-500 mt-1 uppercase">H₂ Purity</div>
                </div>
                <div className="p-3 bg-white rounded-lg shadow-sm border border-slate-100">
                  <div className="text-2xl font-bold text-slate-900">0%</div>
                  <div className="text-xs font-bold text-slate-500 mt-1 uppercase">Membrane Cost</div>
                </div>
              </div>
            </div>

            {/* Right Visual: Updated Diagram */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 p-2">
                <div className="bg-slate-50 rounded-xl p-6 aspect-[4/3] flex items-center justify-center relative">
                  
                  {/* SVG: Y-Shaped Co-Laminar Flow Diagram */}
                  <svg viewBox="0 0 300 400" className="w-full h-full">
                    <defs>
                      <marker id="arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto">
                        <path d="M0,0 L0,6 L9,3 z" fill="#64748b" />
                      </marker>
                      <pattern id="pattern" width="4" height="4" patternUnits="userSpaceOnUse">
                         <circle cx="2" cy="2" r="1" fill="#cbd5e1" />
                      </pattern>
                    </defs>

                    {/* Main Y-Shape Structure */}
                    {/* Inlets at Bottom */}
                    <path d="M100 380 L140 320" fill="none" stroke="#3b82f6" strokeWidth="12" /> {/* Catholyte In */}
                    <path d="M200 380 L160 320" fill="none" stroke="#10b981" strokeWidth="12" /> {/* Anolyte In */}
                    
                    {/* Main Channel (Vertical) */}
                    <rect x="130" y="100" width="40" height="220" fill="#e0f2fe" stroke="none" />
                    
                    {/* Outlets at Top */}
                    <path d="M130 100 L90 40" fill="none" stroke="#ef4444" strokeWidth="12" /> {/* H2 Out */}
                    <path d="M170 100 L210 40" fill="none" stroke="#10b981" strokeWidth="12" /> {/* O2 Out */}

                    {/* Porous Electrodes */}
                    <rect x="130" y="100" width="8" height="220" fill="url(#pattern)" stroke="#b45309" strokeWidth="2" /> {/* Cathode */}
                    <rect x="162" y="100" width="8" height="220" fill="url(#pattern)" stroke="#1e293b" strokeWidth="2" /> {/* Anode */}

                    {/* Flow Arrows inside */}
                    <path d="M150 310 L150 110" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow)" />

                    {/* Bubbles */}
                    <circle cx="100" cy="60" r="6" fill="#ef4444" />
                    <text x="80" y="30" fill="#ef4444" fontSize="14" fontWeight="bold">H₂</text>
                    
                    <circle cx="200" cy="60" r="6" fill="#10b981" />
                    <text x="200" y="30" fill="#10b981" fontSize="14" fontWeight="bold">O₂</text>

                    {/* Labels */}
                    <text x="60" y="390" fill="#3b82f6" fontSize="12" fontWeight="bold">Catholyte In</text>
                    <text x="190" y="390" fill="#10b981" fontSize="12" fontWeight="bold">Anolyte In</text>
                    <text x="180" y="200" fill="#334155" fontSize="10" transform="rotate(90 180,200)">Co-Laminar Flow</text>

                  </svg>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm font-semibold text-slate-700">Fig: Membraneless Microfluidic Mechanism</p>
                </div>
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
            <div className="relative bg-slate-50 rounded-3xl shadow-lg border border-slate-200 overflow-hidden min-h-[500px]">
              
              {/* Main Slide Content */}
              <div className="p-8 md:p-12 flex flex-col items-center justify-center text-center h-full">
                
                {/* Visual: Image or Icon */}
                <div className="mb-6 w-full flex justify-center">
                  {products[activeSlide].image ? (
                    <img 
                      src={products[activeSlide].image} 
                      alt={products[activeSlide].title} 
                      className="h-64 object-contain rounded-lg shadow-md"
                    />
                  ) : (
                    <div className="text-8xl">{products[activeSlide].icon}</div>
                  )}
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 transition-all duration-300">
                  {products[activeSlide].title}
                </h3>
                
                {!showDetail ? (
                  <div className="animate-fadeIn">
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
                      {products[activeSlide].short}
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
                      {products[activeSlide].detail}
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
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white shadow-md text-slate-600 hover:text-blue-700 hover:scale-110 transition-all z-10"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white shadow-md text-slate-600 hover:text-blue-700 hover:scale-110 transition-all z-10"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
              </button>

              {/* Dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {products.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setActiveSlide(idx); setShowDetail(false); }}
                    className={`w-3 h-3 rounded-full transition-all ${idx === activeSlide ? 'bg-blue-600 w-6' : 'bg-slate-300'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* IPs Section */}
        <section id="ips" className="py-20 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Intellectual Property</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm border-l-4 border-blue-600">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Patents Granted</h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex gap-3">
                    <span className="text-blue-600 font-bold">•</span>
                    Electrochemical neutralization energy-assisted membrane-less microfluidic reactor (No. 202011022122)
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-600 font-bold">•</span>
                    Membrane-less two-phase flow microfluidic electrolysis cell (No. 202111016631)
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-600 font-bold">•</span>
                    3 Indian Patents Total
                  </li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm border-l-4 border-green-600">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Research Publications</h3>
                <p className="text-slate-600 mb-4">3 Major International Publications in Chemical Engineering Journal, Sustainable Energy & Fuels, and ACS Applied Energy Materials.</p>
                <div className="text-sm font-semibold text-slate-500">Key Authors: De, B.S., Singh, A., Basu, S.</div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
             <h2 className="text-3xl font-bold text-slate-900 mb-12">Our Team</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {name: "Prof. Suddhasatwa Basu", role: "Founder & Mentor"},
                  {name: "Dr. Biswajit S. De", role: "Founder"},
                  {name: "Dr. Aditya Singh", role: "Founder"},
                  {name: "Dr. Kedar Sahoo", role: "VP Technology"}
                ].map((member, i) => (
                  <div key={i} className="p-6 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-2xl font-bold text-blue-600 mb-4">
                      {member.name.charAt(0)}
                    </div>
                    <h3 className="font-bold text-slate-900">{member.name}</h3>
                    <p className="text-sm text-slate-500">{member.role}</p>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer id="contact" className="bg-slate-900 text-slate-400 py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Column 1: Address */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4">H2DC12 Avenue Pvt. Ltd.</h3>
              <p className="leading-relaxed text-sm mb-4">
                A-33 S/F KH. No. 93/95, Gali No. 2,<br/>
                New Usmanpur, Delhi - 110053
              </p>
              <p className="text-sm">CIN: U29300PN2021PTC204130</p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#products" className="hover:text-white transition-colors">Products & Services</a></li>
                <li><a href="#ips" className="hover:text-white transition-colors">Intellectual Property</a></li>
                <li><a href="#team" className="hover:text-white transition-colors">Team</a></li>
              </ul>
            </div>

            {/* Column 3: Contact */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  <span>+91 90284 42757</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  <span>h2dcavenue@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-sm text-center">
            &copy; {new Date().getFullYear()} H2DC12 Avenue Private Limited. Decarbonize India.
          </div>
        </footer>

      </main>
    </div>
  )
}
