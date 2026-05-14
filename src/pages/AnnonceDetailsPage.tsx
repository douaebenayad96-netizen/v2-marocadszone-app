import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FiChevronLeft,
  FiClock,
  FiHeart,
  FiMapPin,
  FiPhone,
  FiShare2,
} from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import SEOHead from "../components/seo/SEOHead";
import { useAnnonceById, useAnnonceBySlug } from "../services/api/fetchAnnonce";
import { getImageUrlWithFallbacks } from "../utils/imageUtils";
import { formatTimeAgoFr } from "../utils/timeAgo";


const AnnonceDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Check if the id is numeric or a slug
  const isNumeric = /^\d+$/.test(id || "");

  // Use the appropriate hook based on whether we have a numeric ID or a slug
  const {
    data: annonceById,
    isLoading: isLoadingById,
    error: errorById,
  } = useAnnonceById(isNumeric && id ? parseInt(id) : 0, isNumeric && !!id);

  const {
    data: annonceBySlug,
    isLoading: isLoadingBySlug,
    error: errorBySlug,
  } = useAnnonceBySlug(isNumeric ? "" : id || "", !isNumeric && !!id);

  // Combine the results
  const annonce = annonceById || annonceBySlug;
  const isLoading = isLoadingById || isLoadingBySlug;
  const error = errorById || errorBySlug;
  // State for managing the selected image in the gallery
  const [selectedImageIndex, setSelectedImageIndex] = useState(1); // Start with images[1] (first real image)
  // State for showing phone number
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);

  // Reset selected image when announcement changes
  useEffect(() => {
    if (annonce && annonce.images && annonce.images.length > 1) {
      setSelectedImageIndex(0);
    }
    // Debug: Log the annonce data to see image URLs
    if (annonce) {
      console.log("🖼️ Annonce data:", annonce);
      console.log("🖼️ Images array:", annonce.images);
      if (annonce.images && annonce.images.length > 0) {
        annonce.images.forEach((img, idx) => {
          console.log(`🖼️ Image ${idx}:`, img);
        });
      }
    }
  }, [annonce]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">{t("loading")}...</p>
        </div>
      </div>
    );
  }

  if (error || !annonce) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t("error_loading_annonce")}
          </h2>
          <button
            onClick={() => navigate("/annonces")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t("back_to_annonces")}
          </button>
        </div>
      </div>
    );
  }
  const handleGoBack = () => {
    navigate(-1);
  };
  const handleAddToFavorites = () => {
    // Logique pour ajouter aux favoris
    console.log("Ajouter aux favoris:", annonce.id);
  };

  const handleShare = () => {
    // Use slug in the URL if available
    const shareUrl = annonce.slug
      ? `${window.location.origin}/annonces/${annonce.slug}`
      : window.location.href;

    if (navigator.share) {
      navigator.share({
        title: annonce.title,
        text: annonce.description,
        url: shareUrl,
      });
    } else {
      // Fallback pour copier l'URL
      navigator.clipboard.writeText(shareUrl);
    }
  };
  const annonceCategory = annonce?.subcategory?.category?.label;
  const annonceCity = annonce?.city?.label || annonce?.location;
  const seoTitleParts = [
    annonce.title,
    annonceCategory,
    annonceCity,
  ].filter(Boolean);
  const seoTitle = `${seoTitleParts.join(" - ")} - MarocAdsZone`;
  const seoDescription =
    annonce.description ||
    `${annonce.title} à ${annonceCity || "Maroc"}. Consultez l'annonce sur MarocAdsZone.`;
  const seoImage = annonce.image_urls?.[0] || annonce.images?.[0]?.url;
  const seoPath = annonce.slug
    ? `/annonces/${annonce.slug}`
    : `/annonces/${annonce.id}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        path={seoPath}
        image={seoImage}
      />

      {/* Header avec bouton retour */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={handleGoBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <FiChevronLeft className="h-5 w-5" />
              <span>{t("back")}</span>
            </button>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleShare}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FiShare2 className="h-5 w-5" />
              </button>
              <button
                onClick={handleAddToFavorites}
                className="p-2 text-gray-600 hover:text-red-500 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FiHeart className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {" "}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {" "}
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                {annonce?.image_urls && annonce?.image_urls.length > 0 ? (
                  <img
                    src={getImageUrlWithFallbacks(
                      annonce?.image_urls?.[selectedImageIndex]
                    )}
                    alt={annonce.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (!target.src.includes("no-image.png")) {
                        target.src = "/src/assets/img/no-image.png";
                      }
                    }}
                  />
                ) : (
                  <div className="text-gray-400">
                    <svg
                      className="w-16 h-16"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>{" "}
              {annonce.image_urls && annonce.image_urls.length > 1 && (
                <div className="p-4 flex space-x-2 overflow-x-auto">
                  {annonce.image_urls.slice(0).map((image, index) => {
                    const imageIndex = index;
                    const isSelected = imageIndex === selectedImageIndex;
                    return (
                      <img
                        key={index}
                        src={getImageUrlWithFallbacks(image)}
                        alt={`${annonce.title} ${index + 2}`}
                        onClick={() => setSelectedImageIndex(imageIndex)}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (!target.src.includes("no-image.png")) {
                            target.src = "/src/assets/img/no-image.png";
                          }
                        }}
                        className={`w-20 h-20 object-cover rounded-lg flex-shrink-0 cursor-pointer transition-all duration-200 ${
                          isSelected
                            ? "ring-2 ring-blue-500 ring-offset-2 opacity-100"
                            : "hover:opacity-80 opacity-70"
                        }`}
                      />
                    );
                  })}
                </div>
              )}
            </div>
            {/* Informations principales */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {annonce?.title}
                  </h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <FiMapPin className="h-4 w-4" />
                      <span>{annonce.city?.label || annonce?.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FiClock className="h-4 w-4" />
                      <span>
                        {formatTimeAgoFr(annonce.created_at)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Description */}
              <div className="border-t pt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {t("description")}
                </h2>
                <div className="prose prose-blue max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {annonce.description}
                  </p>
                </div>
              </div>{" "}
              {/* Détails supplémentaires */}
              {annonce?.subcategory && (
                <div className="border-t pt-6 mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t("details")}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="font-medium text-gray-900">
                        {t("category")}:
                      </span>
                      <span className="ml-2 text-gray-700">
                        {annonce?.subcategory?.category?.label}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">
                        {t("subcategory")}:
                      </span>
                      <span className="ml-2 text-gray-700">
                        {annonce.subcategory.label}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar contact */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t("contact_seller")}
              </h3>
              {/* Informations du vendeur */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">
                    {annonce.user?.first_name
                      ? annonce.user.first_name.charAt(0).toUpperCase()
                      : "U"}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {annonce.user?.first_name && annonce.user?.last_name
                      ? `${annonce.user.first_name} ${annonce.user.last_name}`
                      : "Utilisateur"}
                  </div>
                  <div className="text-sm text-gray-600">
                    {t("member_since")}{" "}
                    {new Date(annonce.created_at).getFullYear()}
                  </div>
                </div>{" "}
              </div>

              {/* Informations de contact */}
              <div className="space-y-4">
                {/* Numéro de téléphone */}
                {annonce.phone_number && (
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="flex-shrink-0">
                      <FiPhone className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Téléphone
                      </p>
                      {!showPhoneNumber ? (
                        <button
                          onClick={() => setShowPhoneNumber(true)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                          Afficher le numéro
                        </button>
                      ) : (
                        <p className="text-blue-600 font-semibold">
                          {annonce.formatted_phone_number ||
                            annonce.phone_number}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="mt-6 flex space-x-3">
                <button
                  onClick={handleShare}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                >
                  <FiShare2 className="h-4 w-4" />
                  <span className="text-sm">{t("share")}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnonceDetailsPage;
