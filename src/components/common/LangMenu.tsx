import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

type MenuProps = {
  lang: string
  handleLangMenu: (lang: string) => void
}
const LangMenu = ({ lang, handleLangMenu }: MenuProps) => {
  const { t } = useTranslation()
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={`w-[160px] h-fit absolute top-[32px] ${lang === 'ar' ? 'left-0' : 'right-0'
        } bg-white dark:bg-contact-dark-primary rounded-md shadow-md z-50 border dark:border-sidebar-dark-primary py-2`}
    >
      <ul className='flex flex-col justify-center items-center h-full'>
        <li>
          <button
            onClick={() => {
              handleLangMenu('fr')
            }}
            className={`h-9 w-[160px] flex items-center justify-between px-6 hover:bg-[#F8F9FA] cursor-pointer font-[400] text-md text-[#656A70] dark:hover:bg-sidebar-dark-primary dark:text-gray-300 ${lang === 'fr' ? 'bg-[#F8F9FA]' : ''}`}
          >
            <span>
              {t('french')}
            </span>
            <span className="fi fi-fr"></span>
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              handleLangMenu('en')
            }}
            className={`h-9 w-[160px] flex items-center justify-between px-6 hover:bg-[#F8F9FA] cursor-pointer font-[400] text-md text-[#656A70] dark:hover:bg-sidebar-dark-primary dark:text-gray-300 ${lang === 'en' ? 'bg-[#F8F9FA]' : ''}`}
          >
            <span>
              {t('english')}
            </span>
            <span className="fi fi-gb"></span>
          </button>
        </li>
      </ul>
    </motion.div>
  )
}

export default LangMenu