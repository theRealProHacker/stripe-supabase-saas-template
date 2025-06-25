'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Star } from 'lucide-react';
import { pricingPlans } from '@/config/pricing';
import Link from 'next/link';

export const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Choose Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emphasis">
              Learning Plan
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Start your language learning journey with a plan that fits your goals and schedule.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative p-8 rounded-2xl border transition-all duration-300 hover:shadow-lg ${
                plan.highlighted
                  ? 'border-accent bg-accent/5 shadow-accent/20'
                  : 'border-border/50 bg-card hover:border-accent/50'
              }`}
            >
              {/* Highlight badge */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center gap-1 px-4 py-2 rounded-full bg-accent text-white text-sm font-medium">
                    <Star size={14} />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Discount badge */}
              {plan.discount && (
                <div className="absolute top-4 right-4">
                  <div className="px-3 py-1 rounded-full bg-green-500 text-white text-sm font-medium">
                    -{plan.discount}%
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {plan.name}
                </h3>
                
                <div className="flex items-baseline justify-center gap-2 mb-4">
                  {plan.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      €{plan.originalPrice}
                    </span>
                  )}
                  <span className="text-4xl font-bold text-foreground">
                    €{plan.price}
                  </span>
                  <span className="text-muted-foreground">
                    /{plan.interval}
                  </span>
                </div>

                <p className="text-muted-foreground">
                  {plan.dailyMinutes === -1 
                    ? 'Unlimited conversation time'
                    : `${plan.dailyMinutes} minutes daily`
                  }
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check size={20} className="text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/onboarding" className="block">
                <Button 
                  className={`w-full ${
                    plan.highlighted 
                      ? 'bg-accent hover:bg-accent/90' 
                      : ''
                  }`}
                  variant={plan.highlighted ? 'default' : 'outline'}
                  size="lg"
                >
                  Start Learning
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Money back guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground">
            🛡️ 30-day money-back guarantee • Cancel anytime • No hidden fees
          </p>
        </motion.div>
      </div>
    </section>
  );
};