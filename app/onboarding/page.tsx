'use client';

import React, { useState } from 'react';
import { NameCapture } from '@/src/components/onboarding/name-capture';
import { LanguageSelect } from '@/src/components/onboarding/language-select';
import { Language } from '@/config/languages';
import { useRouter } from 'next/navigation';

type OnboardingStep = 'name' | 'language' | 'signup';

export default function OnboardingPage() {
  const [step, setStep] = useState<OnboardingStep>('name');
  const [userName, setUserName] = useState('');
  const [userAudio, setUserAudio] = useState<Blob | undefined>();
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const router = useRouter();

  const handleNameSubmit = (name: string, audioBlob?: Blob) => {
    setUserName(name);
    setUserAudio(audioBlob);
    setStep('language');
  };

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    // Store onboarding data in sessionStorage for use after auth
    sessionStorage.setItem('onboarding', JSON.stringify({
      name: userName,
      language: language.code,
      hasAudio: !!userAudio,
    }));
    
    // Redirect to signup with language parameter
    router.push(`/signup?language=${language.code}&name=${encodeURIComponent(userName)}`);
  };

  return (
    <main className="min-h-screen bg-background">
      {step === 'name' && (
        <NameCapture onNameSubmit={handleNameSubmit} />
      )}
      
      {step === 'language' && (
        <LanguageSelect 
          userName={userName}
          onLanguageSelect={handleLanguageSelect}
        />
      )}
    </main>
  );
}