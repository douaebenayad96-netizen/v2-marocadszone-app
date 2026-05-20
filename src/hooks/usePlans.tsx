import { useQuery } from "react-query";
import { getPlans } from "../services/api/fetchTarification";
import { useTranslation } from "react-i18next";

const usePlans = () => {
  const { t } = useTranslation();
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
        name: t("pricing.plans.free.name"),
        price: monthlyPlans[0]?.price ?? 0,
        description: t("pricing.plans.free.description"),
        features: [
          t("pricing.plans.free.feature_1", { count: monthlyPlans[0]?.max_announces ?? 0 }),
          t("pricing.plans.free.feature_2"),
          t("pricing.plans.free.feature_3"),
        ],
        transactionFee: t("pricing.plans.free.transaction_fee"),
        buttonVariant: "secondary" as const,
        popular: false,
      },
      {
        id: monthlyPlans[1]?.id ?? 0,
        name: t("pricing.plans.premium.name"),
        price: monthlyPlans[1]?.price ?? 49,
        description: t("pricing.plans.premium.description"),
        features: [
          t("pricing.plans.premium.feature_1", { count: monthlyPlans[1]?.max_announces ?? 0 }),
          t("pricing.plans.premium.feature_2"),
          t("pricing.plans.premium.feature_3"),
          t("pricing.plans.premium.feature_4"),
        ],
        transactionFee: t("pricing.plans.premium.transaction_fee"),
        buttonVariant: "default" as const,
        popular: true,
      },
      {
        id: monthlyPlans[2]?.id ?? 0,
        name: t("pricing.plans.pro.name"),
        price: monthlyPlans[2]?.price ?? 199,
        description: t("pricing.plans.pro.description"),
        features: [
          t("pricing.plans.pro.feature_1"),
          t("pricing.plans.pro.feature_2"),
          t("pricing.plans.pro.feature_3"),
          t("pricing.plans.pro.feature_4"),
          t("pricing.plans.pro.feature_5"),
        ],
        transactionFee: t("pricing.plans.pro.transaction_fee"),
        buttonVariant: "default" as const,
        popular: false,
      },
    ],
    yearly: [
      {
        id: yearlyPlans[0]?.id ?? 0,
        name: t("pricing.plans.free.name"),
        price: yearlyPlans[0]?.price ?? 0,
        description: t("pricing.plans.free.description"),
        features: [
          t("pricing.plans.free.feature_1", { count: yearlyPlans[0]?.max_announces ?? 0 }),
          t("pricing.plans.free.feature_2"),
          t("pricing.plans.free.feature_3"),
        ],
        transactionFee: t("pricing.plans.free.transaction_fee"),
        buttonVariant: "secondary" as const,
        popular: false,
      },
      {
        id: yearlyPlans[1]?.id ?? 0,
        name: t("pricing.plans.premium.name"),
        price: yearlyPlans[1]?.price ?? 0,
        description: t("pricing.plans.premium.description"),
        features: [
          t("pricing.plans.premium.feature_1", { count: yearlyPlans[1]?.max_announces ?? 0 }),
          t("pricing.plans.premium.feature_2"),
          t("pricing.plans.premium.feature_3"),
          t("pricing.plans.premium.feature_4"),
        ],
        transactionFee: t("pricing.plans.premium.transaction_fee"),
        buttonVariant: "default" as const,
        popular: true,
      },
      {
        id: yearlyPlans[2]?.id ?? 0,
        name: t("pricing.plans.pro.name"),
        price: yearlyPlans[2]?.price ?? 0,
        description: t("pricing.plans.pro.description"),
        features: [
          t("pricing.plans.pro.feature_1"),
          t("pricing.plans.pro.feature_2"),
          t("pricing.plans.pro.feature_3"),
          t("pricing.plans.pro.feature_4"),
          t("pricing.plans.pro.feature_5"),
        ],
        transactionFee: t("pricing.plans.pro.transaction_fee"),
        buttonVariant: "default" as const,
        popular: false,
      },
    ],
  };

  return pricingTiers;
};

export default usePlans;