import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const CheckoutFooter = () => {
  const { t } = useTranslation()

  return (
    <footer className="bg-primary-white border-t border-gray-200 shadow-orange-top">
      <div className="app-container-max-xl flex items-center gap-1 py-4">
        <div
          className="text-gray-800 text-sm"
        >
          {t('footer_pay.text')}  {" "}
          <Link
            to="/terms"
            className="text-primary-blue-all-500 text-sm font-medium hover:underline"
          >
            {t('footer_pay.terms')}
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default CheckoutFooter