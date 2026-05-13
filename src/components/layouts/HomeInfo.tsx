import { FaBalanceScale, FaPhoneAlt, FaUserPlus } from 'react-icons/fa'
import { Swiper, SwiperSlide } from 'swiper/react'
import SectionHeader from './SectionHeader'
import { RiEmotionHappyLine } from 'react-icons/ri'

const HomeInfo = () => {
  return (
    <section className="bg-primary-white text-primary-blue section-py">
      <div className="app-container">
        {/* header */}
        <SectionHeader
          title="Comment ça marche ?"
          subtitle="Découvrez comment utiliser notre plateforme pour trouver rapidement ce dont vous avez besoin."
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
              <h3 className="text-lg sm:text-2xl font-bold mb-3">Publiez Facilement</h3>
              <p className="text-sm sm:text-base">
                Déposez vos annonces en quelques clics et atteignez un large public.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col items-start border border-gray-300 rounded-lg p-5">
              <div className="rounded-full py-0 mb-5">
                <FaBalanceScale className="text-primary-orange text-4xl block z-10 relative" />
                <div className="absolute z-0 top-[10px] left-[10px] w-[40px] h-[40px] flex items-center justify-center rounded-full bg-orange-300 bg-opacity-20"></div>
              </div>
              <h3 className="text-lg sm:text-2xl font-bold mb-3">Annonces Fiables</h3>
              <p className="text-sm sm:text-base">
                Consultez des annonces vérifiées pour trouver ce dont vous avez besoin.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col items-start border border-gray-300 rounded-lg p-5">
              <div className="rounded-full py-0 mb-5">
                <FaPhoneAlt className="text-primary-orange text-4xl block z-10 relative" />
                <div className="absolute z-0 top-[10px] left-[10px] w-[40px] h-[40px] flex items-center justify-center rounded-full bg-orange-300 bg-opacity-20"></div>
              </div>
              <h3 className="text-lg sm:text-2xl font-bold mb-3">Support 24/7</h3>
              <p className="text-sm sm:text-base">
                Notre équipe est disponible pour répondre à vos questions à tout moment.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col items-start border border-gray-300 rounded-lg p-5">
              <div className="rounded-full py-0 mb-5">
                <RiEmotionHappyLine className="text-primary-orange text-4xl block z-10 relative" />
                <div className="absolute z-0 top-[10px] left-[10px] w-[40px] h-[40px] flex items-center justify-center rounded-full bg-orange-300 bg-opacity-20"></div>
              </div>
              <h3 className="text-lg sm:text-2xl font-bold mb-3">Utilisateurs Satisfaits</h3>
              <p className="text-sm sm:text-base">
                Des milliers d'utilisateurs satisfaits à travers tout le Maroc.
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  )
}

export default HomeInfo