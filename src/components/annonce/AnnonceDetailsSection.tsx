import { FaRegCalendarAlt, FaRegClock } from 'react-icons/fa'
import { FiPhoneCall } from 'react-icons/fi'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { GoShieldLock } from 'react-icons/go'
import Skeleton from 'react-loading-skeleton'
import { useTranslation } from 'react-i18next'

import SampleButton from '../ui/SampleButton'

const AnnonceDetailsSection = () => {
  const { t, i18n } = useTranslation()

  const tel = '3334029817';
  const visibleDigits = Math.floor(tel.length / 3); // Adjust this to change the number of visible digits
  const maskedTel = tel.slice(0, visibleDigits) + '*'.repeat(tel.length - 2 * visibleDigits) + tel.slice(-visibleDigits);
  const lang = i18n.language as 'fr' | 'en' | 'ar'

  return (
    <div>
      {/* specialité */}
      <div className="px-4 py-5">
        <h1
          className="title-h2 line-clamp-1"
        >
          {
            t('demande_pour') + ' '
          }
          {
            'Plombier'
          }
        </h1>
      </div>
      {/* line */}
      <div
        className="w-full bg-gray-300 h-[1px]"
      ></div>
      {/* info principal */}
      <div className='flex gap-2'>
        <div
          className="px-4 py-5 flex gap-2 items-center"
        >
          <div
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
          >
            <FaRegCalendarAlt />
          </div>
          <p>
            {
              new Date().toLocaleDateString(lang === 'fr' ? 'fr-FR' : lang === 'en' ? 'en-US' : 'ar-MA',
                {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })
            }
          </p>
        </div>
        <div
          className="px-4 py-5 flex gap-2 items-center"
        >
          <div
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
          >
            <FaRegClock />
          </div>
          <p>
            5h {t('de_service')}
          </p>
        </div>
      </div>
      {/* info details */}
      <div className="px-4">
        <h3
          className="title-h4"
        >
          {
            t('donnees_personnelles')
          }
        </h3>
        <div
          className="mt-4 flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-lg"
        >
          <div
            className="flex items-center gap-4 flex-1"
          >
            <div
              className="bg-gray-50 text-blue-500 text-lg p-3 rounded-full"
            >
              <HiOutlineLocationMarker />
            </div>
            <div
              className="flex flex-col"
            >
              <h4
                className="text-lg font-semibold"
              >
                {
                  t('adresse')
                }
              </h4>
              <p className='text-gray-500 line-clamp-2'>
                {
                  'Hay El Qods, Rabat'
                }
              </p>
            </div>
          </div>
          <div
            className="flex items-center gap-4 flex-1"
          >
            <div
              className="bg-gray-50 text-blue-500 text-lg p-3 rounded-full"
            >
              <FiPhoneCall />
            </div>
            <div
              className="flex flex-col"
            >
              <h4
                className="text-lg font-semibold"
              >
                {
                  t('form.numero_telephone')
                }
              </h4>
              <p className='text-gray-500' dir='ltr'>
                {/* hide some digits */}
                {
                  maskedTel
                }
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* button chat public & edit info */}
      <div
        className="px-4 py-5 flex justify-start gap-2 items-center"
      >
        <div className='relative'>
          <SampleButton
            text={t('modifier_les_informations')}
          />
        </div>
      </div>
      {/* votre info gonna be secured  */}
      <div
        className="px-4 py-2 bg-blue-50 flex gap-2 items-center"
      >
        <div
          className="bg-blue-50 text-blue-500 text-lg p-3 rounded-full"
        >
          <GoShieldLock className="text-2xl" />
        </div>
        <p className='text-blue-500'>
          {
            t('infos_partagees_apres_reservation')
          }
        </p>
      </div>
    </div>
  )
}

AnnonceDetailsSection.Skeleton = () => {

  return (
    <div>
      {/* specialité */}
      <div className="px-4 py-5">
        <h1
          className="title-h3 line-clamp-1"
        >
          <Skeleton />
        </h1>
      </div>
      {/* line */}
      <div
        className="w-full bg-gray-300 h-[1px]"
      ></div>
      {/* info principal */}
      <div className='flex gap-2'>
        <div
          className="px-4 py-5 flex gap-2 items-center"
        >
          <div
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
          >
            <FaRegCalendarAlt />
          </div>
          <p>
            <Skeleton width={100} />
          </p>
        </div>
        <div
          className="px-4 py-5 flex gap-2 items-center"
        >
          <div
            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
          >
            <FaRegClock />
          </div>
          <p>
            <Skeleton width={100} />
          </p>
        </div>
      </div>
      {/* info details */}
      <div className="px-4">
        <h3
          className="title-h4"
        >
          <Skeleton width={200} height={25} />
        </h3>
        <div
          className="mt-4 flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-lg"
        >
          <div
            className="flex items-center gap-4 flex-1"
          >
            <div
              className="bg-gray-50 text-blue-500 text-lg p-3 rounded-full"
            >
              <HiOutlineLocationMarker />
            </div>
            <div
              className="flex flex-col"
            >
              <h4
                className="text-lg font-semibold"
              >
                <Skeleton />
              </h4>
              <p className='text-gray-500'>
                <Skeleton />
              </p>
            </div>
          </div>
          <div
            className="flex items-center gap-4 flex-1"
          >
            <div
              className="bg-gray-50 text-blue-500 text-lg p-3 rounded-full"
            >
              <FiPhoneCall />
            </div>
            <div
              className="flex flex-col"
            >
              <h4
                className="text-lg font-semibold max-w-[200px]"
              >
                <Skeleton height={20} />
              </h4>
              <p className='text-gray-500 max-w-[200px]'>
                <Skeleton height={20} />
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* button chat public & edit info */}
      <div
        className="px-4 py-5 flex justify-start gap-2 items-center"
      >
        <button
          className="btn-secondary min-w-[200px] rounded-sm overflow-hidden text-sm relative"
        >
          <Skeleton width={'184px'} height={34} />
        </button>
      </div>
      {/* votre info gonna be secured  */}
      <div
        className="px-4 py-2 bg-blue-50 flex gap-2 items-center"
      >
        <div
          className="bg-blue-50 text-blue-500 text-lg p-3 rounded-full"
        >
          <GoShieldLock className="text-2xl" />
        </div>
        <p className='text-blue-500'>
          <Skeleton />
        </p>
      </div>
    </div>
  )
}

export default AnnonceDetailsSection