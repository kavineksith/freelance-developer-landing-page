
export interface TechStackItem {
  name: string;
  icon: string; // Key for the icon mapper
}

export interface PricingPlan {
  id: string;
  name: string;
  stars: number;
  description: string;
  included: string[];
  techStack: TechStackItem[];
  timeline: string;
  pricing: {
    base: string;
    additions?: { label: string; price: string }[];
  };
  note?: string;
  featured?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface SeasonalConfig {
  isSnowing: boolean;
  isNewYear: boolean;
}
