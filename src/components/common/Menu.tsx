import { AnimatePresence, motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { RiLogoutCircleRLine, RiUserLine } from "react-icons/ri"
import { useTranslation } from "react-i18next"

import { useLogout } from "../../hooks/useLogout"
import { Role } from "../../services/types/user"

type MenuProps = {
  isOpen: boolean
  roles: Role[] | null
}

const Menu = ({ isOpen }: MenuProps) => {
  const { t, i18n } = useTranslation()
  const logout = useLogout()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={`min-w-[200px] h-fit absolute top-[-145px] ${i18n.language === 'ar' ? 'left-[-150px]' : 'right-[-150px]'} bg-white rounded-md shadow-md z-50 border py-2`}
        >
          <ul className='flex flex-col justify-center items-center h-full'>
            <li>
              <Link
                to='/user-account/profile'
                className='h-9 min-w-[200px] flex items-center justify-between px-6 hover:bg-[#F8F9FA] cursor-pointer font-[400] text-md text-[#656A70]'
              >
                <span>
                  {t('profile.profile.tooltip')}
                </span>
                <RiUserLine />
              </Link>
            </li>
            {/* <li>
              <Link
                to='/user-account/reservations'
                className='h-9 min-w-[200px] flex items-center justify-between px-6 hover:bg-[#F8F9FA] cursor-pointer font-[400] text-md text-[#656A70]'
              >
                <span>
                  {t('profile.reservations.tooltip')}
                </span>
                <RiSurveyLine />
              </Link>
      </li>
            <li>
              <Link
                to={import.meta.env.VITE_APP_URL}
                target='_blank'
                // onClick={onClick}
                className={`h-9 min-w-[200px] flex items-center justify-between px-6 hover:bg-[#F8F9FA] cursor-pointer font-[400] text-md text-[#656A70]`}
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
            </li>*/}
            <li>
              <hr className='border-gray-200 dark:border-[#3A3B3C] min-w-[200px] my-2' />
            </li>
            <li
              onClick={handleLogout}
              className='h-9 w-full flex items-center justify-between px-6 hover:bg-[#F8F9FA] cursor-pointer font-[400] text-md text-[#656A70]'
            >
              <span>
                {t('se_deconnecter')}
              </span>
              <RiLogoutCircleRLine />
            </li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Menu