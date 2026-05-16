import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiBriefcase, FiFilter, FiMapPin, FiSearch } from "react-icons/fi";
import { RiLoader4Line } from "react-icons/ri";
import { useSearchParams } from "react-router-dom";

import Banner300X250 from "../components/banners/Banner300X250";
import Banner728X90 from "../components/banners/Banner728X90";
import Banner970X90 from "../components/banners/Banner970X90";
import JobOfferBlogCard from "../components/blog/BlogCard1";
import PageHeader from "../components/layouts/PageHeader";
import Pagination from "../components/ui/Pagination";
import SampleButton from "../components/ui/SampleButton";
import JobsSkeletonCard from "../components/ui/skeletons/JobsSkeletonCard";
import { useFetchCity } from "../services/api/fetchCity";
import { useGetJobOffers } from "../services/api/fetchService";
import { TJobOfferFilters } from "../services/types/jobOffer";
import SEOHead from "../components/seo/SEOHead"

const BlogsPage = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [filter, setFilter] = useState<TJobOfferFilters>({
    sort_by: "newest",
    per_page: 12,
  });
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [filterChangeToast, setFilterChangeToast] = useState<string | null>(
    null
  );

  const { data: jobOffersData, isLoading, isError } = useGetJobOffers(filter);

  // Fetch cities for the dropdown
  const { data: cities, isLoading: isLoadingCities } = useFetchCity();

  useEffect(() => {
    if (jobOffersData?.data?.pagination?.last_page) {
      setTotalPages(jobOffersData.data.pagination.last_page);
    }
  }, [jobOffersData]);

  // Initialize search input from URL
  useEffect(() => {
    const search = searchParams.get("search") || "";
    setSearchInput(search);
  }, [searchParams]);

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== (searchParams.get("search") || "")) {
        setIsSearching(true);
        setSearchParams((prev) => {
          if (searchInput.trim()) {
            prev.set("search", searchInput.trim());
          } else {
            prev.delete("search");
          }
          prev.set("page", "1");
          return prev;
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput, searchParams, setSearchParams]);

  // Reset searching state when data loads
  useEffect(() => {
    if (!isLoading) {
      setIsSearching(false);
    }
  }, [isLoading]);

  // Update filter when search params change
  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    const newFilter: TJobOfferFilters = {
      page: page,
      per_page: 12,
      sort_by:
        (params.sort_by as "newest" | "oldest" | "title_asc" | "title_desc") ||
        "newest",
    };

    if (params.search) newFilter.search = params.search;
    if (params.type) newFilter.type = params.type as "private" | "public";
    // Use ville parameter instead of city_id and city_name
    if (params.ville) newFilter.ville = params.ville;

    setFilter(newFilter);
  }, [searchParams, page]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      setSearchParams((prev) => {
        prev.set("page", (page + 1).toString());
        return prev;
      });
    }
  };

  const handleFilterChange = (
    key: keyof TJobOfferFilters,
    value: string | number | null
  ) => {
    setSearchParams((prev) => {
      if (value === null || value === undefined || value === "") {
        prev.delete(key);
        setFilterChangeToast(`Filtre "${key}" supprimé`);
      } else {
        prev.set(key, value.toString());
        setFilterChangeToast(`Filtre "${key}" appliqué`);
      }
      prev.set("page", "1");
      return prev;
    });

    setTimeout(() => setFilterChangeToast(null), 2000);
  };
  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      prev.set("page", newPage.toString());
      return prev;
    });
    setPage(newPage);
  };

  return (
    <div className="pt-nav">
      <SEOHead title="Offres et annonces d'emploi au Maroc - MarocAdsZone" description="Consultez les dernières offres et annonces d'emploi au Maroc. Trouvez un emploi ou publiez votre annonce d'emploi sur MarocAdsZone." path="/offres" />
      {/* Toast notification */}
      {filterChangeToast && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in-down">
          <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">{filterChangeToast}</span>
            <button
              onClick={() => setFilterChangeToast(null)}
              className="ml-2 text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="app-container page-py">
        <PageHeader>
          <h1 className="title-h1">Trouvez votre offre d'emploi au Maroc</h1>
          <p className="text-base text-gray-400">
            Voir toutes les offres d'emploi au Maroc
          </p>
        </PageHeader>

        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <FiFilter className="w-5 h-5 mr-2" />
              Filtres
            </h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
            >
              {showFilters ? "Masquer" : "Afficher"}
            </button>
          </div>

          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${
              showFilters ? "block" : "hidden lg:grid"
            }`}
          >
            {/* Search Filter */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recherche
              </label>
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Titre, description, mots-clés..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                {(isSearching || isLoading) && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secteur
              </label>
              <div className="relative">
                <FiBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={filter.type || ""}
                  onChange={(e) =>
                    handleFilterChange("type", e.target.value || null)
                  }
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
                >
                  <option value="">Tous les secteurs</option>
                  <option value="private">Secteur Privé</option>
                  <option value="public">Secteur Public</option>
                </select>
              </div>
            </div>

            {/* City Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Localisation
              </label>
              <div className="relative">
                <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={filter.city_id || ""}
                  onChange={(e) => {
                    const cityId = e.target.value
                      ? Number(e.target.value)
                      : null;
                    const cityName = cityId
  ? Array.isArray(cities)
    ? cities.find((city) => city.id === cityId)?.label || null
    : null
  : null;

                    setSearchParams((prev) => {
                      if (cityId && cityName) {
                        // Only use ville parameter with city name
                        prev.set("ville", cityName);
                        // Remove city_id and city_name parameters
                        prev.delete("city_id");
                        prev.delete("city_name");
                      } else {
                        prev.delete("ville");
                        prev.delete("city_id");
                        prev.delete("city_name");
                      }
                      prev.set("page", "1");
                      return prev;
                    });
                  }}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
                  disabled={isLoadingCities}
                >
                  <option value="">Toutes les villes</option>
                  {Array.isArray(cities) &&
  cities.map((city) => (
    <option key={city.id} value={city.id}>
      {city.label}
    </option>
  ))}
                </select>
              </div>
            </div>

            {/* Sort Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trier par
              </label>
              <select
                value={filter.sort_by || "newest"}
                onChange={(e) => handleFilterChange("sort_by", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
              >
                <option value="newest">Plus récent</option>
                <option value="oldest">Plus ancien</option>
                <option value="title_asc">Titre (A-Z)</option>
                <option value="title_desc">Titre (Z-A)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Top Banner Ad */}
        <div className="w-full flex justify-center my-6">
          <Banner970X90 />
        </div>

        {/* Results Info */}
        {jobOffersData?.data && (
          <div className="flex items-center justify-between mb-6 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-gray-700 font-medium">
                  <span className="font-bold text-green-600">
                    {jobOffersData?.data?.pagination?.total || 0}
                  </span>
                  <span className="text-gray-600 ml-1">
                    offre
                    {(jobOffersData?.data?.pagination?.total || 0) > 1 ? "s" : ""}{" "}
                    d'emploi trouvée
                    {(jobOffersData?.data?.pagination?.total || 0) > 1 ? "s" : ""}
                  </span>
                </p>
              </div>
              {(isLoading || isSearching) && (
                <div className="flex items-center space-x-2 text-blue-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span className="text-sm font-medium">
                    Recherche en cours...
                  </span>
                </div>
              )}
            </div>
            <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
              Page {page} sur {totalPages}
            </div>
          </div>
        )}

        <section className="section-py grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {isLoading || isError
            ? Array.from(Array(12).keys()).map((n) => (
                <JobsSkeletonCard key={n} />
              ))
            : Array.isArray(jobOffersData?.data?.items) &&
              jobOffersData.data.items.map((jobOffer) => (
                <JobOfferBlogCard key={jobOffer.id} jobOffer={jobOffer} />
              ))}
        </section>
        <div className="mt-8 bg-orange-50 rounded-lg p-6">
          <h3 className="text-center text-sm font-semibold text-gray-700 mb-4 flex items-center justify-center gap-2">
            <span className=" text-orange-600 px-3 py-1 rounded-full text-xs">
              Shorts
            </span>
          </h3>
          <Pagination
            currentPage={Number(page)}
            totalPages={jobOffersData?.meta?.last_page}
            onPageChange={handlePageChange}
          />
        </div>
        {/* Middle Banner Ad */}
        <div className="w-full flex justify-center my-6">
          <Banner300X250 />
        </div>

        {page < totalPages && !isLoading ? (
          <div className="flex justify-center mt-8 w-fit mx-auto">
            <SampleButton
              callback={handleLoadMore}
              text={t("voir_plus")}
              icon={isLoading && <RiLoader4Line className="animate-spin" />}
            />
          </div>
        ) : null}

        {/* Bottom Banner Ad */}
        <div className="w-full flex justify-center mt-6">
          <Banner728X90 />
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;