import { IoIosArrowRoundBack } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import { Mousewheel, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { useSubcategories } from "../../services/api/fetchCategory";
import { Category } from "../../services/types/category";
import { cn } from "../../utils/helpers";
import CategoryCardSmall from "../category/CategoryCardSmall";
import SubcategoryCard from "../category/SubcategoryCard";

type SpecialityListProps = {
  className?: string;
  categories: Category[];
};

const SpecialitiesList = ({ className, categories }: SpecialityListProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategoryId = searchParams.get("category_id")
    ? parseInt(searchParams.get("category_id")!)
    : null;
  const selectedCategory = searchParams.get("category");

  // Find category ID from name if we have a category name but no ID
  const effectiveCategoryId =
    selectedCategoryId ||
    (selectedCategory &&
      categories.find((cat) => cat.label === selectedCategory)?.id) ||
    null;

  const { data: subcategories } = useSubcategories(
    effectiveCategoryId || 0,
    !!effectiveCategoryId
  );

  const handleCategoryClick = (category: Category) => {
    const currentCategoryId = searchParams.get("category_id");
    const currentCategory = searchParams.get("category");

    if (
      currentCategoryId === category.id.toString() ||
      currentCategory === category.label
    ) {
      // If clicking on the same category, deselect it
      searchParams.delete("category_id");
      searchParams.delete("category");
      searchParams.delete("subcategory_id");
    } else {
      // Select new category and clear subcategory
      // Use category name instead of ID
      if (category.label) {
        searchParams.set("category", category.label);
      }
      // Remove category_id parameter
      searchParams.delete("category_id");
      searchParams.delete("subcategory_id");
    }
    setSearchParams(searchParams);
  };

  const handleSubCategoryClick = (subcategory: Category) => {
    const currentSubcategoryId = searchParams.get("subcategory_id");

    if (currentSubcategoryId === subcategory.id.toString()) {
      // If clicking on the same subcategory, deselect it
      searchParams.delete("subcategory_id");
    } else {
      // Select new subcategory
      searchParams.set("subcategory_id", subcategory.id.toString());
    }
    setSearchParams(searchParams);
  };

  return (
    <div className={cn(className)}>
      {/* Categories Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
              <h3 className="text-lg font-semibold text-gray-800">
                Toutes les Catégories
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-orange-700 bg-orange-100 px-3 py-1 rounded-full font-medium">
                {categories.length} catégorie{categories.length > 1 ? "s" : ""}
              </span>
            </div>
          </div>
          {(selectedCategoryId || selectedCategory) && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-orange-600 font-medium bg-orange-50 px-2 py-1 rounded-lg">
                {selectedCategory ||
                  categories.find((cat) => cat.id === selectedCategoryId)
                    ?.label ||
                  ""}
              </span>
            </div>
          )}
        </div>

        <div className="relative w-full overflow-hidden bg-gray-50 rounded-xl p-2">
          <Swiper
            modules={[Navigation, Mousewheel]}
            slidesPerView="auto"
            spaceBetween={16}
            className="!px-2 !py-3"
            grabCursor={true}
            watchSlidesProgress={true}
            watchOverflow={true}
            navigation={{
              nextEl: ".specialities-category-prev-btn",
              prevEl: ".specialities-category-next-btn",
            }}
            mousewheel={{
              forceToAxis: true,
              sensitivity: 1,
              releaseOnEdges: true,
            }}
            breakpoints={{
              320: {
                slidesPerView: "auto",
                spaceBetween: 12,
              },
              640: {
                slidesPerView: "auto",
                spaceBetween: 14,
              },
              768: {
                slidesPerView: "auto",
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: "auto",
                spaceBetween: 20,
              },
            }}
          >
            {categories.map((category) => (
              <SwiperSlide key={category.id} className="!w-fit">
                <div className="w-[140px]">
                  <CategoryCardSmall
                    category={category}
                    onClick={handleCategoryClick}
                    isSelected={
                      category.id === selectedCategoryId ||
                      category.label === selectedCategory
                    }
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Enhanced gradient fade effects */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none z-10"></div>

          {/* Navigation buttons */}
          <span className="specialities-category-prev-btn p-3 absolute hidden md:inline left-[-20px] top-1/2 transform -translate-y-1/2 shadow-lg bg-white hover:bg-orange-50 rounded-full cursor-pointer z-30 transition-all duration-200 hover:scale-110">
            <IoIosArrowRoundBack className="text-2xl text-orange-600" />
          </span>
          <span className="specialities-category-next-btn p-3 absolute hidden md:inline right-[-20px] top-1/2 transform -translate-y-1/2 shadow-lg bg-white hover:bg-orange-50 rounded-full cursor-pointer z-30 transition-all duration-200 hover:scale-110">
            <IoIosArrowRoundBack className="text-2xl text-orange-600 transform rotate-180" />
          </span>
        </div>
      </div>

      {/* Subcategories Section */}
      {subcategories && subcategories.length > 0 && (
        <div className="border-t border-gray-100 pt-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-orange-600 to-orange-700 rounded-full"></div>
              <h3 className="text-lg font-semibold text-gray-800">
                Sous-catégories
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-orange-700 bg-orange-100 px-2 py-1 rounded-full font-medium">
                {subcategories.length} disponible
                {subcategories.length > 1 ? "s" : ""}
              </span>
            </div>
          </div>

          <div className="relative w-full overflow-hidden bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-2">
            <Swiper
              modules={[Navigation, Mousewheel]}
              slidesPerView="auto"
              spaceBetween={12}
              className="!px-2 !py-3"
              grabCursor={true}
              watchSlidesProgress={true}
              watchOverflow={true}
              navigation={{
                nextEl: ".specialities-subcategory-prev-btn",
                prevEl: ".specialities-subcategory-next-btn",
              }}
              mousewheel={{
                forceToAxis: true,
                sensitivity: 1,
                releaseOnEdges: true,
              }}
              breakpoints={{
                320: {
                  slidesPerView: "auto",
                  spaceBetween: 8,
                },
                640: {
                  slidesPerView: "auto",
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: "auto",
                  spaceBetween: 12,
                },
                1024: {
                  slidesPerView: "auto",
                  spaceBetween: 16,
                },
              }}
            >
              {subcategories.map((subcategory) => (
                <SwiperSlide key={subcategory.id} className="!w-fit">
                  <div className="transform transition-all duration-200 hover:scale-105">
                    <SubcategoryCard
                      subCategory={subcategory}
                      onClick={handleSubCategoryClick}
                      isSelected={
                        subcategory.id ===
                        parseInt(searchParams.get("subcategory_id") || "0")
                      }
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Enhanced gradient fade effects */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-orange-50 to-transparent pointer-events-none z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-yellow-50 to-transparent pointer-events-none z-10"></div>

            {/* Navigation buttons */}
            <span className="specialities-subcategory-prev-btn p-3 absolute hidden md:inline left-[-20px] top-1/2 transform -translate-y-1/2 shadow-lg bg-white hover:bg-orange-50 rounded-full cursor-pointer z-30 transition-all duration-200 hover:scale-110">
              <IoIosArrowRoundBack className="text-2xl text-orange-600" />
            </span>
            <span className="specialities-subcategory-next-btn p-3 absolute hidden md:inline right-[-20px] top-1/2 transform -translate-y-1/2 shadow-lg bg-white hover:bg-orange-50 rounded-full cursor-pointer z-30 transition-all duration-200 hover:scale-110">
              <IoIosArrowRoundBack className="text-2xl text-orange-600 transform rotate-180" />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpecialitiesList;
