import React, {useState} from 'react'

export default function App(){
  const [mobileOpen, setMobileOpen] = useState(false)
  const [form, setForm] = useState({name:'', email:'', company:'', interest:'Electrolyzer Stack', message:''})
  
  const handleChange = (e)=> setForm({...form, [e.target.name]: e.target.value})
  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log('Lead submitted', form)
    alert('Thank you. We will contact you regarding your requirements.')
    setForm({name:'', email:'', company:'', interest:'Electrolyzer Stack', message:''})
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            <div className="flex items-center gap-4">
              <a href="#home" className="flex items-center gap-3 group">
                {/* Logo: Pure CSS/SVG, no image file needed */}
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300">
                  <span className="text-white font-bold text-xl">H2</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-lg leading-tight tracking-tight text-slate-900">H2DC12 Avenue</span>
                  <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">FITT IIT Delhi Incubated</span>
                </div>
              </a>
              
              <nav className="hidden md:flex items-center gap-1 ml-8 text-sm font-medium text-slate-600">
                {['Technology', 'Products', 'Team', 'Contact'].map((item) => (
                  <a key={item} href={`#${item.toLowerCase()}`} className="px-4 py-2 rounded-full hover:bg-slate-100 hover:text-blue-700 transition-colors">
                    {item}
                  </a>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-4">
               <span className="hidden lg:block text-xs font-semibold px-3 py-1 bg-green-100 text-green-700 rounded-full border border-green-200">
                DPIIT: DIPP89186
              </span>
              <a href="#contact" className="hidden md:inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-md hover:shadow-lg">
                Contact Us
              </a>

              {/* Mobile menu button */}
              <button className="md:hidden p-2 text-slate-600" onClick={()=>setMobileOpen(!mobileOpen)}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden border-t bg-white absolute w-full shadow-xl z-50">
            <div className="px-6 py-4 flex flex-col gap-2">
              {['Technology', 'Products', 'Team', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={()=>setMobileOpen(false)} className="block py-3 text-base font-medium text-slate-600 border-b border-slate-50 last:border-0">
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="relative pt-20 pb-32 overflow-hidden">
          {/* Abstract Background Element (CSS only) */}
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-gradient-to-br from-blue-100/50 to-cyan-100/50 rounded-full blur-3xl -z-10"></div>

          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6">
                Next-Gen Clean Energy
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Membraneless <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Microfluidic Electrolysis</span>
              </h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
                We are disrupting the green hydrogen market with a novel co-laminar flow technology that eliminates expensive membranes—drastically reducing cost while maintaining high purity.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a href="#contact" className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 transition-all">
                  Get Technical Specs
                </a>
                <a href="#technology" className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-all">
                  How It Works
                </a>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-3 gap-8">
                <div>
                  <div className="text-3xl font-bold text-slate-900">₹425</div>
                  <div className="text-sm font-medium text-slate-500 mt-1">Target Cost Per Cell</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-900">95%</div>
                  <div className="text-sm font-medium text-slate-500 mt-1">Hydrogen Purity</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-900">0%</div>
                  <div className="text-sm font-medium text-slate-500 mt-1">Membrane Cost</div>
                </div>
              </div>
            </div>

            {/* Hero Visual - SVG Diagram (Code based, no image file) */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-2xl rotate-3 opacity-10"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100">
                <div className="aspect-[4/3] flex items-center justify-center bg-slate-50 p-8">
                  {/* SVG diagram representing the Membraneless Microfluidic Cell */}
                  <svg viewBox="0 0 400 300" className="w-full h-full drop-shadow-md">
                    <defs>
                      <linearGradient id="flowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1"/>
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8"/>
                      </linearGradient>
                    </defs>
                    
                    {/* The Y-Shape Channel Body */}
                    <path d="M100 280 L180 200 L180 80 L120 20" fill="none" stroke="#94a3b8" strokeWidth="20" strokeLinecap="round" />
                    <path d="M300 280 L220 200 L220 80 L280 20" fill="none" stroke="#94a3b8" strokeWidth="20" strokeLinecap="round" />
                    
                    {/* Central Reaction Zone */}
                    <rect x="190" y="80" width="20" height="120" fill="#e0f2fe" rx="4" />
                    
                    {/* Bubbles (H2 Left, O2 Right) */}
                    <circle cx="150" cy="150" r="4" fill="#ef4444" className="animate-pulse"/>
                    <circle cx="150" cy="120" r="6" fill="#ef4444" className="animate-pulse" style={{animationDelay:'0.5s'}}/>
                    <circle cx="150" cy="90" r="5" fill="#ef4444" className="animate-pulse" style={{animationDelay:'1s'}}/>
                    <text x="110" y="50" fill="#ef4444" fontSize="14" fontWeight="bold">H₂ Output</text>

                    <circle cx="250" cy="150" r="4" fill="#22c55e" className="animate-pulse"/>
                    <circle cx="250" cy="120" r="6" fill="#22c55e" className="animate-pulse" style={{animationDelay:'0.5s'}}/>
                    <circle cx="250" cy="90" r="5" fill="#22c55e" className="animate-pulse" style={{animationDelay:'1s'}}/>
                    <text x="250" y="50" fill="#22c55e" fontSize="14" fontWeight="bold">O₂ Output</text>
                    
                    {/* Labels */}
                    <text x="200" y="290" textAnchor="middle" fill="#64748b" fontSize="12">Electrolyte Input</text>
                    <text x="200" y="250" textAnchor="middle" fill="#0f172a" fontSize="14" fontWeight="bold">Laminar Flow Zone</text>
                  </svg>
                </div>
                <div className="bg-white p-6 border-t border-slate-100">
                  <h3 className="font-bold text-slate-900">Prototype: Portable Hydrogen Generator</h3>
                  <p className="text-sm text-slate-600 mt-1">Existing 2ft x 1.5ft unit operational. Scaling to 0.5 kW stacks.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Deep Dive */}
        <section id="technology" className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-base font-bold text-blue-600 uppercase tracking-wide">Our Innovation</h2>
              <p className="mt-2 text-3xl font-bold text-slate-900">The Membraneless Advantage</p>
              <p className="mt-4 text-lg text-slate-600">
                Conventional electrolyzers rely on expensive physical membranes that degrade over time. 
                Our <strong>co-laminar flow technology</strong> exploits microfluidics to keep gases separate naturally.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Cost Reduction",
                  desc: "Eliminating membranes and complex sealing components reduces the core stack cost significantly compared to PEM/Alkaline systems.",
                  icon: (
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  )
                },
                {
                  title: "High Durability",
                  desc: "Without a physical membrane to foul or degrade, our cells offer longer lifecycles and easier maintenance.",
                  icon: (
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  )
                },
                {
                  title: "Modular Scale-Up",
                  desc: "Our 3D-printed stack design allows for easy scaling from lab-bench (2.5W) to industrial pilots (0.5 kW+).",
                  icon: (
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                  )
                }
              ].map((feature, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-24 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">Products & Services</h2>
                <p className="mt-4 text-lg text-slate-600 max-w-2xl">
                  From custom 3D printed components to fully integrated hydrogen generators.
                </p>
              </div>
              <a href="#contact" className="text-blue-600 font-semibold hover:text-blue-800 flex items-center gap-2">
                Download Product Catalog <span aria-hidden="true">&rarr;</span>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Product 1 */}
              <div className="group relative bg-slate-50 rounded-2xl overflow-hidden border border-slate-200">
                {/* Visual Placeholder (CSS Icon) */}
                <div className="h-48 bg-blue-50 flex items-center justify-center">
                  <svg className="w-16 h-16 text-blue-200" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L3 14h9v8l10-12h-9l9-8z"/></svg>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900">Portable H₂ Generator</h3>
                  <p className="mt-2 text-sm text-slate-600 mb-4">
                    Compact unit (2ft x 1.5ft) operating on membraneless technology. Ideal for lab use and small-scale power.
                  </p>
                  <ul className="text-xs text-slate-500 space-y-2 mb-6">
                    <li className="flex items-center gap-2">✓ 60 mL/h Production Rate</li>
                    <li className="flex items-center gap-2">✓ 99.9% Purity Capable</li>
                  </ul>
                </div>
              </div>

              {/* Product 2 */}
              <div className="group relative bg-slate-50 rounded-2xl overflow-hidden border border-slate-200">
                {/* Visual Placeholder (CSS Icon) */}
                <div className="h-48 bg-cyan-50 flex items-center justify-center">
                  <svg className="w-16 h-16 text-cyan-200" fill="currentColor" viewBox="0 0 24 24"><path d="M19.14 7.5A2.86 2.86 0 0122 10.36v3.78A2.86 2.86 0 0119.14 17H12a2 2 0 00-2 2v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3a2 2 0 00-2-2h-.86A2.86 2.86 0 01-1.72 14.14v-3.78A2.86 2.86 0 011.14 7.5h.86a2 2 0 002-2v-3a1 1 0 011-1h6a1 1 0 011 1v3a2 2 0 002 2h5.14z"/></svg>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900">3D Printed Electrolyzer Parts</h3>
                  <p className="mt-2 text-sm text-slate-600 mb-4">
                    Custom additive manufacturing for flow plates and frames. Rapid prototyping delivery in 2 weeks.
                  </p>
                  <ul className="text-xs text-slate-500 space-y-2 mb-6">
                    <li className="flex items-center gap-2">✓ Precision Micro-channels</li>
                    <li className="flex items-center gap-2">✓ Chemical Resistant Materials</li>
                  </ul>
                </div>
              </div>

              {/* Product 3 */}
              <div className="group relative bg-slate-50 rounded-2xl overflow-hidden border border-slate-200">
                {/* Visual Placeholder (CSS Icon) */}
                <div className="h-48 bg-slate-100 flex items-center justify-center">
                   <svg className="w-16 h-16 text-slate-300" fill="currentColor" viewBox="0 0 24 24"><path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/></svg>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900">Research & Tech Transfer</h3>
                  <p className="mt-2 text-sm text-slate-600 mb-4">
                    Collaborative research for MSMEs and educational institutions.
                  </p>
                  <ul className="text-xs text-slate-500 space-y-2 mb-6">
                    <li className="flex items-center gap-2">✓ Benchmarking Services</li>
                    <li className="flex items-center gap-2">✓ Material Characterization</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Leadership Team</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: "Prof. Suddhasatwa Basu", role: "Founder & Mentor", bg: "bg-blue-100 text-blue-600" },
                { name: "Dr. Biswajit S. De", role: "Founder & Shareholder", bg: "bg-cyan-100 text-cyan-600" },
                { name: "Dr. Aditya Singh", role: "Founder & Shareholder", bg: "bg-green-100 text-green-600" },
                { name: "Ajinkya Kotkar", role: "Director Business", bg: "bg-orange-100 text-orange-600" },
                { name: "Dr. Kedar Sahoo", role: "VP Technology", bg: "bg-purple-100 text-purple-600" },
                { name: "Sundar Singh", role: "Sales & Purchase", bg: "bg-slate-200 text-slate-600" }
              ].map((member) => (
                <div key={member.name} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-all">
                  {/* Generated Avatar using Initials */}
                  <div className={`w-16 h-16 rounded-full flex-shrink-0 ${member.bg} flex items-center justify-center font-bold text-xl`}>
                    {member.name.split(" ").pop().charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{member.name}</h3>
                    <p className="text-sm text-slate-500">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Awards & Recognition</h3>
              <div className="flex flex-wrap justify-center gap-4 md:gap-12 items-center">
                <div className="px-6 py-3 bg-slate-50 rounded-lg font-bold text-slate-500 border border-slate-200">INUP-i2i Best Startup</div>
                <div className="px-6 py-3 bg-slate-50 rounded-lg font-bold text-slate-500 border border-slate-200">Startup India (DPIIT)</div>
                <div className="px-6 py-3 bg-slate-50 rounded-lg font-bold text-slate-500 border border-slate-200">FITT IIT Delhi Incubated</div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section id="contact" className="py-24 bg-white border-t border-slate-200">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900">Partner with Us</h2>
              <p className="mt-4 text-slate-600">
                Interested in our pilot programs or ordering 3D printed components? Reach out to us.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-slate-50 p-8 rounded-2xl border border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                  <input name="name" required className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" value={form.name} onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <input name="email" type="email" required className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" value={form.email} onChange={handleChange} />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Company/Institution</label>
                  <input name="company" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" value={form.company} onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Interest</label>
                  <select name="interest" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" value={form.interest} onChange={handleChange}>
                    <option>Electrolyzer Stack</option>
                    <option>3D Printed Parts</option>
                    <option>Research Collaboration</option>
                    <option>Investment</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                <textarea name="message" rows="4" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" value={form.message} onChange={handleChange}></textarea>
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
                Send Inquiry
              </button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-white font-bold text-lg">H2DC12 Avenue Pvt. Ltd.</h3>
              <p className="mt-2 text-sm">Incubated at FITT, IIT Delhi</p>
              <p className="text-sm">Hauz Khas, New Delhi - 110016</p>
            </div>
            <div className="text-sm text-center md:text-right">
              <p>&copy; {new Date().getFullYear()} H2DC12 Avenue. All rights reserved.</p>
              <p className="mt-1">DPIIT Registration: DIPP89186</p>
            </div>
          </div>
        </footer>

      </main>
    </div>
  )
}
