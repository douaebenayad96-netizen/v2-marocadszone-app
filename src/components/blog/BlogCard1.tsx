import { Link } from "react-router-dom";
import NoImage from './../../assets/img/no-image.png';
import { FaMapMarkerAlt, FaCalendarAlt, FaBuilding } from "react-icons/fa";
import { TJobOffer } from "../../services/types/jobOffer";
import { formatRelativeTime } from "../../utils/helpers";

type JobOfferBlogCardProps = {
  jobOffer: TJobOffer;
};

function JobOfferBlogCard({ jobOffer }: JobOfferBlogCardProps) {
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
    <div className="group bg-white rounded-md shadow-card-sm hover:shadow-card-shadow-border transition-all duration-300 overflow-hidden h-full flex flex-col">
      {/* Image with overlay */}
      <div className="relative h-48 overflow-hidden">
        <Link to={`/offres/${jobOffer.slug}`} className="block h-full">
          <img
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            src={getImageUrl()}
            alt={jobOffer.title}
            loading="lazy"
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
        </Link>

        {/* Top-right badge */}
        <div className="absolute top-3 right-3 bg-white/90 text-primary-orange px-3 py-1 rounded-full text-xs font-bold shadow-sm backdrop-blur-sm flex items-center gap-1">
          <FaCalendarAlt className="text-xs" />
          <span>{formatRelativeTime(jobOffer.created_at)}</span>
        </div>

        {/* Type Badge */}
        <div className="absolute top-3 left-3">
          <span className={`text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg ${
            jobOffer.type === 'private' ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gradient-to-r from-green-500 to-green-600'
          }`}>
            {jobOffer.type === 'private' ? 'Privé' : 'Public'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Title */}
        <Link to={`/offres/${jobOffer.slug}`}>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-orange transition-colors duration-200 mb-2 line-clamp-2">
            {jobOffer.title}
          </h3>
        </Link>

        {/* Company and Location */}
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <FaBuilding className="mr-1.5 text-gray-400" />
          <span className="mr-4">{jobOffer.type === 'private' ? 'Entreprise Privée' : 'Secteur Public'}</span>
          <FaMapMarkerAlt className="mr-1.5 text-gray-400" />
          <span>{jobOffer.city?.name || jobOffer.city?.label || 'N/A'}</span>
        </div>

        {/* Description */}
        <div className="text-gray-600 text-sm mb-4 line-clamp-3">
          {jobOffer.description?.substring(0, 120) || 'Aucune description disponible'}
        </div>

        {/* Apply Button */}
        <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between items-center">
          <Link
            to={`/offres/${jobOffer.slug}`}
            className="px-4 py-2 bg-primary-orange hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-sm"
          >
            Voir l'offre
          </Link>
        </div>
      </div>
    </div>
  );
}

export default JobOfferBlogCard;