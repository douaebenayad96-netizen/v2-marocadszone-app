import { RiArrowRightLine, RiShareLine } from "react-icons/ri";
//import { Link } from "react-router-dom";
import { Annonce } from "../../services/types/annonce";
import Skeleton from "react-loading-skeleton";
import UserPic from "../../assets/img/user_pic.png";
import CompanyPic from "../../assets/img/company_logo.png";

interface ShortCardProps {
  video?: Annonce;
}

const ShortCard = ({ video }: ShortCardProps) => {
  // Fallback image if no video provided
  const getVideoThumbnail = () => {
    // Handle Firebase image URLs
    if (
      video?.image_urls &&
      Array.isArray(video.image_urls) &&
      video.image_urls.length > 0
    ) {
      return video.image_urls[0];
    }
    // Fallback to old Spatie Media format
    if (video?.images && video.images.length > 0) {
      return (
        video.images[0]?.original_url ||
        video.images[0]?.url ||
        video.images[0]?.preview_url
      );
    }
    return null; // No image found
  };

  const getUserAvatar = () => {
    const isCompany = video?.user?.company_exists;
    if (isCompany) {
      return video?.user?.avatar || CompanyPic;
    }
    return UserPic;
  };

  const getUserName = () => {
    if (video?.user?.first_name && video?.user?.last_name) {
      return `@${video.user.first_name} ${video.user.last_name}`;
    }
    return "@utilisateur";
  };

  const getVideoTitle = () => {
    return video?.title || "Regardez cette vidéo incroyable ! 🔥 #tendance";
  };

  //const getVideoLink = () => {
    //return video?.slug ? `/videos/${video.slug}` : "/404";
  //};
  // see video
  const ctaText = "Voir video";
  // video?.video_source_type === "phone" ? "Contacter" : "Voir plus details";

  return (
    <a
      href={video?.video_url || video?.video?.url || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="relative rounded-xl overflow-hidden aspect-[9/16] bg-gray-100 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
    >
      {/* Vidéo / Miniature */}
      <div className="absolute inset-0">
        {(() => {
          const thumb = getVideoThumbnail();
          if (thumb) {
            return (
              <img
                src={thumb}
                alt="Vidéo courte"
                className="w-full h-full object-cover"
              />
            );
          } else if (video?.video_url || video?.video?.url) {
            return (
              <video
                src={video.video_url || video.video?.url}
                className="w-full h-full object-cover"
                muted
                loop
                preload="metadata"
              />
            );
          } else {
            return (
              <img
                src="https://images.unsplash.com/photo-1654277041042-8927699fcfd2?q=80&w=2062&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Vidéo courte"
                className="w-full h-full object-cover"
              />
            );
          }
        })()}
        {/* Overlay sombre pour meilleure lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      </div>

      {/* Informations vidéo */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 rounded-full border-2 border-white mr-3 overflow-hidden">
            <img
              src={getUserAvatar()}
              alt="Profil"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-semibold text-sm">{getUserName()}</span>
        </div>
        <h3 className="text-sm mb-4 line-clamp-1">{getVideoTitle()}</h3>

        {/* Bouton CTA */}
        <button className="px-4 py-2 w-full bg-orange-500 hover:bg-orange-600 relative text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-md">
          {ctaText}
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 transition-transform duration-200">
            <RiArrowRightLine className="inline-block text-lg -mt-0.5 -rotate-45" />
          </div>
        </button>
      </div>

      {/* Boutons d'interaction (côté droit) */}
      <div className="absolute right-3 bottom-24 flex flex-col items-center space-y-4">
        {/* Bouton Partage */}
        <div className="flex flex-col items-center">
          <button className="p-2 bg-black/30 rounded-full hover:bg-black/50 transition-colors">
            <span className="text-white text-xl">
              <RiShareLine />
            </span>
          </button>
        </div>
      </div>
    </a>
  );
};

const ShortCardLoading = () => {
  return (
    <div className="relative rounded-xl overflow-hidden aspect-[9/16] bg-gray-50">
      {/* Video/Thumbnail Skeleton */}
      <div className="absolute inset-0">
        <Skeleton className="w-full h-full scale-110" />
      </div>

      {/* Video Info Skeleton */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 rounded-full border-2 border-white mr-3 overflow-hidden">
            <Skeleton circle className="w-full h-full" />
          </div>
          <Skeleton width={100} height={15} />
        </div>
        <Skeleton count={2} height={12} className="mb-4" />

        {/* CTA Button Skeleton */}
        <div className="px-4 py-2 w-full bg-gray-200 rounded-lg">
          <Skeleton width={80} height={16} />
        </div>
      </div>

      {/* Interaction Buttons Skeleton (right side) */}
      <div className="absolute right-3 bottom-24 flex flex-col items-center space-y-4">
        <div className="flex flex-col items-center">
          <div className="p-2 bg-gray-200 rounded-full">
            <Skeleton width={20} height={20} circle />
          </div>
        </div>
      </div>
    </div>
  );
};

ShortCard.Loading = ShortCardLoading;

export default ShortCard;
