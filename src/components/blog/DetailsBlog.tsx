import { useTranslation } from "react-i18next";
import { TJobOffer } from "../../services/types/jobOffer";
import { formatRelativeTime } from "../../utils/helpers";
import NoImage from '../../assets/img/no-image.png';
import { FaMapMarkerAlt, FaCalendarAlt, FaBuilding } from "react-icons/fa";

type JobOfferDetailsSectionProps = {
  jobOffer: TJobOffer;
};

function DetailsBlog({ jobOffer }: JobOfferDetailsSectionProps) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  console.log('DetailsBlog jobOffer:', jobOffer);

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

  // Fonction pour traduire le type de secteur
  const getSectorText = (type: string) => {
    const lang = i18n.language;
    if (type === 'private') {
      if (lang === 'ar') return "قطاع خاص";
      if (lang === 'en') return "Private Sector";
      return "Secteur Privé";
    }
    if (lang === 'ar') return "قطاع عام";
    if (lang === 'en') return "Public Sector";
    return "Secteur Public";
  };

  // Fonction pour traduire le type d'entreprise
  const getCompanyText = (type: string) => {
    const lang = i18n.language;
    if (type === 'private') {
      if (lang === 'ar') return "شركة خاصة";
      if (lang === 'en') return "Private Company";
      return "Entreprise Privée";
    }
    if (lang === 'ar') return "قطاع عام";
    if (lang === 'en') return "Public Sector";
    return "Secteur Public";
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
        <div className={`absolute top-4 ${isRTL ? "right-4" : "left-4"}`}>
          <span className={`text-white text-sm px-3 py-1 rounded-full font-medium shadow-lg ${
            jobOffer.type === 'private' ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gradient-to-r from-green-500 to-green-600'
          }`}>
            {getSectorText(jobOffer.type)}
          </span>
        </div>
      </div>
      <div className="mt-4">
        <h1 className={`title-h1 text-primary-orange ${isRTL ? "text-right" : "text-left"}`}>
          {jobOffer.title}
        </h1>
        <div className={`flex items-center gap-4 mt-2 ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
          <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
            <FaBuilding className="text-gray-400" />
            <span className="text-primary-orange">
              {getCompanyText(jobOffer.type)}
            </span>
          </div>
          <span className="text-gray-400">/</span>
          <div className={`flex items-center gap-2 text-primary-purple-900 text-sm ${isRTL ? "flex-row-reverse" : ""}`}>
            <FaMapMarkerAlt className="text-gray-400" />
            <span>{jobOffer.city?.name || jobOffer.city?.label || 'N/A'}</span>
          </div>
          <span className="text-gray-400">/</span>
          <div className={`flex items-center gap-2 text-primary-purple-900 text-sm ${isRTL ? "flex-row-reverse" : ""}`}>
            <FaCalendarAlt className="text-gray-400" />
            <span>{formatRelativeTime(jobOffer.created_at)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsBlog;