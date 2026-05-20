import i18n from "i18next";

export type PageSEO = {
  title: string;
  description: string;
  h1?: string;
};

// Obtenir la langue actuelle
const getLang = () => i18n.language || "fr";

// Fonction helper pour obtenir la traduction selon la langue
const tSEO = (fr: string, en: string, ar: string) => {
  const lang = getLang();
  if (lang === "en") return en;
  if (lang === "ar") return ar;
  return fr;
};

const normalizeKey = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "et")
    .replace(/[’']/g, " ")
    .replace(/,/g, "")
    .replace(/\s+/g, " ");

// ============ DEFAULT SEO ============
export const defaultAnnoncesSEO = (): PageSEO => ({
  title: tSEO(
    "Annonces gratuites au Maroc - MarocAdsZone",
    "Free classifieds in Morocco - MarocAdsZone",
    "إعلانات مبوبة مجانية في المغرب - MarocAdsZone"
  ),
  description: tSEO(
    "Parcourez toutes les annonces au Maroc : immobilier, véhicules, multimédia, services et plus. Publiez votre annonce gratuitement.",
    "Browse all ads in Morocco: real estate, vehicles, multimedia, services and more. Post your ad for free.",
    "تصفح جميع الإعلانات في المغرب: العقارات، المركبات، الوسائط المتعددة، الخدمات والمزيد. انشر إعلانك مجاناً."
  ),
  h1: tSEO(
    "Explorez toutes les annonces gratuites",
    "Explore all free classifieds",
    "استكشف جميع الإعلانات المجانية"
  ),
});

// ============ CATEGORY SEO ============
const categorySEO: Record<string, PageSEO> = {
  immobilier: {
    title: tSEO(
      "Annonces Immobilier au Maroc - Ventes & Locations",
      "Real Estate Ads in Morocco - Sales & Rentals",
      "إعلانات العقارات في المغرب - بيع وإيجار"
    ),
    description: tSEO(
      "Cherchez un bien immobilier à vendre ou à louer au Maroc : appartements, maisons, terrains. Déposez ou consultez une annonce gratuite.",
      "Search for real estate to buy or rent in Morocco: apartments, houses, land. Post or view free ads.",
      "ابحث عن عقار للبيع أو الإيجار في المغرب: شقق، منازل، أراضي. انشر أو اطلع على إعلان مجاني."
    ),
    h1: tSEO(
      "Annonces immobilier Maroc : ventes et locations",
      "Morocco real estate ads: sales and rentals",
      "إعلانات العقارات في المغرب: بيع وإيجار"
    ),
  },
  "informatique multimedia": {
    title: tSEO(
      "Petites annonces Informatique et Multimédia au Maroc - MarocAdsZone",
      "IT & Multimedia Classifieds in Morocco - MarocAdsZone",
      "إعلانات تكنولوجيا المعلومات والوسائط المتعددة في المغرب - MarocAdsZone"
    ),
    description: tSEO(
      "Trouvez PC, smartphones, tablettes, accessoires et équipements multimédia à vendre partout au Maroc. Déposez une annonce gratuite.",
      "Find PCs, smartphones, tablets, accessories and multimedia equipment for sale across Morocco. Post a free ad.",
      "اعثر على أجهزة كمبيوتر، هواتف ذكية، أجهزة لوحية، إكسسوارات ومعدات وسائط متعددة للبيع في جميع أنحاء المغرب. انشر إعلاناً مجانياً."
    ),
    h1: tSEO(
      "Explorez toutes les annonces Informatique et Multimédia",
      "Explore all IT & Multimedia ads",
      "استكشف جميع إعلانات تكنولوجيا المعلومات والوسائط المتعددة"
    ),
  },
  "voitures d occasion": {
    title: tSEO(
      "Petites annonces voitures d'occasion au Maroc - MarocAdsZone",
      "Used Cars Classifieds in Morocco - MarocAdsZone",
      "إعلانات السيارات المستعملة في المغرب - MarocAdsZone"
    ),
    description: tSEO(
      "Achetez ou vendez une voiture d'occasion au Maroc. Consultez les annonces auto et publiez gratuitement votre véhicule sur MarocAdsZone.",
      "Buy or sell a used car in Morocco. Browse car ads and post your vehicle for free on MarocAdsZone.",
      "اشتر أو بيع سيارة مستعملة في المغرب. تصفح إعلانات السيارات وانشر سيارتك مجاناً على MarocAdsZone."
    ),
    h1: tSEO(
      "Explorez toutes les annonces voitures d'occasion",
      "Explore all used cars ads",
      "استكشف جميع إعلانات السيارات المستعملة"
    ),
  },
};

// ============ CITY SEO ============
const citySEO: Record<string, PageSEO> = {
  casablanca: {
    title: tSEO(
      "Sites de petites annonces à Casablanca - MarocAdsZone",
      "Classifieds in Casablanca - MarocAdsZone",
      "إعلانات مبوبة في الدار البيضاء - MarocAdsZone"
    ),
    description: tSEO(
      "Publiez ou consultez toutes les annonces à Casablanca : immobilier, voitures, emploi, multimédia. Vendez ou achetez en ligne.",
      "Post or view all ads in Casablanca: real estate, cars, jobs, multimedia. Sell or buy online.",
      "انشر أو اطلع على جميع الإعلانات في الدار البيضاء: العقارات، السيارات، الوظائف، الوسائط المتعددة. بيع أو شراء عبر الإنترنت."
    ),
    h1: tSEO(
      "Explorez toutes les annonces à Casablanca",
      "Explore all ads in Casablanca",
      "استكشف جميع الإعلانات في الدار البيضاء"
    ),
  },
  rabat: {
    title: tSEO(
      "Site d'annonces à Rabat - Petites annonces à Rabat",
      "Classifieds in Rabat - MarocAdsZone",
      "إعلانات مبوبة في الرباط - MarocAdsZone"
    ),
    description: tSEO(
      "Explorez les annonces à Rabat : immobiliers, voitures d'occasion, services. Déposez votre annonce en ligne gratuitement.",
      "Explore ads in Rabat: real estate, used cars, services. Post your ad online for free.",
      "استكشف الإعلانات في الرباط: العقارات، السيارات المستعملة، الخدمات. انشر إعلانك عبر الإنترنت مجاناً."
    ),
    h1: tSEO(
      "Explorez toutes les annonces à Rabat",
      "Explore all ads in Rabat",
      "استكشف جميع الإعلانات في الرباط"
    ),
  },
  tanger: {
    title: tSEO(
      "Site d'annonces à Tanger - Petites annonces gratuites",
      "Classifieds in Tangier - Free Ads",
      "إعلانات مبوبة في طنجة - إعلانات مجانية"
    ),
    description: tSEO(
      "Trouvez des annonces à Tanger dans toutes les catégories : voiture, maison, emploi. Publiez facilement votre annonce sur MarocAdsZone.",
      "Find ads in Tangier in all categories: car, house, job. Easily post your ad on MarocAdsZone.",
      "ابحث عن إعلانات في طنجة في جميع الفئات: سيارة، منزل، وظيفة. انشر إعلانك بسهولة على MarocAdsZone."
    ),
    h1: tSEO(
      "Explorez toutes les annonces à Tanger",
      "Explore all ads in Tangier",
      "استكشف جميع الإعلانات في طنجة"
    ),
  },
};

export const getAnnoncesSEO = (category?: string | null, city?: string | null): PageSEO => {
  if (category) {
    const seo = categorySEO[normalizeKey(category)];
    if (seo) return seo;
  }

  if (city) {
    const seo = citySEO[normalizeKey(city)];
    if (seo) return seo;
  }

  return defaultAnnoncesSEO();
};

// ============ HOME SEO ============
export const getHomeSEO = (): PageSEO => ({
  title: tSEO(
    "Petites annonces gratuites au Maroc : voitures, immobilier, mode, emploi - MarocAdsZone",
    "Free classified ads in Morocco: cars, real estate, fashion, jobs - MarocAdsZone",
    "إعلانات مبوبة مجانية في المغرب: سيارات، عقارات، أزياء، وظائف - MarocAdsZone"

  ),
  description: tSEO(
    "MarocAdsZone vous permet de consulter et publier des annonces gratuites au Maroc : immobilier, voitures, emploi, services et plus.",
    "MarocAdsZone allows you to view and post free ads in Morocco: real estate, cars, jobs, services and more.",
    "يتيح لك MarocAdsZone عرض ونشر إعلانات مجانية في المغرب: العقارات، السيارات، الوظائف، الخدمات والمزيد."
  ),
});

// ============ JOB OFFERS SEO ============
export const getJobOffersSEO = (): PageSEO => ({
  title: tSEO(
    "Offres d'emploi au Maroc - MarocAdsZone",
    "Job offers in Morocco - MarocAdsZone",
    "عروض العمل في المغرب - MarocAdsZone"
  ),
  description: tSEO(
    "Trouvez votre prochain emploi au Maroc. Des milliers d'offres d'emploi disponibles dans tous les secteurs.",
    "Find your next job in Morocco. Thousands of job offers available in all sectors.",
    "ابحث عن وظيفتك التالية في المغرب. آلاف عروض العمل المتاحة في جميع القطاعات."
  ),
  h1: tSEO(
    "Offres d'emploi au Maroc",
    "Job offers in Morocco",
    "عروض العمل في المغرب"
  ),
});

// ============ VIDEOS SEO ============
export const getVideosSEO = (): PageSEO => ({
  title: tSEO(
    "Annonces vidéos au Maroc - MarocAdsZone",
    "Video ads in Morocco - MarocAdsZone",
    "إعلانات الفيديو في المغرب - MarocAdsZone"
  ),
  description: tSEO(
    "Découvrez nos annonces vidéos courtes. Des offres dynamiques et attractives pour promouvoir vos produits et services.",
    "Discover our short video ads. Dynamic and attractive offers to promote your products and services.",
    "اكتشف إعلانات الفيديو القصيرة لدينا. عروض ديناميكية وجذابة للترويج لمنتجاتك وخدماتك."
  ),
  h1: tSEO(
    "Annonces vidéos au Maroc",
    "Video ads in Morocco",
    "إعلانات الفيديو في المغرب"
  ),
});

// ============ DEFAULT PAGE SEO ============
export const getDefaultPageSEO = (pathname: string): PageSEO => {
  // Company page
  if (pathname.startsWith("/user-account/company")) {
    return {
      title: tSEO(
        "Information commerciale - MarocAdsZone",
        "Business Information - MarocAdsZone",
        "المعلومات التجارية - MarocAdsZone"
      ),
      description: tSEO(
        "Gérez les informations commerciales de votre entreprise sur MarocAdsZone et publiez des annonces professionnelles au Maroc.",
        "Manage your company's business information on MarocAdsZone and post professional ads in Morocco.",
        "إدارة المعلومات التجارية لشركتك على MarocAdsZone ونشر إعلانات احترافية في المغرب."
      ),
    };
  }

  // Video ads page
  if (pathname.startsWith("/user-account/annonces-video")) {
    return {
      title: tSEO(
        "Mes annonces vidéo - MarocAdsZone",
        "My Video Ads - MarocAdsZone",
        "إعلانات الفيديو الخاصة بي - MarocAdsZone"
      ),
      description: tSEO(
        "Gérez vos annonces vidéo MarocAdsZone et publiez des offres plus visibles auprès des acheteurs au Maroc.",
        "Manage your MarocAdsZone video ads and post more visible offers to buyers in Morocco.",
        "إدارة إعلانات الفيديو الخاصة بك على MarocAdsZone ونشر عروض أكثر وضوحاً للمشترين في المغرب."
      ),
    };
  }

  // User ads page
  if (pathname.startsWith("/user-account/annonces")) {
    return {
      title: tSEO(
        "Mes annonces - MarocAdsZone",
        "My Ads - MarocAdsZone",
        "إعلاناتي - MarocAdsZone"
      ),
      description: tSEO(
        "Consultez et gérez vos annonces publiées sur MarocAdsZone depuis votre espace utilisateur.",
        "View and manage your ads posted on MarocAdsZone from your user space.",
        "عرض وإدارة إعلاناتك المنشورة على MarocAdsZone من مساحة المستخدم الخاصة بك."
      ),
    };
  }

  // Profile page
  if (pathname.startsWith("/user-account/profile")) {
    return {
      title: tSEO(
        "Mon profil - MarocAdsZone",
        "My Profile - MarocAdsZone",
        "ملفي الشخصي - MarocAdsZone"
      ),
      description: tSEO(
        "Gérez vos informations personnelles, coordonnées et préférences de compte MarocAdsZone.",
        "Manage your personal information, contact details and MarocAdsZone account preferences.",
        "إدارة معلوماتك الشخصية وتفاصيل الاتصال وتفضيلات حساب MarocAdsZone."
      ),
    };
  }

  // Publish ad page
  if (
    pathname.startsWith("/publier-une-annonce") ||
    pathname.startsWith("/annonces/new") ||
    pathname.startsWith("/job/post-job")
  ) {
    return {
      title: tSEO(
        "Publier une annonce gratuite au Maroc - MarocAdsZone",
        "Post a free ad in Morocco - MarocAdsZone",
        "انشر إعلاناً مجانياً في المغرب - MarocAdsZone"
      ),
      description: tSEO(
        "Publier une annonce gratuite au Maroc en quelques minutes. Immobilier, voitures, emploi et plus encore. Visibilité immédiate.",
        "Post a free ad in Morocco in minutes. Real estate, cars, jobs and more. Immediate visibility.",
        "انشر إعلاناً مجانياً في المغرب في دقائق. عقارات، سيارات، وظائف والمزيد. ظهور فوري."
      ),
    };
  }

  // FAQ page
  if (pathname.startsWith("/faq")) {
    return {
      title: tSEO(
        "FAQ annonces gratuites au Maroc - MarocAdsZone",
        "Free classifieds FAQ in Morocco - MarocAdsZone",
        "الأسئلة الشائعة للإعلانات المجانية في المغرب - MarocAdsZone"
      ),
      description: tSEO(
        "Trouvez les réponses aux questions fréquentes sur la publication, la gestion et la visibilité des annonces sur MarocAdsZone.",
        "Find answers to frequently asked questions about posting, managing and visibility of ads on MarocAdsZone.",
        "ابحث عن إجابات للأسئلة المتداولة حول نشر وإدارة ورؤية الإعلانات على MarocAdsZone."
      ),
    };
  }

  // Terms pages
  if (pathname.startsWith("/terms/cookies")) {
    return {
      title: tSEO(
        "Politique des cookies - MarocAdsZone",
        "Cookie Policy - MarocAdsZone",
        "سياسة ملفات تعريف الارتباط - MarocAdsZone"
      ),
      description: tSEO(
        "Découvrez comment MarocAdsZone utilise les cookies pour améliorer l'expérience utilisateur et les services du site.",
        "Learn how MarocAdsZone uses cookies to improve user experience and site services.",
        "تعرف على كيفية استخدام MarocAdsZone لملفات تعريف الارتباط لتحسين تجربة المستخدم وخدمات الموقع."
      ),
    };
  }

  if (pathname.startsWith("/terms")) {
    return {
      title: tSEO(
        "Conditions d'utilisation - MarocAdsZone",
        "Terms of Use - MarocAdsZone",
        "شروط الاستخدام - MarocAdsZone"
      ),
      description: tSEO(
        "Consultez les conditions d'utilisation de MarocAdsZone pour publier et consulter des annonces gratuites au Maroc.",
        "Read the MarocAdsZone terms of use for posting and viewing free ads in Morocco.",
        "اقرأ شروط استخدام MarocAdsZone لنشر وعرض الإعلانات المجانية في المغرب."
      ),
    };
  }

  // Legal notices
  if (pathname.startsWith("/mentions-legales")) {
    return {
      title: tSEO(
        "Mentions légales - MarocAdsZone",
        "Legal Notice - MarocAdsZone",
        "إشعار قانوني - MarocAdsZone"
      ),
      description: tSEO(
        "Retrouvez les mentions légales de MarocAdsZone, site d'annonces gratuites et professionnelles au Maroc.",
        "Find the legal notices of MarocAdsZone, a free and professional classifieds site in Morocco.",
        "اعثر على الإشعارات القانونية لـ MarocAdsZone، موقع الإعلانات المبوبة المجانية والاحترافية في المغرب."
      ),
    };
  }

  // 404 page
  if (pathname.startsWith("/404")) {
    return {
      title: tSEO(
        "Page non trouvée - MarocAdsZone",
        "Page not found - MarocAdsZone",
        "الصفحة غير موجودة - MarocAdsZone"
      ),
      description: tSEO(
        "La page demandée est introuvable. Retournez sur MarocAdsZone pour consulter ou publier des annonces au Maroc.",
        "The requested page was not found. Return to MarocAdsZone to view or post ads in Morocco.",
        "الصفحة المطلوبة غير موجودة. عد إلى MarocAdsZone لعرض أو نشر إعلانات في المغرب."
      ),
    };
  }

  // Default SEO
  return {
    title: tSEO(
      "Petites annonces gratuites au Maroc - MarocAdsZone",
      "Free classifieds in Morocco - MarocAdsZone",
      "إعلانات مبوبة مجانية في المغرب - MarocAdsZone"
    ),
    description: tSEO(
      "MarocAdsZone vous permet de consulter et publier des annonces gratuites au Maroc : immobilier, voitures, emploi, services et plus.",
      "MarocAdsZone allows you to view and post free ads in Morocco: real estate, cars, jobs, services and more.",
      "يتيح لك MarocAdsZone عرض ونشر إعلانات مجانية في المغرب: العقارات، السيارات، الوظائف، الخدمات والمزيد."
    ),
  };
};