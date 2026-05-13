import { useEffect, useState } from "react";
import { FiBriefcase, FiFilter, FiMapPin, FiSearch } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import JobOfferCard from "../components/job/JobOfferCard";
import Pagination from "../components/ui/Pagination";
import { useFetchCity } from "../services/api/fetchCity";
import { useGetJobOffers } from "../services/api/fetchService";
import { TJobOfferFilters } from "../services/types/jobOffer";

const JobOffersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const [filter, setFilter] = useState<TJobOfferFilters>({});
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const {
    data: jobOffersData,
    isLoading,
    isError,
  } = useGetJobOffers(filter, true);

  // Fetch cities for the dropdown
  const { data: cities, isLoading: isLoadingCities } = useFetchCity();
  // Update totalPages when data changes

  // Update filter when search params change
  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    const newFilter: TJobOfferFilters = {
      per_page: 12,
      page: page,
      sort_by: "newest",
      ...params,
    };

    // Convert string params to appropriate types
    if (params.per_page) {
      newFilter.per_page = Number(params.per_page);
    }
    if (params.city_id) {
      newFilter.city_id = Number(params.city_id);
    }
    if (params.country_id) {
      newFilter.country_id = Number(params.country_id);
    }
    if (params.page) {
      newFilter.page = Number(params.page);
    }

    setFilter(newFilter);
  }, [searchParams, page]);

  const handleFilterChange = (
    key: keyof TJobOfferFilters,
    value: string | number | null
  ) => {
    setSearchParams((prev) => {
      if (value === null || value === undefined || value === "") {
        prev.delete(key);
      } else {
        prev.set(key, value.toString());
      }
      // Reset to page 1 when filtering
      prev.set("page", "1");
      return prev;
    });
  };
  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      prev.set("page", newPage.toString());
      return prev;
    });
    setPage(newPage);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Offres d'Emploi
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez les meilleures opportunités professionnelles adaptées à
            votre profil
          </p>
        </div>
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
                  value={filter.search || ""}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
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
                  onChange={(e) =>
                    handleFilterChange(
                      "city_id",
                      e.target.value ? Number(e.target.value) : null
                    )
                  }
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
                  disabled={isLoadingCities}
                >
                  <option value="">Toutes les villes</option>
                  {cities &&
                    cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.label}
                      </option>
                    ))}
                </select>
                {isLoadingCities && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  </div>
                )}
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
        </div>{" "}
        {/* Results Info */}
        {jobOffersData?.data && (
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              <span className="font-semibold text-gray-900">
                {jobOffersData.meta?.last_page || 0}
              </span>{" "}
              offres d'emploi trouvées
            </p>
            <div className="text-sm text-gray-500">
              Page {page} sur {totalPages}
            </div>
          </div>
        )}
        {/* Job Offers Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {isLoading ? (
            // Enhanced loading skeletons
            [...Array(20)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-white shadow-lg rounded-2xl p-6 border border-gray-100"
              >
                <div className="w-full h-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl mb-4"></div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded-full w-20"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-16"></div>
                  </div>
                  <div className="h-6 bg-gray-300 rounded-lg w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded-lg w-1/2"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                    <div className="h-4 bg-gray-200 rounded-lg w-1/3"></div>
                  </div>
                </div>
              </div>
            ))
          ) : isError ? (
            <div className="col-span-full text-center py-12">
              <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md mx-auto">
                <div className="text-red-500 text-5xl mb-4">⚠️</div>
                <h3 className="text-lg font-semibold text-red-800 mb-2">
                  Erreur de chargement
                </h3>
                <p className="text-red-600">
                  Une erreur s'est produite lors du chargement des offres
                  d'emploi
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Réessayer
                </button>
              </div>
            </div>
          ) : jobOffersData?.data?.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 max-w-md mx-auto">
                <div className="text-blue-500 text-5xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  Aucune offre trouvée
                </h3>
                <p className="text-blue-600">
                  Aucune offre d'emploi ne correspond à vos critères actuels
                </p>
                <button
                  onClick={() => {
                    setSearchParams(new URLSearchParams());
                  }}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            </div>
          ) : (
            // Display job offers
            jobOffersData?.data?.map((jobOffer) => (
              <JobOfferCard key={jobOffer.id} jobOffer={jobOffer} />
            ))
          )}
        </div>
      </div>
      <div className="mt-8 bg-orange-50 rounded-lg p-6">
        <h3 className="text-center text-sm font-semibold text-gray-700 mb-4 flex items-center justify-center gap-2">
          <span className=" text-orange-600 px-3 py-1 rounded-full text-xs">
            Shorts
          </span>
        </h3>
        <Pagination
          currentPage={Number(page)}
          totalPages={jobOffersData.meta?.last_page}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default JobOffersPage;
