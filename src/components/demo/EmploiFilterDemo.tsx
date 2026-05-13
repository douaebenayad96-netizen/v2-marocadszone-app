import { useState } from 'react'
import { useGetJobOffers } from '../../services/api/fetchService'
import { useFetchCity } from '../../services/api/fetchCity'
import { TJobOfferFilters } from '../../services/types/jobOffer'

/**
 * Demo component showing the city filtering functionality
 */
const EmploiFilterDemo = () => {
  const [filters, setFilters] = useState<TJobOfferFilters>({})
  
  const { data: jobOffers, isLoading: isLoadingJobs } = useGetJobOffers(filters)
  const { data: cities, isLoading: isLoadingCities } = useFetchCity()

  const handleCityChange = (cityId: string) => {
    setFilters(prev => ({
      ...prev,
      city_id: cityId ? Number(cityId) : undefined
    }))
  }

  const handleTypeChange = (type: string) => {
    setFilters(prev => ({
      ...prev,
      type: type ? (type as "private" | "public") : undefined
    }))
  }

  const handleSearchChange = (search: string) => {
    setFilters(prev => ({
      ...prev,
      search: search || undefined
    }))
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Emploi Filter Demo</h1>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Filtres</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Search Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recherche
            </label>
            <input
              type="text"
              placeholder="Titre, description..."
              value={filters.search || ''}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            <select
              value={filters.type || ''}
              onChange={(e) => handleTypeChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Tous les types</option>
              <option value="private">Privé</option>
              <option value="public">Public</option>
            </select>
          </div>

          {/* City Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ville
            </label>
            <select
              value={filters.city_id || ''}
              onChange={(e) => handleCityChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoadingCities}
            >
              <option value="">Toutes les villes</option>
              {cities && cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.label}
                </option>
              ))}
            </select>
            {isLoadingCities && (
              <p className="text-xs text-gray-500 mt-1">Chargement des villes...</p>
            )}
          </div>
        </div>

        {/* Current Filters Display */}
        <div className="mt-4 p-3 bg-gray-50 rounded">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Filtres actifs:</h3>
          <div className="text-sm text-gray-600">
            <pre>{JSON.stringify(filters, null, 2)}</pre>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          Résultats {jobOffers?.data && `(${jobOffers.data.length} emplois)`}
        </h2>
        
        {isLoadingJobs ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Chargement...</p>
          </div>
        ) : jobOffers?.data && jobOffers.data.length > 0 ? (
          <div className="space-y-4">
            {jobOffers.data.map((job) => (
              <div key={job.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        job.type === 'private' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {job.type === 'private' ? 'Privé' : 'Public'}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {job.city.name}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-700 line-clamp-2">{job.description.substring(0, 150)}...</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">Aucun emploi trouvé avec ces filtres.</p>
          </div>
        )}
      </div>

      {/* Cities Debug Info */}
      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Villes disponibles</h2>
        {isLoadingCities ? (
          <p>Chargement des villes...</p>
        ) : cities ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {cities.map((city) => (
              <div key={city.id} className="text-sm bg-gray-50 p-2 rounded">
                {city.label} (ID: {city.id})
              </div>
            ))}
          </div>
        ) : (
          <p>Aucune ville disponible.</p>
        )}
      </div>
    </div>
  )
}

export default EmploiFilterDemo
