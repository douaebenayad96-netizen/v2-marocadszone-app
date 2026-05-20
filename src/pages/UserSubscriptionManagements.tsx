import { differenceInDays } from "date-fns";
import { ArrowRight, Calendar, Zap } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import ModalLayout from "../components/layouts/ModalLayout";
import PricingPopUp from "../components/pricing/PricingPopUp";
import { useAuthStore } from "../services/store/authStore";
import { getMySubscription } from "../services/api/fetchTarification";


const SubscriptionViewer: React.FC = () => {
  const { user: subscription, setUser } = useAuthStore();
 useEffect(() => {
  getMySubscription()
    .then((res) => {
      setUser(res.user);
    })
    .catch((error) => {
      console.log("GET SUBSCRIPTION ERROR:", error);
    });
}, [setUser]);
  const [showPricing, setShowPricing] = useState(false);

  const activeSubscription = subscription?.current_active_subscription;
  const pendingSubscription = subscription?.pending_subscription;

  const hasSubscription = activeSubscription != null;
  const hasPendingSubscription = pendingSubscription != null;

  const getPlanInfo = (planId?: number) => {
  switch (Number(planId)) {
    case 1:
      return { name: "Pack Gratuit Mensuel", price: "0 MAD / mois", limit: "2 annonces / mois" }
    case 2:
      return { name: "Pack Premium Mensuel", price: "49 MAD / mois", limit: "10 annonces / mois" }
    case 3:
      return { name: "Pack Pro Mensuel", price: "199 MAD / mois", limit: "Annonces illimitées" }
    case 4:
      return { name: "Pack Gratuit Annuel", price: "0 MAD / mois", limit: "2 annonces / mois" }
    case 5:
      return { name: "Pack Premium Annuel", price: "39 MAD / mois", limit: "10 annonces / mois" }
    case 6:
      return { name: "Pack Pro Annuel", price: "159 MAD / mois", limit: "Annonces illimitées" }
    default:
      return { name: "Plan inconnu", price: "-", limit: "-" }
  }
}

const activePlan = getPlanInfo(activeSubscription?.plan_id)
const pendingPlan = getPlanInfo(pendingSubscription?.plan_id)
const limits = subscription?.subscription_limits

  const remainingDays = hasSubscription
    ? differenceInDays(new Date(activeSubscription.ends_at as string), new Date())
    : 0;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  if (!hasSubscription && hasPendingSubscription) {
  return (
    <div className="flex items-center justify-center py-14 h-full">
      <div className="w-full max-w-5xl">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-orange-200">
          <div className="p-12 text-white text-center bg-orange-500">
            <h2 className="text-3xl font-bold mb-3">
              Abonnement en attente
            </h2>
            <p className="text-white/90 text-lg">
              Votre demande est en cours de validation par l'administration.
            </p>
          </div>

          <div className="p-8 text-center">
            <p className="text-slate-700 mb-2">
              Plan sélectionné : {pendingPlan.name}
            </p>
            <p className="text-slate-700 mb-2">
              Prix : {pendingPlan.price}
            </p>
            <p className="text-slate-500">
              Date de demande : {formatDate(pendingSubscription.created_at)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

  // No subscription UI
  if (!hasSubscription) {
    return (
      <div className="flex items-center justify-center py-14 h-full">
        <div className="w-full max-w-5xl">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Commencez votre aventure
            </h1>
            <p className="text-base text-slate-600">
              Choisissez un plan pour débloquer toutes les fonctionnalités
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
            <div
              className="p-12 text-white text-center"
              style={{ backgroundColor: "#F36F24" }}
            >
              <div className="flex justify-center mb-4">
                <div className="bg-white/20 rounded-full p-4 backdrop-blur-sm">
                  <Zap className="w-12 h-12 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-3">
                Aucun abonnement actif
              </h2>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                Accédez à toutes les fonctionnalités premium et boostez votre
                productivité dès aujourd'hui
              </p>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200">
                  <div
                    className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center text-white"
                    style={{ backgroundColor: "#F36F24" }}
                  >
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Accès complet
                  </h3>
                  <p className="text-sm text-slate-600">
                    Toutes les fonctionnalités premium
                  </p>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200">
                  <div
                    className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center text-white"
                    style={{ backgroundColor: "#F36F24" }}
                  >
                    <Calendar className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Sans engagement
                  </h3>
                  <p className="text-sm text-slate-600">
                    Annulez à tout moment
                  </p>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200">
                  <div
                    className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center text-white"
                    style={{ backgroundColor: "#F36F24" }}
                  >
                    <ArrowRight className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Démarrage rapide
                  </h3>
                  <p className="text-sm text-slate-600">Activé immédiatement</p>
                </div>
              </div>

              <button
                className="w-full text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group text-lg"
                style={{ backgroundColor: "#F36F24" }}
                onClick={() => setShowPricing(true)}
              >
                Choisir un plan
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
        <ModalLayout isOpen={showPricing} setIsOpen={() => {}}>
          <div className="p-4 lg:p-12 bg-white overflow-y-auto rounded-lg max-h-[95vh] sm:max-h-[90vh] mx-4">
            <PricingPopUp
              onClose={() => {
                setShowPricing(false);
              }}
            />
          </div>
        </ModalLayout>
      </div>
    );
  }

  // Active subscription UI
  return (
    <div className="flex items-center justify-center py-14 h-full">
      <div className="w-full max-w-5xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Votre Abonnement
          </h1>
          <p className="text-base text-slate-600">
            Gérez et suivez votre plan d'abonnement actuel
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
          <div
            className="p-8 text-white"
            style={{ backgroundColor: "#F36F24" }}
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">
                  {activePlan.name}
                </h2>
                <p className="text-white/90 text-lg font-semibold">
                  {activePlan.price}
                </p>
                <p className="text-white/80 text-sm mt-1">
                  {activePlan.limit}
                </p>
                <p className="text-white/90 text-base capitalize">
                  Statut:{" "}
                  {activeSubscription.status === "active" ? "Actif" : activeSubscription.status}
                </p>
              </div>
              <div className="bg-white/20 rounded-full p-3 backdrop-blur-sm">
                <Zap className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="p-2 rounded-lg text-white"
                    style={{ backgroundColor: "#F36F24" }}
                  >
                    <Calendar className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-700">
                    Période actuelle
                  </h4>
                </div>
                <p className="text-base font-bold text-slate-900 mb-1">
                  {formatDate(
                    activeSubscription.starts_at
                  )}
                </p>
                <p className="text-sm text-slate-600">Début</p>
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="p-2 rounded-lg text-white"
                    style={{ backgroundColor: "#F36F24" }}
                  >
                    <Calendar className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-700">
                    Prochain renouvellement
                  </h4>
                </div>
                <p className="text-base font-bold text-slate-900 mb-1">
                  {remainingDays} jours
                </p>
                <p className="text-sm text-slate-600">
                  {formatDate(
                    activeSubscription.ends_at as string
                  )}
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
                  <p className="text-sm text-slate-600 mb-1">ID Abonnement</p>
                  <p className="text-base font-bold text-slate-900">
                    #{activeSubscription.id}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Inscrit depuis</p>
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
              Améliorer le plan
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
      <ModalLayout isOpen={showPricing} setIsOpen={() => {}}>
        <div className="p-4 lg:p-12 bg-white overflow-y-auto rounded-lg max-h-[95vh] sm:max-h-[90vh] mx-4">
          <PricingPopUp
            onClose={() => {
              setShowPricing(false);
            }}
          />
        </div>
      </ModalLayout>
    </div>
  );
};

export default SubscriptionViewer;
