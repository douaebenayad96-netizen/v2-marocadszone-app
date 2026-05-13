import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaLocationArrow } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { Link, useSearchParams } from "react-router-dom";

import { Annonce } from "../../services/types/annonce";
import { PrestataireFilter } from "../../services/types/filter";
import { Paginationtype } from "../../services/types/pagination";
import Pagination from "../ui/Pagination";
import PrestataireCardSkeleton from "../ui/skeletons/PrestataireCardSkeleton";
import { PrestataireCardV2 } from "./PrestataireCard";

type PrestatairesFilterListProps = {
  filter: PrestataireFilter;
  annoncesData?: Paginationtype<Annonce>;
  annoncesLoading?: boolean;
  setAnnoncePage?: (page: number) => void;
};

// AnnonceCard component following the same structure as PrestataireCardV2
const AnnonceCard = ({ annonce }: { annonce: Annonce }) => {
  const { t } = useTranslation();

  return (
    <Link
      to={`/annonces/${annonce.id}`}
      className="shadow-card-sm hover:shadow-card-md p-4 rounded-xl space-y-3 block transition-all duration-300 hover:scale-[1.02] bg-white border border-gray-100 hover:border-orange-200"
    >
      {/* Card Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center shadow-sm">
            <span className="text-sm font-bold text-orange-600">
              {annonce.user?.first_name?.charAt(0)}
              {annonce.user?.last_name?.charAt(0)}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-sm font-semibold text-gray-900 line-clamp-1">
              {annonce.user?.first_name} {annonce.user?.last_name}
            </h4>
            <div className="flex items-center gap-1.5 text-gray-500 text-xs">
              <IoTimeOutline className="text-gray-400 text-xs" />
              <p className="text-gray-500 text-xs">
                {new Date(annonce.created_at).toLocaleDateString("fr-FR")}
              </p>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* Card Body - Image */}{" "}
      <div className="rounded-xl overflow-hidden relative aspect-[4/3] bg-gray-50">
        {annonce.images && annonce.images.length > 1 ? (
          <img
            src={
              annonce.images[1].original_url ||
              annonce.images[1].preview_url ||
              annonce.images[1].url ||
              ""
            }
            alt={annonce.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <span className="text-gray-400 text-sm font-medium">
              {t("no_image", "Pas d'image")}
            </span>
          </div>
        )}
      </div>
      {/* Card Footer */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-orange-100 p-1.5">
            <FaLocationArrow className="text-orange-500 text-xs" />
          </div>
          <p className="text-gray-600 text-xs font-medium line-clamp-1">
            {annonce.city?.label || annonce.location}
          </p>
        </div>
        <div>
          <h3 className="text-gray-900 text-sm font-semibold line-clamp-2 leading-relaxed">
            {annonce.title}
          </h3>
        </div>{" "}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            {annonce.subcategory?.category?.label && (
              <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                {annonce.subcategory.category.label}
              </span>
            )}
          </div>
          <p className="text-orange-600 text-sm font-semibold hover:text-orange-700 transition-colors">
            {t("contact_info", "Voir détails")} →
          </p>
        </div>
      </div>
    </Link>
  );
};

const PrestatairesFilterList = ({
  filter,
  annoncesData,
  annoncesLoading,
  setAnnoncePage,
}: PrestatairesFilterListProps) => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const handlePagination = (page: number) => {
    setSearchParams((prev) => {
      prev.set("page", String(page));
      return prev;
    });
    setPage?.(page);
  };

  return (
    <>
      {" "}
      <section className="cards-grid">
        {" "}
        {annoncesLoading && !annoncesData ? (
          [...Array(8)].map((_, i) => <PrestataireCardSkeleton key={i} />)
        ) : (
          <>
            {annoncesData?.data &&
              Array.isArray(annoncesData.data) &&
              annoncesData.data.map((annonce: Annonce) => (
                <PrestataireCardV2
                  key={`annonce-${annonce.id}`}
                  annonce={annonce}
                />
              ))}
          </>
        )}
      </section>{" "}
      {annoncesData &&
        annoncesData.data &&
        Array.isArray(annoncesData.data) &&
        annoncesData.data.length > 0 &&
        setAnnoncePage && (
          <div className="mt-8 bg-orange-50 rounded-lg p-6">
            <h3 className="text-center text-sm font-semibold text-gray-700 mb-4 flex items-center justify-center gap-2">
              <span className=" text-orange-600 px-3 py-1 rounded-full text-xs">
                {t("pagination.annonces", "Annonces")}
              </span>
            </h3>
            <Pagination
              currentPage={Number(page)}
              totalPages={annoncesData?.last_page}
              onPageChange={handlePagination}
            />
          </div>
        )}
    </>
  );
};

export default PrestatairesFilterList;
