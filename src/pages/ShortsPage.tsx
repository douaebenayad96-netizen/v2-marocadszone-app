import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import PageHeader from "../components/layouts/PageHeader";
import SearchInput from "../components/reviews/SearchInput";
import SEOHead from "../components/seo/SEOHead";
import ShortCard from "../components/shorts/ShortCard";
import Pagination from "../components/ui/Pagination";
import { useVideos } from "../services/api/fetchAnnonce";

const ShortsPage = () => {
  const { t, i18n } = useTranslation("shorts");
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const { data: videosData, isLoading, error } = useVideos(page);

  // Forcer le re-rendu quand la langue change
  const [, forceUpdate] = useState(0);
  useEffect(() => {
    const handleLangChange = () => forceUpdate(prev => prev + 1);
    i18n.on("languageChanged", handleLangChange);
    return () => i18n.off("languageChanged", handleLangChange);
  }, [i18n]);

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      prev.set("page", newPage.toString());
      return prev;
    });
    setPage(newPage);
  };

  // Obtenir le nombre de vidéos
  const getVideosCountText = () => {
    const total = videosData?.total ?? 0;
    if (total > 0) {
      return `${total} ${t("page.videos_count")}`;
    }
    return t("page.videos_count");
  };

  return (
    <div className="pt-nav min-h-[calc(100vh-0px)]">
      <SEOHead
        title={t("page.title")}
        description={t("page.description")}
        path="/videos"
      />
      
      <div className="app-container page-py page-pt-sm">
        <div>
          {/* Page Header */}
          <PageHeader>
            <div>
              <h1 className="title-h1">
                {t("page.h1")}
              </h1>
              <div>
                <span className="text-base text-gray-400">
                  {getVideosCountText()}
                </span>
              </div>
            </div>
            
            {/* Search Input */}
            <div className="mt-5">
              <SearchInput
                placeholder={t("page.search_placeholder")}
                btnText={t("page.search_button")}
                callback={(value) => {
                  setSearch(value);
                  setSearchParams({ search: value });
                }}
                valueD={search}
              />
            </div>
          </PageHeader>
        </div>

        <div className="mt-5">
          {/* Loading State */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {Array.from({ length: 10 }).map((_, index) => (
                <ShortCard.Loading key={index} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500">
                {t("page.loading_error")}
              </p>
            </div>
          ) : videosData?.data && videosData.data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {videosData.data.map((video, index) => (
                <ShortCard key={video.id || index} video={video} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">
                {t("page.no_videos")}
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-8 bg-orange-50 rounded-lg p-6">
          <h3 className="text-center text-sm font-semibold text-gray-700 mb-4 flex items-center justify-center gap-2">
            <span className="text-orange-600 px-3 py-1 rounded-full text-xs">
              {t("page.shorts_label")}
            </span>
          </h3>
          <Pagination
            currentPage={Number(page)}
            totalPages={videosData?.last_page ?? 0}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ShortsPage;