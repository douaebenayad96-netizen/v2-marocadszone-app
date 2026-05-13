import { useEffect } from "react"
import { Link } from "react-router-dom"
import { GoArrowUpRight } from "react-icons/go"
import { useTranslation } from "react-i18next"

import CustomToast from "../components/common/CustomToast"
import ThankYouPic from "../assets/img/Confirmed-bro.svg"

const ThankYouPage = () => {
  const { t, i18n } = useTranslation()
  const text = t('thankyou_page.message')

  useEffect(() => {
    CustomToast(text, 'success')
  }, [text])

  return (
    <div className="pt-nav">
      <div className="app-container min-h-[calc(100vh-72px)] flex items-center flex-col justify-center">
        <div
          className="mb-4"
        >
          <img
            className="w-60 object-contain"
            alt="logo"
            src={ThankYouPic}
          />
        </div>
        <div className="text-center">
          <h1 className="title-h1 mb-4">
            {t('thankyou_page.merci')}
          </h1>
          <p className="text-xl">
            {t('thankyou_page.text')}
          </p>
        </div>
        {/* button */}
        <div className="mt-8">
          <Link to="/user-account/reservations">
            <a className="btn-primary">
              {t('thankyou_page.button')}
              <GoArrowUpRight
                className={`text-xl ${i18n.language === 'ar' ? '-rotate-90' : '0'}`}
              />
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ThankYouPage