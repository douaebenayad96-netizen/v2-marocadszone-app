import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa'
import { LuSend } from 'react-icons/lu'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import { useTranslation } from 'react-i18next'

import { usePrestataire } from '../services/api/fetchPrestataire'
import UserInfoBoxSkeleton from '../components/ui/skeletons/UserInfoBoxSkeleton'
import PrestataireChatBox from '../components/chat/PrestataireChatBox'
import { useAuthStore } from '../services/store/authStore'
import CustomToast from '../components/common/CustomToast'
import { useLoginModelStore } from '../services/store/LoginModelStore'
import UserInfoBox from '../components/account/UserInfoBox'
import PrestataireServicesList from '../components/annonce/PrestataireServicesList'
import SectionHeader from '../components/layouts/SectionHeader'

const PrestatairePage = () => {
  const { t, i18n } = useTranslation()
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: prestataire, isLoading, isError, refetch } = usePrestataire(id as unknown as number, false)
  const [isChatBoxOpen, setIsChatBoxOpen] = useState(false)
  const user = useAuthStore(state => state.user)
  const openLoginModel = useLoginModelStore(state => state.openLoginModel)

  useEffect(() => {
    if (id) {
      refetch()
    }
  }, [id, refetch])

  const handleContactMe = () => {
    if (user) {
      setIsChatBoxOpen(true)
    } else {
      openLoginModel()
      CustomToast(t('vous_devez_vous_connecter_pour_continuer'), 'info')
    }
  }

  if (isError) {
    navigate('/404')
  }

  return (
    <div className="pt-nav">
      <div
        className="app-container page-py"
      >
        {/* user info */}
        <div className='flex justify-between flex-col'>
          {/* user details */}
          <div className='flex justify-between'>
            {/* user info */}
            {isLoading ? <UserInfoBoxSkeleton size='large' /> : <UserInfoBox size='large' previewOnly prestataire={prestataire} />}
            {/* like & contact btn */}
            <div className='flex flex-col lg:flex-row items-center gap-1'>
              {/* contact btn */}
              <button
                onClick={handleContactMe}
                className="btn-primary cursor-pointer min-h-[40px] flex items-center justify-center gap-2"
              >
                <LuSend className="text-2xl lg:text-xl" />
                <span className='hidden lg:inline'>
                  {t('contact_me')}
                </span>
              </button>
              {/* like */}
              {/* <div
                className="cursor-pointer px-4 text-primary-blue rounded-md py-2 bg-gray-50 font-bold hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
              >
                <LuHeart className="text-2xl" />
              </div> */}
            </div>
          </div>
        </div>
        <div className='flex flex-col lg:flex-row justify-between items-start lg:gap-16'>
          <div className='flex-1'>
            {/* about */}
            <div
              className="mt-4"
            >
              <h3
                className="title-h3"
              >
                {
                  isLoading ? <Skeleton height={20} width={100} /> : t('a_propos_de_moi')
                }
              </h3>
              <h4 className="text-gray-800 mt-2 font-medium">
                {isLoading ?
                  <Skeleton height={20} />
                  :
                  t('je_suis_un_prestataire')
                }
              </h4>
              <div
                className="text-gray-700 mt-2 line-clamp-3"
              >
                {isLoading ?
                  <>
                    <div className='w-full max-w-[592px]'>
                      <Skeleton height={20} count={2} />
                      <div className='w-1/2'>
                        <Skeleton height={20} />
                      </div>
                    </div>
                  </>
                  :
                  prestataire?.description ? prestataire?.description : t('prestataire_description')
                }
              </div>
            </div>
          </div>

          {/* contact details */}
          <div className='flex-1 flex flex-col lg:flex-row lg:gap-16'>
            {
              isLoading && (
                <div className='flex-1 mt-4 max-w-[150px]'>
                  <div className='flex flex-col gap-4 mt-2 '>
                    <Skeleton height={20} />
                    <div>
                      <Skeleton height={20} />
                      <Skeleton height={20} />
                    </div>
                  </div>
                </div>
              )
            }
            {
              (prestataire?.pubtel || prestataire?.pubemail) &&
              <div className="mt-4">
                <h3
                  className="title-h3"
                >
                  {t('contact_details')}
                </h3>
                {
                  prestataire?.pubtel &&
                  <div
                    className="flex items-center gap-2 mt-2"
                  >
                    <div
                      className="bg-primary-blue-all-500 text-white rounded-full p-1 text-xs"
                    >
                      <FaPhoneAlt />
                    </div>
                    <span
                      className="text-gray-900 font-medium"
                    >
                      {prestataire?.pubtel}
                    </span>
                  </div>
                }
                {
                  prestataire?.pubemail &&
                  <div
                    className="flex items-center gap-2 mt-2"
                  >
                    <div
                      className="bg-primary-blue-all-500 text-white rounded-full p-1 text-xs"
                    >
                      <FaEnvelope />
                    </div>
                    <span
                      className="text-gray-900 font-medium"
                    >
                      {prestataire?.pubemail}
                    </span>
                  </div>
                }
              </div>
            }

            {/* expert on */}
            {
              isLoading && (
                <div className='flex-1 mt-4 max-w-[150px]'>
                  <div className='flex flex-col gap-4 mt-2 '>
                    <Skeleton height={20} />
                    <div>
                      <Skeleton height={20} />
                      <Skeleton height={20} />
                    </div>
                  </div>
                </div>
              )
            }
            {
              prestataire?.speciality && (
                <div
                  className="mt-4"
                >
                  <h3
                    className="title-h3"
                  >
                    {t('expert_on')}
                  </h3>
                  <div
                    className="flex gap-2 mt-2"
                  >
                    <span
                      className="text-primary-blue text-base flex items-center gap-1"
                    >
                      {
                        i18n.language === 'fr' && prestataire?.speciality?.label
                      }
                      {
                        i18n.language === 'en' && prestataire?.speciality?.label
                      }
                      {
                        i18n.language === 'ar' && prestataire?.speciality?.label
                      }, {' '}
                      {
                        i18n.language === 'fr' && prestataire?.profession?.label
                      }
                      {
                        i18n.language === 'en' && prestataire?.profession?.label
                      }
                      {
                        i18n.language === 'ar' && prestataire?.profession?.label
                      }
                    </span>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>

      {/* services section */}
      <div className='bg-gray-50 page-py min-h-[60vh]'>
        <div className='app-container'>
          {/* Prestataire services */}
          <div
          >
            <SectionHeader
              title={t('mes_services')}
              subtitle={t('mes_services_subtitle')}
            />
            {/* services */}
            {
              <PrestataireServicesList prestataire={prestataire} />
            }
          </div>
        </div>
      </div>

      {/* PrestataireChatBox */}
      {
        prestataire && (
          <PrestataireChatBox
            prestataire={prestataire}
            isOpen={isChatBoxOpen}
            onClosed={() => {
              setIsChatBoxOpen(false)
            }}
          />
        )
      }
    </div>
  )
}

export default PrestatairePage