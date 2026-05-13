import { useTranslation } from "react-i18next"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"

import SectionHeader from "./SectionHeader"
import { IoIosArrowRoundBack } from "react-icons/io"
import { usePrestatairesByCity } from "../../services/api/fetchPrestataire"
import { City } from "../../services/types/city"
import PrestataireCardSkeleton from "../ui/skeletons/PrestataireCardSkeleton"
import { PrestataireCardV2 } from "../annonce/PrestataireCard"

type HomePrestatairesCityProps = {
  city: City
}

const HomePrestatairesCity = ({ city }: HomePrestatairesCityProps) => {
  const { t, i18n } = useTranslation()
  const { ref, inView } = useInView()
  const { data, isError, isLoading, refetch } = usePrestatairesByCity(city.id, false)

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
          `${"Les annonces De"} ${city?.label}`
        }
        subtitle="Trouvez les meilleurs annonce près de chez vous"
        buttonTitle={t('home.voir_toutes')}
        to={`prestataires?city=${city.id}`}
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
            prevEl: `.next-prestataire-btn-city-${city.id}`,
            nextEl: `.prev-prestataire-btn-city-${city.id}`,
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
          className={`p-4 ${'next-prestataire-btn-city-' + city.id} absolute hidden md:inline left-0 md:left-[-28px] top-1/2 transform -translate-y-1/2 shadow-card-shadow-border bg-white rounded-full cursor-pointer z-30`}
        >
          <IoIosArrowRoundBack className="text-2xl text-primary-blue" />
        </span>
        {/* right btn */}
        <span
          className={`p-4 ${'prev-prestataire-btn-city-' + city.id} absolute hidden md:inline right-0 md:right-[-28px] top-1/2 transform -translate-y-1/2 shadow-card-shadow-border bg-white rounded-full cursor-pointer z-30`}
        >
          <IoIosArrowRoundBack className="text-2xl text-primary-blue transform rotate-180" />
        </span>
      </div>
    </section>
  )
}

export default HomePrestatairesCity