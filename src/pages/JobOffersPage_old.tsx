import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { TJobOfferFilters } from '../services/types/jobOffer'
import { useGetJobOffers } from '../services/api/fetchService'
import JobOfferCard from '../components/job/JobOfferCard'
import Pagination from '../components/ui/Pagination'

const JobOffersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get("page")) || 1
  
  const [filter, setFilter] = useState<TJobOfferFilters>({})
  const [totalPages, setTotalPages] = useState(1)

  const {
    data: jobOffersData,
    isLoading,
    isError
  } = useGetJobOffers(filter, true)

  // Update totalPages when data changes
  useEffect(() => {
    if (jobOffersData) {
      setTotalPages(jobOffersData.last_page || 1)
      window.scrollTo(0, 0)
    }
  }, [jobOffersData])

  // Update filter when search params change
  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries())
    setFilter(params as TJobOfferFilters)
  }, [searchParams])

  const handlePageChange = (newPage: number) => {
    setSearchParams(prev => {
      prev.set('page', newPage.toString())
      return prev
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Toutes les Offres d'Emploi
        </h1>

        {/* Job Offers Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {isLoading ? (
            // Loading skeletons
            [...Array(20)].map((_, index) => (
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
            ))
          ) : isError ? (
            <div className="col-span-full text-center py-8">
              <p className="text-red-500">Une erreur s'est produite lors du chargement des offres d'emploi</p>
            </div>
          ) : jobOffersData?.data?.length === 0 ? (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">Aucune offre d'emploi disponible pour le moment</p>
            </div>
          ) : (
            // Display job offers
            jobOffersData?.data?.map((jobOffer) => (
              <JobOfferCard key={jobOffer.id} jobOffer={jobOffer} />
            ))
          )}
        </div>        {/* Pagination */}
        {!isLoading && !isError && jobOffersData?.data && jobOffersData.data.length > 0 && (
          <div className="mt-8">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default JobOffersPage
