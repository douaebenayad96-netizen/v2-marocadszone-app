import React from 'react';
import { useGetJobOffers } from '../../services/api/fetchService';
import SectionHeader from './SectionHeader';
import JobOfferCard from '../job/JobOfferCard';

const HomeJobOffers: React.FC = () => {
  // Fetch the latest 5 job offers
  const { data: jobOffersData, isLoading, isError } = useGetJobOffers(
    { per_page: 5, sort_by: 'newest' }, 
    true
  );

  if (isError) {
    return null; // Don't show the section if there's an error
  }

  return (
    <section className="app-container section-py">
      <SectionHeader
        title="Dernières Offres d'Emploi"
        subtitle="Découvrez les opportunités professionnelles les plus récentes"
        buttonTitle="Voir Toutes les Offres"
        to="/offres"
      />

      {/* Job Offers Grid */}
      <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {isLoading && (
          <>
            {[...Array(5)].map((_, index) => (
              <div key={index} className="animate-pulse bg-white shadow-sm rounded-lg p-4">
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
        
        {!isLoading && jobOffersData?.data?.items?.slice(0, 5).map((jobOffer) => (
          <JobOfferCard key={jobOffer.id} jobOffer={jobOffer} />
        ))}
      </div>

      {/* No Job Offers Message */}
      {!isLoading && !isError && jobOffersData?.data?.items?.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">Aucune offre d'emploi disponible pour le moment</p>
        </div>
      )}
    </section>
  );
};

export default HomeJobOffers;
