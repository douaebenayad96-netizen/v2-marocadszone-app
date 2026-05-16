import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useWindowSize } from '@uidotdev/usehooks'
import { useTranslation } from 'react-i18next'

import { useLogout } from '../../hooks/useLogout'
import { Role } from '../../services/types/user'

type ProfileMenuProps = {
  currentLanguage: string
  onClick?: () => void
  roles: Role[] | null
}

const ProfileMenu = ({ currentLanguage, onClick }: ProfileMenuProps) => {
  const { t } = useTranslation()
  const logout = useLogout()
  const [direction, setDirection] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const width = useWindowSize().width
  const navigate = useNavigate()


  useEffect(() => {
    if (width && width < 768) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }, [width])

  useEffect(() => {
    if (currentLanguage === 'ar' && isMobile) {
      setDirection(true);
    } else if (currentLanguage != 'ar' && isMobile) {
      setDirection(false);
    } else if (currentLanguage === 'ar' && !isMobile) {
      setDirection(false);
    } else if (currentLanguage != 'ar' && !isMobile) {
      setDirection(true);
    }
  }, [currentLanguage, isMobile]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={`min-w-[220px] h-fit absolute top-[46px] ${direction ? 'right-0' : 'left-0'
        } bg-white dark:bg-contact-dark-primary rounded-md shadow-md z-[999999] border dark:border-sidebar-dark-primary py-1`}
    >
      <ul className='flex flex-col justify-center h-full'>
        <li>
          <Link
            to='/user-account/dashboard'
            onClick={() => {
              onClick?.()
            }}
            className={`h-9 min-w-max flex items-center justify-between px-6 hover:bg-[#F8F9FA] cursor-pointer font-[400] text-md text-[#656A70]`}
          >
            <span>
              {t('votre_compte')}
            </span>
          </Link>
        </li>
        <li>
          <Link
to='/annonces/new?skipType=1'
            onClick={() => {
              onClick?.()
            }}
            className={`h-9 min-w-max flex items-center justify-between px-6 hover:bg-[#F8F9FA] cursor-pointer font-[400] text-md text-[#656A70]`}
          >
            <span>{t('publier_annonce')}</span>
          </Link>
        </li>
        <li>
          <Link
            to='/user-account/annonces-video?add=true'
            onClick={() => {
              onClick?.()
            }}
            className={`h-9 min-w-max flex items-center justify-between px-6 hover:bg-[#F8F9FA] cursor-pointer font-[400] text-md text-[#656A70]`}
          >
            <span>
              Publier une vidéo
            </span>
          </Link>
        </li>
        <li>
          <Link
            to='/user-account/company'
            onClick={onClick}
            className={`h-9 min-w-max flex items-center justify-between px-6 hover:bg-[#F8F9FA] cursor-pointer font-[400] text-md text-[#656A70]`}
          >
            <span>Publier dans l'Annuaire</span>
          </Link>
        </li>
        {/*<li>
          <Link
            to='/user-account/demandes'
            onClick={onClick}
            className={`h-9 min-w-max flex items-center justify-between px-6 hover:bg-[#F8F9FA] cursor-pointer font-[400] text-md text-[#656A70]`}
          >
            <span>
              {t('vos_demandes')}
            </span>
          </Link>
        </li>
        <li>
          <Link
            to='/user-account/messages'
            onClick={onClick}
            className={`h-9 min-w-max flex items-center justify-between px-6 hover:bg-[#F8F9FA] cursor-pointer font-[400] text-md text-[#656A70]`}
          >
            <span>
              {t('messages')}
            </span>
          </Link>
        </li>
        <li>
          <Link
            to={import.meta.env.VITE_APP_URL}
            target='_blank'
            onClick={onClick}
            className={`h-9 min-w-max flex items-center justify-between px-6 hover:bg-[#F8F9FA] cursor-pointer font-[400] text-md text-[#656A70]`}
          >
            <span>
              {
                roles?.map(role => role.name).includes('User_Prestataire') ?
                  t('passer_a_la_vente')
                  :
                  t('devenez-prestataire')
              }
            </span>
          </Link>
        </li>
        <li>
          <div
            className='h-[1px] min-w-max bg-[#E5E7EB]'
          ></div>
            </li>*/}
        <li>
          <button
            onClick={() => {
              logout()
              navigate('/')
              onClick && onClick()
            }}
            className={`h-9 min-w-max w-full flex items-center justify-between px-6 hover:bg-[#F8F9FA] cursor-pointer font-[400] text-md text-[#656A70]`}
          >
            <span>
              {t('se_deconnecter')}
            </span>
          </button>
        </li>
      </ul>
    </motion.div>
  )
}

export default ProfileMenu