import { FiMapPin, FiClock, FiBriefcase, FiExternalLink } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import { TJobOffer } from '../../services/types/jobOffer'
import { formatRelativeTime } from '../../utils/helpers'

interface JobOfferCardProps {
  jobOffer: TJobOffer
  showDistance?: boolean
}

const JobOfferCard = ({ jobOffer, showDistance = false }: JobOfferCardProps) => {  // Placeholder image SVG
  const PLACEHOLDER_IMAGE = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23f3f4f6"/><text x="200" y="150" text-anchor="middle" font-family="Arial" font-size="16" fill="%236b7280">Image non disponible</text></svg>';

  const getImageUrl = () => {
    if (jobOffer.images && jobOffer.images.length > 0 && jobOffer.images[0].url) {
      let imageUrl = jobOffer.images[0].url;
      
      // Fix the duplicate domain issue: http://127.0.0.1:8000/127.0.0.1/storage/... -> http://127.0.0.1:8000/storage/...
      imageUrl = imageUrl.replace(/https?:\/\/([^/]+)\/\1\//, 'http://$1/');
      
      return imageUrl;
    }
    return PLACEHOLDER_IMAGE;
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = PLACEHOLDER_IMAGE;
  };

  const handleApplyClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (jobOffer.redirect_to) {
      window.open(jobOffer.redirect_to, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <Link to={`/emploi/${jobOffer.id}`} className="block group">
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200">        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={getImageUrl()}
            alt={jobOffer.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={handleImageError}
          />
          
          {/* Type Badge */}
          <div className="absolute top-3 left-3">
            <span className={`text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg ${
              jobOffer.type === 'private' ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gradient-to-r from-green-500 to-green-600'
            }`}>
              {jobOffer.type === 'private' ? 'Privé' : 'Public'}
            </span>
          </div>

          {/* Distance Badge */}
          {showDistance && (
            <div className="absolute bottom-3 left-3">
              <span className="bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <FiMapPin className="w-3 h-3" />
                N/A km
              </span>
            </div>
          )}

          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Content Section */}
        <div className="p-4">          {/* Category & Date */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full font-medium">
              Offre d'Emploi
            </span>
            <span className="text-xs text-gray-500 flex items-center" title={new Date(jobOffer.created_at).toLocaleDateString('fr-FR', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}>
              <FiClock className="w-3 h-3 mr-1" />
              {formatRelativeTime(jobOffer.created_at)}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 text-lg leading-tight">
            {jobOffer.title}
          </h3>

          {/* Company Info */}
          <div className="flex items-center gap-2 mb-3">            <div className="w-6 h-6 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
              <FiBriefcase className="w-3 h-3 text-gray-600" />
            </div>
            <span className="text-sm text-gray-600 truncate">
              {jobOffer.type === 'private' ? 'Entreprise Privée' : 'Secteur Public'}
            </span>
          </div>          {/* Description */}
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {jobOffer.description}
          </p>

          {/* Location */}
          <div className="flex items-center gap-2 mb-4">
            <FiMapPin className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600 truncate">
              {jobOffer.city?.name || jobOffer.city?.label || 'N/A'}
            </span>
          </div>
          
          {/* Action Button */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <span className="text-xs text-gray-500">
              Voir les détails
            </span>
            {jobOffer.redirect_to && (
              <button
                onClick={handleApplyClick}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-md transition-colors duration-200 flex items-center gap-1 font-medium"
              >
                <FiExternalLink className="w-3 h-3" />
                Postuler
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default JobOfferCard
