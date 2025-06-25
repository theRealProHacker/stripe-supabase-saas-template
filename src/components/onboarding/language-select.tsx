'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { supportedLanguages, Language } from '@/config/languages';
import LiquidGlass from 'liquid-glass-react';

interface LanguageSelectProps {
  userName: string;
  onLanguageSelect: (language: Language) => void;
}

export const LanguageSelect: React.FC<LanguageSelectProps> = ({ 
  userName, 
  onLanguageSelect 
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
  };

  const handleContinue = () => {
    if (selectedLanguage) {
      onLanguageSelect(selectedLanguage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl"
      >
        <LiquidGlass
          displacementScale={40}
          blurAmount={0.15}
          saturation={120}
          aberrationIntensity={1}
          elasticity={0.2}
          cornerRadius={24}
          className="p-8 border border-border/30"
        >
          <div className="text-center space-y-8">
            {/* AI Avatar */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-accent to-emphasis flex items-center justify-center text-white text-2xl font-bold"
            >
              AI
            </motion.div>

            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="space-y-3"
            >
              <h1 className="text-2xl font-bold text-foreground">
                Nice to meet you, {userName}!
              </h1>
              <p className="text-muted-foreground">
                Which language would you like to learn?
              </p>
            </motion.div>

            {/* Language Options */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {supportedLanguages.map((language, index) => (
                <motion.div
                  key={language.code}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.4 }}
                >
                  <Button
                    variant={selectedLanguage?.code === language.code ? "default" : "outline"}
                    className={`w-full p-6 h-auto flex flex-col items-center gap-3 transition-all duration-200 ${
                      selectedLanguage?.code === language.code 
                        ? 'ring-2 ring-accent ring-offset-2' 
                        : 'hover:border-accent/50'
                    }`}
                    onClick={() => handleLanguageSelect(language)}
                  >
                    <span className="text-3xl">{language.flag}</span>
                    <div className="text-center">
                      <div className="font-semibold text-lg">{language.name}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {language.description}
                      </div>
                    </div>
                  </Button>
                </motion.div>
              ))}
            </motion.div>

            {/* Continue Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.6 }}
            >
              <Button
                onClick={handleContinue}
                disabled={!selectedLanguage}
                className="w-full max-w-sm mx-auto"
                size="lg"
              >
                Continue with {selectedLanguage?.name || 'Selected Language'}
              </Button>
            </motion.div>
          </div>
        </LiquidGlass>
      </motion.div>
    </div>
  );
};