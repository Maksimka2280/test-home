import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const languageMap: Record<string, string> = {
  En: 'en',
  Ru: 'ru',
  De: 'de',
  Fr: 'fr',
  It: 'it',
  Ua: 'uk',
};

const reverseLanguageMap: Record<string, string> = {
  en: 'En',
  ru: 'Ru',
  de: 'De',
  fr: 'Fr',
  it: 'It',
  uk: 'Ua',
};

function getLangFromCookie() {
  const match = /googtrans=\/[a-z]{2}\/([a-z]{2})/.exec(document.cookie);
  return match?.[1] ?? 'en';
}

export default function GoogleTranslateCustom() {
  const [selectedButton, setSelectedButton] = useState('En');
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  useEffect(() => {
    // Устанавливаем язык из куки при монтировании
    const currentLang = getLangFromCookie();
    const buttonId = reverseLanguageMap[currentLang] || 'En';
    setSelectedButton(buttonId);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'auto',
          includedLanguages: 'en,ru,de,fr,it,uk',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        'google_language_element',
      );
    };

    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src =
        'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(script);
    } else {
      window.googleTranslateElementInit();
    }
  }, []);
  /* eslint-enable @typescript-eslint/no-unsafe-member-access */

  const handleButtonClick = (langId: string) => {
    setSelectedButton(langId);
    const langCode = languageMap[langId];
    document.cookie = `googtrans=/en/${langCode};path=/`;
    window.location.reload(); // reload to apply language
  };

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div id="google_language_element" className="hidden" />

      <button
        ref={buttonRef}
        className="flex items-center gap-2 text-base font-semibold text-[#0164EB]"
        onClick={handleToggle}
      >
        <span className="w-[20px] " translate="no">
          {selectedButton}
        </span>
        <ChevronDown
          size={17}
          strokeWidth={4}
          style={{
            transition: 'transform 0.3s ease',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      <div
        ref={modalRef}
        onMouseLeave={handleMouseLeave}
        className={`absolute z-[4] mt-[10px] max-w-[350px] w-full bg-white rounded-[30px] shadow-lg transition-all duration-300 right-2 xl:right-40 
          ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3 pointer-events-none'}`}
      >
        <div className="flex justify-center items-center gap-4 py-5">
          {Object.keys(languageMap).map(id => (
            <button
              key={id}
              onClick={() => handleButtonClick(id)}
              className={`notranslate w-[40px] h-[40px] font-bold rounded-full flex items-center justify-center transition-all duration-300 
                 ${
                   selectedButton === id ? 'bg-[#0468FF] text-white' : 'bg-[#F3F3F3] text-gray-500'
                 }`}
              translate="no"
            >
              {id}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
