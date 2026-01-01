
import React, { useState, useEffect, useMemo } from 'react';
import * as LucideIcons from 'lucide-react';
import { 
  Sun, Moon, Star, Send, ChevronDown, CheckCircle2, Globe, Clock, 
  Code2, Layout, Database, ShieldCheck, Cpu, Cloud, Box, Atom, Palette, 
  Scale, AlertTriangle, FileText, Zap, MousePointer2, Hammer, ShieldAlert,
  Info, Image as LucideImage, Server, MapPin, Coffee, Users, Mail, Linkedin,
  ArrowUp
} from 'lucide-react';
import { GlassCard } from './components/GlassCard';
import { Section } from './components/Section';
import { SeasonalEffects } from './components/SeasonalEffects';
import { InquiryModal } from './components/InquiryModal';
import { LegalModal } from './components/LegalModal';
import { PRICING_PLANS, FAQS, OPERATING_HOURS } from './constants';
import { Theme } from './types';

const Typewriter: React.FC = () => {
  const phrases = useMemo(() => [
    "Precision Engineered Software",
    "Mac-Inspired Aesthetics",
    "Enterprise Grade Security",
    "Bespoke Digital Solutions",
    "Zero-Maintenance Handover"
  ], []);

  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === phrases[index].length + 1 && !reverse) {
      setReverse(true);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % phrases.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 75 : 150);
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, phrases]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 inline-block min-h-[1.2em]">
      {phrases[index].substring(0, subIndex)}
      <span className="text-indigo-500 cursor-blink ml-1">|</span>
    </span>
  );
};

const FloatingTechBadge: React.FC<{ icon: string, name: string, className?: string, delay?: string }> = ({ icon, name, className = '', delay = '0s' }) => {
  const IconComponent = (LucideIcons as any)[icon] || Code2;
  return (
    <div 
      className={`absolute z-20 flex items-center gap-2 px-4 py-2 bg-white/70 dark:bg-slate-800/80 rounded-2xl border border-white/40 dark:border-slate-700/50 shadow-2xl backdrop-blur-xl group hover:scale-110 transition-all cursor-default animate-float ${className}`}
      style={{ animationDelay: delay }}
    >
      <div className="p-1.5 bg-indigo-500/10 rounded-lg group-hover:bg-indigo-500/20 transition-colors">
        <IconComponent className="w-4 h-4 text-indigo-500" />
      </div>
      <span className="text-[10px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest">{name}</span>
    </div>
  );
};

const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-[90] p-4 rounded-2xl glass bg-white/40 dark:bg-slate-800/40 border border-white/20 dark:border-slate-700/30 shadow-2xl transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
      } hover:bg-indigo-600 hover:text-white group active:scale-90`}
      aria-label="Back to home"
    >
      <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
    </button>
  );
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(Theme.DARK);
  const [isManualTheme, setIsManualTheme] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [legalSection, setLegalSection] = useState<'terms' | 'privacy' | 'legal'>('terms');
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>(undefined);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    if (!isManualTheme) {
      const hour = new Date().getHours();
      setTheme((hour >= 6 && hour < 18) ? Theme.LIGHT : Theme.DARK);
    }
  }, [isManualTheme]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === Theme.DARK);
    document.body.style.backgroundColor = theme === Theme.DARK ? '#020617' : '#f8fafc';
  }, [theme]);

  const toggleTheme = () => {
    setIsManualTheme(true);
    setTheme(prev => prev === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  };

  const openInquiry = (plan?: string) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const openPolicy = (section: 'terms' | 'privacy' | 'legal') => {
    setLegalSection(section);
    setIsLegalOpen(true);
  };

  return (
    <div className="min-h-screen relative text-slate-900 dark:text-slate-100 transition-colors duration-500 selection:bg-indigo-500/30">
      <SeasonalEffects />
      <BackToTop />
      <InquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} planName={selectedPlan} />
      <LegalModal isOpen={isLegalOpen} onClose={() => setIsLegalOpen(false)} initialSection={legalSection} />
      
      {/* BG DECORATION */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
        <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-indigo-500/10 dark:bg-indigo-600/10 blur-[160px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] bg-emerald-500/10 dark:bg-emerald-600/10 blur-[160px] rounded-full animate-pulse delay-1000"></div>
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 pointer-events-none">
        <GlassCard className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between border-white/40 dark:border-slate-800/50 pointer-events-auto shadow-2xl" hoverEffect={false}>
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <div className="w-11 h-11 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/40 group-hover:rotate-[15deg] transition-transform duration-500">
              <Code2 className="text-white w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black brand-font tracking-tight uppercase leading-none">INSOPHINIA</span>
              <span className="text-[10px] font-black text-indigo-500 tracking-[0.3em] uppercase">SOLUTIONS</span>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-8 font-black text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            <a href="#about" className="hover:text-indigo-500 transition-all hover:tracking-[0.3em]">About</a>
            <a href="#services" className="hover:text-indigo-500 transition-all hover:tracking-[0.3em]">Services</a>
            <a href="#pricing" className="hover:text-indigo-500 transition-all hover:tracking-[0.3em]">Pricing</a>
            <a href="#contact" className="hover:text-indigo-500 transition-all hover:tracking-[0.3em]">Contact</a>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-3 rounded-2xl bg-white/50 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 transition-all active:scale-90 shadow-md border border-white/20">
              {theme === Theme.LIGHT ? <Moon className="w-5 h-5 text-indigo-600" /> : <Sun className="w-5 h-5 text-amber-400" />}
            </button>
            <button onClick={() => openInquiry('Immediate Startup')} className="hidden sm:flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95 group">
              Start Project <Zap className="w-3 h-3 group-hover:fill-current" />
            </button>
          </div>
        </GlassCard>
      </nav>

      {/* HERO SECTION */}
      <Section id="hero" className="pt-48 pb-32 overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-black text-[10px] mb-10 border border-indigo-500/20 backdrop-blur-md tracking-widest uppercase">
              <MousePointer2 className="w-4 h-4" />
              <span>Independent Freelance Studio</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-10 leading-[1] tracking-tighter">
              Crafting <br />
              <Typewriter />
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-14 leading-relaxed max-w-2xl font-medium">
              We translate ambitious visions into world-class systems. Minimalist aesthetics, enterprise power. Based in Sri Lanka, delivering worldwide.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
              <button onClick={() => openInquiry('New Development')} className="w-full sm:w-auto px-12 py-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-lg shadow-2xl shadow-indigo-600/40 transition-all hover:-translate-y-2 uppercase tracking-tighter">
                Start Building
              </button>
              <a href="#about" className="w-full sm:w-auto px-12 py-6 bg-white/50 dark:bg-slate-900/40 border-2 border-slate-200 dark:border-slate-800 rounded-2xl font-black text-lg backdrop-blur hover:bg-white dark:hover:bg-slate-800/60 transition-all text-center uppercase tracking-tighter">
                Our Story
              </a>
            </div>
          </div>
          
          <div className="flex-1 relative w-full lg:max-w-2xl mt-12 lg:mt-0">
            <div className="relative z-10 animate-float">
               <GlassCard className="p-3 aspect-[4/3] flex items-center justify-center overflow-hidden border-white/50 dark:border-slate-700 shadow-2xl" hoverEffect={false}>
                  <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200" alt="Code Workspace" className="rounded-2xl object-cover w-full h-full relative z-10 brightness-95 dark:brightness-110" />
               </GlassCard>
            </div>
            
            <FloatingTechBadge icon="Atom" name="React" className="-top-12 left-10" delay="0s" />
            <FloatingTechBadge icon="Cpu" name="Node.js" className="top-20 -right-12" delay="1s" />
            <FloatingTechBadge icon="Database" name="MySQL" className="-bottom-12 right-20" delay="2s" />
            <FloatingTechBadge icon="ShieldCheck" name="Laravel" className="bottom-1/2 -left-20" delay="3s" />
            <FloatingTechBadge icon="Layout" name="Tailwind" className="top-1/4 -right-8" delay="4s" />

            <div className="absolute -top-16 -right-16 w-64 h-64 bg-indigo-500/20 blur-[120px] rounded-full"></div>
            <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-purple-500/20 blur-[120px] rounded-full"></div>
          </div>
        </div>
      </Section>

      {/* ABOUT US SECTION */}
      <Section id="about" title="Our Philosophy" subtitle="Independent excellence. We aren't a bloated agency; we are a precision software house.">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <GlassCard className="p-10 lg:p-16 border-indigo-500/20" hoverEffect={false}>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-8 text-center sm:text-left">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl mx-auto sm:mx-0 shrink-0">
                <Coffee className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tight">Logic & Art</h3>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium mb-8 text-center sm:text-left">
              Founded in 2018, <strong>INSOPHINIA SOLUTIONS</strong> was built on the belief that software should be as beautiful as it is functional. 
              As an independent freelance enterprise based in <strong>Sri Lanka</strong>, we offer a personal, direct partnership that large agencies cannot replicate.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-8 sm:p-6 rounded-2xl bg-white/40 dark:bg-slate-800/40 border border-white/20 dark:border-slate-700/30 text-center sm:text-left group transition-all hover:bg-white dark:hover:bg-slate-800">
                <p className="text-3xl sm:text-2xl font-black text-indigo-500 mb-1 leading-none">Worldwide</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Client Distribution</p>
              </div>
              <div className="p-8 sm:p-6 rounded-2xl bg-white/40 dark:bg-slate-800/40 border border-white/20 dark:border-slate-700/30 text-center sm:text-left group transition-all hover:bg-white dark:hover:bg-slate-800">
                <p className="text-3xl sm:text-2xl font-black text-indigo-500 mb-1 leading-none">6+ Years</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Technical Mastery</p>
              </div>
            </div>
          </GlassCard>

          <div className="space-y-8">
            {[
              { icon: Users, title: 'Independent Partnership', desc: 'Direct access to the developer. No project managers, no middle-men. Just engineering results.' },
              { icon: Globe, title: 'Global Operations', desc: 'Operating from the heart of South Asia, we deliver digital solutions to clients in every timezone.' },
              { icon: ShieldCheck, title: 'Secure Architecture', desc: 'We utilize standard protection protocols. Maintenance and third-party framework issues are separate billable services.' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-6 group text-center sm:text-left items-center sm:items-start">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center border border-indigo-500/10 shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-black uppercase tracking-tight mb-2 group-hover:text-indigo-500 transition-colors">{item.title}</h4>
                  <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* SERVICES SECTION */}
      <Section id="services" title="Our Core Expertise" subtitle="Precision tools for modern enterprises. Built with security-first architecture.">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
           {[
            { icon: Layout, title: 'Interface Mastery', color: 'blue', desc: 'Glassmorphic, fluid UI components with macOS-inspired fluidity.' },
            { icon: Database, title: 'Engineered Data', color: 'emerald', desc: 'Secure database architectures designed for zero-latency operations.' },
            { icon: ShieldCheck, title: 'Total Security', color: 'purple', desc: 'Ironclad auth, data encryption, and robust QA for mission-critical apps.' },
            { icon: Cpu, title: 'Custom Logic', color: 'orange', desc: 'Bespoke algorithms and business logic tailored to your specific workflow.' }
          ].map((service, idx) => (
            <GlassCard key={idx} className="p-10 group border-white/30 dark:border-slate-800 flex flex-col items-center text-center">
              <div className={`w-16 h-16 mx-auto bg-${service.color}-500/10 text-${service.color}-500 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                <service.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black mb-4 group-hover:text-indigo-500 transition-colors uppercase tracking-tighter">{service.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{service.desc}</p>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* PRICING SECTION */}
      <Section id="pricing" title="Pricing Plans" subtitle="Find the perfect plan for your website or software solution. Tiered for scalability.">
        <div className="grid md:grid-cols-3 gap-10">
          {PRICING_PLANS.map((plan) => (
            <GlassCard key={plan.id} className={`p-10 relative flex flex-col ${plan.featured ? 'ring-2 ring-indigo-600 scale-[1.05] z-10 shadow-2xl border-indigo-500/50' : 'border-slate-200/50 dark:border-slate-800/50'}`}>
              <div className="flex items-center gap-2 mb-8">
                {[...Array(plan.stars)].map((_, i) => (<Star key={i} className="w-5 h-5 fill-indigo-500 text-indigo-500 animate-pulse" />))}
              </div>
              <h3 className="text-3xl font-black mb-3 uppercase tracking-tighter">{plan.name}</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-8 text-[13px] font-medium leading-relaxed">{plan.description}</p>
              
              <div className="mb-10">
                <span className="text-3xl font-black text-indigo-600 dark:text-indigo-400 tracking-tighter">{plan.pricing.base}</span>
              </div>

              <div className="space-y-6 mb-12 flex-grow">
                {plan.included.map((feature, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <span className="text-[13px] font-bold leading-tight">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 mb-8">
                 <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-3">Timeline: {plan.timeline}</p>
                 <div className="flex flex-wrap gap-2">
                    {plan.techStack.map((tech, i) => (
                      <span key={i} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-[9px] font-black uppercase rounded-md border border-slate-200 dark:border-slate-700">{tech.name}</span>
                    ))}
                 </div>
              </div>

              <button onClick={() => openInquiry(plan.name)} className={`w-full py-5 rounded-2xl font-black text-lg transition-all active:scale-95 uppercase tracking-widest ${plan.featured ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl' : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
                Inquire Plan
              </button>
            </GlassCard>
          ))}
        </div>

        {/* QUICK COMPARISON */}
        <div className="mt-24 max-w-4xl mx-auto">
           <h4 className="text-2xl font-black uppercase tracking-tighter text-center mb-10">Quick Comparison</h4>
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { label: 'Lite', val: 'Frontend Landing Pages' },
                { label: 'Pro', val: 'Backend + Database + CRUD' },
                { label: 'Elite', val: 'Full Secure Enterprise Systems' }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/30 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 text-center">
                   <p className="text-indigo-500 font-black text-sm uppercase tracking-[0.2em] mb-2">{item.label}</p>
                   <p className="text-[12px] font-bold text-slate-600 dark:text-slate-400">{item.val}</p>
                </div>
              ))}
           </div>
        </div>

        {/* LEGAL PROTOCOLS */}
        <div className="mt-24 grid md:grid-cols-2 gap-8">
          <GlassCard className="p-10 border-rose-500/20 bg-rose-500/5 relative overflow-hidden group" hoverEffect={false}>
            <div className="absolute top-0 right-0 p-2 bg-rose-500 text-white text-[9px] font-black uppercase tracking-widest px-6 rotate-45 translate-x-10 translate-y-4">Legal Notice</div>
            <div className="flex flex-col gap-6">
              <div className="w-16 h-16 bg-rose-500/10 rounded-2xl flex items-center justify-center text-rose-500 border border-rose-500/20 mx-auto sm:mx-0">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <div className="text-center sm:text-left">
                <h4 className="text-xl font-black mb-4 uppercase tracking-tight text-rose-600 dark:text-rose-400">Security Disclaimer</h4>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed italic">
                  We are <b>NOT</b> responsible for vulnerabilities within 3rd party frameworks. Security patches for upstream bugs are separate billable tasks.
                </p>
              </div>
            </div>
          </GlassCard>
          <GlassCard className="p-10 border-amber-500/20 bg-amber-500/5 relative overflow-hidden group" hoverEffect={false}>
            <div className="absolute top-0 right-0 p-2 bg-amber-500 text-white text-[9px] font-black uppercase tracking-widest px-6 rotate-45 translate-x-10 translate-y-4">Policy</div>
            <div className="flex flex-col gap-6">
              <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 border border-amber-500/20 mx-auto sm:mx-0">
                <Hammer className="w-8 h-8" />
              </div>
              <div className="text-center sm:text-left">
                <h4 className="text-xl font-black mb-4 uppercase tracking-tight text-amber-600 dark:text-amber-400">On-Demand Maintenance</h4>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed italic">
                  Maintenance is <b>NOT</b> included. Our development is a one-time engagement. All post-handover updates are billable.
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </Section>

      {/* ASSETS & HOSTING */}
      <Section id="assets" title="Deployment & Resources">
        <div className="grid md:grid-cols-2 gap-10">
           <GlassCard className="p-10 text-center">
              <div className="flex flex-col items-center gap-4 mb-8">
                 <LucideImage className="text-indigo-500 w-8 h-8" />
                 <h4 className="text-2xl font-black uppercase tracking-tight">Visual Arsenal</h4>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                 {['AI Generated', 'Unsplash', 'Material Icons', 'FontAwesome', 'Custom Vectors'].map((item, i) => (
                   <span key={i} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700">{item}</span>
                 ))}
              </div>
           </GlassCard>
           <GlassCard className="p-10 text-center">
              <div className="flex flex-col items-center gap-4 mb-8">
                 <Server className="text-indigo-500 w-8 h-8" />
                 <h4 className="text-2xl font-black uppercase tracking-tight">Cloud & Hosting</h4>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                 {['Vercel', 'Netlify', 'GitHub Pages', 'Email Guidance', 'Source Storage'].map((item, i) => (
                   <span key={i} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700">{item}</span>
                 ))}
              </div>
           </GlassCard>
        </div>
      </Section>

      {/* CONTACT US SECTION */}
      <Section id="contact" title="Direct Transmission" subtitle="Ready to launch? Connect through our secure communication channels.">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Location & Presence */}
          <GlassCard className="p-10 flex flex-col items-center text-center justify-between overflow-hidden relative" hoverEffect={false}>
            <div className="absolute -bottom-10 -right-10 opacity-5">
              <MapPin className="w-40 h-40 text-indigo-500" />
            </div>
            <div>
              <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl mb-6 mx-auto">
                <Globe className="w-7 h-7" />
              </div>
              <h4 className="text-2xl font-black uppercase tracking-tight mb-4">Worldwide Presence</h4>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                We bridge geographic barriers. Regardless of your location, we provide high-performance solutions with localized support.
              </p>
            </div>
            <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 w-full">
              <p className="text-xs font-black uppercase tracking-widest text-indigo-500">Service Area</p>
              <p className="text-lg font-black uppercase tracking-tighter">Global Distribution</p>
            </div>
          </GlassCard>

          {/* Operating Hours */}
          <GlassCard className="p-10 flex flex-col items-center text-center justify-between overflow-hidden relative" hoverEffect={false}>
            <div className="absolute -bottom-10 -right-10 opacity-5">
              <Clock className="w-40 h-40 text-emerald-500" />
            </div>
            <div>
              <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-xl mb-6 mx-auto">
                <Clock className="w-7 h-7" />
              </div>
              <h4 className="text-2xl font-black uppercase tracking-tight mb-4">Operating Hours</h4>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                Our engineering team maintains a structured professional schedule to ensure timely delivery and communication.
              </p>
            </div>
            <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 w-full">
              <p className="text-xs font-black uppercase tracking-widest text-emerald-500">Sri Lanka (GMT+5:30)</p>
              <p className="text-lg font-black uppercase tracking-tighter">09:00 AM – 05:00 PM</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Monday – Saturday</p>
            </div>
          </GlassCard>

          {/* Contact Channels Card */}
          <GlassCard className="p-8 border-indigo-500/20" hoverEffect={false}>
            <h4 className="text-xl font-black uppercase tracking-tight mb-6 text-center">Communicate</h4>
            <div className="flex flex-col gap-4">
               <button onClick={() => window.open('https://t.me/insophinia_dev', '_blank')} className="flex items-center gap-4 p-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700 transition-all border border-transparent hover:border-indigo-500/20">
                  <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                    <Send className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Telegram</p>
                    <p className="text-sm font-black tracking-tight">@insophinia_dev</p>
                  </div>
               </button>
               <button onClick={() => window.location.href = 'mailto:contact@insophinia.com'} className="flex items-center gap-4 p-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700 transition-all border border-transparent hover:border-indigo-500/20">
                  <div className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Email</p>
                    <p className="text-sm font-black tracking-tight">contact@insophinia.com</p>
                  </div>
               </button>
               <button onClick={() => window.open('https://linkedin.com/company/insophinia', '_blank')} className="flex items-center gap-4 p-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700 transition-all border border-transparent hover:border-indigo-500/20">
                  <div className="w-10 h-10 bg-sky-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-50">LinkedIn</p>
                    <p className="text-sm font-black tracking-tight">insophinia-solutions</p>
                  </div>
               </button>
            </div>
            <div className="mt-8">
               <button onClick={() => openInquiry('Immediate Consultation')} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl active:scale-95">
                 Send Secure Message
               </button>
            </div>
          </GlassCard>
        </div>
      </Section>

      {/* FAQ SECTION */}
      <Section id="faq" title="Insight Hub">
        <div className="max-w-4xl mx-auto space-y-5">
          {FAQS.map((faq, i) => (
            <GlassCard key={i} className="overflow-hidden border-slate-200/50 dark:border-slate-800/50" hoverEffect={false}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full p-8 flex items-center justify-between text-left group">
                <span className="text-xl font-bold group-hover:text-indigo-500 transition-colors">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${openFaq === i ? 'rotate-180 text-indigo-500' : ''}`} />
              </button>
              <div className={`transition-all duration-300 overflow-hidden ${openFaq === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-8 pb-8 text-slate-500 dark:text-slate-400 font-medium border-t border-slate-100 dark:border-slate-800 pt-6 leading-relaxed text-sm">
                  {faq.answer}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="py-24 px-8 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 text-center">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 items-start">
          
          {/* Brand - Span 2 columns in Tablet (md) and Desktop (lg) */}
          <div className="col-span-1 md:col-span-2 flex flex-col items-center">
            <div className="flex flex-col items-center gap-4 mb-10">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-600/30">
                <Code2 className="text-white w-8 h-8" />
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-black brand-font tracking-tighter uppercase leading-none">INSOPHINIA</span>
                <span className="text-[12px] font-black text-indigo-500 tracking-[0.4em] uppercase -mt-1">SOLUTIONS</span>
              </div>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed max-w-md font-medium mx-auto">
              Architecting secure, beautiful, and performant digital ecosystems. The intersection of power and aesthetics.
            </p>
          </div>

          {/* Governance - 1 Col */}
          <div className="flex flex-col items-center">
            <h6 className="font-black text-xs uppercase tracking-[0.4em] mb-10 text-slate-400">Governance</h6>
            <ul className="space-y-6 font-bold text-xs uppercase tracking-widest flex flex-col items-center">
              <li><button onClick={() => openPolicy('terms')} className="hover:text-indigo-500 flex items-center gap-3"><FileText className="w-4 h-4" /> Terms of Work</button></li>
              <li><button onClick={() => openPolicy('privacy')} className="hover:text-indigo-500 flex items-center gap-3"><ShieldCheck className="w-4 h-4" /> Privacy Policy</button></li>
              <li><button onClick={() => openPolicy('legal')} className="hover:text-indigo-500 flex items-center gap-3"><Scale className="w-4 h-4" /> Legal Policy</button></li>
            </ul>
          </div>

          {/* Presence - 1 Col */}
          <div className="flex flex-col items-center">
            <h6 className="font-black text-xs uppercase tracking-[0.4em] mb-10 text-slate-400">Presence</h6>
            <div className="space-y-8 flex flex-col items-center">
              <div className="flex flex-col items-center gap-3 text-sm font-bold">
                <Clock className="w-10 h-10 text-indigo-500 p-2 bg-indigo-500/10 rounded-xl" />
                <div>
                  <p className="uppercase text-[9px] tracking-widest opacity-50 mb-1">Office Hours</p>
                  <span>{OPERATING_HOURS.hours} SLT</span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3 text-sm font-bold">
                <Globe className="w-10 h-10 text-emerald-500 p-2 bg-emerald-500/10 rounded-xl" />
                <div>
                  <p className="uppercase text-[9px] tracking-widest opacity-50 mb-1">Area</p>
                  <span>Worldwide Distribution</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-slate-200 dark:border-slate-800 flex flex-col items-center gap-6">
          <p className="text-slate-400 text-[10px] font-black tracking-[0.4em] uppercase text-center px-4">
            &copy; 2024 INSOPHINIA SOLUTIONS. INDEPENDENT ENTERPRISE.
          </p>
          <div className="flex gap-12 items-center flex-wrap justify-center">
            <button onClick={() => openInquiry('HQ Portal')} className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 hover:text-indigo-600 transition-all">Client HQ Portal</button>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Est. 2018</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
