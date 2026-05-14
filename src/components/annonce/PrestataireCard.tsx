import { useTranslation } from "react-i18next";
import { FaLocationArrow, FaUserCircle, FaWalking } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";
import { GrLocationPin } from "react-icons/gr";
import { RiBrush4Line } from "react-icons/ri";
import { Link } from "react-router-dom";

import { IoTimeOutline } from "react-icons/io5";
import { Annonce } from "../../services/types/annonce";
import { formatTimeAgoFr } from "../../utils/timeAgo";

import { Prestataire } from "../../services/types/prestataire";
import UserInfoBox from "../account/UserInfoBox";

type PrestataireCardProps = {
  prestataire?: Prestataire;
  annonce?: Annonce;
};

const PrestataireCard = ({ prestataire }: PrestataireCardProps) => {
  const { t, i18n } = useTranslation();

  const to = `/prestataire/${prestataire?.id}`;
  const speciality =
    i18n.language === "fr"
      ? prestataire?.speciality?.label
      : i18n.language === "en"
      ? prestataire?.speciality?.label
      : prestataire?.speciality?.label;
  //const specialite = prestataire?.specialite
  const city =
    i18n.language === "fr"
      ? prestataire?.city?.label
      : i18n.language === "en"
      ? prestataire?.city?.label
      : prestataire?.city?.label;

  return (
    <Link
      to={to}
      className="shadow-card-sm p-4 h-full bg-white rounded-md flex flex-col justify-between transition-all hover:shadow-card-shadow-border"
    >
      <div className="mb-2">
        <UserInfoBox previewOnly prestataire={prestataire} />
        <br />
        <div>
          {/* bio title */}
          <h3 className="text-center text-sm font-bold text-gray-900 line-clamp-2">
            {prestataire?.description
              ? prestataire?.description
              : t("prestataire_description")}
          </h3>
          {/* bio description */}
          {/* <p className="text-gray-500 text-sm line-clamp-2 mt-1">
          </p> */}
        </div>
      </div>
      <div>
        <div className="line my-2"></div>
        <div className="flex gap-2">
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
              <span>Offline</span>
            ) : prestataire?.availability === 1 ? (
              <span>Online</span>
            ) : (
              <span>Null</span>
            )}
          </p>
          <p className="text-gray-500 text-xs font-bold flex capitalize items-center gap-1 line-clamp-1">
            <GrLocationPin />
            {city
              ? city?.length > 14
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
  const data = annonce || prestataire;
  const linkTo = annonce
    ? `/annonce/${annonce.slug}`
    : `/prestataire/${prestataire?.id}`;

  return (
    <Link
      to={linkTo}
      className="shadow-card-sm p-3 rounded-md bg-white hover:shadow-lg transition-shadow duration-200 h-full flex flex-col cursor-pointer"
    >
      <CardHeader data={data} />
      <div className="my-2">
        <CardBody data={data} />
      </div>
      <div className="flex-grow">
        <CardFooter data={data} />
      </div>

      {/* Add the "Voir annonce" button */}
      <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between items-center">
        <span className="px-4 py-2 bg-primary-orange hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-sm">
          {annonce ? "Voir annonce" : "Voir profil"}
        </span>
      </div>
    </Link>
  );
};

const CardFooter = ({ data }: { data?: Prestataire | Annonce }) => {
  // Use annonce-specific badges if available
  const listBadges: string[] = [];
  if (data && "announce_type_label" in data && data.announce_type_label) {
    listBadges.push(data.announce_type_label);
  }
  if (data && "item_condition_label" in data && data.item_condition_label) {
    listBadges.push(data.item_condition_label);
  }
  // Fallback if no badges
  if (listBadges.length === 0) {
    listBadges.push("N/A");
  }

  return (
    <div className="space-y-2 h-full flex flex-col">
      <div className="flex items-center gap-1">
        <div className="rounded-full bg-gray-100 p-1.5">
          <FaLocationArrow className="text-gray-500 text-xs" />
        </div>
        <p className="text-gray-500 text-xs font-semibold line-clamp-1">
          {data?.city?.label || "Unknown Location"}
        </p>
      </div>

      <div className="flex-grow">
        <h3 className="text-gray-900 text-sm font-medium line-clamp-2">
          {data?.title || data?.description || "No title available"}
        </h3>
      </div>

      <div>
        <div className="flex items-center gap-2 flex-wrap">
          {listBadges.map((badge, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-500 text-xs font-semibold px-2 py-1 rounded-full"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* price */}
      <div className="flex items-center justify-between pt-0.5">
        {data &&
        "formatted_price" in data &&
        (data as Annonce).formatted_price ? (
          <p className="text-primary-orange text-sm font-semibold">
            {(data as Annonce).formatted_price}
          </p>
        ) : data && "price" in data && (data as Annonce).price ? (
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
        src={data?.image_urls?.[0] ?? ""}
        alt={data?.title || "Image"}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

const getUserAvatarUrl = (data: Prestataire | Annonce): string | undefined => {
  // For Prestataire: use media if available
  if ("media" in data && Array.isArray(data.media) && data.media.length > 0) {
    const url = data.media[0].preview_url || data.media[0].original_url;
    return url;
  }
  // For Annonce: check if user has avatar (if user is actually a User type)
  if (
    "user" in data &&
    data.user &&
    "avatar" in data.user &&
    typeof data.user.avatar === "string"
  ) {
    return data.user.avatar;
  }
  // No avatar found
  return undefined;
};

const CardHeader = ({ data }: { data?: Prestataire | Annonce }) => {
  const userAvatar = data ? getUserAvatarUrl(data) : undefined;
  // Get user name or company name
  let userName = "User";
  if (data) {
    // For annonces, prioritize company name
    if ("company_name" in data && data.company_name) {
      userName = data.company_name;
    } else if ("user" in data && data.user) {
      userName = `${data.user.first_name || ""} ${
        data.user.last_name || ""
      }`.trim();
    } else if ("first_name" in data && "last_name" in data) {
      userName = `${data.first_name || ""} ${data.last_name || ""}`.trim();
    }
  }
  // Fallback handler for broken images, use initials
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    const initials = encodeURIComponent(userName || "User");
    e.currentTarget.src = `https://ui-avatars.com/api/?name=${initials}&background=eee&color=888&size=128`;
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
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
        <div className="flex flex-col gap-0.5">
          <h4 className="text-sm font-semibold text-gray-900 line-clamp-1">
            {userName}
          </h4>
          <div className="flex items-center gap-1.5 text-gray-500 text-xs">
            <IoTimeOutline className="text-gray-500 text-xs" />
            <p className="text-gray-500 text-xs flex items-center gap-1">
              {data?.created_at ? formatTimeAgoFr(data.created_at) : "Recently"}

            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrestataireCard;
