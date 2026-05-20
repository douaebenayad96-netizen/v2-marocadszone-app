import { useCallback, useEffect, useRef, useState } from "react";
import { RiArrowUpSLine, RiCloseFill, RiPlayLine } from "react-icons/ri";
import { useInView } from "react-intersection-observer";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next'
import ShortCard from "../components/shorts/ShortCard";
import ShortVideoPlayerCard from "../components/shorts/ShortVideoCard";
import { useVideosBySlugInfinite } from "../services/api/fetchAnnonce";
import SEOHead from "../components/seo/SEOHead";
import { cn } from "../utils/helpers";

const ShortDetailsPage = () => {
  const { t } = useTranslation()
  const slug = useParams().slug as string;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSimilarVideos, setShowSimilarVideos] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const similarVideosRef = useRef<HTMLDivElement | null>(null);

  const [ref, inView] = useInView({
    threshold: 0,
  });

  // Fetch videos from API
  const {
    data: videosData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useVideosBySlugInfinite({
    slug,
    perPage: 10,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  // Use API data directly
  const displayShorts = videosData?.pages.flatMap((page) => page.data) || [];

  // Get current short
  const currentShort = displayShorts[currentIndex] || null;

  // Filter similar videos (excluding current video)
  const similarShorts = displayShorts
    .filter((short) => short.id !== currentShort?.id)
    .slice(0, 6); // Limit to 6 similar videos

  const handleScroll = useCallback(
    (direction: "up" | "down") => {
      if (!containerRef.current) return;

      if (direction === "down" && currentIndex < displayShorts.length - 1) {
        setCurrentIndex((prevIndex) =>
          Math.min(prevIndex + 1, displayShorts.length - 1)
        );
        containerRef.current.scrollTop += containerRef.current.clientHeight;
      } else if (direction === "up" && currentIndex > 0) {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        containerRef.current.scrollTop -= containerRef.current.clientHeight;
      }
    },
    [currentIndex, displayShorts.length]
  );

  // keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") {
        handleScroll("up");
      } else if (event.key === "ArrowDown") {
        handleScroll("down");
      } else if (event.key === "Escape" && showSimilarVideos) {
        setShowSimilarVideos(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleScroll, currentIndex, displayShorts.length, showSimilarVideos]);

  // Close similar videos when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        similarVideosRef.current &&
        !similarVideosRef.current.contains(event.target as Node) &&
        showSimilarVideos
      ) {
        setShowSimilarVideos(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSimilarVideos]);

  return (
    <div className="h-screen w-full overflow-hidden no-scrollbar bg-black relative">
      <SEOHead title={`${currentShort?.title || "Petites annonces vidéo au Maroc"} - MarocAdsZone`} description={currentShort?.description || "Trouvez et publiez des petites annonces vidéo au Maroc pour acheter, vendre ou louer : voitures, immobilier, mode..."} path={currentShort?.slug ? `/videos/${currentShort.slug}` : "/videos"} image={currentShort?.image_urls?.[0] || currentShort?.images?.[0]?.url} />
      <h1 className="sr-only">
        {currentShort?.title || "Petites annonces vidéo au Maroc"}
      </h1>
      {/* back btn */}
      <div className="absolute top-4 left-4 z-[9999] flex items-center justify-end">
        <Link
          to="/"
          className="bg-gray-800 inline-block text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none"
        >
          <RiCloseFill className="text-4xl" />
        </Link>
      </div>

      {/* Similar videos button */}
      <div className="absolute top-4 right-4 z-[9999] flex items-center justify-end">
        <button
          onClick={() => setShowSimilarVideos((prev) => !prev)}
          className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 focus:outline-none flex items-center"
        >
          <RiPlayLine className="text-xl mr-2" />
          Vidéos similaires
        </button>
      </div>

      {/* Scrollable container */}
      <div className="h-full w-full">
        <div
          ref={containerRef}
          className="h-full snap-y snap-mandatory overflow-y-auto scroll-smooth no-scrollbar w-full"
          style={{ scrollBehavior: "smooth" }}
        >
          {displayShorts.map((short) => (
            <ShortVideoPlayerCard key={short.id} short={short} />
          ))}

          {isFetchingNextPage && (
            <>
              {Array.from({ length: 3 }).map((_, index) => (
                <ShortCard.Loading key={index} />
              ))}
            </>
          )}

          {/* Ref element to trigger infinite scroll */}
          <div ref={ref} />
        </div>
      </div>

      {/* Similar videos panel */}
      {showSimilarVideos && (
        <div
          // ref={similarVideosRef}
          className="absolute top-20 pb-16 md:right-4 z-[9999] w-full md:w-[500px] overflow-scroll h-screen bg-black/90 backdrop-blur-md rounded-lg p-4 shadow-xl border border-gray-800"
        >
          <h3 className="text-white text-lg font-bold mb-4">
            {t('shorts_page.similar_videos')}
          </h3>

          {similarShorts.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-3">
              {similarShorts.map((short) => (
                <ShortCard key={short.id} video={short} />
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-4">
              Aucune vidéo similaire trouvée
            </p>
          )}
        </div>
      )}

      {/* arrows */}
      <div className="absolute z-[99] top-1/2 right-4 transform -translate-y-1/2 hidden md:flex flex-col items-center">
        <div>
          <button
            onClick={() => handleScroll("up")}
            className={cn(
              "w-[50px] h-[50px] z-[9999] flex items-center justify-center cursor-pointer bg-gray-800 text-white rounded-full hover:bg-gray-700 focus:outline-none",
              currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
            )}
          >
            <RiArrowUpSLine className="text-4xl" />
          </button>
          <button
            onClick={() => handleScroll("down")}
            className={cn(
              "w-[50px] h-[50px] z-[9999] mt-4 flex items-center justify-center cursor-pointer bg-gray-800 text-white rounded-full hover:bg-gray-700 focus:outline-none",
              currentIndex === displayShorts.length - 1
                ? "opacity-50 cursor-not-allowed"
                : ""
            )}
          >
            <RiArrowUpSLine className="text-4xl transform rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShortDetailsPage;
