// Debug CTA logic
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  RiArrowRightLine,
  RiChat3Line,
  RiHeartFill,
  RiHeartLine,
  RiShareLine,
} from "react-icons/ri";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { toast } from "react-toastify";
import { sendComment } from "../../services/api/fetchComment";
import { likeVideo } from "../../services/api/fetchLike";
import { useAuthStore } from "../../services/store/authStore";
import { Annonce } from "../../services/types/annonce";
interface ShortVideoPlayerCardProps {
  short: Annonce;
}
interface Comment {
  id: number;
  user_id: number;
  announcement_id: number;
  body: string;
  created_at: string;
}

const ShortVideoPlayerCard = ({ short }: ShortVideoPlayerCardProps) => {
  const navigate = useNavigate();
  const [showSocialMedia, setShowSocialMedia] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  // console.log(short);
  const { user } = useAuthStore();
  console.log(user);

  // State for engagement features
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(short.likes_count || 0);
  const [commentCount, setCommentCount] = useState(short.comments.length || 0);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const { register, handleSubmit, watch, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      body: "",
    },
  });
  const { mutate: postCommentMutate } = useMutation({
    mutationFn: ({ id, body }: { id: number; body: string }) =>
      sendComment(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries("videos");
      queryClient.invalidateQueries("annonces");
      setCommentCount(short?.comments?.length);
    },
  });

  const { mutate: likeVideoMutate } = useMutation({
    mutationFn: (id: number) => likeVideo(id),
    onSuccess: ({ data }: Annonce) => {
      queryClient.invalidateQueries("videos");
      queryClient.invalidateQueries("annonces");
      console.log(data);
      setLikeCount(data?.likes_count);
      setIsLiked(data?.is_liked);
    },
  });
  // Toggle like state
  const handleLike = () => {
    if (!user) {
      toast.info("Vous devez vous connecter pour aimer cette courte vidéo");
      return;
    }
    likeVideoMutate(short.id);
    // Here you would typically make an API call to update the like status
  };

  // Toggle subscription state
  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
    // Here you would typically make an API call to update subscription status
  };

  // Toggle comments visibility
  const toggleComments = () => {
    setShowComments(!showComments);
  };
  const onSubmitComment: SubmitHandler<{ body: string }> = (data) => {
    if (!user) {
      toast.info("Vous devez vous connecter pour commenter cette courte vidéo");
      return;
    }
    const { body } = data;
    const id = short.id;
    postCommentMutate({ id, body });
    reset();
  };

  // Pause this video when component unmounts or when it goes out of view
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Create intersection observer to pause video when out of view and autoplay when in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Video is in view - autoplay it
            video.play().catch((error) => {
              console.log("Autoplay failed:", error);
              // Autoplay might fail due to browser policies, that's okay
            });
          } else {
            // Video is out of view - pause it
            video.pause();
          }
        });
      },
      { threshold: 0.5 }, // Trigger when 50% of video is visible
    );

    observer.observe(container);

    // Pause video when component unmounts
    return () => {
      observer.disconnect();
      if (video) {
        video.pause();
      }
    };
  }, []);

  // Pause all other videos when this video starts playing
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      // Pause all other video elements on the page
      const allVideos = document.querySelectorAll("video");
      allVideos.forEach((otherVideo) => {
        if (otherVideo !== video) {
          otherVideo.pause();
        }
      });
    };

    video.addEventListener("play", handlePlay);
    return () => {
      video.removeEventListener("play", handlePlay);
    };
  }, []);

  const getVideoUrl = () => {
    // Handle Firebase video URL
    if (short.video_url) {
      return short.video_url;
    }
    // Fallback to old format
    const oldUrl = short.video?.url || null;
    return oldUrl;
  };

  const getThumbnailUrl = () => {
    // Handle Firebase image URLs
    if (
      short.image_urls &&
      Array.isArray(short.image_urls) &&
      short.image_urls.length > 0
    ) {
      return short.image_urls[0];
    }
    // Fallback to old Spatie Media format
    if (short.images && short.images.length > 0) {
      return (
        short.images[0]?.original_url ||
        short.images[0]?.url ||
        short.images[0]?.preview_url
      );
    }
    return null;
  };

  const getUserName = () => {
    if (short.user?.first_name && short.user?.last_name) {
      return `${short.user.first_name} ${short.user.last_name}`;
    }
    return "Utilisateur";
  };

  // Match home page logic for WhatsApp CTA
  const phoneValue =
    short.phone ||
    short.phone_number ||
    short.formatted_phone_number ||
    short.user?.phone_number ||
    short.user?.formatted_phone_number;
  const isPhoneContact = short.video_source_type === "phone" && !!phoneValue;
  const isURL = short.video_source_type === "url";
  const ctaText = !isPhoneContact
    ? isURL
      ? "Voir plus"
      : "Voir plus details"
    : "Contacter";
  const whatsappLink =
    isPhoneContact && phoneValue
      ? `https://wa.me/${phoneValue.replace(/[^\d]/g, "")}`
      : undefined;

  const handleViewAnnonce = () => {
    if (isURL) {
      window.open(short.url, "_blank");
    } else {
      navigate(`/annonces/${short.slug}`);
    }
  };

  const videoUrl = getVideoUrl();
  const thumbnailUrl = getThumbnailUrl();
  // console.log(thumbnailUrl);

  return (
    <div
      ref={containerRef}
      className="max-w-md mx-auto h-screen flex flex-col items-center justify-center bg-black text-white"
    >
      <div
        key={short.id}
        className="h-full w-full snap-start relative flex flex-col"
      >
        {/* Video/Thumbnail */}
        <div className="flex-grow relative">
          {videoUrl ? (
            <div className="w-full h-full relative">
              <video
                ref={videoRef}
                src={videoUrl}
                poster={thumbnailUrl || undefined}
                className="w-full h-full object-cover"
                controls
                autoPlay={true}
                loop
                playsInline
                preload="metadata"
              />

              {/* top */}
              <div className="absolute top-4 left-4 flex items-center space-x-3">
                {/* Subscribe button */}
                <button
                  onClick={handleSubscribe}
                  className={`rounded-full px-4 py-1 font-semibold text-sm ${
                    isSubscribed
                      ? "bg-gray-600 text-white"
                      : "bg-red-600 text-white hover:bg-red-700"
                  } transition-colors`}
                >
                  {isSubscribed ? "Abonné" : "S'abonner"}
                </button>
              </div>

              {/* Engagement buttons on the right side */}
              <div className="absolute right-4 md:-right-16 bottom-64 md:bottom-8 flex flex-col items-center space-y-5">
                {/* Like button */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={handleLike}
                    className="bg-white/20 rounded-full p-3 hover:bg-black/50 transition-colors"
                  >
                    {short?.is_liked || isLiked ? (
                      <RiHeartFill className="text-2xl text-red-500" />
                    ) : (
                      <RiHeartLine className="text-2xl text-white" />
                    )}
                  </button>
                  <span className="text-xs mt-1 font-medium">{likeCount}</span>
                </div>

                {/* Comment button */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={toggleComments}
                    className="bg-white/20 rounded-full p-3 hover:bg-black/50 transition-colors"
                  >
                    <RiChat3Line className="text-2xl text-white" />
                  </button>
                  <span className="text-xs mt-1 font-medium">
                    {commentCount}
                  </span>
                </div>

                {/* Share button */}
                <div className="relative">
                  <button
                    className="bg-white/20 rounded-full p-3 hover:bg-black/50 transition-colors"
                    onClick={() => setShowSocialMedia(!showSocialMedia)}
                  >
                    <RiShareLine className="text-2xl text-white" />
                  </button>
                  <AnimatePresence>
                    {showSocialMedia && (
                      <motion.div
                        className="flex gap-3 items-center flex-col p-2 bg-white absolute -top-60 rounded-md"
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 10, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                      >
                        <FacebookShareButton
                          url={`https://marocadszone.com/videos/${short.slug}`}
                        >
                          <FacebookIcon size={40} round />
                        </FacebookShareButton>

                        <TwitterShareButton
                          url={`https://marocadszone.com/videos/${short.slug}`}
                        >
                          <TwitterIcon size={40} round />
                        </TwitterShareButton>

                        <WhatsappShareButton
                          url={`https://marocadszone.com/videos/${short.slug}`}
                        >
                          <WhatsappIcon size={40} round />
                        </WhatsappShareButton>

                        <TelegramShareButton
                          url={`https://marocadszone.com/videos/${short.slug}`}
                        >
                          <TelegramIcon size={40} round />
                        </TelegramShareButton>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          ) : thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={short.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-800">
              <div className="text-center p-8">
                <div className="text-6xl mb-4 text-gray-400">📹</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Aucune vidéo disponible
                </h3>
                <p className="text-gray-400 text-sm">
                  Cette annonce n'a pas de contenu vidéo ou image
                </p>
              </div>
            </div>
          )}

          {/* Video Info */}
          {/* annonce info */}
          <div className="absolute bottom-16 sm:bottom-20 md:bottom-24 lg:bottom-28 left-0 w-full px-4 sm:px-6 md:px-8">
            <div className="bg-gradient-to-t from-black/90 via-black/60 to-transparent rounded-lg p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-white">
                {short.title}
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-300 mb-4">
                {getUserName()}
              </p>
              {isPhoneContact ? (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 relative text-white text-sm sm:text-base md:text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg z-30 min-h-[48px] sm:min-h-[52px] md:min-h-[56px] touch-manipulation flex items-center justify-center"
                >
                  {ctaText}
                  <span className="absolute right-2 sm:right-3 md:right-4 top-1/2 transform -translate-y-1/2 transition-transform duration-200">
                    <RiArrowRightLine className="inline-block text-lg sm:text-xl md:text-2xl -rotate-45" />
                  </span>
                </a>
              ) : (
                <button
                  onClick={handleViewAnnonce}
                  className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 relative text-white text-sm sm:text-base md:text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg z-30 min-h-[48px] sm:min-h-[52px] md:min-h-[56px] touch-manipulation"
                >
                  {ctaText}
                  <span className="absolute right-2 sm:right-3 md:right-4 top-1/2 transform -translate-y-1/2 transition-transform duration-200">
                    <RiArrowRightLine className="inline-block text-lg sm:text-xl md:text-2xl -rotate-45" />
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Comments section (conditionally rendered) */}
        {showComments && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
            <div className="w-full md:w-full md:max-w-md bg-gray-900 rounded-t-2xl md:rounded-2xl flex flex-col h-[90vh] md:h-auto md:max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-700 bg-gray-800/50 backdrop-blur-sm">
                <h2 className="text-lg md:text-xl font-bold text-white">
                  Commentaires{" "}
                  <span className="text-orange-500">({commentCount})</span>
                </h2>
                <button
                  onClick={() => setShowComments(false)}
                  className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-700 rounded-full"
                  aria-label="Close comments"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Comments List */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3">
                {short.comments?.length > 0 ? (
                  short.comments.map((comment: Comment) => (
                    <div
                      key={comment.id}
                      className="bg-gray-800/50 hover:bg-gray-800 transition-colors p-4 rounded-lg border border-gray-700/50"
                    >
                      <p className="text-gray-100 text-sm md:text-base leading-relaxed mb-2">
                        {comment.body}
                      </p>
                      <span className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(comment.created_at), {
                          addSuffix: true,
                          locale: fr,
                        })}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-32 text-gray-400">
                    <p className="text-center">
                      Aucun commentaire pour le moment
                    </p>
                  </div>
                )}
              </div>

              {/* Comment Input Form */}
              <div className="border-t border-gray-700 bg-gray-800/50 backdrop-blur-sm p-4 md:p-6">
                <form
                  onSubmit={handleSubmit(onSubmitComment)}
                  className="space-y-3"
                >
                  <textarea
                    {...register("body")}
                    value={watch("body")}
                    placeholder="Ajouter un commentaire..."
                    className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 rounded-lg border border-gray-600 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 resize-none text-sm md:text-base"
                    rows={3}
                  />
                  <button
                    type="submit"
                    disabled={!watch("body")?.trim()}
                    className="w-full px-4 py-2.5 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors text-sm md:text-base"
                  >
                    Publier
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShortVideoPlayerCard;
