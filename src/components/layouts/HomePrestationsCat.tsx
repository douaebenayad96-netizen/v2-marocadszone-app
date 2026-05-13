import { IoIosArrowRoundBack } from "react-icons/io"
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules';
import { BiError } from "react-icons/bi";

import CategoryCard from "../../components/category/CategoryCard"
import SectionHeader from "../layouts/SectionHeader"
import { useCategories } from "../../services/api/fetchCategory";
import CategoryCardSkeleton from "../ui/skeletons/CategoryCardSkeleton";

const HomePrestationsCat = () => {
  const { t, i18n } = useTranslation()
  const {
    data: categories,
    isLoading,
    isError,
    refetch
  } = useCategories(1, true)

  const dir = i18n?.dir()
  const categoriesData = categories?.data || []

  if (isError) {
    return (
      <section className="app-container section-py">
        <div className="text-center py-8">
          <BiError className="mx-auto text-4xl text-red-500 mb-2" />
          <p className="text-gray-600 mb-4">{t('error.loading_categories')}</p>
          <button 
            onClick={() => refetch()}
            className="px-4 py-2 bg-primary-blue text-white rounded hover:bg-primary-blue-dark"
          >
            {t('retry')}
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="app-container section-py">
      <SectionHeader
        title={t('home.prestationsCat.h2')}
        subtitle={t('home.prestationsCat.p')}
      />
      <div className="relative">
        <Swiper
          dir="ltr"
          spaceBetween={15}
          slidesPerView={1.4}
          breakpoints={{
            640: {
              slidesPerView: 2.2,
            },
            768: {
              slidesPerView: 3.2,
            },
            1024: {
              slidesPerView: 4.2,
            },
            1280: {
              slidesPerView: 5.5,
            },
            1536: {
              slidesPerView: 6.8,
            },
          }}
          modules={[Navigation]}
          navigation={{
            prevEl: '.next-category-btn',
            nextEl: '.prev-category-btn',
          }}
          className="mt-8"
        >
          {isLoading && 
            Array.from(Array(6).keys()).map((n) => (
              <SwiperSlide className="p-[1px]" key={n} dir={dir}>
                <CategoryCardSkeleton />
              </SwiperSlide>
            ))
          }
          
          {!isLoading && categoriesData.map((category) => (
            <SwiperSlide className="p-[1px]" key={category.id} dir={dir}>
              <CategoryCard category={category} />
            </SwiperSlide>
          ))}
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

export default HomePrestationsCat