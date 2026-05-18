import React, { useEffect, useState } from "react";
import { differenceInDays, format } from "date-fns";
import { fr } from "date-fns/locale";
import { CheckCircle2, Zap, Calendar, Download, Loader2, ArrowRight } from "lucide-react";
import ModalLayout from "../components/layouts/ModalLayout";
import PricingPopUp from "../components/pricing/PricingPopUp";
import { useAuthStore } from "../services/store/authStore";
import axios from "axios";

const UserSubscriptionManagements: React.FC = () => {
  const { user: subscription, setUser } = useAuthStore();
  const [showPricing, setShowPricing] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. FORCE REFRESH: Gher l'client ydkhel l'page, kanjibou jdid m l'API b l'Resource jdid
  useEffect(() => {
    const refreshUserSubscription = async () => {
      try {
        const response = await axios.get("/api/subscription/me");
        if (response.data && response.data.user) {
          // Metto à jour Zustand b l'user fresh li fih les abonnements
          setUser(response.data.user);
        }
      } catch (error) {
        console.error("Erreur lors du chargement de l'abonnement:", error);
      } finally {
        setLoading(false);
      }
    };

    refreshUserSubscription();
  }, [setUser]);

  const activeSubscription = subscription?.current_active_subscription;
  const pendingSubscription = subscription?.pending_subscription;
  const hasSubscription = activeSubscription?.status === "active" || activeSubscription?.status === "Active";

  // Calculer les jours restants ch7al b9a men l'youm
  const remainingDays = hasSubscription && activeSubscription?.ends_at
    ? differenceInDays(new Date(activeSubscription.ends_at), new Date())
    : 0;

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return format(new Date(dateString), "dd MMMM yyyy", { locale: fr });
  };

  // ==========================================
  // 1. UI: Loading State
  // ==========================================
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] w-full">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 text-[#F36F24] animate-spin" />
          <p className="text-slate-500 font-medium text-sm">Chargement de votre abonnement...</p>
        </div>
      </div>
    );
  }

  // ==========================================
  // 2. UI: En attente de validation (Pending)
  // ==========================================
  if (pendingSubscription && !hasSubscription) {
    return (
      <div className="flex items-center justify-center py-14 h-full bg-slate-50/50 w-full">
        <div className="w-full max-w-5xl px-4">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-200">
            <div className="p-12 text-white text-center bg-[#F36F24]">
              <div className="flex justify-center mb-4">
                <div className="bg-white/20 rounded-full p-4 backdrop-blur-sm">
                  <Calendar className="w-12 h-12 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-3">Abonnement en attente</h2>
              <p className="text-white/90 text-lg max-w-2xl mx-auto text-balance">
                Votre demande d’abonnement est en cours de vérification par l’administration.
              </p>
            </div>
            <div className="p-8 space-y-6">
              <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
                <p className="text-sm text-slate-500 mb-1">Pack choisi</p>
                <p className="text-2xl font-bold text-slate-800">
                  {pendingSubscription?.plan?.name ?? "Pack sélectionné"}
                </p>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Si vous avez déjà envoyé le reçu de paiement par WhatsApp ou Gmail, veuillez patienter jusqu’à la validation de l’administrateur.
              </p>
              <button
                className="w-full bg-[#F36F24] text-white font-semibold py-4 px-6 rounded-xl transition-all hover:bg-orange-600 shadow-md flex items-center justify-center gap-2 text-base"
                onClick={() => setShowPricing(true)}
              >
                Voir les plans
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 3. UI: Aucun abonnement (No Subscription)
  // ==========================================
  if (!hasSubscription) {
    return (
      <div className="flex items-center justify-center py-14 h-full bg-slate-50/50 w-full">
        <div className="w-full max-w-5xl px-4">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Commencez votre aventure</h1>
            <p className="text-base text-slate-600">Choisissez un plan pour débloquer toutes les fonctionnalités</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
            <div className="p-12 text-white text-center bg-[#F36F24]">
              <div className="flex justify-center mb-4">
                <div className="bg-white/20 rounded-full p-4 backdrop-blur-sm">
                  <Zap className="w-12 h-12 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-3">Aucun abonnement actif</h2>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                Accédez à toutes les fonctionnalités premium et boostez votre productivité dès aujourd'hui
              </p>
            </div>
            <div className="p-8">
              <button
                className="w-full bg-[#F36F24] text-white font-semibold py-4 px-6 rounded-xl transition-all hover:bg-orange-600 shadow-md text-lg flex items-center justify-center gap-2"
                onClick={() => setShowPricing(true)}
              >
                Choisir un plan
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <ModalLayout isOpen={showPricing} setIsOpen={setShowPricing}>
          <div className="p-4 lg:p-12 bg-white rounded-xl max-h-[95vh] overflow-y-auto mx-4">
            <PricingPopUp onClose={() => setShowPricing(false)} />
          </div>
        </ModalLayout>
      </div>
    );
  }

  // ==========================================
  // 4. UI: ABONNEMENT ACTIF (HAD LA PHOTO JDIIDA)
  // ==========================================
  return (
    <div className="py-10 px-4 md:px-8 bg-slate-50/50 min-h-screen w-full">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Banner Vert Premium */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 flex items-center gap-4 shadow-sm">
          <div className="bg-emerald-500 rounded-full p-2 text-white">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-emerald-900">Abonnement actif</h2>
            <p className="text-emerald-700 text-sm font-medium">Profitez de toutes les fonctionnalités premium</p>
          </div>
        </div>

        {/* Section Principale Grid */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex items-center gap-4">
            <div className="bg-orange-100 rounded-xl p-4 text-[#F36F24]">
              <Zap className="w-10 h-10" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-bold text-slate-800">
                  {activeSubscription?.plan?.name ?? "Pack Premium"}
                </h3>
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
                  Actif
                </span>
              </div>
              <p className="text-slate-500 text-sm mt-1">Idéal pour booster votre visibilité et gérer plus d'annonces.</p>
              
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4 text-xs font-medium text-slate-600">
                <span className="flex items-center gap-1">✓ Annonces illimitées</span>
                <span className="flex items-center gap-1">✓ Visibilité premium</span>
                <span className="flex items-center gap-1">✓ Support prioritaire</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:items-end gap-4 border-t md:border-t-0 pt-6 md:pt-0 border-slate-100">
            <div className="md:text-right">
              <p className="text-slate-500 text-sm">Valide jusqu'au</p>
              <div className="flex items-center md:justify-end gap-2 text-xl font-bold text-slate-800 mt-1">
                <Calendar className="w-5 h-5 text-slate-400" />
                {formatDate(activeSubscription?.ends_at)}
              </div>
              <p className="text-slate-400 text-xs mt-0.5">(Encore {remainingDays} jours)</p>
            </div>

            <div className="flex gap-3 w-full md:w-auto">
              <button 
                onClick={() => setShowPricing(true)}
                className="flex-1 md:flex-none px-5 py-2.5 bg-[#F36F24] hover:bg-orange-600 text-white rounded-xl text-sm font-semibold shadow-sm transition-colors"
              >
                Renouveler
              </button>
              <button 
                onClick={() => setShowPricing(true)}
                className="flex-1 md:flex-none px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-sm font-semibold transition-colors"
              >
                Changer de plan
              </button>
            </div>
          </div>
        </div>

        {/* Grid des statistiques rapides et détails */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Details */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
            <h4 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Détails de l'abonnement</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">Plan</span><span className="font-semibold text-slate-800">{activeSubscription?.plan?.name}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Date d'activation</span><span className="font-semibold text-slate-800">{formatDate(activeSubscription?.starts_at)}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Date d'expiration</span><span className="font-semibold text-slate-800">{formatDate(activeSubscription?.ends_at)}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Méthode de paiement</span><span className="font-semibold text-slate-800">Virement bancaire</span></div>
              <div className="flex justify-between items-center"><span className="text-slate-500">Statut</span><span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-0.5 rounded-full">Actif</span></div>
            </div>
          </div>

          {/* Historique */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h4 className="text-lg font-bold text-slate-800">Historique des paiements</h4>
              <button className="text-[#F36F24] hover:text-orange-600 text-xs font-semibold">Voir tout</button>
            </div>
            
            <div className="flex justify-between items-center bg-slate-50/50 border border-slate-100 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-100 text-emerald-600 rounded-full p-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Paiement Pack {activeSubscription?.plan?.name}</p>
                  <p className="text-xs text-slate-400">Virement bancaire • {formatDate(activeSubscription?.starts_at)}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-emerald-600 font-bold text-sm">
                  {activeSubscription?.plan?.price ?? 0} MAD
                </span>
                <button className="text-slate-400 hover:text-slate-600">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Besoin de plus */}
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
          <div>
            <h4 className="text-base font-bold text-amber-900">Besoin de plus ?</h4>
            <p className="text-amber-700 text-sm mt-0.5">Passez à un pack supérieur et débloquez encore plus de fonctionnalités.</p>
          </div>
          <button 
            onClick={() => setShowPricing(true)}
            className="w-full sm:w-auto bg-[#F36F24] hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors shrink-0"
          >
            Découvrir les packs
          </button>
        </div>

      </div>

      <ModalLayout isOpen={showPricing} setIsOpen={setShowPricing}>
        <div className="p-4 lg:p-12 bg-white rounded-xl max-h-[95vh] overflow-y-auto mx-4">
          <PricingPopUp onClose={() => setShowPricing(false)} />
        </div>
      </ModalLayout>
    </div>
  );
};

export default UserSubscriptionManagements;