export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  currency: string;
  interval: string;
  dailyMinutes: number;
  features: string[];
  highlighted?: boolean;
  discount?: number;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 10,
    currency: 'EUR',
    interval: 'month',
    dailyMinutes: 15,
    features: [
      '15 minutes daily conversation',
      'Basic vocabulary tracking',
      'Progress reports',
      'Mobile app access',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 20,
    originalPrice: 25,
    currency: 'EUR',
    interval: 'month',
    dailyMinutes: 120,
    features: [
      '2 hours daily conversation',
      'Advanced vocabulary tracking',
      'Grammar analysis',
      'Personalized learning path',
      'Priority support',
    ],
    highlighted: true,
    discount: 20,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 100,
    currency: 'EUR',
    interval: 'month',
    dailyMinutes: -1, // unlimited
    features: [
      'Unlimited conversation time',
      'Advanced AI tutor',
      'Custom learning scenarios',
      'Real-time pronunciation feedback',
      'Dedicated support',
      'Early access to new features',
    ],
  },
];