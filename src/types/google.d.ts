// src/types/google-translate.d.ts
export {}; // Чтобы файл был модулем

declare global {
  interface Window {
    google: {
      translate: {
        TranslateElement: new (
          options: TranslateElementOptions,
          elementId: string,
        ) => TranslateElement;
        InlineLayout: {
          SIMPLE: string;
        };
      };
      googleTranslateElementInit: () => void;
    };
  }

  interface TranslateElementOptions {
    pageLanguage: string;
    includedLanguages: string;
    layout: 'SIMPLE';
    autoDisplay: boolean;
  }
}
