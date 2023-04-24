type TranslationText = {
  en: string;
  km: string;
};

export const getTranslatedText = (
  translationText: TranslationText,
  lang: keyof TranslationText
) => {
  const { en, km } = translationText;

  const isEN = lang === 'en';

  if (!en && !km) {
    return '';
  }

  if (!translationText[lang].trim()) {
    return isEN ? km : en;
  }

  return translationText[lang];
};
