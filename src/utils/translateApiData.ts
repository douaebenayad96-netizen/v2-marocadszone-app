import i18n from "i18next";

// Fonction pour traduire les types d'annonces
export const translateAnnounceType = (type: string): string => {
  const lang = i18n.language;
  
  const translations: Record<string, Record<string, string>> = {
    fr: {
      sale: "Vente",
      rental: "Location",
      service: "Service"
    },
    en: {
      sale: "Sale",
      rental: "Rental",
      service: "Service"
    },
    ar: {
      sale: "بيع",
      rental: "إيجار",
      service: "خدمة"
    }
  };
  
  return translations[lang]?.[type] || type;
};

// Fonction pour traduire les conditions (Neuf, Occasion, Bon état)
export const translateItemCondition = (condition: string): string => {
  const lang = i18n.language;
  
  const translations: Record<string, Record<string, string>> = {
    fr: {
      new: "Neuf",
      used: "Occasion",
      good_condition: "Bon état",
      rental_day: "Par jour",
      rental_week: "Par semaine",
      rental_month: "Par mois",
      service_hour: "Par heure",
      service_day: "Par jour",
      service_mission: "Par mission"
    },
    en: {
      new: "New",
      used: "Used",
      good_condition: "Good condition",
      rental_day: " Day",
      rental_week: " Week",
      rental_month: " Month",
      service_hour: " Hour",
      service_day: " Day",
      service_mission: " Mission"
    },
    ar: {
      new: "جديد",
      used: "مستعمل",
      good_condition: "حالة جيدة",
      rental_day: "في اليوم",
      rental_week: "في الأسبوع",
      rental_month: "في الشهر",
      service_hour: "في الساعة",
      service_day: "في اليوم",
      service_mission: "في المهمة"
    }
  };
  
  return translations[lang]?.[condition] || condition;
};

// Fonction pour traduire le secteur (Privé/Public)
export const translateSector = (type: string): string => {
  const lang = i18n.language;
  
  const translations: Record<string, Record<string, string>> = {
    fr: {
      private: "Privé",
      public: "Public"
    },
    en: {
      private: "Private",
      public: "Public"
    },
    ar: {
      private: "خاص",
      public: "عام"
    }
  };
  
  return translations[lang]?.[type] || type;
};