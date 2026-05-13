import { useVideos } from "../../services/api/fetchAnnonce";
import ShortCard from "../shorts/ShortCard";
import SectionHeader from "./SectionHeader";

const HomeShorts = () => {
  const { data: videosData, isLoading, error } = useVideos(1, 5);

  return (
    <section className="app-container section-py">
      <SectionHeader
        title="Annonces vidéos courtes"
        subtitle="Découvrez nos dernières annonces vidéos courtes"
        buttonTitle="Voir plus"
        to="/videos"
      />

      {/* Loading State */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {[1, 2, 3, 4, 5].map((index) => (
            <div
              key={index}
              className="animate-pulse bg-gray-200 aspect-[9/16] rounded-xl"
            />
          ))}
        </div>
      ) : null}

      {/* Error State */}
      {error && (
        <div className="text-center py-8">
          <p className="text-red-500">Erreur lors du chargement des vidéos</p>
        </div>
      )}

      {/* Videos Grid */}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {videosData?.data && videosData.data.length > 0
            ? videosData.data
                .slice(0, 5)
                .map((video) => <ShortCard key={video.id} video={video} />)
            : null}
        </div>
      )}

      {/* No Videos Message */}
      {!isLoading &&
        !error &&
        (!videosData?.data || videosData.data.length === 0) && (
          <div className="text-center py-8">
            <p className="text-gray-500">
              Aucune vidéo disponible pour le moment
            </p>
          </div>
        )}
    </section>
  );
};

export default HomeShorts;
