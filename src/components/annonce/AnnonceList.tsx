import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiLoader4Line } from "react-icons/ri";
import { Link } from "react-router-dom";

import { useAnnoncesInfinite } from "../../services/api/fetchAnnonce";
import { Annonce } from "../../services/types/annonce";
import SampleButton from "../ui/SampleButton";
// Utilisation d'un import avec le chemin absolu plutôt que relatif
import EmptyPic from "../../assets/img/Empty-bro.svg";
import AnnonceCard from "../../components/annonce/AnnonceCard";

interface AnnonceListProps {
  showLoadMore?: boolean;
  limit?: number;
}

const AnnonceList = ({ showLoadMore = true, limit }: AnnonceListProps) => {
  const { t } = useTranslation();
  const [allAnnonces, setAllAnnonces] = useState<Annonce[]>([]);

  const {
    data: annoncePages,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAnnoncesInfinite(true);

  useEffect(() => {
    if (annoncePages && annoncePages.pages) {
      try {
        const newAnnonces = annoncePages.pages.flatMap((page) => {
          if (!page || !page.data) {
            return [];
          }
          return page.data;
        });
        setAllAnnonces(newAnnonces);
      } catch (error) {
        console.error("❌ Error processing annonces:", error);
      }
    }
  }, [annoncePages]);

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const displayedAnnonces = limit ? allAnnonces.slice(0, limit) : allAnnonces;

  if (isLoading) {
    return (
      <div className="w-full h-80 flex items-center justify-center">
        <RiLoader4Line className="animate-spin text-4xl text-primaryCoral" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-80 flex items-center justify-center">
        <p className="text-red-500 text-lg">{t("error.loadingAnnonces")}</p>
      </div>
    );
  }

  if (displayedAnnonces.length === 0) {
    return (
      <div className="w-full h-80 flex flex-col items-center justify-center">
        <img src={EmptyPic} alt="No annonces" className="w-40 h-40 mb-4" />
        <p className="text-gray-500 text-lg">{t("annonces.noAnnoncesFound")}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedAnnonces.map((annonce) => (
          <AnnonceCard key={annonce.id} annonce={annonce} />
        ))}
      </div>

      {showLoadMore && hasNextPage && !limit && (
        <div className="flex justify-center mt-8">
          <SampleButton
            text={
              isFetchingNextPage ? t("common.loading") : t("common.loadMore")
            }
            isLoading={isFetchingNextPage}
            callback={handleLoadMore}
          />
        </div>
      )}

      {limit && allAnnonces.length > limit && (
        <div className="flex justify-center mt-8">
          <Link to="/annonces">
            <SampleButton text={t("annonces.viewAllAnnonces")} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default AnnonceList;
