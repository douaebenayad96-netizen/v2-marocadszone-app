import React from "react";
import { useGetJobOffers } from "../../services/api/fetchService";
import JobOfferBlogCard from "../blog/BlogCard1";
import SectionHeader from "./SectionHeader";

const HomeJobOffers: React.FC = () => {
  // Fetch the latest 8 job offers
  const {
    data: jobOffersData,
    isLoading,
    isError,
  } = useGetJobOffers({ per_page: 8, sort_by: "newest" }, true);

  if (isError) {
    return null; // Don't show the section if there's an error
  }

  return (
    <section className="app-container section-py">
      <SectionHeader
        title="Nos derniers offres d'emploi"
        subtitle="Découvrez les opportunités professionnelles les plus récentes"
        buttonTitle="Voir Toutes les Offres"
        to="/offres"
      />

      {/* Job Offers Grid */}
      <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading && (
          <>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
              <div
                key={index}
                className="animate-pulse bg-white shadow-sm rounded-lg p-4"
              >
                <div className="w-full h-48 bg-gray-200 rounded-md mb-4"></div>
                <div className="space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {!isLoading &&
          (Array.isArray(jobOffersData?.data)
            ? jobOffersData.data
            : Array.isArray(jobOffersData?.data?.items)
              ? jobOffersData.data.items
              : []
          )
            .slice(0, 8)
            .map((jobOffer) => (
              <JobOfferBlogCard key={jobOffer.id} jobOffer={jobOffer} />
            ))}
      </div>

      {/* No Job Offers Message */}
      {!isLoading &&
  !isError &&
  (Array.isArray(jobOffersData?.data)
    ? jobOffersData.data.length === 0
    : Array.isArray(jobOffersData?.data?.items)
      ? jobOffersData.data.items.length === 0
      : true) && (
        <div className="text-center py-8">
          <p className="text-gray-500">
            Aucune offre d'emploi disponible pour le moment
          </p>
        </div>
      )}
    </section>
  );
};

export default HomeJobOffers;
