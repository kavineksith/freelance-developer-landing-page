
import type { PricingPlan, FAQItem } from './types';

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'lite',
    name: 'Lite Package',
    stars: 1,
    description: 'Ideal for simple professional websites, landing pages, and introductory online presence.',
    included: [
      'Landing / Welcome / Custom Pages (Approval Required)',
      'Professional Front-End Development',
      'Visual Effects (Snow, Animations, Themes)',
      'Support for customer-provided assets'
    ],
    techStack: [
      { name: 'React', icon: 'Atom' },
      { name: 'Tailwind', icon: 'Palette' },
      { name: 'TypeScript', icon: 'Code2' },
      { name: 'Node.js (Basic)', icon: 'Cpu' }
    ],
    timeline: '7 – 14 Days',
    pricing: {
      base: 'LKR 1,500 – 2,500',
      additions: [
        { label: 'No assets provided', price: '+ LKR 2,000' },
        { label: 'Partial content only', price: '+ LKR 500' }
      ]
    },
    note: 'Frontend only. No backend or database features included.'
  },
  {
    id: 'pro',
    name: 'Pro Package',
    stars: 2,
    description: 'Perfect for businesses that need backend functionality and database operations.',
    included: [
      'Everything in Lite Package PLUS',
      'Backend Development',
      'Content Management Features (CRUD)',
      'Basic Authentication',
      'Basic Security Layer'
    ],
    techStack: [
      { name: 'React / TS', icon: 'Layout' },
      { name: 'Node / Spring / Laravel', icon: 'Cpu' },
      { name: 'MySQL / Mongo / Postgre', icon: 'Database' }
    ],
    timeline: '14 – 21 Days',
    pricing: {
      base: 'Contact for Quote'
    },
    featured: true,
    note: 'Optional: Full Security + Advanced QA (Extra charge & timeline)'
  },
  {
    id: 'elite',
    name: 'Elite Package',
    stars: 3,
    description: 'Designed for enterprises needing full-scale systems and secure, professional-grade software.',
    included: [
      'Everything in Lite & Pro Packages',
      'Full Advanced Security',
      'Complete Quality Assurance & Testing',
      'Advanced Business Logic & Systems',
      'Custom Application Development'
    ],
    techStack: [
      { name: 'Enterprise Core', icon: 'ShieldCheck' },
      { name: 'Advanced Logic', icon: 'Zap' },
      { name: 'Scalable Infra', icon: 'Cloud' }
    ],
    timeline: '3 – 6 Months',
    pricing: {
      base: 'Starts from LKR 50,000'
    },
    note: 'Depends on complexity & requirements'
  }
];

export const FAQS: FAQItem[] = [
  {
    question: "Do you handle maintenance?",
    answer: "No, maintenance is not included in development. All updates, changes, and enhancements are chargeable based on effort and specific requirements. We develop the solution; ongoing care is a separate service."
  },
  {
    question: "Who pays for hosting?",
    answer: "The customer is responsible for hosting bills and account ownership. We assist with initial setup on platforms like Netlify or Vercel free tiers, but long-term maintenance is the client's responsibility."
  },
  {
    question: "What about framework bugs?",
    answer: "We are not responsible for vulnerabilities or security issues within the frameworks used (React, Node, etc.) as we did not develop them. If such issues arise, you must pay for patches or upgrades."
  },
  {
    question: "Is there a trial or free work?",
    answer: "No. Development is a professional paid service. We do not offer free work or voluntary development under any circumstances."
  }
];

export const OPERATING_HOURS = {
  timezone: 'Sri Lanka (GMT+5:30)',
  hours: '9:00 AM - 5:00 PM',
  days: 'Monday - Saturday'
};
