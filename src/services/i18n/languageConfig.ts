export type LanguageCode = "fr" | "en" | "ar";

export type LanguageOption = {
  code: LanguageCode;
  label: string;
  nativeLabel: string;
  direction: "ltr" | "rtl";
};

export const DEFAULT_LANGUAGE: LanguageCode = "fr";

export const languageOptions: LanguageOption[] = [
  {
    code: "fr",
    label: "french",
    nativeLabel: "Français",
    direction: "ltr",
  },
  {
    code: "en",
    label: "english",
    nativeLabel: "English",
    direction: "ltr",
  },
  {
    code: "ar",
    label: "arabic",
    nativeLabel: "العربية",
    direction: "rtl",
  },
];

export const RTL_LANGUAGES: LanguageCode[] = ["ar"];
