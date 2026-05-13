import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import PageHeader from "../components/layouts/PageHeader";
import SearchInput from "../components/reviews/SearchInput";
import SEOHead from "../components/seo/SEOHead";
import ShortCard from "../components/shorts/ShortCard";
import Pagination from "../components/ui/Pagination";
import { useVideos } from "../services/api/fetchAnnonce";

const ShortsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const { t } = useTranslation();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const { data: videosData, isLoading, error } = useVideos(page);

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      prev.set("page", newPage.toString());
      return prev;
    });
    setPage(newPage);
  };
  return (
    <div className="pt-nav min-h-[calc(100vh-0px)]">
      <SEOHead
        title="Petites annonces vidéo au Maroc - MarocAdsZone"
        description="Trouvez et publiez des petites annonces vidéo au Maroc pour acheter, vendre ou louer : voitures, immobilier, mode..."
        path="/videos"
      />
      <div className="app-container page-py page-pt-sm">
        <div>
          {/* page header */}
          <PageHeader>
            {/* title */}

            <div>
              <h1 className="text-5xl text-primary-blue font-bold">Explorez toutes les annonces vidéos Maroc</h1>
              <div>
                <span className="text-base text-gray-400">
                  {videosData?.data && videosData.data.length > 0
                    ? `${videosData?.meta.total} vidéos disponibles`
                    : "Vidéos disponibles"}
                </span>
              </div>
            </div>
            {/* search input */}
            <div className="mt-5">
              <SearchInput
                placeholder="Rechercher une vidéo"
                btnText={t("rechercher")}
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
          {/* Videos grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {Array.from({ length: 10 }).map((_, index) => (
                <ShortCard.Loading key={index} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500">
                Erreur lors du chargement des vidéos
              </p>
            </div>
          ) : videosData?.data && videosData.data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {console.log(videosData.data)}
              {videosData.data.map((video, index) => (
                <ShortCard key={video.id || index} video={video} />
              ))}

              {/* {isFetchingNextPage && (
                <>
                  {Array.from({ length: 7 }).map((_, index) => (
                    <ShortCard.Loading key={index} />
                  ))}
                </>
              )}
              {/* Ref element to trigger infinite scroll */}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">
                Aucune vidéo disponible pour le moment
              </p>
            </div>
          )}
          {/* No pagination, only search */}
        </div>
        <div className="mt-8 bg-orange-50 rounded-lg p-6">
          <h3 className="text-center text-sm font-semibold text-gray-700 mb-4 flex items-center justify-center gap-2">
            <span className=" text-orange-600 px-3 py-1 rounded-full text-xs">
              Shorts
            </span>
          </h3>
          <Pagination
            currentPage={Number(page)}
            totalPages={videosData?.meta?.last_page}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ShortsPage;
