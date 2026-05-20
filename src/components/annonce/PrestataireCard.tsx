import { useTranslation } from "react-i18next";
import { FaLocationArrow, FaUserCircle, FaWalking } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";
import { GrLocationPin } from "react-icons/gr";
import { RiBrush4Line } from "react-icons/ri";
import { Link } from "react-router-dom";

import { IoTimeOutline } from "react-icons/io5";
import { Annonce } from "../../services/types/annonce";

import { Prestataire } from "../../services/types/prestataire";
import UserInfoBox from "../account/UserInfoBox";
import getLocalized from "../../utils/getLocalized";
import { translateAnnounceType, translateItemCondition } from "../../utils/translateApiData";

type PrestataireCardProps = {
  prestataire?: Prestataire;
  annonce?: Annonce;
};

// Fonction pour traduire la date (avec secondes, minutes, heures, jours, semaines, mois, années)
const getTranslatedDate = (dateString: string | undefined, lang: string) => {
  if (!dateString) return "";
  
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (lang === "ar") {
    // Secondes
    if (diffSecs < 5) return "الآن";
    if (diffSecs < 60) return `منذ ${diffSecs} ثانية`;
    // Minutes
    if (diffMins < 60) {
      if (diffMins === 1) return "منذ دقيقة واحدة";
      return `منذ ${diffMins} دقائق`;
    }
    // Heures
    if (diffHours < 24) {
      if (diffHours === 1) return "منذ ساعة واحدة";
      return `منذ ${diffHours} ساعات`;
    }
    // Jours
    if (diffDays === 1) return "منذ يوم واحد";
    if (diffDays < 7) return `منذ ${diffDays} أيام`;
    // Semaines
    if (diffWeeks === 1) return "منذ أسبوع واحد";
    if (diffWeeks < 4) return `منذ ${diffWeeks} أسابيع`;
    // Mois
    if (diffMonths === 1) return "منذ شهر واحد";
    if (diffMonths < 12) return `منذ ${diffMonths} أشهر`;
    // Années
    if (diffYears === 1) return "منذ سنة واحدة";
    return `منذ ${diffYears} سنوات`;
  } 
  else if (lang === "en") {
    // Seconds
    if (diffSecs < 5) return "just now";
    if (diffSecs < 60) return `${diffSecs} seconds ago`;
    // Minutes
    if (diffMins < 60) {
      if (diffMins === 1) return "1 minute ago";
      return `${diffMins} minutes ago`;
    }
    // Hours
    if (diffHours < 24) {
      if (diffHours === 1) return "1 hour ago";
      return `${diffHours} hours ago`;
    }
    // Days
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    // Weeks
    if (diffWeeks === 1) return "1 week ago";
    if (diffWeeks < 4) return `${diffWeeks} weeks ago`;
    // Months
    if (diffMonths === 1) return "1 month ago";
    if (diffMonths < 12) return `${diffMonths} months ago`;
    // Years
    if (diffYears === 1) return "1 year ago";
    return `${diffYears} years ago`;
  } 
  else {
    // Français
    // Secondes
    if (diffSecs < 5) return "à l'instant";
    if (diffSecs < 60) return `il y a ${diffSecs} secondes`;
    // Minutes
    if (diffMins < 60) {
      if (diffMins === 1) return "il y a 1 minute";
      return `il y a ${diffMins} minutes`;
    }
    // Heures
    if (diffHours < 24) {
      if (diffHours === 1) return "il y a 1 heure";
      return `il y a ${diffHours} heures`;
    }
    // Jours
    if (diffDays === 1) return "il y a 1 jour";
    if (diffDays < 7) return `il y a ${diffDays} jours`;
    // Semaines
    if (diffWeeks === 1) return "il y a 1 semaine";
    if (diffWeeks < 4) return `il y a ${diffWeeks} semaines`;
    // Mois
    if (diffMonths === 1) return "il y a 1 mois";
    if (diffMonths < 12) return `il y a ${diffMonths} mois`;
    // Années
    if (diffYears === 1) return "il y a 1 an";
    return `il y a ${diffYears} ans`;
  }
};

const PrestataireCard = ({ prestataire }: PrestataireCardProps) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const to = `/prestataire/${prestataire?.id}`;
  const speciality = getLocalized(prestataire?.speciality, 'label') || undefined;
  const city = getLocalized(prestataire?.city, 'label') || undefined;

  return (
    <Link
      to={to}
      className={`shadow-card-sm p-4 h-full bg-white rounded-md flex flex-col justify-between transition-all hover:shadow-card-shadow-border ${isRTL ? "rtl" : ""}`}
    >
      <div className="mb-2">
        <UserInfoBox previewOnly prestataire={prestataire} />
        <br />
        <div>
          <h3 className={`text-center text-sm font-bold text-gray-900 line-clamp-2 ${isRTL ? "text-right" : "text-left"}`}>
            {prestataire?.description
              ? prestataire?.description
              : t("prestataire_description")}
          </h3>
        </div>
      </div>
      <div>
        <div className="line my-2"></div>
        <div className={`flex gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
          <p className="text-gray-500 text-xs font-bold flex capitalize items-center gap-1">
            <RiBrush4Line />
            {speciality
              ? speciality.length > 14
                ? speciality.slice(0, 14) + "..."
                : speciality
              : t("aucune_specialite").slice(0, 10) + "..."}
          </p>
          <p className="text-gray-500 text-xs font-bold flex capitalize items-center gap-1">
            <FaWalking />
            {prestataire?.availability === 0 ? (
              <span>{t("offline")}</span>
            ) : prestataire?.availability === 1 ? (
              <span>{t("online")}</span>
            ) : (
              <span>Null</span>
            )}
          </p>
          <p className="text-gray-500 text-xs font-bold flex capitalize items-center gap-1 line-clamp-1">
            <GrLocationPin />
            {city
              ? city.length > 14
                ? city.slice(0, 14) + "..."
                : city
              : t("aucune_ville").slice(0, 8) + "..."}
          </p>
        </div>
        <div>
          <span className="text-primary-orange text-sm font-bold flex items-center gap-1 mt-4">
            {t("voir_profil")}
            <GoArrowUpRight
              className={`text-xl -mb-[2px] ${
                i18n.language === "ar" ? "transform -rotate-90" : ""
              }`}
            />
          </span>
        </div>
      </div>
    </Link>
  );
};

export const PrestataireCardV2 = ({
  annonce,
  prestataire,
}: PrestataireCardProps) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const data = annonce || prestataire;
  const linkTo = annonce
    ? `/annonce/${annonce.slug}`
    : `/prestataire/${prestataire?.id}`;

  return (
    <Link
      to={linkTo}
      className={`shadow-card-sm p-3 rounded-md bg-white hover:shadow-lg transition-shadow duration-200 h-full flex flex-col cursor-pointer ${isRTL ? "rtl" : ""}`}
    >
      <CardHeader data={data} />
      <div className="my-2">
        <CardBody data={data} />
      </div>
      <div className="flex-grow">
        <CardFooter data={data} />
      </div>

      {/* Bouton "Voir annonce" */}
      <div className={`mt-auto pt-3 border-t border-gray-100 ${isRTL ? "text-right" : "text-left"}`}>
        <span className="inline-block px-4 py-2 bg-primary-orange hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-sm">
          {annonce ? t("see_ad") : t("voir_profil")}
        </span>
      </div>
    </Link>
  );
};

const CardFooter = ({ data }: { data?: Prestataire | Annonce }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const listBadges: { text: string; type: string }[] = [];
  if (data && "announce_type" in data && data.announce_type) {
    listBadges.push({ text: data.announce_type, type: "announce_type" });
  }
  if (data && "item_condition" in data && data.item_condition) {
    listBadges.push({ text: data.item_condition, type: "item_condition" });
  }

  return (
    <div className="space-y-2 h-full flex flex-col">
      {/* Location */}
      <div className={`flex items-center gap-1 ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
        <div className="rounded-full bg-gray-100 p-1.5">
          <FaLocationArrow className="text-gray-500 text-xs" />
        </div>
        <p className="text-gray-500 text-xs font-semibold line-clamp-1">
          {getLocalized((data as any)?.city, 'label') || t("unknown_location")}
        </p>
      </div>

      {/* Title */}
      <div className="flex-grow">
        <h3 className={`text-gray-900 text-sm font-medium line-clamp-2 ${isRTL ? "text-right" : "text-left"}`}>
          {data?.title || data?.description || t("no_title_available")}
        </h3>
      </div>

      {/* Badges */}
      <div>
        <div className={`flex items-center gap-2 flex-wrap ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
          {listBadges.map((badge, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-500 text-xs font-semibold px-2 py-1 rounded-full"
            >
              {badge.type === "announce_type"
                ? translateAnnounceType(badge.text)
                : translateItemCondition(badge.text)}
            </span>
          ))}
        </div>
      </div>

      {/* Prix - aligné à droite en arabe */}
      <div className={`${isRTL ? "text-right" : "text-left"}`}>
        {data && "price" in data && (data as Annonce).price ? (
          <p className="text-primary-orange text-sm font-semibold">
            {(data as Annonce).price} MAD
          </p>
        ) : null}
      </div>
    </div>
  );
};

const CardBody = ({ data }: { data?: Annonce | Prestataire }) => {
  return (
    <div className="rounded-lg overflow-hidden relative aspect-[3/2]">
      <img
        src={data?.image_urls?.[0] ?? "/placeholder.jpg"}
        alt={data?.title || "Image"}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

const getUserAvatarUrl = (data: Prestataire | Annonce): string | undefined => {
  if ("media" in data && Array.isArray(data.media) && data.media.length > 0) {
    const url = data.media[0].preview_url || data.media[0].original_url;
    return url;
  }
  if (
    "user" in data &&
    data.user &&
    "avatar" in data.user &&
    typeof data.user.avatar === "string"
  ) {
    return data.user.avatar;
  }
  return undefined;
};

const CardHeader = ({ data }: { data?: Prestataire | Annonce }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const userAvatar = data ? getUserAvatarUrl(data) : undefined;
  let userName = t("user");
  
  if (data) {
    if ("company_name" in data && data.company_name) {
      userName = data.company_name;
    } else if ("user" in data && data.user) {
      userName = `${data.user.first_name || ""} ${data.user.last_name || ""}`.trim();
    } else if ("first_name" in data && "last_name" in data) {
      userName = `${data.first_name || ""} ${data.last_name || ""}`.trim();
    }
  }
  
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    const initials = encodeURIComponent(userName || t("user"));
    e.currentTarget.src = `https://ui-avatars.com/api/?name=${initials}&background=eee&color=888&size=128`;
  };

  // Date traduite
  const formattedDate = data?.created_at 
    ? getTranslatedDate(data.created_at, i18n.language)
    : t("recently");

  return (
    <div className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}>
      <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
        {userAvatar ? (
          <img
            src={userAvatar}
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover"
            onError={handleImgError}
          />
        ) : (
          <FaUserCircle className="w-10 h-10 text-gray-300" />
        )}
        <div className={`flex flex-col gap-0.5 ${isRTL ? "items-end" : ""}`}>
          <h4 className={`text-sm font-semibold text-gray-900 line-clamp-1 ${isRTL ? "text-right" : "text-left"}`}>
            {userName}
          </h4>
          <div className={`flex items-center gap-1.5 text-gray-500 text-xs ${isRTL ? "flex-row-reverse" : ""}`}>
            <IoTimeOutline className="text-gray-500 text-xs" />
            <p className="text-gray-500 text-xs">
              {formattedDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrestataireCard;