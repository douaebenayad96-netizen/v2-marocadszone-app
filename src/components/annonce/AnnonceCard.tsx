import { FiMapPin } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import { Annonce } from '../../services/types/annonce'
import FirebaseImage from '../common/FirebaseImage'
import { formatTimeAgoFr } from '../../utils/timeAgo'


interface AnnonceCardProps {
  annonce: Annonce
  showDistance?: boolean
}

const AnnonceCard = ({ annonce, showDistance = false }: AnnonceCardProps) => {
  // const [isFavorite, setIsFavorite] = useState(false)
  // const [isLoadingFavorite, setIsLoadingFavorite] = useState(false)

  // const handleFavoriteClick = async (e: React.MouseEvent) => {
  //   e.preventDefault()
  //   e.stopPropagation()
    
  //   if (!token) {
  //     // Redirect to login or show login modal
  //     return
  //   }

  //   setIsLoadingFavorite(true)
  //   try {
  //     // TODO: Implement favorite toggle API call
  //     setIsFavorite(!isFavorite)
  //   } catch (error) {
  //     console.error('Error toggling favorite:', error)
  //   } finally {
  //     setIsLoadingFavorite(false)
  //   }
  // }
  const getAnnonceDetailBadge = () => {
    if (!annonce.item_condition) return null

    if (annonce.item_condition === 'new') return 'Neuf'
    if (annonce.item_condition === 'used') return 'Occasion'
    if (annonce.item_condition === 'good_condition') return 'Bon état'

    if (annonce.item_condition === 'rental_day') return 'Jour'
    if (annonce.item_condition === 'rental_week') return 'Semaine'
    if (annonce.item_condition === 'rental_month') return 'Mois'

    if (annonce.item_condition === 'service_hour') return 'Heure'
    if (annonce.item_condition === 'service_day') return 'Jour'
    if (annonce.item_condition === 'service_mission') return 'Mission'

    return annonce.item_condition
  }

  const getImageUrl = () => {
    // Handle Firebase URLs (array of strings)
    if (annonce.image_urls && Array.isArray(annonce.image_urls) && annonce.image_urls.length > 0) {
      return annonce.image_urls[0]
    }
    // Fallback for old Spatie Media format
    if (annonce.images && annonce.images.length > 0) {
      const firstImage = annonce.images[0]
      return firstImage.original_url || firstImage.preview_url || firstImage.url || firstImage.path || '/placeholder-image.jpg'
    }
    return '/placeholder-image.jpg'
  }

  const DefaultUserIcon = () => (
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-200">
      <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
      </svg>
    </span>
  )

  return (
    <Link to={`/annonces/${annonce.slug || annonce.id}`} className="block group">
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
          {getImageUrl().includes('firebasestorage.googleapis.com') ? (
            <FirebaseImage
              src={getImageUrl()}
              alt={annonce.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <img
              src={getImageUrl()}
              alt={annonce.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
          
          {/* Favorite Button
          <button
            onClick={handleFavoriteClick}
            disabled={isLoadingFavorite}
            className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full transition-colors duration-200 disabled:opacity-50"
          >
            {isFavorite ? (
              <FaHeart className="w-4 h-4 text-red-500" />
            ) : (
              <FiHeart className="w-4 h-4 text-gray-600" />
            )}
          </button>       */}
              {/* Status Badge
          <div className="absolute top-3 left-3">
            <span className={`text-white text-xs px-2 py-1 rounded-full ${
              annonce.status === 'approved' ? 'bg-green-500' : 
              annonce.status === 'pending' ? 'bg-yellow-500' : 'bg-gray-500'
            }`}>
              {t(`annonces.status.${annonce.status}`, annonce.status_label || '')}
            </span>
          </div> */}

          {/* Distance Badge */}
          {showDistance && annonce.distance && (
            <div className="absolute bottom-3 left-3">
              <span className="bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <FiMapPin className="w-3 h-3" />
                {annonce.distance.toFixed(1)} km
              </span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4">
          {/* Category */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {annonce.subcategory?.category?.label || 'N/A'}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primaryCoral transition-colors duration-200">
            {annonce.title}
          </h3>

          {/* Announce Type, Item Condition, Price */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {annonce.announce_type && (
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                {annonce.announce_type === 'sale' ? 'Vente' : annonce.announce_type === 'rental' ? 'Location' : annonce.announce_type}
              </span>
            )}
            {getAnnonceDetailBadge() && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                {getAnnonceDetailBadge()}
              </span>
            )}

            {typeof annonce.price !== 'undefined' && annonce.price !== null && annonce.price !== '' && (
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                {Number(annonce.price).toLocaleString()} DH
              </span>
            )}
          </div>

          {/* Provider Info */}
          <div className="flex items-center gap-2 mb-3">
            {annonce.user?.avatar ? (
              annonce.user.avatar.includes('firebasestorage.googleapis.com') ? (
                <FirebaseImage
                  src={annonce.user.avatar}
                  alt={`${annonce.user?.first_name || ''} ${annonce.user?.last_name || ''}`}
                  className="w-6 h-6 rounded-full object-cover"
                />
              ) : (
                <img
                  src={annonce.user.avatar}
                  alt={`${annonce.user?.first_name || ''} ${annonce.user?.last_name || ''}`}
                  className="w-6 h-6 rounded-full object-cover"
                />
              )
            ) : (
              <DefaultUserIcon />
            )}
            <span className="text-sm text-gray-600 truncate">
              {annonce.user?.first_name || ''} {annonce.user?.last_name || ''}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1 mb-3">
            <FiMapPin className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600 truncate">
              {annonce.city?.label || 'N/A'}, {annonce.country?.label || 'N/A'}
            </span>
          </div>

          {/* Contact */}
          {/* <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <FiPhone className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{annonce.formatted_phone_number}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiMail className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">{annonce.email}</span>
            </div>
          </div> */}
          
          {/* Date */}
          <div className="flex items-center justify-end mt-2">
            <span className="text-xs text-gray-500">
              {formatTimeAgoFr(annonce.created_at)}
            </span>
          </div>

        </div>
      </div>
    </Link>
  )
}

export default AnnonceCard