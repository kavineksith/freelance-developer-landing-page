
import React from 'react';
import { X, Send, Mail, Linkedin, Copy, Check, ShieldCheck } from 'lucide-react';
import { GlassCard } from './GlassCard';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose, planName }) => {
  const [copied, setCopied] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const contactMethods = [
    { 
      label: 'Telegram', 
      value: '@insophinia_dev', 
      icon: Send, 
      color: 'bg-blue-500',
      action: () => window.open('https://t.me/insophinia_dev', '_blank')
    },
    { 
      label: 'Email', 
      value: 'contact@insophinia.com', 
      icon: Mail, 
      color: 'bg-rose-500',
      action: () => window.location.href = 'mailto:contact@insophinia.com'
    },
    { 
      label: 'LinkedIn', 
      value: 'insophinia-solutions', 
      icon: Linkedin, 
      color: 'bg-sky-600',
      action: () => window.open('https://linkedin.com/company/insophinia', '_blank')
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-xl animate-in fade-in duration-300">
      <GlassCard className="w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-500 shadow-2xl border-white/30" hoverEffect={false}>
        <div className="p-6 sm:p-10">
          <div className="flex items-center justify-between mb-8">
            <div className="pr-4">
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-500">Secure Protocol Active</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black brand-font uppercase tracking-tight">Direct Inquiry</h2>
              <p className="text-slate-500 dark:text-slate-400 text-[10px] font-bold mt-1 uppercase tracking-widest">
                Tier: <span className="text-indigo-500">{planName || 'Consultation'}</span>
              </p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all active:scale-90 border border-slate-200 dark:border-slate-700 shrink-0">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {contactMethods.map((method) => (
              <div key={method.label} className="group flex flex-col sm:flex-row items-center justify-between p-4 rounded-2xl bg-white/40 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 transition-all border border-transparent hover:border-indigo-500/20 gap-4">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className={`w-12 h-12 ${method.color} rounded-xl flex items-center justify-center shadow-lg text-white shrink-0`}>
                    <method.icon className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-black text-xs uppercase tracking-widest leading-none mb-1">{method.label}</h4>
                    <p className="text-[11px] text-slate-500 font-mono truncate">{method.value}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button 
                    onClick={() => handleCopy(method.value, method.label)}
                    className="p-2 hover:bg-indigo-50 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-400 hover:text-indigo-500"
                  >
                    {copied === method.label ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button 
                    onClick={method.action}
                    className="flex-1 sm:flex-initial px-4 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all active:scale-95"
                  >
                    Connect
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-amber-500/5 dark:bg-amber-500/10 rounded-2xl border border-amber-500/20">
            <p className="text-center text-[9px] text-amber-600 dark:text-amber-400 font-bold uppercase tracking-widest leading-relaxed">
              * PROFESSIONAL NOTICE: We do not offer free work. <br />
              All inquiries are strictly for paid engagements.
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
