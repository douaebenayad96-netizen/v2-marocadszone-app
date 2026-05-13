import { Link } from 'react-router-dom'

import NotFoundPic from '../assets/img/404 Error-pana.svg'
import { useTranslation } from 'react-i18next'

const NotFoundPage = () => {
  const { t } = useTranslation()

  return (
    <div className="pt-nav h-screen flex flex-col justify-center items-center">
      <div className="w-96 flex items-center justify-center rounded-full bg-primary-gray-100">
        <img
          draggable={false}
          src={NotFoundPic}
          alt="empty"
          className="w-full h-full object-contain"
        />
      </div>
      <h3 className="text-xl font-bold text-primary-blue-all-800 mt-2">
        {t('notFoundPage.title')}
      </h3>
      <div>
        <p className="text-sm font-medium text-primary-gray-500 mt-2 text-center">
         {t('notFoundPage.subtitle')}
        </p>
      </div>
      <Link
        to="/prestataires"
        className="text-sm font-bold text-center text-primary-blue-all-800 hover:underline mt-8">
        {t('notFoundPage.button')}
      </Link>
    </div>
  )
}

export default NotFoundPage