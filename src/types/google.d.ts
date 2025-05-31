export {};

declare global {
  interface Window {
    google: {
      translate: GoogleTranslate;
    };
    googleTranslateElementInit: () => void;
  }

  interface GoogleTranslate {
    TranslateElement: {
      new (options: TranslateElementOptions, elementId: string): TranslateElement;
      InlineLayout: InlineLayoutEnum;
    };
  }

  interface InlineLayoutEnum {
    SIMPLE: string;
    HORIZONTAL: string;
    VERTICAL: string;
  }

  interface TranslateElementOptions {
    pageLanguage: string;
    includedLanguages?: string;
    layout?: string;
    autoDisplay?: boolean;
  }
}
