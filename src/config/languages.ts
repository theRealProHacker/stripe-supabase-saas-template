export interface Language {
  code: string;
  name: string;
  flag: string;
  description: string;
}

export const supportedLanguages: Language[] = [
  {
    code: 'fr',
    name: 'French',
    flag: '🇫🇷',
    description: 'The language of love and culture',
  },
  {
    code: 'es',
    name: 'Spanish',
    flag: '🇪🇸',
    description: 'Spoken by over 500 million people worldwide',
  },
  {
    code: 'pt',
    name: 'Portuguese',
    flag: '🇵🇹',
    description: 'The language of Brazil and Portugal',
  },
  {
    code: 'de',
    name: 'German',
    flag: '🇩🇪',
    description: 'The language of innovation and precision',
  },
];

export const getLanguageByCode = (code: string): Language | undefined => {
  return supportedLanguages.find(lang => lang.code === code);
};