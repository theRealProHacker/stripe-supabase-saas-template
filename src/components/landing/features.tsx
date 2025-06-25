'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Brain, Volume2, BarChart3, Globe, Zap } from 'lucide-react';

const features = [
  {
    icon: MessageCircle,
    title: 'Natural Conversations',
    description: 'Practice real-world scenarios with our AI tutor that adapts to your learning style and pace.',
  },
  {
    icon: Brain,
    title: 'Intelligent Memory',
    description: 'Our AI remembers your progress, vocabulary, and weak points to create personalized lessons.',
  },
  {
    icon: Volume2,
    title: 'Voice-First Learning',
    description: 'Speak naturally and get instant feedback on pronunciation and fluency.',
  },
  {
    icon: BarChart3,
    title: 'Progress Tracking',
    description: 'Monitor your improvement with detailed analytics and streak tracking.',
  },
  {
    icon: Globe,
    title: 'Multiple Languages',
    description: 'Learn French, Spanish, Portuguese, or German with native-level AI tutors.',
  },
  {
    icon: Zap,
    title: 'Instant Feedback',
    description: 'Get real-time corrections and suggestions to improve faster.',
  },
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Learning by{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emphasis">
              Speaking
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Experience the most natural way to learn languages. Our AI-powered platform 
            makes language learning engaging, effective, and accessible to everyone.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <feature.icon size={24} className="text-accent" />
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Learning levels section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <h3 className="text-3xl font-bold text-foreground mb-8">
            Perfect for Every Level
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                level: 'Beginner',
                description: 'Start from scratch with basic vocabulary and simple conversations',
                color: 'from-green-400 to-green-600',
              },
              {
                level: 'Intermediate',
                description: 'Build confidence with complex grammar and real-world scenarios',
                color: 'from-blue-400 to-blue-600',
              },
              {
                level: 'Advanced',
                description: 'Perfect your fluency with nuanced conversations and cultural context',
                color: 'from-purple-400 to-purple-600',
              },
            ].map((item, index) => (
              <motion.div
                key={item.level}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-card border border-border/50"
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-white font-bold text-lg">
                    {item.level.charAt(0)}
                  </span>
                </div>
                
                <h4 className="text-xl font-semibold text-foreground mb-3">
                  {item.level}
                </h4>
                
                <p className="text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};