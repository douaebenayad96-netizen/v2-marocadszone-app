"use client";

import { useState } from "react";
import {
  FaBuilding,
  FaGlobe,
  FaMapMarkerAlt,
  FaPhone,
  FaPlay,
} from "react-icons/fa";
import { RiAdvertisementLine, RiVideoLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { PrestataireCardV2 } from "../components/annonce/PrestataireCard";
import Banner728X90 from "../components/banners/Banner728X90";
import PageLoader from "../components/common/PageLoader";
import { useGetCompany } from "../services/api/fetchCompany";
import { useAuthStore } from "../services/store/authStore";

function NativeVideoModal({
  url,
  onClose,
}: {
  url: string;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-8"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-black rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 z-10 rounded-full bg-white/20 p-2 text-white hover:bg-white/40 transition backdrop-blur-sm"
          onClick={onClose}
          aria-label={t("company_profile.close")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="relative w-full pt-[56.25%]">
          <video
            src={url}
            controls
            autoPlay
            className="absolute top-0 left-0 w-full h-full"
            preload="metadata"
            playsInline
          />
        </div>
      </div>
    </div>
  );
}

const CompanyProfilePage = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const { slug } = useParams<{ slug: string }>();
  const token = useAuthStore((state) => state.token);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const { data: company, isLoading, error } = useGetCompany(slug as string);

  const companyAnnouncements = company?.announcements ?? [];

  const announcements = companyAnnouncements.filter(
    (announcement) => announcement?.announcement_type !== "short"
  );

  const announcementsVideo = companyAnnouncements.filter(
    (announcement) => announcement?.announcement_type === "short"
  );

  const announcementsCount = announcements.length;

  // No Token: Show Login Prompt
  if (!token) {
    return (
      <div className="app-container pt-nav min-h-screen page-pb">
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold text-primary-blue mb-4">
            {t("company_profile.login_required")}
          </h2>
          <p className="text-gray-600 mb-6">
            {t("company_profile.login_required_desc")}
          </p>
          <a href="/login" className="btn-primary inline-block">
            {t("company_profile.login")}
          </a>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="app-container pt-nav min-h-screen page-pb flex items-center justify-center">
        <PageLoader />
      </div>
    );
  }

  if (error || !company) {
    let errorMessage = t("company_profile.error_general");

    if (error instanceof Error) {
      if (error.message.includes("404") || error.message.includes("not found")) {
        errorMessage = t("company_profile.error_not_found");
      } else if (error.message.includes("401") || error.message.includes("Unauthorized")) {
        errorMessage = t("company_profile.error_unauthorized");
      }
    }

    return (
      <div className="app-container pt-nav min-h-screen page-pb">
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            {t("company_profile.error_title")}
          </h2>
          <p className="text-gray-600">{errorMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`app-container pt-nav min-h-screen page-pb bg-gradient-to-b from-slate-50 to-white ${isRTL ? "rtl" : ""}`}>
      {/* Company Header */}
      <section className="py-12 md:py-16 border-b border-slate-200">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="w-40 h-40 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-white flex items-center justify-center">
              {company.logo ? (
                <img
                  src={company.logo}
                  alt={`${company.name} ${t("company_profile.logo_alt")}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaBuilding className="text-6xl text-slate-300" />
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3 text-balance">
              {company.name}
            </h1>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed max-w-2xl text-pretty">
              {company.description}
            </p>

            {/* Contact Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {company.address && (
                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-100">
                  <FaMapMarkerAlt className="text-primary-orange mt-1 flex-shrink-0" />
                  <span className="text-slate-700">{company.address}</span>
                </div>
              )}
              {company.phone_number && (
                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-100">
                  <FaPhone className="text-primary-orange mt-1 flex-shrink-0" />
                  <span className="text-slate-700">{company.phone_number}</span>
                </div>
              )}
              {Array.isArray(company.url) && company.url.length > 0 && (
                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-100 sm:col-span-2">
                  <FaGlobe className="text-primary-orange mt-1 flex-shrink-0" />
                  <div className="flex flex-col gap-1">
                    {company.url.map((url: string, index: number) => (
                      <a
                        key={index}
                        href={url.startsWith("http") ? url : `https://${url}`}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-slate-700 hover:text-primary-orange transition-colors underline"
                      >
                        {url.replace(/^https?:\/\//, "")}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Middle Banner */}
      <div className="flex justify-center py-8">
        <Banner728X90 />
      </div>

      {/* Video Section (Shorts) */}
      {announcementsVideo.length > 0 && (
        <section className="py-12 md:py-16 border-b border-slate-200">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 flex items-center gap-3">
              <RiVideoLine className="text-primary-orange" />
              <span>{t("company_profile.our_videos")} ({announcementsVideo.length})</span>
            </h2>
            <p className="text-slate-600 text-lg">
              {t("company_profile.videos_description")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {announcementsVideo.map((video: any, index: number) => (
              <div
                key={video.id || index}
                className="group relative rounded-xl overflow-hidden bg-slate-900 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => setSelectedVideo(video.video_url)}
              >
                <div className="aspect-video bg-slate-800 flex items-center justify-center relative overflow-hidden">
                  {video.thumbnail_url ? (
                    <img
                      src={video.thumbnail_url}
                      alt={video.title || t("company_profile.video_title")}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                      <RiVideoLine className="text-4xl text-slate-500" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary-orange flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FaPlay className="text-white ml-1" size={24} />
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-slate-100 group-hover:text-primary-orange transition-colors line-clamp-2">
                    {video.title || t("company_profile.video_untitled")}
                  </h3>
                  {video.description && (
                    <p className="text-sm text-slate-400 mt-1 line-clamp-2">
                      {video.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {selectedVideo && (
            <NativeVideoModal url={selectedVideo} onClose={() => setSelectedVideo(null)} />
          )}
        </section>
      )}

      {/* Announcements Section */}
      <section className="py-12 md:py-16 border-b border-slate-200">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 flex items-center gap-3">
            <RiAdvertisementLine className="text-primary-orange" />
            <span>{t("company_profile.our_ads")} ({announcementsCount})</span>
          </h2>
          <p className="text-slate-600 text-lg">
            {t("company_profile.ads_description")}
          </p>
        </div>

        {announcements.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mt-8">
            {announcements.map((announcement) => (
              <PrestataireCardV2 key={announcement.id} annonce={announcement} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-100 rounded-xl">
            <RiAdvertisementLine className="text-5xl text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg">
              {t("company_profile.no_ads")}
            </p>
          </div>
        )}
      </section>

      {/* Bottom Banner */}
      <div className="flex justify-center py-8">
        <Banner728X90 />
      </div>
    </div>
  );
};

export default CompanyProfilePage;