import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FiSearch, FiFilter, FiMapPin, FiBriefcase, FiHome } from 'react-icons/fi'

import { TJobOfferFilters } from '../services/types/jobOffer'
import { useGetJobOffers } from '../services/api/fetchService'
import { useFetchCity } from '../services/api/fetchCity'
import JobOfferCard from '../components/job/JobOfferCard'
import SEOHead from '../components/seo/SEOHead'
import Pagination from '../components/ui/Pagination'
import Breadcrumb, { BreadcrumbItem } from '../components/ui/Breadcrumb'

const JobOffersPage = () => {
  const { t, i18n } = useTranslation("jobOffers")
 // TEST - Copiez-collez EXACTEMENT ceci
  console.log("=== DIAGNOSTIC i18n ===")
  console.log("Langue actuelle:", i18n.language)
  console.log("Test filters.search:", t('filters.search'))
  console.log("=======================")
  
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get("page")) || 1
  const [filter, setFilter] = useState<TJobOfferFilters>({ sort_by: 'newest' })
  const [totalPages, setTotalPages] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [filterChangeToast, setFilterChangeToast] = useState<string | null>(null)
  const [, forceUpdate] = useState(0)

  const {
    data: jobOffersData,
    isLoading,
    isError
  } = useGetJobOffers(filter, true)
  
  const { data: cities, isLoading: isLoadingCities } = useFetchCity()

  // Force re-render when language changes
  useEffect(() => {
    const handleLangChange = () => forceUpdate(prev => prev + 1)
    i18n.on("languageChanged", handleLangChange)
    return () => i18n.off("languageChanged", handleLangChange)
  }, [i18n])

  // Get results text with proper spacing
  const getResultsText = () => {
    const total = jobOffersData?.data?.pagination?.total || 0
    if (total <= 1) {
      return `${total} ${t('results.job_offers_found')}`
    }
    return `${total} ${t('results.job_offers_found_plural')}`
  }

  // Generate breadcrumb items
  const getBreadcrumbItems = (): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [
      {
        label: t('breadcrumb.home'),
        href: '/',
        icon: <FiHome className="w-4 h-4" />
      },
      {
        label: t('breadcrumb.job_offers'),
        icon: <FiBriefcase className="w-4 h-4" />
      }
    ]

    if (filter.search) {
      items.push({
        label: `${t('breadcrumb.search_prefix')}: "${filter.search}"`
      })
    }

    if (filter.ville) {
      items.push({ label: filter.ville })
    }

    if (filter.type) {
      items.push({
        label: filter.type === 'private' ? t('filters.private') : t('filters.public')
      })
    }

    return items
  }

  // Update totalPages when data changes
  useEffect(() => {
    if (jobOffersData?.data?.pagination) {
      setTotalPages(jobOffersData.data.pagination.last_page || 1)
      window.scrollTo(0, 0)
    }
  }, [jobOffersData])

  // Initialize search input from URL
  useEffect(() => {
    const search = searchParams.get('search') || ''
    setSearchInput(search)
  }, [searchParams])

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== (searchParams.get('search') || '')) {
        setIsSearching(true)
        setSearchParams(prev => {
          if (searchInput.trim()) {
            prev.set('search', searchInput.trim())
          } else {
            prev.delete('search')
          }
          prev.set('page', '1')
          return prev
        })
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [searchInput, searchParams, setSearchParams])

  // Reset searching state when data loads
  useEffect(() => {
    if (!isLoading) {
      setIsSearching(false)
    }
  }, [isLoading])

  // Update filter when search params change
  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries())
    const newFilter: TJobOfferFilters = {
      page: page,
      per_page: 10,
      sort_by: (params.sort_by as 'newest' | 'oldest' | 'title_asc' | 'title_desc') || 'newest',
    }
    
    if (params.search) newFilter.search = params.search
    if (params.type) newFilter.type = params.type as 'private' | 'public'
    if (params.ville) newFilter.ville = params.ville
    
    setFilter(newFilter)
  }, [searchParams, page])

  const handlePageChange = (newPage: number) => {
    setSearchParams(prev => {
      prev.set('page', newPage.toString())
      return prev
    })
  }

  const handleFilterChange = (key: keyof TJobOfferFilters, value: string | number | null) => {
    setSearchParams(prev => {
      if (value === null || value === undefined || value === '') {
        prev.delete(key)
        setFilterChangeToast(`${t('filters.filter_removed')} ${key}`)
      } else {
        prev.set(key, value.toString())
        setFilterChangeToast(`${t('filters.filter_applied')} ${key}`)
      }
      prev.set('page', '1')
      return prev
    })
    setTimeout(() => setFilterChangeToast(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <SEOHead
        title={t('seo.title')}
        description={t('seo.description')}
        path="/emploi"
      />
      
      {/* Toast notification */}
      {filterChangeToast && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in-down">
          <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">{filterChangeToast}</span>
            <button 
              onClick={() => setFilterChangeToast(null)}
              className="ml-2 text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>
        </div>
      )}      
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb items={getBreadcrumbItems()} />
        </div>
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t('page.h1')}
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('page.description')}
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <FiFilter className="w-5 h-5 mr-2" />
              {t('filters.title')}
            </h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden bg-blue-100 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
            >
              {showFilters ? t('filters.hide') : t('filters.show')}
            </button>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${showFilters ? 'block' : 'hidden lg:grid'}`}>
            {/* Search Filter */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('filters.search')}
              </label>
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder={t('filters.search_placeholder')}
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                {(isSearching || isLoading) && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('filters.sector')}
              </label>
              <div className="relative">
                <FiBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={filter.type || ''}
                  onChange={(e) => handleFilterChange('type', e.target.value || null)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
                >
                  <option value="">{t('filters.sector_placeholder')}</option>
                  <option value="private">{t('filters.private')}</option>
                  <option value="public">{t('filters.public')}</option>
                </select>
              </div>
            </div>
            
            {/* City Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('filters.location')}
              </label>
              <div className="relative">
                <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={filter.city_id || ''}
                  onChange={(e) => {
                    const cityId = e.target.value ? Number(e.target.value) : null
                    const cityName = cityId ? cities?.find(city => city.id === cityId)?.label || null : null
                    
                    setSearchParams(prev => {
                      if (cityId && cityName) {
                        prev.set('ville', cityName)
                        prev.delete('city_id')
                        prev.delete('city_name')
                      } else {
                        prev.delete('ville')
                        prev.delete('city_id')
                        prev.delete('city_name')
                      }
                      prev.set('page', '1')
                      return prev
                    })
                  }}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
                  disabled={isLoadingCities}
                >
                  <option value="">{t('filters.location_placeholder')}</option>
                  {cities && cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.label}
                    </option>
                  ))}
                </select>
                {isLoadingCities && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Sort Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('filters.sort')}
              </label>
              <select
                value={filter.sort_by || 'newest'}
                onChange={(e) => handleFilterChange('sort_by', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
              >
                <option value="newest">{t('filters.sort_newest')}</option>
                <option value="oldest">{t('filters.sort_oldest')}</option>
                <option value="title_asc">{t('filters.sort_title_asc')}</option>
                <option value="title_desc">{t('filters.sort_title_desc')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Top Ad Banner */}
        <div className="mb-8 flex justify-center">
          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center w-full max-w-3xl">
            <div className="text-gray-400 text-sm">{t('ad_banner')} (728x90)</div>
          </div>
        </div>

        {/* Results Info */}
        {jobOffersData?.data && (
          <div className="flex items-center justify-between mb-6 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-gray-700 font-medium">
                  <span className="font-bold text-green-600">
                    {getResultsText()}
                  </span>
                </p>
              </div>
              {(isLoading || isSearching) && (
                <div className="flex items-center space-x-2 text-blue-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span className="text-sm font-medium">{t('results.searching')}</span>
                </div>
              )}
            </div>
            <div className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
              {t('results.page')} {page} {t('results.out_of')} {totalPages}
            </div>
          </div>
        )}

        {/* Loading state */}
        {isLoading && !jobOffersData && (
          <div className="flex items-center justify-between mb-6 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <div className="h-5 bg-gray-200 rounded w-48 animate-pulse"></div>
            </div>
            <div className="h-5 bg-gray-200 rounded w-20 animate-pulse"></div>
          </div>
        )}

        {/* Job Offers Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {isLoading ? (
            [...Array(20)].map((_, index) => (
              <div key={index} className="animate-pulse bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
                <div className="w-full h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 relative">
                  <div className="absolute top-3 left-3 w-16 h-6 bg-gray-400 rounded-full"></div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="h-5 bg-gray-300 rounded-full w-20"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-16"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-6 bg-gray-400 rounded-lg w-4/5"></div>
                    <div className="h-6 bg-gray-300 rounded-lg w-3/5"></div>
                  </div>
                  <div className="space-y-1">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : isError ? (
            <div className="col-span-full text-center py-12">
              <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-lg mx-auto">
                <div className="text-red-500 text-6xl mb-6">⚠️</div>
                <h3 className="text-xl font-bold text-red-800 mb-3">{t('error.title')}</h3>
                <p className="text-red-600 mb-6 leading-relaxed">
                  {t('error.description')}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button 
                    onClick={() => window.location.reload()}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200"
                  >
                    🔄 {t('error.reload_button')}
                  </button>
                  <button 
                    onClick={() => {
                      setSearchParams(new URLSearchParams())
                      setTimeout(() => window.location.reload(), 100)
                    }}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200"
                  >
                    🗑️ {t('error.reset_button')}
                  </button>
                </div>
              </div>
            </div>
          ) : jobOffersData?.data?.items?.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 max-w-lg mx-auto">
                <div className="text-blue-500 text-6xl mb-6">🔍</div>
                <h3 className="text-xl font-bold text-blue-800 mb-3">{t('no_offers.title')}</h3>
                <p className="text-blue-600 mb-6 leading-relaxed">
                  {t('no_offers.description')}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button 
                    onClick={() => {
                      setSearchParams(new URLSearchParams())
                      setSearchInput('')
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200"
                  >
                    🔄 {t('no_offers.reset_filters')}
                  </button>
                  <button 
                    onClick={() => {
                      setSearchInput('')
                      setSearchParams(prev => {
                        prev.delete('search')
                        prev.set('page', '1')
                        return prev
                      })
                    }}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200"
                  >
                    🗑️ {t('no_offers.clear_search')}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            jobOffersData?.data?.items?.map((jobOffer) => (
              <JobOfferCard key={jobOffer.id} jobOffer={jobOffer} />
            ))
          )}
        </div>

        {/* Middle Ad Banner */}
        {!isLoading && !isError && jobOffersData?.data?.items && jobOffersData.data.items.length > 0 && (
          <div className="my-8 flex justify-center">
            <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center w-full max-w-sm">
              <div className="text-gray-400 text-sm">{t('ad_banner')} (300x250)</div>
            </div>
          </div>
        )}

        {/* Pagination */}
        {!isLoading && !isError && jobOffersData?.data?.items && jobOffersData.data.items.length > 0 && (
          <div className="mt-8">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
        
        {/* Loading pagination */}
        {isLoading && (
          <div className="mt-8 flex justify-center">
            <div className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              <span className="text-gray-600 font-medium">{t('loading_pagination')}</span>
            </div>
          </div>
        )}

        {/* Bottom Ad Banner */}
        <div className="mt-8 flex justify-center">
          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center w-full max-w-3xl">
            <div className="text-gray-400 text-sm">{t('ad_banner')} (728x90)</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobOffersPage