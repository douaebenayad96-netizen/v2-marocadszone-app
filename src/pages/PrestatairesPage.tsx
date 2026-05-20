import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CgClose } from "react-icons/cg";
import { LuFilterX } from "react-icons/lu";
import { TbFilterPlus } from "react-icons/tb";
import { useSearchParams } from "react-router-dom";
import Select from "react-select";

import PageHeader from "../components/layouts/PageHeader";
import SlideLayout from "../components/layouts/SlideLayout";
import SearchInput from "../components/reviews/SearchInput";
import SampleButtonFilter from "../components/ui/SampleButtonFilter";
import PrestatairesFilterList from "../components/annonce/PrestatairesFilterList";
import SpecialitiesList from "../components/company/SpecialitiesList";
import SEOHead from "../components/seo/SEOHead";
import { useAnnoncesWithFilter } from "../services/api/fetchAnnonce";
import {
  useCategories1,
  useSubcategories,
} from "../services/api/fetchCategory";
import { useFetchCity } from "../services/api/fetchCity";
import { useFetchCountries } from "../services/api/fetchCountry";
import { AnnonceFilter, PrestataireFilter } from "../services/types/filter";
import { SelectType, villeSelect } from "../services/types/select";
import { getAnnoncesSEO } from "../utils/seoMetadata";
import { CategorySelectStyles, SelectStyles } from "../utils/style";
import getLocalized from '../utils/getLocalized';

