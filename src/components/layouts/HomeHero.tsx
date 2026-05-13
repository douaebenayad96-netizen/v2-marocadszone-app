import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiArrowDownSLine, RiSearchLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Banner1 from "../../assets/img/banners/banner1.png";
import Banner3 from "../../assets/img/banners/banner3.png";
import BannerFooter from "../../assets/img/banners/banner_footer.png";
import BgLayer from "../../assets/img/home-hero-bg-layer.png";
import { useCategories } from "../../services/api/fetchCategory";
import { useFetchCity } from "../../services/api/fetchCity";
import { Category } from "../../services/types/category";
import { City } from "../../services/types/city";
import { clearText, getFirstWord } from "../../utils/helpers";
import ListView from "../common/ListView";

const HomeHero = () => {
  const { t, i18n } = useTranslation();
  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useCategories(1, true);
  const { data: citiesData, isLoading: citiesLoading } = useFetchCity();
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const lang = i18n.language;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowCategoryDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchClick = () => {
    const cityParam = selectedCity ? `?city_id=${selectedCity.id}` : "";
    const searchParam = searchTerm
      ? `${cityParam ? "&" : "?"}search=${encodeURIComponent(searchTerm)}`
      : "";
    window.location.href = `/annonces${cityParam}${searchParam}`;
  };

  return (
    <div className="relative pt-nav min-h-screen flex flex-col items-center justify-center">
      <div
        className={`hidden md:block absolute sm:inset-0 z-[-1] ${
          i18n.language === "ar" && "hidden"
        }`}
      >
        <img
          src={BgLayer}
          alt="Background Layer"
          className="h-full w-full object-cover opacity-30"
        />
      </div>

      <div className="app-container flex flex-row items-center justify-center py-2">
        {/* banner side */}
        <Link
          to="https://careerlink.ma/"
          target="_blank"
          className="min-w-[300px] w-[300px] h-[600px] overflow-hidden bg-gray-200 rounded-md hidden lg:flex items-center justify-center text-gray-500"
        >
          <img src={Banner1} alt="Banner 1" className="h-full w-full" />
        </Link>

        <div className="flex flex-col items-center justify-center py-4 2xl:py-10 lg:py-8 w-full">
          <div className="max-w-[900px] text-center w-full">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              exit={{ opacity: 0, y: -50 }}
              className={`text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold text-primary-blue ${
                lang === "fr" ? "max-w-[900px]" : "max-w-[700px]"
              } leading-tight ${
                i18n.language === "ar" ? "mb-8" : "mb-4"
              } mx-auto`}
            >
              Trouvez toutes les meilleures annonces{" "}
              <span className="after-gradient relative min-w-max inline-block">
                au Maroc
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              exit={{ opacity: 0, y: -50 }}
              className="text-sm sm:text-base text-primary-blue max-w-[600px] leading-tight mb-4 2xl:mb-8 mx-auto"
            >
              Explorez une large gamme d'annonces fiables et variées à travers
              tout le Maroc.
            </motion.p>
          </div>
          {/* search */}{" "}
          <div className="w-full max-w-[600px] relative" ref={dropdownRef}>
            <div className="flex bg-gray-50 flex-row items-center gap-2 border border-gray-200 rounded-full overflow-hidden">
              <div
                className="hidden sm:flex items-center cursor-pointer px-6 py-4 border-r border-gray-200 min-w-[80px] relative"
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              >
                <span className="text-base text-gray-600 truncate">
                  {selectedCity ? selectedCity.label : "Ville"}
                </span>
                <RiArrowDownSLine className="ml-2 text-gray-400" />
              </div>

              <div className="flex items-center flex-1 max-sm:px-4">
                <span className="flex items-center justify-center transition-all text-primary-blue ml-2">
                  <RiSearchLine className="text-xl" />
                </span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Que recherchez-vous ?"
                  className="flex-1 bg-transparent border-none outline-none px-2 py-2 text-base"
                />
              </div>

              <button
                onClick={handleSearchClick}
                className="bg-primary-orange text-white px-6 py-4 shadow-orange-bottom-right hover:bg-opacity-80 transition-all m-1 rounded-full"
              >
                {t("home.hero.chercher")}
              </button>
            </div>

            {showCategoryDropdown && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-2 z-50 max-h-60 overflow-y-auto">
                {/* <div
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b"
                  onClick={() => { setSelectedCity(null); setShowCategoryDropdown(false); }}
                >
                  Toutes les villes
                </div> */}
                {citiesLoading
                  ? Array.from(Array(5).keys()).map((n) => (
                      <div key={n} className="px-4 py-3 animate-pulse">
                        <div className="h-4 bg-gray-200 rounded"></div>
                      </div>
                    ))
                  : citiesData?.slice(0, 20).map((city) => (
                      <div
                        key={city.id}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                        onClick={() => {
                          setSelectedCity(city);
                          setShowCategoryDropdown(false);
                        }}
                      >
                        {city.label}
                      </div>
                    ))}
              </div>
            )}
          </div>
          {/* Popular Searches */}
          <div className="mt-4 2xl:mt-8 text-center w-full">
            {/* <h2 className="text-base md:text-lg font-semibold text-primary-blue mb-2 sm:mb-4">
              {t('home.hero.recherches_populaires')}
            </h2> */}
            {!categoriesLoading &&
              (!categoriesData ||
                !categoriesData.data ||
                categoriesData.data.length === 0) && (
                <div className="text-gray-400 text-sm mb-4">
                  Aucune catégorie populaire trouvée.
                </div>
              )}
            <ListView
              className="flex items-center justify-center gap-2 md:gap-4 flex-wrap"
              data={categoriesData?.data?.slice(0, 4) || []}
              isLoading={categoriesLoading || categoriesError}
              renderItem={(category: Category) => (
                <Link to={`/annonces?category=${category.id}`}>
                  <span
                    key={category.id}
                    className="flex items-center justify-center cursor-pointer border border-gray-100 rounded-full px-4 py-2 text-primary-blue font-semibold transition-all hover:bg-primary-blue-all-800 hover:text-white"
                  >
                    {clearText(getFirstWord(category.label ?? ""))}
                  </span>
                </Link>
              )}
              skeletonItem={
                <span className="bg-gray-50 block w-20 h-10 rounded-full" />
              }
              totalSkeletonItems={5}
            />
          </div>
        </div>

        {/* banner side */}
        <Link
          to="https://devtitechnologie.com"
          target="_blank"
          className="min-w-[300px] w-[300px] h-[600px] overflow-hidden bg-gray-200 rounded-md hidden lg:flex items-center justify-center text-gray-500"
        >
          <img src={Banner3} alt="Banner 3" className="h-full w-full" />
        </Link>
      </div>

      {/* Bottom Banner Ad Placeholder */}
      <div>
        <Link
          to="https://devticloud.com/"
          target="_blank"
          className="w-full h-[90px] flex items-center justify-center max-sm:px-4"
        >
          <div className="w-full sm:w-[728px] h-auto sm:h-[90px] overflow-hidden bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
            <img src={BannerFooter} alt="Banner Footer" className="md:h-full" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomeHero;
