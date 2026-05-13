import { IoIosArrowRoundBack } from "react-icons/io"
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules';

import { useCategories } from "../../services/api/fetchCategory";
import CategoryCardSkeleton from "../ui/skeletons/CategoryCardSkeleton";
import SectionHeader from "./SectionHeader";
import CategoryCard from "../category/CategoryCard";

const HomePrestatairesCat = () => {
  const { i18n } = useTranslation()
  const {
    data: categories,
    isLoading,
    isError,
  } = useCategories(1, true)

  const dir = i18n?.dir()
  const categoriesData = categories?.data || []

  return (
    <section className="app-container section-py">
      <SectionHeader
        title="Explorez les Catégories Populaires"
        subtitle="Trouvez facilement ce que vous cherchez parmi nos nombreuses catégories d'annonces."
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
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 3.2,
            },
            1280: {
              slidesPerView: 5.5,
            },
            1536: {
              slidesPerView: 5.8,
            },
          }}
          modules={[Navigation, Autoplay]}
          navigation={{
            prevEl: '.next-category-btn',
            nextEl: '.prev-category-btn',
          }}          className="mt-8"
        >
          {
            isLoading || isError ?
              Array.from(Array(8).keys()).map((n) => (
                <SwiperSlide className="p-[1px]" key={n} dir={dir}>
                  <CategoryCardSkeleton />
                </SwiperSlide>
              ))
              : categoriesData?.map((category) => (
                <SwiperSlide className="p-[1px]" key={category.id} dir={dir}>
                  <CategoryCard category={category} />
                </SwiperSlide>
              ))
          }
        </Swiper>
        {/* shadow right */}
        <div
          className="absolute inset-y-0 right-[-2px] w-16 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none"
        ></div>
        {/* controls */}
        {/* left btn */}
        <span
          className={`p-4 ${i18n.language === 'ar' ? 'prev-category-btn' : 'next-category-btn'} absolute hidden md:inline left-0 md:left-[-28px] top-1/2 transform -translate-y-1/2 shadow-card-shadow-border bg-white rounded-full cursor-pointer z-30`}
        >
          <IoIosArrowRoundBack className="text-2xl text-primary-blue" />
        </span>
        {/* right btn */}
        <span
          className={`p-4 ${i18n.language === 'ar' ? 'next-category-btn' : 'prev-category-btn'} absolute hidden md:inline right-0 md:right-[-28px] top-1/2 transform -translate-y-1/2 shadow-card-shadow-border bg-white rounded-full cursor-pointer z-30`}
        >
          <IoIosArrowRoundBack className="text-2xl text-primary-blue transform rotate-180" />
        </span>
      </div>
    </section>
  )
}

export default HomePrestatairesCat