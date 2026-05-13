import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"


import NoImage from "../assets/img/no-image.png"
import UserInfoBox from "../account/UserInfoBox"
import { Prestation } from "../../services/types/prestation"
import StarIcon from "../ui/StarIcon"

type ServiceCardProps = {
  prestation: Prestation
}

const ServiceCard = ({ prestation }: ServiceCardProps) => {
  const { t } = useTranslation()

  return (
    <div className="rounded-md overflow-hidden shadow-card-sm hover:shadow-card-shadow-border transition-all select-none">
      <Link
        to={`/service/${prestation?.id}`}
        className="aspect-video block"
      >
        <img
          className="object-cover w-full h-full"
          src={prestation?.media && prestation?.media[0]?.original_url ? prestation?.media[0]?.original_url : NoImage}
          alt="Service picture"
        />
      </Link>
      <div>
        <div className="px-3 py-3 space-y-3 bg-white">
          <UserInfoBox prestataire={prestation?.prestataire} />
          <div
          >
            <Link
              to={`/service/${prestation?.id}`}
              className="text-md font-medium text-gray-900 line-clamp-2 min-h-[48px] hover:underline"
            >
              {prestation?.title}
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <StarIcon />
              <span className="text-sm text-gray-500">
                {Math.round(prestation?.avis_avg_rate * 10) / 10}
              </span>
            </div>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-500">
              {prestation?.avis_count} {t('home.services.avis')}
            </span>
          </div>
          <div className="text-sm font-medium text-gray-900">
            {prestation?.tarification != 'Service' ? t('home.services.a_partir_de') : t('home.services.prix_fixe')}
            {' '}
            <span className="text-green-500 font-semibold">
              {Math.floor(prestation?.price)} {t('MAD')}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard