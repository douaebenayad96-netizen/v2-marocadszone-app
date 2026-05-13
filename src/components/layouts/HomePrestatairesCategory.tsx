import { IoIosArrowRoundBack } from "react-icons/io"
import { Swiper, SwiperSlide } from 'swiper/react'
import { useTranslation } from "react-i18next"
import { Navigation } from 'swiper/modules'
import { useInView } from 'react-intersection-observer'
import { useEffect } from "react"

import { Category } from "../../services/types/category"
import SectionHeader from "./SectionHeader"
import PrestataireCardSkeleton from "../ui/skeletons/PrestataireCardSkeleton"
import { usePrestatairesBySpecialite } from "../../services/api/fetchPrestataire"
import { PrestataireCardV2 } from "../annonce/PrestataireCard"

type HomePrestatairesCategoryProps = {
  category: Category
}

const HomePrestatairesCategory = ({ category }: HomePrestatairesCategoryProps) => {
  const { t, i18n } = useTranslation()
  const { ref, inView } = useInView()
  const { data, isError, isLoading, refetch } = usePrestatairesBySpecialite(category.id, 1, false)

  const lang = i18n.language
  const dir = i18n?.dir()

  useEffect(() => {
    if (inView) {
      refetch()
    }
  }, [inView, refetch])

  return (
    <section
      ref={ref}
      className="app-container section-py">
      <SectionHeader
        title={
          `${'Les annonces De'} ${lang === 'fr' ? category.label : lang === 'en' ? category.label : category.label}`
        }
        subtitle="Trouvez les meilleurs annonces de votre région"
        buttonTitle={t('home.voir_toutes')}
        to={`prestataires?category=${category.id}`}
      />
      <div
        className="mt-8 relative"
      >
        <Swiper
          dir='ltr'
          slidesPerView={1.3}
          spaceBetween={16}
          breakpoints={{
            640: {
              slidesPerView: 2.1,
            },
            768: {
              slidesPerView: 2.3,
            },
            1024: {
              slidesPerView: 3.3,
            },
            1280: {
              slidesPerView: 4.1,
            },
            1536: {
              slidesPerView: 5.1,
            },
          }}
          className="p-[1px]"
          modules={[Navigation]}
          navigation={{
            prevEl: `.next-prestataire-btn-${category.id}`,
            nextEl: `.prev-prestataire-btn-${category.id}`,
          }}
        >
          {
            (isLoading || isError) && (
              [...Array(8)].map((_, index) => (
                <SwiperSlide key={index} dir={dir}>
                  <PrestataireCardSkeleton />
                </SwiperSlide>
              ))
            )
          }
          {
            data?.data?.map((pres) => (
              <SwiperSlide key={pres.id} dir={dir} className="!h-auto">
                <PrestataireCardV2 prestataire={pres} />
              </SwiperSlide>
            ))
          }
        </Swiper>
        <div
          className={`slide-shadow`}
        ></div>
        {/* controls */}
        <span
          className={`p-4 ${'next-prestataire-btn-' + category.id} absolute hidden md:inline left-0 md:left-[-28px] top-1/2 transform -translate-y-1/2 shadow-card-shadow-border bg-white rounded-full cursor-pointer z-30`}
        >
          <IoIosArrowRoundBack className="text-2xl text-primary-blue" />
        </span>
        {/* right btn */}
        <span
          className={`p-4 ${'prev-prestataire-btn-' + category.id} absolute hidden md:inline right-0 md:right-[-28px] top-1/2 transform -translate-y-1/2 shadow-card-shadow-border bg-white rounded-full cursor-pointer z-30`}
        >
          <IoIosArrowRoundBack className="text-2xl text-primary-blue transform rotate-180" />
        </span>
      </div>
    </section>
  )
}

export default HomePrestatairesCategory