import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { RiLoader4Line } from 'react-icons/ri'
import { useTranslation } from 'react-i18next'
import getLocalized from '../../utils/getLocalized'

import { City } from '../../services/types/city'

interface UserMetier {
  label: string;
  value: string;
}

type UserWithExtras = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  metier?: UserMetier;
  city?: City | string;
  online?: boolean;
  media?: Array<{ original_url: string }>;
  avgRating?: number;
  totalAvis?: number;
}

interface UserInfoBoxProps {
  prestataire?: UserWithExtras;
  annonce?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  size?: 'small' | 'medium' | 'medlarg' | 'large';
  previewOnly?: boolean;
  isLoading?: boolean;
  error?: Error;
  to?: string;
}

const UserInfoBox = ({ 
  prestataire, 
  annonce,
  size = 'small', 
  previewOnly = false,
  isLoading = false,
  error,
  to = '#'
}: UserInfoBoxProps) => {
  const data = annonce || prestataire
  const { t } = useTranslation()
  const [imageError, setImageError] = useState<boolean>(false)
  const [showPhone, setShowPhone] = useState(false)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-24">
        <RiLoader4Line className="animate-spin text-primary-blue text-3xl" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        {error.message}
      </div>
    )
  }

  if (!data) {
    return null
  }

  const metier = getLocalized(data.metier, 'label') || getLocalized(data.subcategory?.category, 'label') || getLocalized(data.category, 'label') || data.subcategory?.category?.name || data.category?.name
  const city = typeof data.city === 'string' ? data.city : getLocalized(data.city, 'label') || data.city?.name
  const avatar = data.media?.[0]?.original_url || '/default-avatar.png'

  const renderRatingDisplay = () => {
    if (!data.avgRating) return null
    return (
      <div className="flex items-center gap-1 text-sm">
        <span className="text-yellow-400">★</span>
        <span>{Math.round(data.avgRating * 10) / 10}</span>
        {data.totalAvis && (
          <span className="text-gray-500">
            ({data.totalAvis})
          </span>
        )}
      </div>
    )
  }

  if (size === 'small') {
    return (
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={imageError ? '/default-avatar.png' : avatar}
            alt={`${data.first_name || data.user?.first_name || 'User'} ${data.last_name || data.user?.last_name || ''}`}
            onError={() => setImageError(true)}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white"
            style={{ 
              backgroundColor: data.online ? '#22c55e' : '#ef4444'
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <Link to={to} className="font-semibold text-gray-900 hover:underline truncate block">
            {data.first_name || data.user?.first_name || 'User'} {data.last_name || data.user?.last_name || ''}
          </Link>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="truncate">
              {metier || t('no_metier')}
            </span>
            {city && (
              <>
                <span className="text-xs">•</span>
                <span className="truncate">
                  {city}
                </span>
              </>
            )}
          </div>
          {renderRatingDisplay()}
        </div>
      </div>
    )
  }

  if (size === 'medium' && previewOnly) {
    return (
      <div className="flex flex-col gap-3">
        <div className='flex flex-col md:items-center gap-3 md:flex-row md:gap-4'>
          {data.phone_number && (
            <div className="flex-1 min-w-0">
              {!showPhone ? (
                <button
                  onClick={() => setShowPhone(true)}
                  className="inline-flex items-center justify-center w-full gap-2 px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 bg-primary-orange rounded-lg hover:bg-orange-600 focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 shadow-sm"
                >
                  <FontAwesomeIcon icon={faPhone} className="w-4 h-4" />
                  <span>{t("annonce_details.show_number")}</span>
                </button>
              ) : (
                <a
                  href={`tel:${data.phone_number}`}
                  className="inline-flex items-center justify-center w-full gap-2 px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 bg-green-600 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-300 focus:ring-offset-2 shadow-sm"
                >
                  <FontAwesomeIcon icon={faPhone} className="w-4 h-4" />
                  <span className="truncate">{data.phone_number}</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

  return null
}

export default UserInfoBox