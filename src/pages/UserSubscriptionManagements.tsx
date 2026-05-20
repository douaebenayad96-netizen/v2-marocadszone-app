import { differenceInDays } from "date-fns";
import { ArrowRight, Calendar, Zap } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ModalLayout from "../components/layouts/ModalLayout";
import PricingPopUp from "../components/pricing/PricingPopUp";
import { getMySubscription } from "../services/api/fetchTarification";
import { useAuthStore } from "../services/store/authStore";

const SubscriptionViewer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const { user: subscription, setUser } = useAuthStore();
  const [showPricing, setShowPricing] = useState(false);

  useEffect(() => {
    getMySubscription()
      .then((res) => {
        setUser(res.user);
      })
      .catch((error) => {
        console.log("GET SUBSCRIPTION ERROR:", error);
      });
  }, [setUser]);

  const activeSubscription = subscription?.current_active_subscription;
  const pendingSubscription = subscription?.pending_subscription;
  const limits = subscription?.subscription_limits;

  const hasSubscription = activeSubscription != null;
  const hasPendingSubscription = pendingSubscription != null;

  const getPlanInfo = (planId?: number) => {
    switch (Number(planId)) {
      case 1:
        return { name: "Pack Gratuit Mensuel", price: "0 MAD / mois", limit: "2 annonces / mois" };
      case 2:
        return { name: "Pack Premium Mensuel", price: "49 MAD / mois", limit: "10 annonces / mois" };
      case 3:
        return { name: "Pack Pro Mensuel", price: "199 MAD / mois", limit: "Annonces illimitées" };
      case 4:
        return { name: "Pack Gratuit Annuel", price: "0 MAD / mois", limit: "2 annonces / mois" };
      case 5:
        return { name: "Pack Premium Annuel", price: "39 MAD / mois", limit: "10 annonces / mois" };
      case 6:
        return { name: "Pack Pro Annuel", price: "159 MAD / mois", limit: "Annonces illimitées" };
      default:
        return { name: t("subscription.unknown_plan") || "Plan inconnu", price: "-", limit: "-" };
    }
  };

  const activePlan = getPlanInfo(activeSubscription?.plan_id);
  const pendingPlan = getPlanInfo(pendingSubscription?.plan_id);

  const remainingDays = hasSubscription
    ? differenceInDays(new Date(activeSubscription.ends_at as string), new Date())
    : 0;

  const formatDate = (dateString: string) => {
    const lang =
      i18n.language === "ar" ? "ar-SA" : i18n.language === "en" ? "en-US" : "fr-FR";

    return new Date(dateString).toLocaleDateString(lang, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!hasSubscription && hasPendingSubscription) {
    return (
      <div className={`flex items-center justify-center py-14 h-full ${isRTL ? "rtl" : ""}`}>
        <div className="w-full max-w-5xl">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-orange-200">
            <div className="p-12 text-white text-center bg-orange-500">
              <h2 className="text-3xl font-bold mb-3">
                {t("subscription.pending_title")}
              </h2>
              <p className="text-white/90 text-lg">
                {t("subscription.pending_message")}
              </p>
            </div>

            <div className="p-8 text-center">
              <p className="text-slate-700 mb-2">
                {t("subscription.selected_plan")}: {pendingPlan.name}
              </p>
              <p className="text-slate-700 mb-2">
                Prix : {pendingPlan.price}
              </p>
              <p className="text-slate-500">
                {t("subscription.request_date")}: {formatDate(pendingSubscription.created_at)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!hasSubscription) {
    return (
      <div className={`flex items-center justify-center py-14 h-full ${isRTL ? "rtl" : ""}`}>
        <div className="w-full max-w-5xl">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              {t("subscription.start_title")}
            </h1>
            <p className="text-base text-slate-600">
              {t("subscription.start_subtitle")}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
            <div className="p-12 text-white text-center" style={{ backgroundColor: "#F36F24" }}>
              <div className="flex justify-center mb-4">
                <div className="bg-white/20 rounded-full p-4 backdrop-blur-sm">
                  <Zap className="w-12 h-12 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-3">
                {t("subscription.no_active_title")}
              </h2>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                {t("subscription.no_active_message")}
              </p>
            </div>

            <div className="p-8">
              <button
                className="w-full text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group text-lg"
                style={{ backgroundColor: "#F36F24" }}
                onClick={() => setShowPricing(true)}
              >
                {t("subscription.choose_plan")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        <ModalLayout isOpen={showPricing} setIsOpen={() => {}}>
          <div className="p-4 lg:p-12 bg-white overflow-y-auto rounded-lg max-h-[95vh] sm:max-h-[90vh] mx-4">
            <PricingPopUp onClose={() => setShowPricing(false)} />
          </div>
        </ModalLayout>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center py-14 h-full ${isRTL ? "rtl" : ""}`}>
      <div className="w-full max-w-5xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            {t("subscription.your_subscription")}
          </h1>
          <p className="text-base text-slate-600">
            {t("subscription.your_subscription_desc")}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
          <div className="p-8 text-white" style={{ backgroundColor: "#F36F24" }}>
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">{activePlan.name}</h2>
                <p className="text-white/90 text-lg font-semibold">{activePlan.price}</p>
                <p className="text-white/80 text-sm mt-1">{activePlan.limit}</p>
                <p className="text-white/90 text-base capitalize mt-2">
                  {t("subscription.status")}:{" "}
                  {activeSubscription.status === "active"
                    ? t("subscription.active")
                    : activeSubscription.status}
                </p>
              </div>

              <div className="bg-white/20 rounded-full p-3 backdrop-blur-sm">
                <Zap className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 rounded-lg text-white" style={{ backgroundColor: "#F36F24" }}>
                    <Calendar className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-700">
                    {t("subscription.current_period")}
                  </h4>
                </div>
                <p className="text-base font-bold text-slate-900 mb-1">
                  {formatDate(activeSubscription.starts_at)}
                </p>
                <p className="text-sm text-slate-600">{t("subscription.start")}</p>
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 rounded-lg text-white" style={{ backgroundColor: "#F36F24" }}>
                    <Calendar className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-700">
                    {t("subscription.next_renewal")}
                  </h4>
                </div>
                <p className="text-base font-bold text-slate-900 mb-1">
                  {remainingDays}{" "}
                  {remainingDays === 1 ? t("subscription.day") : t("subscription.days")}
                </p>
                <p className="text-sm text-slate-600">
                  {formatDate(activeSubscription.ends_at as string)}
                </p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Annonces restantes</p>
                  <p className="text-base font-bold text-slate-900">
                    {limits?.is_unlimited
                      ? "Illimité"
                      : `${limits?.remaining_announcements ?? 0}/${limits?.limit ?? 0}`}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-600 mb-1">
                    {t("subscription.subscription_id")}
                  </p>
                  <p className="text-base font-bold text-slate-900">
                    #{activeSubscription.id}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-600 mb-1">{t("subscription.since")}</p>
                  <p className="text-base font-bold text-slate-900">
                    {formatDate(activeSubscription.starts_at as string)}
                  </p>
                </div>
              </div>
            </div>

            <button
              className="w-full text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group text-base"
              style={{ backgroundColor: "#F36F24" }}
              onClick={() => setShowPricing(true)}
            >
              {t("subscription.upgrade_plan")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <ModalLayout isOpen={showPricing} setIsOpen={() => {}}>
        <div className="p-4 lg:p-12 bg-white overflow-y-auto rounded-lg max-h-[95vh] sm:max-h-[90vh] mx-4">
          <PricingPopUp onClose={() => setShowPricing(false)} />
        </div>
      </ModalLayout>
    </div>
  );
};

export default SubscriptionViewer;