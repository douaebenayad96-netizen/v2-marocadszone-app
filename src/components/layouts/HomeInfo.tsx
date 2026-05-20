import { FaBalanceScale, FaPhoneAlt, FaUserPlus } from 'react-icons/fa'
import { Swiper, SwiperSlide } from 'swiper/react'
import SectionHeader from './SectionHeader'
import { RiEmotionHappyLine } from 'react-icons/ri'
import { useTranslation } from 'react-i18next'

const HomeInfo = () => {
  const { t } = useTranslation()
  return (
    <section className="bg-primary-white text-primary-blue section-py">
      <div className="app-container">
        {/* header */}
        <SectionHeader
          title={t('home.info.h2')}
          subtitle={t('home.info.p')}
        />
        {/* cards */}
        <Swiper
          className="mt-8"
          slidesPerView={1.7}
          spaceBetween={25}
          breakpoints={{
            640: {
              slidesPerView: 2.3,
            },
            768: {
              slidesPerView: 3.2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          <SwiperSlide>
            <div className="flex flex-col items-start border border-gray-300 rounded-lg p-5">
              <div className="rounded-full py-0 mb-5">
                <FaUserPlus className="text-primary-orange text-4xl block z-10 relative" />
                <div className="absolute z-0 top-[10px] left-[10px] w-[40px] h-[40px] flex items-center justify-center rounded-full bg-orange-300 bg-opacity-20"></div>
              </div>
              <h3 className="text-lg sm:text-2xl font-bold mb-3">{t('home.info.cards.card1.h3')}</h3>
              <p className="text-sm sm:text-base">
                {t('home.info.cards.card1.p')}
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col items-start border border-gray-300 rounded-lg p-5">
              <div className="rounded-full py-0 mb-5">
                <FaBalanceScale className="text-primary-orange text-4xl block z-10 relative" />
                <div className="absolute z-0 top-[10px] left-[10px] w-[40px] h-[40px] flex items-center justify-center rounded-full bg-orange-300 bg-opacity-20"></div>
              </div>
              <h3 className="text-lg sm:text-2xl font-bold mb-3">{t('home.info.cards.card2.h3')}</h3>
              <p className="text-sm sm:text-base">
                {t('home.info.cards.card2.p')}
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col items-start border border-gray-300 rounded-lg p-5">
              <div className="rounded-full py-0 mb-5">
                <FaPhoneAlt className="text-primary-orange text-4xl block z-10 relative" />
                <div className="absolute z-0 top-[10px] left-[10px] w-[40px] h-[40px] flex items-center justify-center rounded-full bg-orange-300 bg-opacity-20"></div>
              </div>
              <h3 className="text-lg sm:text-2xl font-bold mb-3">{t('home.info.cards.card3.h3')}</h3>
              <p className="text-sm sm:text-base">
                {t('home.info.cards.card3.p')}
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col items-start border border-gray-300 rounded-lg p-5">
              <div className="rounded-full py-0 mb-5">
                <RiEmotionHappyLine className="text-primary-orange text-4xl block z-10 relative" />
                <div className="absolute z-0 top-[10px] left-[10px] w-[40px] h-[40px] flex items-center justify-center rounded-full bg-orange-300 bg-opacity-20"></div>
              </div>
              <h3 className="text-lg sm:text-2xl font-bold mb-3">{t('home.info.cards.card4.h3')}</h3>
              <p className="text-sm sm:text-base">
                {t('home.info.cards.card4.p')}
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  )
}

export default HomeInfo