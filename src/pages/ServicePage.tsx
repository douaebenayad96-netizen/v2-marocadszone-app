import { CiLocationArrow1, CiTimer } from 'react-icons/ci'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

import StarIcon from '../components/ui/StarIcon'
import OrderBox from '../components/annonce/OrderBox'
import { usePrestation } from '../services/api/fetchPrestation'
import PageLoader from '../components/common/PageLoader'
import ReviewsList from '../components/reviews/ReviewsList'
import SimilarServicesList from '../components/annonce/SimilarServicesList'
import ShareButton from '../components/annonce/ShareButton'
import LikeButton from '../components/favori/LikeButton'
import UserInfoBox from '../components/account/UserInfoBox'
import ServiceIncludeList from '../components/annonce/ServiceIncludeList'
import ThumbsGallery from '../components/common/ThumbsGallery'
import SectionHeader from '../components/layouts/SectionHeader'

const ServicePage = () => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const idService = useParams<{ id: string }>().id
  const { data: prestationData, isError, isLoading, refetch } = usePrestation(parseInt(idService as string), false)

  useEffect(() => {
    if (idService) {
      refetch()
    }
  }, [idService, refetch])

  if (isError) {
    navigate('/404')
    return null
  }

  if (isLoading || !prestationData) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <PageLoader />
      </div>
    )
  }

  return (
    <div className="pt-nav">
      <div className="app-container-max-xl page-py flex justify-center lg:gap-8 xl:gap-28">
        <div className='w-full xl:w-[calc(100%-522px)] lg:w-[calc(100%-440px)]'>
          {/* service header details */}
          <div
            className="flex items-center gap-3"
          >
            {
              prestationData?.tarification === 'Service' && (
                <div
                  className="flex items-center gap-1"
                >
                  <CiTimer className="text-primary-blue text-2xl" />
                  <span>
                    1 {t('service_page.jour')}
                  </span>
                </div>
              )
            }
            <div
              className="sm:flex items-center gap-2 hidden"
            >
              <CiLocationArrow1 className="text-primary-blue text-2xl" />
              <span>
                {t('service_page.located_in')} {' '}
                <span>
                  {
                    i18n.language === 'fr' ? prestationData?.villes[0]?.label : i18n.language === 'en' ? prestationData?.villes[0]?.label : prestationData?.villes[0]?.label
                  }
                </span>
              </span>
            </div>
            <div
              className="flex items-center gap-1"
            >
              <StarIcon />
              <span>
                {Math.round(prestationData?.avis_avg_rate * 10) / 10}
              </span> ({prestationData?.avis_count})
            </div>
          </div>
          {/* service title */}
          <div>
            <h1
              className="text-xl md:text-2xl font-extrabold text-gray-900 mt-2"
            >
              {prestationData?.title}
            </h1>
          </div>
          {/* service user & share & like */}
          <div
            className="my-4 flex items-center justify-between"
          >
            <UserInfoBox prestataire={prestationData?.prestataire} />
            {/* share & like */}
            <div
              className='flex gap-2'
            >
              <ShareButton prestation={prestationData} />
              <LikeButton prestation={prestationData} />
            </div>
          </div>
          {/* service pictures gallery */}
          <ThumbsGallery media={prestationData?.media} />
          {/* order box in mobile */}
          <div className='lg:hidden mt-4'>
            <OrderBox prestation={prestationData} />
          </div>
          {/* service description */}
          <div
            className="mt-4"
          >
            <h2
              className="text-xl font-bold text-gray-900"
            >
              {t('service_page.description')}
            </h2>
            <div
              className="mt-2 text-gray-700 leading-7"
            >
              {prestationData?.description}
            </div>
          </div>
          {/* service benefits */}
          <div
            className="mt-4"
          >
            <h2
              className="text-xl font-bold text-gray-900"
            >
              {t('service_page.avantages')}
            </h2>
            <div
              className="mt-2 text-gray-700 leading-7"
            >
              {prestationData?.avantage}
            </div>
          </div>
          {/* service includes */}
          <div
            className="mt-4"
          >
            <h2
              className="text-xl font-bold text-gray-900"
            >
              {t('service_page.inclus')}
            </h2>
            <ServiceIncludeList prestation={prestationData} />
          </div>
          {/* service cities */}
          <div
            className="mt-4"
          >
            <h2
              className="text-xl font-bold text-gray-900"
            >
              {t('service_page.zones_d_intervention')}
            </h2>
            <div
              className="mt-2 text-gray-700"
            >
              <div>
                <span className="text-primary-blue text-base">
                  {prestationData?.villes.map(ville => {
                    return i18n.language === 'fr' ? ville.label : i18n.language === 'en' ? ville.label : ville.label
                  }).join(', ')}
                </span>
              </div>
            </div>
          </div>
          {/* service about service owner*/}
          <div
            className="mt-4"
          >
            <h2
              className="text-xl font-bold text-gray-900"
            >
              {t('service_page.a_propos_du_vendeur')}
            </h2>
            <div
              className="mt-5 text-gray-700"
            >
              <div>
                <UserInfoBox size='medium' prestataire={prestationData?.prestataire} />
              </div>
              {/* service owner bio */}
              <div className='shadow-card-sm p-4 mt-5 rounded-sm'>
                {
                  prestationData?.prestataire?.description && (
                    <div
                      className="text-gray-700 mb-2"
                    >
                      {prestationData?.prestataire?.description}
                    </div>
                  )
                }
                <div>
                  <h3
                    className="text-lg font-bold text-gray-900"
                  >
                    {t('service_page.specialite')} & {t('service_page.metier')}
                  </h3>
                  <div
                    className="mt-2 text-gray-700"
                  >
                    <div>
                      <span className="text-primary-blue text-base">
                        {i18n.language === 'fr' ? prestationData?.prestataire?.profession?.label : i18n.language === 'en' ? prestationData?.prestataire?.profession?.label : prestationData?.prestataire?.profession?.label}
                        , {' '}
                        {i18n.language === 'fr' ? prestationData?.prestataire?.speciality?.label : i18n.language === 'en' ? prestationData?.prestataire?.speciality?.label : prestationData?.prestataire?.speciality?.label}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* service reviews */}
          <div
            className="mt-4"
          >
            <ReviewsList idService={prestationData?.id} />
          </div>
        </div>
        {/* order box sidebar */}
        <aside className='min-w-[410px] w-[410px] h-full sticky top-[92px] hidden lg:block'>
          {/* header side */}
          <div
            className='mb-4'
          >
            <div
              className='flex items-center'
            >
              <div
                className='flex items-center gap-2'
              >
                <span
                  className='text-primary-blue font-bold'
                >
                  {prestationData?.reservations_count}
                </span>
                <span>
                  {t('service_page.commandes_en_cours')}
                </span>
              </div>
            </div>
          </div>
          <OrderBox prestation={prestationData} />
          {/* contact button */}
          <div
            className="mt-4 p-4 bg-gray-50 rounded-md"
          >
            <button
              className="w-full bg-gray-400 text-white py-2 rounded-md font-bold hover:bg-primary-blue transition-all"
            >
              {t('service_page.contactez_moi')}
            </button>
          </div>
        </aside>
      </div>
      {/* similar services */}
      <div className='bg-gray-50'>
        <div className='app-container-max-xl py-10 flex flex-col gap-10'>
          <SectionHeader
            title={t('service_page.services_similaires')}
            subtitle={t('service_page.decouvrez_d_autres_services_similaires')}
          />
          {/* services list */}
          <SimilarServicesList idService={prestationData?.id} />
        </div>
      </div>
    </div>
  )
}

export default ServicePage