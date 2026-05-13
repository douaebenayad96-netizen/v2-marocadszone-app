import { Link } from "react-router-dom"
import { IoIosArrowForward } from "react-icons/io"
import { FaCheck } from "react-icons/fa"
import { useTranslation } from "react-i18next"

import BrandLogo from "../../assets/img/brand-logo-v7.png"

type CheckoutHeaderProps = {
  to: string
}

const CheckoutHeader = ({ to }: CheckoutHeaderProps) => {
  const { t } = useTranslation()
  return (
    <header className="bg-primary-white border-b border-gray-200 shadow-blue-bottom">
      {/* header */}
      <div className="app-container-max-xl flex items-stretch gap-5 lg:gap-16 min-h-[72px] py-1">
        {/* brand logo */}
        <div className="w-[150px] flex items-center -mb-[2px]">
          <Link
            to="/"
          >
            <img
              className="w-full select-none"
              draggable={false}
              src={BrandLogo} alt="Artisan Logo" />
          </Link>
        </div>
        {/* payment steps */}
        <div className="items-center gap-4 hidden md:flex">
          <div
            className="flex items-center gap-2 text-base font-medium text-gray-800"
          >
            <span className="p-1 rounded-full bg-primary-gray-500 text-primary-white">
              <FaCheck className="text-xs" />
            </span>
            <Link
              to={to}
              className="capitalize hover:underline cursor-pointer text-sm lg:text-base">
              {t('check_out_page.order_details')}
            </Link>
          </div>
          <div>
            <IoIosArrowForward />
          </div>
          <div className="flex items-center gap-2 text-base font-medium text-gray-800">
            <span className="p-1 w-5 h-5 rounded-full bg-primary-gray-500 text-primary-white flex items-center justify-center">
              2
            </span>
            <span className="capitalize text-sm lg:text-base">
              {t('check_out_page.confirm_&_Pay')}
            </span>
          </div>
          <div>
            <IoIosArrowForward />
          </div>
          <div className="flex items-center gap-2 text-base font-medium text-gray-400">
            <span className="p-1 w-5 h-5 rounded-full bg-primary-gray-500 text-primary-white flex items-center justify-center">
              3
            </span>
            <span className="capitalize text-sm lg:text-base">
              {t('check_out_page.order_confirmation')}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default CheckoutHeader