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
import getLocalized from '../utils/getLocalized';

const AnnonceDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const isNumeric = /^\d+$/.test(id || "");

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

  const annonce = annonceById || annonceBySlug;
  const isLoading = isLoadingById || isLoadingBySlug;
  const error = errorById || errorBySlug;
  const [selectedImageIndex, setSelectedImageIndex] = useState(1);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);

  useEffect(() => {
    if (annonce && annonce.images && annonce.images.length > 1) {
      setSelectedImageIndex(0);
    }
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
          <p className="text-gray-600">{t("annonce_details.loading")}...</p>
        </div>
      </div>
    );
  }

  if (error || !annonce) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t("annonce_details.error_loading")}
          </h2>
          <button
            onClick={() => navigate("/annonces")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t("annonce_details.back_to_ads")}
          </button>
        </div>
      </div>
    );
  }

  const handleGoBack = () => navigate(-1);
  const handleAddToFavorites = () => console.log("Ajouter aux favoris:", annonce.id);

  const handleShare = () => {
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
      navigator.clipboard.writeText(shareUrl);
    }
  };

  const annonceCategory = getLocalized(annonce?.subcategory?.category, 'label') || getLocalized(annonce?.subcategory, 'label') || annonce?.subcategory?.category?.label;
  const annonceCity = getLocalized(annonce?.city, 'label') || annonce?.location;
  const seoTitleParts = [annonce.title, annonceCategory, annonceCity].filter(Boolean);
  const seoTitle = `${seoTitleParts.join(" - ")} - MarocAdsZone`;
  const seoDescription = annonce.description || `${annonce.title} ${t("annonce_details.in")} ${annonceCity || "Maroc"}. ${t("annonce_details.view_on")} MarocAdsZone.`;
  const seoImage = annonce.image_urls?.[0] || annonce.images?.[0]?.url;
  const seoPath = annonce.slug ? `/annonces/${annonce.slug}` : `/annonces/${annonce.id}`;

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? "rtl" : ""}`}>
      <SEOHead title={seoTitle} description={seoDescription} path={seoPath} image={seoImage} />

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between h-16 ${isRTL ? "flex-row-reverse" : ""}`}>
            <button
              onClick={handleGoBack}
              className={`flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}
            >
              <FiChevronLeft className={`h-5 w-5 ${isRTL ? "rotate-180" : ""}`} />
              <span>{t("annonce_details.back")}</span>
            </button>

            <div className={`flex items-center space-x-4 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
              <button onClick={handleShare} className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full">
                <FiShare2 className="h-5 w-5" />
              </button>
              <button onClick={handleAddToFavorites} className="p-2 text-gray-600 hover:text-red-500 hover:bg-gray-100 rounded-full">
                <FiHeart className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 ${isRTL ? "lg:flex-row-reverse" : ""}`}>
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                {annonce?.image_urls && annonce?.image_urls.length > 0 ? (
                  <img
                    src={getImageUrlWithFallbacks(annonce?.image_urls?.[selectedImageIndex])}
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
                    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              {annonce.image_urls && annonce.image_urls.length > 1 && (
                <div className={`p-4 flex space-x-2 overflow-x-auto ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
                  {annonce.image_urls.slice(0).map((image, index) => (
                    <img
                      key={index}
                      src={getImageUrlWithFallbacks(image)}
                      alt={`${annonce.title} ${index + 2}`}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-20 h-20 object-cover rounded-lg flex-shrink-0 cursor-pointer transition-all duration-200 ${
                        index === selectedImageIndex
                          ? "ring-2 ring-blue-500 ring-offset-2 opacity-100"
                          : "hover:opacity-80 opacity-70"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Main Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className={`flex items-start justify-between mb-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                <div>
                  <h1 className={`text-3xl font-bold text-gray-900 mb-2 ${isRTL ? "text-right" : "text-left"}`}>
                    {annonce?.title}
                  </h1>
                  <div className={`flex items-center space-x-4 text-sm text-gray-600 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
                    <div className={`flex items-center space-x-1 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
                      <FiMapPin className="h-4 w-4" />
                      <span>{getLocalized(annonce.city, 'label') || annonce?.location}</span>
                    </div>
                    <div className={`flex items-center space-x-1 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
                      <FiClock className="h-4 w-4" />
                      <span>{formatTimeAgoFr(annonce.created_at)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="border-t pt-6">
                <h2 className={`text-xl font-semibold text-gray-900 mb-4 ${isRTL ? "text-right" : "text-left"}`}>
                  {t("annonce_details.description")}
                </h2>
                <div className={`prose prose-blue max-w-none ${isRTL ? "text-right" : "text-left"}`}>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {annonce.description}
                  </p>
                </div>
              </div>

              {/* Additional Details */}
              {annonce?.subcategory && (
                <div className="border-t pt-6 mt-6">
                  <h3 className={`text-lg font-semibold text-gray-900 mb-4 ${isRTL ? "text-right" : "text-left"}`}>
                    {t("annonce_details.details")}
                  </h3>
                  <div className={`grid grid-cols-2 gap-4 ${isRTL ? "text-right" : "text-left"}`}>
                    <div>
                      <span className="font-medium text-gray-900">{t("annonce_details.category")}:</span>
                      <span className="ml-2 text-gray-700">{getLocalized(annonce?.subcategory?.category, 'label') || annonce?.subcategory?.category?.label}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">{t("annonce_details.subcategory")}:</span>
                      <span className="ml-2 text-gray-700">{getLocalized(annonce.subcategory, 'label') || annonce.subcategory.label}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h3 className={`text-xl font-semibold text-gray-900 mb-4 ${isRTL ? "text-right" : "text-left"}`}>
                {t("annonce_details.contact_seller")}
              </h3>

              {/* Seller Information */}
              <div className={`flex items-center space-x-3 mb-6 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">
                    {annonce.user?.first_name ? annonce.user.first_name.charAt(0).toUpperCase() : "U"}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {annonce.user?.first_name && annonce.user?.last_name
                      ? `${annonce.user.first_name} ${annonce.user.last_name}`
                      : t("annonce_details.user")}
                  </div>
                  <div className="text-sm text-gray-600">
                    {t("annonce_details.member_since")} {new Date(annonce.created_at).getFullYear()}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                {annonce.phone_number && (
                  <div className={`flex items-center space-x-3 p-3 bg-blue-50 rounded-lg ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
                    <div className="flex-shrink-0">
                      <FiPhone className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700 mb-2">{t("annonce_details.phone_label")}</p>
                      {!showPhoneNumber ? (
                        <button
                          onClick={() => setShowPhoneNumber(true)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                        >
                          {t("annonce_details.show_number")}
                        </button>
                      ) : (
                        <p className="text-blue-600 font-semibold">
                          {annonce.formatted_phone_number || annonce.phone_number}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="mt-6">
                <button
                  onClick={handleShare}
                  className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                >
                  <FiShare2 className="h-4 w-4" />
                  <span className="text-sm">{t("annonce_details.share")}</span>
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