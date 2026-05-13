export type PageSEO = {
  title: string;
  description: string;
  h1?: string;
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

export const defaultAnnoncesSEO: PageSEO = {
  title: "Annonces gratuites au Maroc - MarocAdsZone",
  description:
    "Parcourez toutes les annonces au Maroc : immobilier, véhicules, multimédia, services et plus. Publiez votre annonce gratuitement.",
  h1: "Explorez toutes les annonces gratuites",
};

const categorySEO: Record<string, PageSEO> = {
  immobilier: {
    title: "Annonces Immobilier au Maroc - Ventes & Locations",
    description:
      "Cherchez un bien immobilier à vendre ou à louer au Maroc : appartements, maisons, terrains. Déposez ou consultez une annonce gratuite.",
    h1: "Annonces immobilier Maroc : ventes et locations",
  },
  "informatique multimedia": {
    title: "Petites annonces Informatique et Multimédia au Maroc - MarocAdsZone",
    description:
      "Trouvez PC, smartphones, tablettes, accessoires et équipements multimédia à vendre partout au Maroc. Déposez une annonce gratuite.",
    h1: "Explorez toutes les annonces Informatique et Multimédia",
  },
  "meuble et decoration": {
    title: "Site d'annonces de meubles et décoration au Maroc - MarocAdsZone",
    description:
      "Canapés, tables, déco maison, literie... Trouvez des annonces de meubles et décoration au Maroc. Achetez ou vendez à petit prix.",
    h1: "Explorez toutes les annonces meubles et décoration",
  },
  "habillement et mode": {
    title: "Petites annonces habillement et mode au Maroc - MarocAdsZone",
    description:
      "Mode pour femmes, hommes et enfants. Publiez ou trouvez des annonces d'habillement à petit prix au Maroc.",
    h1: "Explorez toutes les annonces habillement et mode",
  },
  motos: {
    title: "Petites annonces motos d'occasion ou neuf au Maroc - MarocAdsZone",
    description:
      "Achat ou vente de motos d'occasion ou neuf au Maroc. Publiez votre annonce moto sur MarocAdsZone.",
    h1: "Explorez toutes les annonces motos",
  },
  "voitures d occasion": {
    title: "Petites annonces voitures d'occasion au Maroc - MarocAdsZone",
    description:
      "Achetez ou vendez une voiture d'occasion au Maroc. Consultez les annonces auto et publiez gratuitement votre véhicule sur MarocAdsZone.",
    h1: "Explorez toutes les annonces voitures d'occasion",
  },
  "maison et jardin": {
    title: "Petites annonces de Maison et Jardin - Site d'annonces au Maroc",
    description:
      "Trouvez des annonces du mobilier d'extérieur, outillage, décoration et accessoires pour maison et jardin. Déposez vos annonces sans frais.",
    h1: "Explorez toutes les annonces maison et jardin",
  },
  "outils et bricolage": {
    title: "Petites annonces de bricolage au Maroc - MarocAdsZone",
    description:
      "Achetez ou vendez du matériel de bricolage, outillage professionnel et accessoires de chantier au Maroc. Annonces gratuites.",
    h1: "Explorez toutes les annonces bricolage",
  },
  services: {
    title: "Petites annonces de services au Maroc - MarocAdsZone",
    description:
      "Services à la personne, assistance, dépannage et plus. Trouvez ou publier une annonce de service facilement.",
    h1: "Explorez toutes les annonces services",
  },
  "professional et enterprise": {
    title: "Équipements professionnels & B2B au Maroc",
    description:
      "Machines, matériel de bureau, mobilier pro, fournitures et équipements d'entreprise à vendre. Annonces ciblées pour professionnels.",
    h1: "Explorez toutes les annonces professionnel et entreprise",
  },
  "professionnel et entreprise": {
    title: "Équipements professionnels & B2B au Maroc",
    description:
      "Machines, matériel de bureau, mobilier pro, fournitures et équipements d'entreprise à vendre. Annonces ciblées pour professionnels.",
    h1: "Explorez toutes les annonces professionnel et entreprise",
  },
};

const citySEO: Record<string, PageSEO> = {
  casablanca: {
    title: "Sites de petites annonces à Casablanca - MarocAdsZone",
    description:
      "Publiez ou consultez toutes les annonces à Casablanca : immobilier, voitures, emploi, multimédia. Vendez ou achetez en ligne.",
    h1: "Explorez toutes les annonces à Casablanca",
  },
  rabat: {
    title: "Site d'annonces à Rabat - Petites annonces à Rabat",
    description:
      "Explorez les annonces à Rabat : immobiliers, voitures d'occasion, services. Déposez votre annonce en ligne gratuitement.",
    h1: "Explorez toutes les annonces à Rabat",
  },
  tanger: {
    title: "Site d'annonces à Tanger - Petites annonces gratuites",
    description:
      "Trouvez des annonces à Tanger dans toutes les catégories : voiture, maison, emploi. Publiez facilement votre annonce sur MarocAdsZone.",
    h1: "Explorez toutes les annonces à Tanger",
  },
};

export const getAnnoncesSEO = (category?: string | null, city?: string | null) => {
  if (category) {
    const seo = categorySEO[normalizeKey(category)];
    if (seo) return seo;
  }

  if (city) {
    const seo = citySEO[normalizeKey(city)];
    if (seo) return seo;
  }

  return defaultAnnoncesSEO;
};

export const getDefaultPageSEO = (pathname: string): PageSEO => {
  if (pathname.startsWith("/user-account/company")) {
    return {
      title: "Information commerciale - MarocAdsZone",
      description:
        "Gérez les informations commerciales de votre entreprise sur MarocAdsZone et publiez des annonces professionnelles au Maroc.",
    };
  }

  if (pathname.startsWith("/user-account/annonces-video")) {
    return {
      title: "Mes annonces vidéo - MarocAdsZone",
      description:
        "Gérez vos annonces vidéo MarocAdsZone et publiez des offres plus visibles auprès des acheteurs au Maroc.",
    };
  }

  if (pathname.startsWith("/user-account/annonces")) {
    return {
      title: "Mes annonces - MarocAdsZone",
      description:
        "Consultez et gérez vos annonces publiées sur MarocAdsZone depuis votre espace utilisateur.",
    };
  }

  if (pathname.startsWith("/user-account/profile")) {
    return {
      title: "Mon profil - MarocAdsZone",
      description:
        "Gérez vos informations personnelles, coordonnées et préférences de compte MarocAdsZone.",
    };
  }

  if (pathname.startsWith("/user-account/subscription-management")) {
    return {
      title: "Gestion d'abonnement - MarocAdsZone",
      description:
        "Suivez et gérez vos abonnements MarocAdsZone pour vos annonces et services professionnels.",
    };
  }

  if (pathname.startsWith("/user-account")) {
    return {
      title: "Tableau de bord utilisateur - MarocAdsZone",
      description:
        "Accédez à votre tableau de bord MarocAdsZone pour gérer votre compte, vos annonces et vos informations.",
    };
  }

  if (
    pathname.startsWith("/publier-une-annonce") ||
    pathname.startsWith("/annonces/new") ||
    pathname.startsWith("/job/post-job")
  ) {
    return {
      title: "Publier une annonce gratuite au Maroc - MarocAdsZone",
      description:
        "Publier une annonce gratuite au Maroc en quelques minutes. Immobilier, voitures, emploi et plus encore. Visibilité immédiate.",
    };
  }

  if (pathname.startsWith("/entreprise")) {
    return {
      title: "Profil entreprise au Maroc - MarocAdsZone",
      description:
        "Découvrez les entreprises présentes sur MarocAdsZone, leurs informations commerciales et leurs annonces au Maroc.",
    };
  }

  if (pathname.startsWith("/become-seller")) {
    return {
      title: "Devenir vendeur professionnel - MarocAdsZone",
      description:
        "Créez votre espace professionnel sur MarocAdsZone et développez votre visibilité auprès des acheteurs au Maroc.",
    };
  }

  if (pathname.startsWith("/faq")) {
    return {
      title: "FAQ annonces gratuites au Maroc - MarocAdsZone",
      description:
        "Trouvez les réponses aux questions fréquentes sur la publication, la gestion et la visibilité des annonces sur MarocAdsZone.",
    };
  }

  if (pathname.startsWith("/terms/privacy")) {
    return {
      title: "Politique de confidentialité - MarocAdsZone",
      description:
        "Consultez la politique de confidentialité de MarocAdsZone et la gestion des données personnelles des utilisateurs.",
    };
  }

  if (pathname.startsWith("/terms/cookies")) {
    return {
      title: "Politique des cookies - MarocAdsZone",
      description:
        "Découvrez comment MarocAdsZone utilise les cookies pour améliorer l'expérience utilisateur et les services du site.",
    };
  }

  if (pathname.startsWith("/terms")) {
    return {
      title: "Conditions d'utilisation - MarocAdsZone",
      description:
        "Consultez les conditions d'utilisation de MarocAdsZone pour publier et consulter des annonces gratuites au Maroc.",
    };
  }

  if (pathname.startsWith("/mentions-legales")) {
    return {
      title: "Mentions légales - MarocAdsZone",
      description:
        "Retrouvez les mentions légales de MarocAdsZone, site d'annonces gratuites et professionnelles au Maroc.",
    };
  }

  if (pathname.startsWith("/forgot-password")) {
    return {
      title: "Mot de passe oublié - MarocAdsZone",
      description:
        "Réinitialisez le mot de passe de votre compte MarocAdsZone pour retrouver l'accès à vos annonces et paramètres.",
    };
  }

  if (pathname.startsWith("/reset-password")) {
    return {
      title: "Réinitialiser le mot de passe - MarocAdsZone",
      description:
        "Créez un nouveau mot de passe sécurisé pour votre compte MarocAdsZone.",
    };
  }

  if (pathname.startsWith("/payments")) {
    return {
      title: "Paiement sécurisé - MarocAdsZone",
      description:
        "Finalisez votre paiement MarocAdsZone pour vos annonces, abonnements ou services professionnels.",
    };
  }

  if (pathname.startsWith("/thank-you")) {
    return {
      title: "Merci - MarocAdsZone",
      description:
        "Votre action a bien été prise en compte sur MarocAdsZone. Retrouvez vos annonces et informations dans votre compte.",
    };
  }

  if (pathname.startsWith("/404")) {
    return {
      title: "Page non trouvée - MarocAdsZone",
      description:
        "La page demandée est introuvable. Retournez sur MarocAdsZone pour consulter ou publier des annonces au Maroc.",
    };
  }

  return {
    title: "Petites annonces gratuites au Maroc - MarocAdsZone",
    description:
      "MarocAdsZone vous permet de consulter et publier des annonces gratuites au Maroc : immobilier, voitures, emploi, services et plus.",
  };
};