const PrestatairesPage = () => {
  const { t, i18n } = useTranslation(["prestataires", "common"]);
  const { data: categoriesData } = useCategories1();
  const { data: countriesData } = useFetchCountries();
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState<PrestataireFilter>({});
  const [annonceFilter, setAnnonceFilter] = useState<AnnonceFilter>({});
  const [, setAnnoncePage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: citiesData } = useFetchCity();
  const [city, setCity] = useState<villeSelect | null>();
  const [metier, setMetier] = useState<SelectType | null>();

  // New state for hierarchical annonce filtering
  const [selectedCategory, setSelectedCategory] = useState<SelectType | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<SelectType | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<SelectType | null>(null);
  const [selectedAnnonceCity, setSelectedAnnonceCity] = useState<villeSelect | null>(null);
  
  const annoncesSEO = getAnnoncesSEO(
    searchParams.get("category"),
    searchParams.get("ville")
  );
  
  const { data: subcategoriesData, isLoading: subcategoriesLoading } =
    useSubcategories(selectedCategory?.value ?? 0, !!selectedCategory);

  const availableSubcategories = subcategoriesData || [];

  const availableCities = Array.isArray(citiesData)
    ? citiesData.filter((city) =>
        selectedCountry ? city.country_id === selectedCountry.value : true
      )
    : [];

  const { data: annoncesResponse, isLoading: annoncesLoading } =
    useAnnoncesWithFilter(
      annonceFilter,
      Number(searchParams.get("page")),
      true,
      10
    );

  const annoncesData =
    annoncesResponse && "message" in annoncesResponse
      ? {
          data: annoncesResponse.data.items,
          current_page: annoncesResponse.data.pagination.current_page,
          last_page: annoncesResponse.data.pagination.last_page,
          first_page_url: "",
          from: 0,
          last_page_url: "",
        }
      : annoncesResponse;

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    if (!params.sort_by) {
      params.sort_by = "newest";
    }
    setFilter(params);
    
    const annonceParams: AnnonceFilter = {
      search: params.search,
      sort_by: params.sort_by,
      city_id: params.city_id ? parseInt(params.city_id) : undefined,
      ville: params.ville,
      country_id: params.country_id ? parseInt(params.country_id) : undefined,
      category_id: params.category_id ? parseInt(params.category_id) : undefined,
      category: params.category,
      subcategory_id: params.subcategory_id ? parseInt(params.subcategory_id) : undefined,
    };
    setAnnonceFilter(annonceParams);

    if (params.country_id && countriesData && Array.isArray(countriesData)) {
      const countryOption = countriesData.find(
        (country) => country.id === parseInt(params.country_id)
      );
      if (countryOption) {
        setSelectedCountry({
          label: getLocalized(countryOption, 'label') || countryOption.label,
          value: countryOption.id,
        });
      }
    } else {
      setSelectedCountry(null);
    }

    if (params.city_id && citiesData && Array.isArray(citiesData)) {
      const cityOption = citiesData.find(
        (city) => city.id === parseInt(params.city_id)
      );
      if (cityOption) {
        setSelectedAnnonceCity({
          label: getLocalized(cityOption, 'label') || cityOption.label,
          value: cityOption.id,
        });
      }
    } else {
      setSelectedAnnonceCity(null);
    }

    if (params.category && categoriesData) {
      const categoryOption = categoriesData.find(
        (category) => (getLocalized(category, 'label') || category.label) === params.category
      );
      if (categoryOption) {
        setSelectedCategory({
          label: getLocalized(categoryOption, 'label') || categoryOption.label || "",
          value: categoryOption.id,
        });
      }
    } else if (params.category_id && categoriesData) {
      const categoryOption = categoriesData.find(
        (category) => category.id === parseInt(params.category_id)
      );
      if (categoryOption) {
        setSelectedCategory({
          label: getLocalized(categoryOption, 'label') || categoryOption.label || "",
          value: categoryOption.id,
        });
      }
    } else {
      setSelectedCategory(null);
      setSelectedSubcategory(null);
    }
  }, [searchParams, countriesData, citiesData, categoriesData]);

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    if (params.subcategory_id && subcategoriesData && selectedCategory) {
      const subcategoryOption = subcategoriesData.find(
        (sub) => sub.id === parseInt(params.subcategory_id)
      );
      if (subcategoryOption) {
        setSelectedSubcategory({
          label: subcategoryOption.label || "",
          value: subcategoryOption.id,
        });
      }
    } else if (!params.subcategory_id) {
      setSelectedSubcategory(null);
    }
  }, [subcategoriesData, searchParams, selectedCategory]);

  useEffect(() => {
    setFilter((prev) => ({ ...prev, sort_by: "newest" }));
  }, []);

  const handleSearchBySearch = (value: string) => {
    searchParams.set("search", value);
    setSearchParams(searchParams);
    setAnnoncePage(1);
  };

  const checkFilter = () => {
    return (
      searchParams.has("search") ||
      searchParams.has("city") ||
      searchParams.has("category") ||
      searchParams.has("subcategory_id") ||
      searchParams.has("ville")
    );
  };

  const handleResetFilter = () => {
    setCity(null);
    setMetier(null);
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setSelectedCountry(null);
    setSelectedAnnonceCity(null);
    searchParams.delete("search");
    searchParams.delete("city");
    searchParams.delete("category");
    searchParams.delete("subcategory_id");
    searchParams.delete("ville");
    setSearchParams(searchParams);
    setAnnoncePage(1);
  };

  const handleFilterCity = () => {
    const value = city ? city : "";
    if (value === "") {
      searchParams.delete("city");
    } else {
      searchParams.set("city", value.value.toString());
      setSearchParams(searchParams);
    }
  };

  const handleFilterMetier = () => {
    const value = metier ? metier : "";
    if (value === "") {
      searchParams.delete("profession");
    } else {
      searchParams.set("profession", value.value.toString());
      setSearchParams(searchParams);
    }
  };

  const handleApplyFilter = () => {
    handleFilterCity();
    handleFilterMetier();
    handleApplyAnnonceFilters();
    setShowFilter(false);
    setAnnoncePage(1);
  };

  const handleApplyAnnonceFilters = () => {
    if (selectedCategory) {
      searchParams.set("category", selectedCategory.label);
      searchParams.delete("category_id");
    } else {
      searchParams.delete("category");
      searchParams.delete("category_id");
    }

    if (selectedSubcategory) {
      searchParams.set("subcategory_id", selectedSubcategory.value.toString());
    } else {
      searchParams.delete("subcategory_id");
    }

    searchParams.delete("country_id");

    if (selectedAnnonceCity) {
      searchParams.set("ville", selectedAnnonceCity.label);
      searchParams.delete("city_id");
    } else {
      searchParams.delete("ville");
      searchParams.delete("city_id");
    }

    setSearchParams(searchParams);
  };

  useEffect(() => {
    setSelectedAnnonceCity(null);
  }, [selectedCountry]);

  return (
    <div className="pt-nav">
      <SEOHead 
        title={annoncesSEO.title} 
        description={annoncesSEO.description} 
        path={`/annonces${searchParams.toString() ? `?${searchParams.toString()}` : ""}`} 
      />
      
      <div className="app-container page-py page-pt-sm">
        <div>
          <PageHeader>
            <div>
              <h1 className="title-h1">
                { t("prestataires:page.explore")}
              </h1>
              <div>
                <span className="text-base text-gray-400">
                  {t("prestataires:page.annonces_count")}
                </span>
              </div>
            </div>
            
            <div className="mt-5">
              <SearchInput
                placeholder={t("prestataires:search.placeholder")}
                btnText={t("prestataires:search.button")}
                callback={handleSearchBySearch}
                valueD={filter.search}
              />
            </div>
          </PageHeader>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2 w-fit">
              <SampleButtonFilter
                text={t("prestataires:filter.filtrer")}
                icon={<TbFilterPlus />}
                callback={() => setShowFilter(true)}
              />
              {checkFilter() && (
                <SampleButtonFilter
                  text={t("prestataires:filter.reinitialiser")}
                  icon={<LuFilterX />}
                  callback={handleResetFilter}
                />
              )}
            </div>
          </div>
        </div>
        
        <SpecialitiesList className="mt-4" categories={categoriesData || []} />
        
        <div className="mb-8 mt-4 line"></div>
        
        <div>
          <PrestatairesFilterList
            filter={filter}
            annoncesData={annoncesData}
            annoncesLoading={annoncesLoading}
            setAnnoncePage={setAnnoncePage}
          />
        </div>
      </div>

      {/* Filter Slide Panel */}
      <SlideLayout showSlide={showFilter} setShowSlide={setShowFilter}>
        <div className="w-[calc(100vw-4rem)] max-w-[400px]">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-primary-blue">
                {t("prestataires:filter.tous_les_filtres")}
              </h3>
              <button
                onClick={() => setShowFilter(false)}
                className="bg-gray-50 rounded-full p-2 transition-all hover:bg-gray-100"
              >
                <CgClose />
              </button>
            </div>
          </div>
          
          <div className="line"></div>
          
          {/* Annonce Filters Section */}
          <div className="border-b border-gray-200 bg-gradient-to-r from-orange-50 to-orange-100"></div>
          
          <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-6 bg-orange-500 rounded-full"></div>
              <h2 className="text-xl font-bold text-orange-600">
                {t("prestataires:annonce_filters.title")}
              </h2>
            </div>
            <p className="text-sm text-orange-700/80 ml-5">
              {t("prestataires:annonce_filters.subtitle")}
            </p>
          </div>

          {/* Category Filter */}
          <div className="px-4 py-5 border-b border-gray-100 bg-white">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 bg-orange-100 rounded-lg flex items-center justify-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                {t("prestataires:annonce_filters.categorie")}
              </h3>
            </div>
            <div className="mt-3">
              <Select
                placeholder={t("prestataires:annonce_filters.select_categorie")}
                options={
                  categoriesData?.map((category) => ({
                    label: getLocalized(category, 'label') || category.label || "",
                    value: category.id,
                  })) || []
                }
                className="z-[99999]"
                {...CategorySelectStyles}
                isClearable
                onChange={(value) => {
                  setSelectedCategory(value as unknown as SelectType);
                  setSelectedSubcategory(null);
                }}
                value={
                  selectedCategory
                    ? {
                        label: selectedCategory.label,
                        value: selectedCategory.value,
                      }
                    : undefined
                }
              />
            </div>
          </div>

          {/* Subcategory Filter */}
          {selectedCategory && (
            <div className="px-4 py-5 border-b border-gray-100 bg-gradient-to-r from-orange-25 to-yellow-25">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 bg-orange-200 rounded-lg flex items-center justify-center">
                  <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  {t("prestataires:annonce_filters.sous_categorie")}
                </h3>
                {selectedCategory && !subcategoriesLoading && (
                  <span className="text-sm text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                    {availableSubcategories.length}{" "}
                    {availableSubcategories.length === 1
                      ? t("prestataires:annonce_filters.subcategory_count_one")
                      : t("prestataires:annonce_filters.subcategory_count_other")}
                  </span>
                )}
              </div>
              <div className="mt-3">
                <Select
                  placeholder={
                    !selectedCategory
                      ? t("prestataires:annonce_filters.select_category_first")
                      : subcategoriesLoading
                      ? t("prestataires:annonce_filters.loading_subcategories")
                      : availableSubcategories.length === 0
                      ? t("prestataires:annonce_filters.no_subcategories")
                      : t("prestataires:annonce_filters.select_sous_categorie")
                  }
                  options={availableSubcategories.map((subcategory) => ({
                    label: getLocalized(subcategory, 'label') || subcategory.label || "",
                    value: subcategory.id,
                  }))}
                  className="z-[99998]"
                  {...CategorySelectStyles}
                  isClearable
                  isDisabled={
                    !selectedCategory ||
                    subcategoriesLoading ||
                    availableSubcategories.length === 0
                  }
                  isLoading={subcategoriesLoading}
                  onChange={(value) =>
                    setSelectedSubcategory(value as unknown as SelectType)
                  }
                  value={
                    selectedSubcategory
                      ? {
                          label: selectedSubcategory.label,
                          value: selectedSubcategory.value,
                        }
                      : undefined
                  }
                />
              </div>
            </div>
          )}

          {/* Country Filter */}
          <div className="px-4 py-5 border-b border-gray-100 bg-white">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 bg-blue-100 rounded-lg flex items-center justify-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                {t("prestataires:annonce_filters.pays")}
              </h3>
            </div>
            <div className="mt-3">
              <Select
                placeholder={t("prestataires:annonce_filters.select_pays")}
                options={(countriesData && Array.isArray(countriesData)
                  ? countriesData
                  : []
                ).map((country) => ({
                  label: getLocalized(country, 'label') || country.label,
                  value: country.id,
                }))}
                className="z-[9999]"
                {...SelectStyles}
                isClearable
                onChange={(value) => {
                  setSelectedCountry(value as unknown as SelectType);
                  setSelectedAnnonceCity(null);
                }}
                value={
                  selectedCountry
                    ? {
                        label: selectedCountry.label,
                        value: selectedCountry.value,
                      }
                    : undefined
                }
              />
            </div>
          </div>

          {/* City Filter */}
          {selectedCountry && (
            <div className="px-4 py-5 border-b border-gray-100 bg-gradient-to-r from-blue-25 to-teal-25">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 bg-blue-200 rounded-lg flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  {t("prestataires:annonce_filters.ville")}
                </h3>
                {selectedCountry && (
                  <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                    {availableCities.length}{" "}
                    {availableCities.length === 1
                      ? t("prestataires:annonce_filters.city_count_one")
                      : t("prestataires:annonce_filters.city_count_other")}
                  </span>
                )}
              </div>
              <div className="mt-3">
                <Select
                  placeholder={
                    !selectedCountry
                      ? t("prestataires:annonce_filters.select_country_first")
                      : availableCities.length === 0
                      ? t("prestataires:annonce_filters.no_cities")
                      : t("prestataires:annonce_filters.select_ville")
                  }
                  options={availableCities.map((city) => ({
                    label: getLocalized(city, 'label') || city.label,
                    value: city.id,
                  }))}
                  className="z-[9998]"
                  {...SelectStyles}
                  isClearable
                  isDisabled={!selectedCountry || availableCities.length === 0}
                  onChange={(value) =>
                    setSelectedAnnonceCity(value as unknown as villeSelect)
                  }
                  value={
                    selectedAnnonceCity
                      ? {
                          label: selectedAnnonceCity.label,
                          value: selectedAnnonceCity.value,
                        }
                      : undefined
                  }
                />
              </div>
            </div>
          )}

          {/* Apply Button */}
          <div className="px-4 pt-6 pb-4 bg-gradient-to-r from-orange-50 to-orange-100 border-t border-orange-200">
            <button
              onClick={handleApplyFilter}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-orange-300"
            >
              <span className="flex items-center justify-center gap-2">
                <TbFilterPlus className="text-lg" />
                {t("prestataires:filter.appliquer")}
              </span>
            </button>
          </div>
        </div>
      </SlideLayout>
    </div>
  );
};

export default PrestatairesPage;