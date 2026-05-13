import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react"
import { IoIosArrowRoundBack } from "react-icons/io"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

import { usePrestationsByCategory } from "../../services/api/fetchPrestation"
import { Category } from "../../services/types/category"
import SectionHeader from "./SectionHeader"
import ServiceCardSkeleton from "../ui/skeletons/ServiceCardSkeleton"
import ServiceCard from "../annonce/ServiceCard";

type HomeServicesByCategoryProps = {
  category: Category
}

const HomeServicesByCategory = ({ category }: HomeServicesByCategoryProps) => {
  const { t, i18n } = useTranslation()
  const { data, isError, isLoading, refetch } = usePrestationsByCategory(category.id, 1, false)
  console.log("fgfds", category.id)
  const ref = useRef<HTMLDivElement>(null)

  const lang = i18n.language
  const dir = i18n?.dir()

  useEffect(() => {
    const callback: IntersectionObserverCallback = (entries) => {
      const entry = entries[0]

      if (entry.isIntersecting) {
        refetch()
      }
    }
    // javascript observer to detect if user is on view
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0
    }

    const observer = new IntersectionObserver(callback, options)

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [refetch])

  return (
    <section
      ref={ref}
      className="app-container section-py">
      <SectionHeader
        title={`${t('home.services-cat.h2')} ${lang === 'fr' ? category.label : lang === 'en' ? category.label : category.label}`}
        subtitle={t('home.services-cat.p')}
        buttonTitle={t('home.voir_toutes')}
        to={`services?category=${category.id}`}
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
              slidesPerView: 4.3,
            },
            1536: {
              slidesPerView: 5.3,
            },
          }}
          className="p-[1px]"
          modules={[Navigation]}
          navigation={{
            prevEl: `.next-service-btn-${category.id}`,
            nextEl: `.prev-service-btn-${category.id}`,
          }}
        >
          {
            (isLoading || isError) && (
              [...Array(10)].map((_, index) => (
                <SwiperSlide key={index} dir={dir}>
                  <ServiceCardSkeleton />
                </SwiperSlide>
              ))
            )
          }
          {
            data?.data?.map((service) => (
              <SwiperSlide key={service.id} dir={dir}>
                <ServiceCard prestation={service} />
              </SwiperSlide>
            ))
          }
        </Swiper>
        <div
          className={`slide-shadow`}
        ></div>
        {/* controls */}
        <span
          className={`p-4 ${'next-service-btn-' + category.id} absolute hidden md:inline left-0 md:left-[-28px] top-1/2 transform -translate-y-1/2 shadow-card-shadow-border bg-white rounded-full cursor-pointer z-30`}
        >
          <IoIosArrowRoundBack className="text-2xl text-primary-blue" />
        </span>
        {/* right btn */}
        <span
          className={`p-4 ${'prev-service-btn-' + category.id} absolute hidden md:inline right-0 md:right-[-28px] top-1/2 transform -translate-y-1/2 shadow-card-shadow-border bg-white rounded-full cursor-pointer z-30`}
        >
          <IoIosArrowRoundBack className="text-2xl text-primary-blue transform rotate-180" />
        </span>
      </div>
    </section>
  )
}

export default HomeServicesByCategory