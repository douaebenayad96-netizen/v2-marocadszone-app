import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AnnonceFilter } from '../services/types/annonce'
import { useAnnoncesWithFilter } from '../services/api/fetchAnnonce'
import { PrestataireCardV2 } from '../components/annonce/PrestataireCard'
import Pagination from '../components/ui/Pagination'
import { useCategories1 } from '../services/api/fetchCategory'
import SpecialitiesList from '../components/company/SpecialitiesList'

const AnnoncesPage = () => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get("page")) || 1
  
  const [filter, setFilter] = useState<AnnonceFilter>({ sort_by: 'newest' })
  const [totalPages, setTotalPages] = useState(1)

  // Fetch categories for the carousel
  const { data: categoriesData } = useCategories1()

  const {
    data: annoncesData,
    isLoading,
    isError
  } = useAnnoncesWithFilter(filter, page, true)

  // Update totalPages when data changes
  useEffect(() => {
    if (annoncesData) {
      setTotalPages(annoncesData.last_page || 1)
      window.scrollTo(0, 0)
    }
  }, [annoncesData])

  // Update filter when search params change
  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries())
    if (!params.sort_by) {
      params.sort_by = 'newest'
    }
    
    // Create a clean filter object with only the ville parameter for city filtering
    const cleanFilter: AnnonceFilter = {
      sort_by: params.sort_by,
      category: params.category,
      category_id: params.category_id ? Number(params.category_id) : undefined,
      subcategory_id: params.subcategory_id ? Number(params.subcategory_id) : undefined,
      search: params.search,
    }
    
    // Handle city filtering - use only ville parameter
    if (params.ville) {
      cleanFilter.ville = params.ville
    } else if (params.city_id) {
      // If we have city_id but no ville, we need to convert it to ville name
      // For now, just use the city_id as ville to avoid the URL issue
      cleanFilter.ville = `City ${params.city_id}`
    }
    
    setFilter(cleanFilter)
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
          {t('annonces_page.title')}
        </h1>

        {/* Categories Carousel */}
        {categoriesData && categoriesData.length > 0 && (
          <div className="mb-8">
            <SpecialitiesList
              className='mt-4'
              categories={categoriesData}
            />
          </div>
        )}

        {/* Annonces Grid */}
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
              <p className="text-red-500">{t('annonces_page.error_loading')}</p>
            </div>
          ) : annoncesData?.data?.length === 0 ? (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">{t('annonces_page.no_annonces')}</p>
            </div>
          ) : (
            // Display announcements
            annoncesData?.data?.map((annonce) => (
              <PrestataireCardV2 key={annonce.id} annonce={annonce} />
            ))
          )}
        </div>  

        {/* Pagination */}
        {!isLoading && !isError && annoncesData?.data?.length > 0 && (
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

export default AnnoncesPage
