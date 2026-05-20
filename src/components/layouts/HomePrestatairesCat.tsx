import { IoIosArrowRoundBack } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

import { useCategories } from "../../services/api/fetchCategory";
import CategoryCardSkeleton from "../ui/skeletons/CategoryCardSkeleton";
import SectionHeader from "./SectionHeader";
import CategoryCard from "../category/CategoryCard";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

const HomePrestatairesCat = () => {
  const { t, i18n } = useTranslation("home");

  const {
    data: categories,
    isLoading,
    isError,
  } = useCategories(1, true);

  const dir = i18n?.dir();
  const categoriesData = categories?.data || [];
  const isRTL = i18n.language === "ar";

  return (
    <section className="app-container section-py" dir={dir}>
      <SectionHeader
        title={t("categories.title")}
        subtitle={t("categories.subtitle")}
      />
      
      <div className="relative">
        <Swiper
          dir="ltr"
          spaceBetween={15}
          slidesPerView={1.4}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 3.2 },
            1280: { slidesPerView: 5.5 },
            1536: { slidesPerView: 5.8 },
          }}
          modules={[Navigation, Autoplay]}
          navigation={{
            prevEl: '.prev-category-btn',
            nextEl: '.next-category-btn',
          }}
          className="mt-8"
        >
          {(isLoading || isError) ? (
            Array.from(Array(8).keys()).map((n) => (
              <SwiperSlide className="p-[1px]" key={n} dir={dir}>
                <CategoryCardSkeleton />
              </SwiperSlide>
            ))
          ) : (
            categoriesData.map((category) => (
              <SwiperSlide className="p-[1px]" key={category.id} dir={dir}>
                <CategoryCard category={category} />
              </SwiperSlide>
            ))
          )}
        </Swiper>

        {/* Shadow right */}
        <div className="absolute inset-y-0 right-[-2px] w-16 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none"></div>

        {/* Left button */}
        <span
          className={`p-4 ${isRTL ? 'next-category-btn' : 'prev-category-btn'} absolute hidden md:inline left-0 md:left-[-28px] top-1/2 transform -translate-y-1/2 shadow-card-shadow-border bg-white rounded-full cursor-pointer z-30`}
        >
          <IoIosArrowRoundBack className={`text-2xl text-primary-blue ${isRTL ? 'rotate-180' : ''}`} />
        </span>

        {/* Right button */}
        <span
          className={`p-4 ${isRTL ? 'prev-category-btn' : 'next-category-btn'} absolute hidden md:inline right-0 md:right-[-28px] top-1/2 transform -translate-y-1/2 shadow-card-shadow-border bg-white rounded-full cursor-pointer z-30`}
        >
          <IoIosArrowRoundBack className={`text-2xl text-primary-blue ${isRTL ? '' : 'rotate-180'}`} />
        </span>
      </div>
    </section>
  );
};

export default HomePrestatairesCat;