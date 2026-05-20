import React, { useState } from "react";
import {
  FiBriefcase,
  FiChevronLeft,
  FiClock,
  FiExternalLink,
  FiHome,
  FiMapPin,
  FiShare2,
} from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb, { BreadcrumbItem } from "../components/ui/Breadcrumb";
import { useGetJobOffer } from "../services/api/fetchService";
import { formatRelativeTime, formatRelativeUpdateTime } from "../utils/helpers";
import getLocalized from '../utils/getLocalized'

const JobOfferDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [shareToast, setShareToast] = useState<string | null>(null);
  const {
    data: jobOfferResponse,
    isLoading,
    isError,
  } = useGetJobOffer(id ? id : "", !!id);
  const jobOffer = jobOfferResponse?.data;

  // Placeholder image SVG
  const PLACEHOLDER_IMAGE =
    'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f3f4f6"/><text x="200" y="150" text-anchor="middle" font-family="Arial" font-size="16" fill="%236b7280">Image non disponible</text></svg>';
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb skeleton */}
          <div className="mb-6">
            <div className="flex items-center space-x-2">
              <div className="animate-pulse h-4 bg-gray-200 rounded w-16"></div>
              <div className="w-4 h-4 text-gray-300">›</div>
              <div className="animate-pulse h-4 bg-gray-200 rounded w-24"></div>
              <div className="w-4 h-4 text-gray-300">›</div>
              <div className="animate-pulse h-4 bg-gray-300 rounded w-32"></div>
            </div>
          </div>

          {/* Header skeleton */}
          <div className="flex items-center justify-between mb-8">
            <div className="animate-pulse">
              <div className="h-10 bg-gray-200 rounded-lg w-20"></div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="animate-pulse w-12 h-12 bg-gray-200 rounded-lg"></div>
              <div className="animate-pulse w-12 h-12 bg-gray-200 rounded-lg"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Skeleton */}
            <div className="lg:col-span-2">
              {/* Image skeleton */}
              <div className="animate-pulse bg-white rounded-2xl shadow-lg overflow-hidden mb-8 border border-gray-100">
                <div className="w-full h-64 md:h-96 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
              </div>

              {/* Content skeleton */}
              <div className="animate-pulse bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
                <div className="space-y-6">
                  <div className="h-10 bg-gray-300 rounded-lg w-3/4"></div>
                  <div className="h-6 bg-gray-200 rounded w-24"></div>
                  <div className="flex gap-6">
                    <div className="h-5 bg-gray-200 rounded w-32"></div>
                    <div className="h-5 bg-gray-200 rounded w-40"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                    <div className="h-32 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar skeleton */}
            <div className="lg:col-span-1">
              <div className="animate-pulse bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="h-6 bg-gray-300 rounded w-1/2 mb-6"></div>
                <div className="space-y-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-xl">
                      <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                      <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                    </div>
                  ))}
                  <div className="h-12 bg-gray-300 rounded-xl w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading indicator overlay */}
        <div className="fixed bottom-8 right-8 bg-white p-4 rounded-2xl shadow-xl border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <div className="text-gray-700 font-medium">
              Chargement de l'offre d'emploi {id}...
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (isError || !jobOffer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-lg mx-auto text-center">
          <div className="text-red-500 text-6xl mb-6">⚠️</div>
          <h2 className="text-2xl font-bold text-red-800 mb-4">
            {isError ? "Erreur de chargement" : "Offre d'emploi non trouvée"}
          </h2>
          <p className="text-red-600 mb-6 leading-relaxed">
            {isError
              ? "Une erreur s'est produite lors du chargement de l'offre d'emploi. Vérifiez votre connexion et réessayez."
              : `L'offre d'emploi avec l'ID ${id} n'existe pas ou a été supprimée.`}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate("/emploi")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              🔙 Retour aux offres d'emploi
            </button>

            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200"
            >
              🔄 Recharger
            </button>
          </div>

          <div className="mt-6 text-sm text-red-500">
            <details className="cursor-pointer">
              <summary className="hover:text-red-700">
                Informations techniques
              </summary>
              <div className="mt-2 text-xs bg-red-100 p-3 rounded border text-left">
                <p>• ID de l'offre : {id}</p>
                <p>• Status : {isError ? "Erreur de réseau" : "Non trouvée"}</p>
                <p>• Vérifiez que l'URL est correcte</p>
              </div>
            </details>
          </div>
        </div>
      </div>
    );
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: jobOffer.title,
          text: jobOffer.description,
          url: window.location.href,
        })
        .then(() => {
          setShareToast("Lien partagé avec succès!");
          setTimeout(() => setShareToast(null), 3000);
        })
        .catch(() => {
          setShareToast("Erreur lors du partage");
          setTimeout(() => setShareToast(null), 3000);
        });
    } else {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => {
          setShareToast("Lien copié dans le presse-papiers!");
          setTimeout(() => setShareToast(null), 3000);
        })
        .catch(() => {
          setShareToast("Erreur lors de la copie");
          setTimeout(() => setShareToast(null), 3000);
        });
    }
  };
  const handleApplyClick = () => {
    if (jobOffer.redirect_to) {
      window.open(jobOffer.redirect_to, "_blank", "noopener,noreferrer");
    }
  };

  // Generate breadcrumb items
  const getBreadcrumbItems = (): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [
      {
        label: "Accueil",
        href: "/",
        icon: <FiHome className="w-4 h-4" />,
      },
      {
        label: "Offres d'Emploi",
        href: "/emploi",
        icon: <FiBriefcase className="w-4 h-4" />,
      },
    ];

    if (jobOffer) {
      items.push({
        label:
          jobOffer.title.length > 50
            ? jobOffer.title.substring(0, 50) + "..."
            : jobOffer.title,
      });
    }

    return items;
  };
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.log("🖼️ Image failed to load, using placeholder");
    const target = e.target as HTMLImageElement;
    target.src = PLACEHOLDER_IMAGE;
  };

  const handleImageLoad = () => {
    console.log("🖼️ Image loaded successfully");
  };

  const getImageUrl = () => {
    if (
      jobOffer.images &&
      jobOffer.images.length > 0 &&
      jobOffer.images[0].url
    ) {
      let imageUrl = jobOffer.images[0].url;

      // Fix the duplicate domain issue: http://127.0.0.1:8000/127.0.0.1/storage/... -> http://127.0.0.1:8000/storage/...
      imageUrl = imageUrl.replace(/https?:\/\/([^/]+)\/\1\//, "http://$1/");

      console.log("🖼️ Original URL:", jobOffer.images[0].url);
      console.log("🖼️ Corrected URL:", imageUrl);
      return imageUrl;
    }

    console.log("🖼️ No image found, using placeholder");
    return PLACEHOLDER_IMAGE;
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Share Toast notification */}
      {shareToast && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in-down">
          <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">{shareToast}</span>
            <button
              onClick={() => setShareToast(null)}
              className="ml-2 text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>
        </div>
      )}
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb items={getBreadcrumbItems()} />
        </div>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleGoBack}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md"
          >
            <FiChevronLeft className="w-5 h-5 mr-1" />
            Retour
          </button>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleShare}
              className="p-3 text-gray-600 hover:text-blue-500 transition-colors bg-white rounded-lg shadow-sm hover:shadow-md"
              title="Partager"
            >
              <FiShare2 className="w-5 h-5" />
            </button>
          </div>
        </div>{" "}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 border border-gray-100">
              <div className="relative h-64 md:h-96">
                <img
                  src={getImageUrl()}
                  alt={jobOffer.title}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span
                    className={`text-white text-sm px-4 py-2 rounded-full font-medium shadow-lg backdrop-blur-sm ${
                      jobOffer.type === "private"
                        ? "bg-blue-500/90"
                        : "bg-green-500/90"
                    }`}
                  >
                    {jobOffer.type === "private"
                      ? "Secteur Privé"
                      : "Secteur Public"}
                  </span>
                </div>
              </div>
            </div>{" "}
            {/* Title and Info */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
              <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {jobOffer.title}
              </h1>

              {/* ID Badge */}
              <div className="mb-6">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  ID: #{jobOffer.id}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center">
                  <FiMapPin className="w-5 h-5 mr-2 text-blue-500" />
                  <span className="font-medium">
                    {getLocalized(jobOffer.city, 'label') || jobOffer.city?.name || "N/A"}
                  </span>
                </div>{" "}
                <div
                  className="flex items-center"
                  title={new Date(jobOffer.created_at).toLocaleDateString(
                    "fr-FR",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                >
                  <FiClock className="w-5 h-5 mr-2 text-green-500" />
                  <span className="font-medium">
                    {formatRelativeTime(jobOffer.created_at)}
                  </span>
                </div>{" "}
                {jobOffer.updated_at !== jobOffer.created_at && (
                  <div
                    className="flex items-center"
                    title={new Date(jobOffer.updated_at).toLocaleDateString(
                      "fr-FR",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  >
                    <FiClock className="w-5 h-5 mr-2 text-orange-500" />
                    <span className="font-medium">
                      {formatRelativeUpdateTime(jobOffer.updated_at)}
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-3"></span>
                  Description du poste
                </h2>
                <div className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap bg-gray-50 p-6 rounded-xl border-l-4 border-blue-500">
                  {jobOffer.description}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-8 border border-gray-100">
              {" "}
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-3"></span>
                Informations
              </h3>
              <div className="space-y-6 mb-8">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    Type
                  </span>
                  <p className="text-lg font-medium text-gray-900 mt-1">
                    {jobOffer.type === "private"
                      ? "🏢 Secteur Privé"
                      : "🏛️ Secteur Public"}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    Localisation
                  </span>
                  <p className="text-lg font-medium text-gray-900 mt-1 flex items-center">
                    <FiMapPin className="w-4 h-4 mr-2 text-blue-500" />
                    {getLocalized(jobOffer.city, 'label') || jobOffer.city?.name || "N/A"}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    Date de publication
                  </span>
                  <p
                    className="text-lg font-medium text-gray-900 mt-1 flex items-center"
                    title={new Date(jobOffer.created_at).toLocaleDateString(
                      "fr-FR",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  >
                    <FiClock className="w-4 h-4 mr-2 text-green-500" />
                    {formatRelativeTime(jobOffer.created_at)}
                  </p>
                </div>{" "}
                {jobOffer.updated_at !== jobOffer.created_at && (
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      Dernière mise à jour
                    </span>
                    <p
                      className="text-lg font-medium text-gray-900 mt-1 flex items-center"
                      title={new Date(jobOffer.updated_at).toLocaleDateString(
                        "fr-FR",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    >
                      <FiClock className="w-4 h-4 mr-2 text-orange-500" />
                      {formatRelativeUpdateTime(jobOffer.updated_at)}
                    </p>
                  </div>
                )}
                {jobOffer.redirect_to && (
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                      Lien de candidature
                    </span>
                    <div className="mt-2">
                      <a
                        href={jobOffer.redirect_to}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline break-all text-sm"
                      >
                        {jobOffer.redirect_to}
                      </a>
                    </div>
                  </div>
                )}
              </div>
              {/* Apply Button */}
              {jobOffer.redirect_to && (
                <button
                  onClick={handleApplyClick}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center text-lg"
                >
                  <FiExternalLink className="w-5 h-5 mr-2" />
                  Postuler à cette offre
                </button>
              )}
              {!jobOffer.redirect_to && (
                <div className="w-full bg-gray-100 text-gray-500 font-medium py-4 px-6 rounded-xl text-center">
                  Lien de candidature non disponible
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobOfferDetailsPage;
