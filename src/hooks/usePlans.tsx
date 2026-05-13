import { useQuery } from "react-query";
import { getPlans } from "../services/api/fetchTarification";

const usePlans = () => {
  const { data: plans, isLoading } = useQuery({
    queryKey: ["plans"],
    queryFn: () => getPlans(),
    select: (data) => data.data,
  });

  const monthlyPlans = plans?.monthly ?? [];
  const yearlyPlans = plans?.yearly ?? [];

  const pricingTiers = {
    monthly: [
      {
        id: monthlyPlans[0]?.id ?? 0,
        name: "Pack Gratuit",
        price: monthlyPlans[0]?.price ?? 0,
        description: "Commencez gratuitement",
        features: [
          `${monthlyPlans[0]?.max_announces ?? 0} annonces gratuites chaque mois`,
          "Valides 30 jours chacune",
          "Visibilité standard",
        ],
        transactionFee: "Gratuit",
        buttonVariant: "secondary" as const,
        popular: false,
      },
      {
        id: monthlyPlans[1]?.id ?? 0,
        name: "Pack Premium",
        price: monthlyPlans[1]?.price ?? 49,
        description: "Boostez votre visibilité",
        features: [
          `${monthlyPlans[1]?.max_announces ?? 0} annonces par mois`,
          "Mises en avant (badge + couleur)",
          "Priorité de diffusion",
          "Statistiques de performance",
        ],
        transactionFee: "Premium",
        buttonVariant: "default" as const,
        popular: true,
      },
      {
        id: monthlyPlans[2]?.id ?? 0,
        name: "Pack Pro",
        price: monthlyPlans[2]?.price ?? 199,
        description: "Solution professionnelle",
        features: [
          "Annonces illimitées",
          "Badge « Pro vérifié »",
          "Priorisation dans les résultats",
          "Tableau de bord & statistiques avancées",
          "Support dédié 7j/7",
        ],
        transactionFee: "Pro vérifié",
        buttonVariant: "default" as const,
        popular: false,
      },
    ],
    yearly: [
      {
        id: yearlyPlans[0]?.id ?? 0,
        name: "Pack Gratuit",
        price: yearlyPlans[0]?.price ?? 0,
        description: "Commencez gratuitement",
        features: [
          `${yearlyPlans[0]?.max_announces ?? 0} annonces gratuites chaque mois`,
          "Valides 30 jours chacune",
          "Visibilité standard",
        ],
        transactionFee: "Gratuit",
        buttonVariant: "secondary" as const,
        popular: false,
      },
      {
        id: yearlyPlans[1]?.id ?? 0,
        name: "Pack Premium",
        price: yearlyPlans[1]?.price ?? 0,
        description: "Boostez votre visibilité",
        features: [
          `${yearlyPlans[1]?.max_announces ?? 0} annonces par mois`,
          "Mises en avant (badge + couleur)",
          "Priorité de diffusion",
          "Statistiques de performance",
        ],
        transactionFee: "Premium",
        buttonVariant: "default" as const,
        popular: true,
      },
      {
        id: yearlyPlans[2]?.id ?? 0,
        name: "Pack Pro",
        price: yearlyPlans[2]?.price ?? 0,
        description: "Solution professionnelle",
        features: [
          "Annonces illimitées",
          "Badge « Pro vérifié »",
          "Priorisation dans les résultats",
          "Tableau de bord & statistiques avancées",
          "Support dédié 7j/7",
        ],
        transactionFee: "Pro vérifié",
        buttonVariant: "default" as const,
        popular: false,
      },
    ],
  };

  return pricingTiers;
};

export default usePlans;