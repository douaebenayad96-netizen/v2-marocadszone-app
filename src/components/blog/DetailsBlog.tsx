import { TJobOffer } from "../../services/types/jobOffer"
import { formatRelativeTime } from "../../utils/helpers"
import NoImage from '../../assets/img/no-image.png'
import { FaMapMarkerAlt, FaCalendarAlt, FaBuilding } from "react-icons/fa"

type JobOfferDetailsSectionProps = {
  jobOffer: TJobOffer
}

function DetailsBlog({ jobOffer }: JobOfferDetailsSectionProps) {
  console.log('DetailsBlog jobOffer:', jobOffer)
  const getImageUrl = () => {
    if (jobOffer.images && jobOffer.images.length > 0 && jobOffer.images[0].url) {
      let imageUrl = jobOffer.images[0].url;
      imageUrl = imageUrl.replace(/https?:\/\/([^/]+)\/\1\//, 'http://$1/');
      return imageUrl;
    }
    return NoImage;
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = NoImage;
  };

  return (
    <div>
      <div className="aspect-video w-full relative overflow-hidden rounded-lg shadow-card-sm">
        <img
          src={getImageUrl()}
          alt={jobOffer.title}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
        {/* Type Badge */}
        <div className="absolute top-4 left-4">
          <span className={`text-white text-sm px-3 py-1 rounded-full font-medium shadow-lg ${
            jobOffer.type === 'private' ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gradient-to-r from-green-500 to-green-600'
          }`}>
            {jobOffer.type === 'private' ? 'Secteur Privé' : 'Secteur Public'}
          </span>
        </div>
      </div>
      <div className="mt-4">
        <h1 className="title-h1 text-primary-orange">
          {jobOffer.title}
        </h1>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-2">
            <FaBuilding className="text-gray-400" />
            <span className="text-primary-orange">
              {jobOffer.type === 'private' ? 'Entreprise Privée' : 'Secteur Public'}
            </span>
          </div>
          <span className="text-gray-400">/</span>
          <div className="flex items-center gap-2 text-primary-purple-900 text-sm">
            <FaMapMarkerAlt className="text-gray-400" />
            <span>{jobOffer.city?.name || jobOffer.city?.label || 'N/A'}</span>
          </div>
          <span className="text-gray-400">/</span>
          <div className="flex items-center gap-2 text-primary-purple-900 text-sm">
            <FaCalendarAlt className="text-gray-400" />
            <span>{formatRelativeTime(jobOffer.created_at)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailsBlog