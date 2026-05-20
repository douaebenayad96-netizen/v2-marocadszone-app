import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import NoImage from './../../assets/img/no-image.png';
import { FaMapMarkerAlt, FaCalendarAlt, FaBuilding } from "react-icons/fa";
import { TJobOffer } from "../../services/types/jobOffer";
import { formatRelativeTime } from "../../utils/helpers";

type JobOfferBlogCardProps = {
  jobOffer: TJobOffer;
};

function JobOfferBlogCard({ jobOffer }: JobOfferBlogCardProps) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const getImageUrl = () => {
    const image =
      jobOffer.images?.[0]?.url ||
      jobOffer.images?.[0]?.original_url ||
      jobOffer.images?.[0]?.preview_url ||
      jobOffer.media?.[0]?.original_url ||
      jobOffer.media?.[0]?.url;

    if (!image) return NoImage;

    return image
      .replace(/https?:\/\/([^/]+)\/\1\//, "https://$1/")
      .replace("http://app.maison-savoy.store", "https://app.maison-savoy.store");
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = NoImage;
  };

  return (
    <div className={`group bg-white rounded-md shadow-card-sm hover:shadow-card-shadow-border transition-all duration-300 overflow-hidden h-full flex flex-col ${isRTL ? "rtl" : ""}`}>
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

        {/* Top-right badge (time) - en RTL: left, en LTR: right */}
        <div className={`absolute top-3 ${isRTL ? "left-3" : "right-3"} bg-white/90 text-primary-orange px-3 py-1 rounded-full text-xs font-bold shadow-sm backdrop-blur-sm flex items-center gap-1`}>
          <FaCalendarAlt className="text-xs" />
          <span>{formatRelativeTime(jobOffer.created_at)}</span>
        </div>

        {/* Type Badge (Private/Public) - en RTL: right, en LTR: left */}
        <div className={`absolute top-3 ${isRTL ? "right-3" : "left-3"}`}>
          <span className={`text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg ${
            jobOffer.type === 'private' ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gradient-to-r from-green-500 to-green-600'
          }`}>
            {jobOffer.type === 'private' ? t("job_card.private") : t("job_card.public")}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Title - en RTL: text-right, en LTR: text-left */}
        <Link to={`/offres/${jobOffer.slug}`}>
          <h3 className={`text-lg font-bold text-gray-900 group-hover:text-primary-orange transition-colors duration-200 mb-2 line-clamp-2 ${isRTL ? "text-right" : "text-left"}`}>
            {jobOffer.title}
          </h3>
        </Link>

        {/* Company and Location - en RTL: flex-row-reverse */}
        <div className={`flex items-center text-sm text-gray-600 mb-3 ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
          <FaBuilding className={`${isRTL ? "ml-1.5" : "mr-1.5"} text-gray-400`} />
          <span className={isRTL ? "ml-4" : "mr-4"}>
            {jobOffer.type === 'private' ? t("job_card.private_company") : t("job_card.public_sector")}
          </span>
          <FaMapMarkerAlt className={`${isRTL ? "ml-1.5" : "mr-1.5"} text-gray-400`} />
          <span>{jobOffer.city?.name || jobOffer.city?.label || t("job_card.not_available")}</span>
        </div>

        {/* Description - en RTL: text-right */}
        <div className={`text-gray-600 text-sm mb-4 line-clamp-3 ${isRTL ? "text-right" : "text-left"}`}>
          {jobOffer.description?.substring(0, 120) || t("job_card.no_description")}
        </div>

        {/* Apply Button */}
        <div className="mt-auto pt-3 border-t border-gray-100">
          <Link
            to={`/offres/${jobOffer.slug}`}
            className={`inline-block px-4 py-2 bg-primary-orange hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-sm ${isRTL ? "text-right" : "text-left"}`}
          >
            {t("job_card.see_offer")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default JobOfferBlogCard;