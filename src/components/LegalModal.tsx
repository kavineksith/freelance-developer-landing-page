
import React from 'react';
import { X, ShieldCheck, Scale, FileText, AlertTriangle, ShieldAlert, Zap, Hammer, Info } from 'lucide-react';
import { GlassCard } from './GlassCard';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSection: 'terms' | 'privacy' | 'legal';
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, initialSection }) => {
  const [activeTab, setActiveTab] = React.useState(initialSection);

  React.useEffect(() => {
    setActiveTab(initialSection);
  }, [initialSection]);

  if (!isOpen) return null;

  const sections = {
    terms: {
      title: 'Terms of Work',
      icon: FileText,
      content: (
        <div className="space-y-6 text-sm leading-relaxed">
          <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 flex items-start gap-4">
            <Info className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
            <p className="text-slate-600 dark:text-slate-400">These terms constitute a binding legal agreement between <strong>Insophinia Solutions</strong> ("Developer") and the project entity ("Customer"). Engagement implies full acceptance of these terms.</p>
          </div>
          
          <div className="space-y-4">
            <p className="font-bold text-slate-900 dark:text-white flex items-center gap-2"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" /> 1. Project Handover</p>
            <p className="text-slate-500">Ownership transfer is absolute only upon 100% payment clearance. Delivered source code marks the finality of the agreed-upon development phase.</p>

            <p className="font-bold text-slate-900 dark:text-white flex items-center gap-2"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" /> 2. On-Demand Maintenance Only</p>
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
              <p className="text-amber-700 dark:text-amber-400 font-bold mb-2 flex items-center gap-2 uppercase text-xs tracking-widest"><Hammer className="w-4 h-4" /> Billable Support Model</p>
              <p className="text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed">
                Maintenance is NOT a default service. Every technical request post-handover is treated as a <strong>new billable task</strong>. 
                Pricing is dynamic and depends on the specific scenario, urgency, and technical complexity of the requirement.
              </p>
            </div>
          </div>
        </div>
      )
    },
    privacy: {
      title: 'Privacy Policy',
      icon: ShieldCheck,
      content: (
        <div className="space-y-6 text-sm leading-relaxed">
          <p className="text-slate-500">INSOPHINIA SOLUTIONS treats data as a critical asset. Our privacy framework is designed to protect the intellectual property of our clients during the development cycle.</p>
          <div className="space-y-4">
            <p className="font-bold text-indigo-500 uppercase tracking-widest text-xs">Proprietary Assets</p>
            <p className="text-slate-500">Client business logic and proprietary data shared during the development cycle are kept under strict internal isolation and are never shared with third parties or used for non-disclosed training purposes.</p>
          </div>
        </div>
      )
    },
    legal: {
      title: 'Legal Disclaimer',
      icon: Scale,
      content: (
        <div className="space-y-6 text-sm leading-relaxed">
          <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-start gap-4 shadow-xl">
            <ShieldAlert className="w-8 h-8 text-rose-500 shrink-0" />
            <div>
              <p className="text-[11px] text-rose-600 dark:text-rose-400 font-black uppercase tracking-[0.2em] mb-1">Developer Shield Clause</p>
              <p className="text-slate-600 dark:text-slate-400 font-medium">INSOPHINIA SOLUTIONS provides custom software engineering, not infrastructure maintenance or framework development.</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="p-5 bg-slate-100 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
               <p className="font-bold text-rose-500 mb-3 uppercase text-xs tracking-[0.2em] flex items-center gap-2">
                 <Zap className="w-4 h-4" /> 3rd Party Vulnerability Disclosure
               </p>
               <p className="text-slate-600 dark:text-slate-400 text-[13px] leading-relaxed">
                 Developer is NOT responsible for vulnerabilities, bugs, or security exploits found in third-party frameworks (e.g., React, Node.js, Spring Boot, Laravel). 
                 We utilize these tools to build your solution but do not maintain their core codebases. 
                 Any security patch or framework upgrade required due to upstream vulnerabilities will be treated as a <strong>new billable maintenance task</strong>.
               </p>
            </div>

            <p className="font-bold text-slate-900 dark:text-white uppercase text-xs tracking-widest border-l-2 border-indigo-500 pl-4">Liability Limit</p>
            <p className="text-slate-500">The developer is not liable for business loss due to technical obsolescence or unpatched third-party code. Clients are advised to maintain an active security budget for periodic framework audits.</p>
          </div>
        </div>
      )
    }
  };

  return (
    <div className="fixed inset-0 z-[101] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-500">
      <GlassCard className="w-full max-w-3xl h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-500 border-white/20 shadow-[0_100px_100px_-50px_rgba(0,0,0,0.5)]" hoverEffect={false}>
        <div className="p-8 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-500/30">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black brand-font tracking-tight uppercase leading-none">Insophinia Governance</h2>
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">Policy ID: SL-2024-PROT-FRAMEWORK</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all active:scale-90 border border-transparent hover:border-white/10">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="w-20 md:w-64 border-r border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30 p-5 space-y-3">
            {(Object.keys(sections) as Array<keyof typeof sections>).map((key) => {
              const Icon = sections[key].icon;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${
                    activeTab === key 
                    ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/40 translate-x-1' 
                    : 'hover:bg-white dark:hover:bg-slate-800 text-slate-500 hover:text-indigo-500'
                  }`}
                >
                  <Icon className="w-6 h-6 shrink-0" />
                  <span className="hidden md:block font-black text-[11px] uppercase tracking-widest">{sections[key].title}</span>
                </button>
              );
            })}
          </div>

          <div className="flex-1 overflow-y-auto p-10 bg-white/5">
            <h3 className="text-3xl font-black mb-8 uppercase tracking-tighter">{sections[activeTab].title}</h3>
            {sections[activeTab].content}
            <div className="mt-20 pt-10 border-t border-slate-200 dark:border-slate-800">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.4em] text-center">
                Secure Engineering Protocol &bull; Rev 2024.1
              </p>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
