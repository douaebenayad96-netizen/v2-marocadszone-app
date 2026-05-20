import { useTranslation } from "react-i18next";

type LanguageSwitcherProps = {
  compact?: boolean;
  className?: string;
};

const LanguageSwitcher = ({ compact = false, className = "" }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language || "fr";

  const languages = [
    { code: "fr", label: "Français" },
    { code: "en", label: "English" },
    { code: "ar", label: "العربية" },
  ];

  // Version desktop - compact
  if (compact) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {languages.map((option) => (
          <button
            key={option.code}
            type="button"
            onClick={() => i18n.changeLanguage(option.code)}
            className={`px-3 py-1.5 text-sm rounded-md transition-all font-medium ${
              currentLanguage === option.code
                ? "bg-primary-orange text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            aria-current={currentLanguage === option.code ? "true" : undefined}
          >
            {option.label}
          </button>
        ))}
      </div>
    );
  }

  // Version mobile - complet
  return (
    <div className={`flex flex-wrap gap-2 items-center ${className}`}>
      {languages.map((option) => (
        <button
          key={option.code}
          type="button"
          onClick={() => i18n.changeLanguage(option.code)}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary-orange ${
            currentLanguage === option.code
              ? "bg-primary-orange text-white border-primary-orange"
              : "bg-white text-gray-700 border-gray-200 hover:border-primary-orange hover:text-primary-orange"
          }`}
          aria-current={currentLanguage === option.code ? "true" : undefined}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;