import { useTranslation } from "react-i18next";
import { useVideos } from "../../services/api/fetchAnnonce";
import ShortCard from "../shorts/ShortCard";
import SectionHeader from "./SectionHeader";

const HomeShorts = () => {
  const { t } = useTranslation("home");
  const { data: videosData, isLoading, error } = useVideos(1, 5);

  const hasVideos = videosData?.data && videosData.data.length > 0;
  const showNoVideos = !isLoading && !error && !hasVideos;

  return (
    <section className="app-container section-py">
      <SectionHeader
        title={t("shorts.title")}
        subtitle={t("shorts.subtitle")}
        buttonTitle={t("shorts.button")}
        to="/videos"
      />

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {[1, 2, 3, 4, 5].map((index) => (
            <div
              key={index}
              className="animate-pulse bg-gray-200 aspect-[9/16] rounded-xl"
            />
          ))}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-8">
          <p className="text-red-500">{t("shorts.error")}</p>
        </div>
      )}

      {/* Videos Grid */}
      {!isLoading && !error && hasVideos && (
        <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {videosData.data.slice(0, 5).map((video) => (
            <ShortCard key={video.id} video={video} />
          ))}
        </div>
      )}

      {/* No Videos Message */}
      {showNoVideos && (
        <div className="text-center py-8">
          <p className="text-gray-500">{t("shorts.no_videos")}</p>
        </div>
      )}
    </section>
  );
};

export default HomeShorts;