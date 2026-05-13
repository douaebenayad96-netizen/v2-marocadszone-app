import { useAnnonces, useAnnoncesInfinite } from '../../services/api/fetchAnnonce'

const AnnonceDebug = () => {
  console.log('🔧 AnnonceDebug component rendered')
  
  // Test simple pagination
  const { 
    data: paginatedData, 
    isLoading: paginatedLoading, 
    isError: paginatedError,
    error: paginatedErrorDetails
  } = useAnnonces(1, true)

  // Test infinite query
  const { 
    data: infiniteData, 
    isLoading: infiniteLoading, 
    isError: infiniteError,
    error: infiniteErrorDetails
  } = useAnnoncesInfinite(true)

  console.log('🔧 Paginated Query State:', {
    data: paginatedData,
    isLoading: paginatedLoading,
    isError: paginatedError,
    error: paginatedErrorDetails
  })

  console.log('🔧 Infinite Query State:', {
    data: infiniteData,
    isLoading: infiniteLoading,
    isError: infiniteError,
    error: infiniteErrorDetails
  })

  return (
    <div className="p-4 bg-yellow-100 border border-yellow-400 rounded">
      <h3 className="font-bold text-lg mb-2">🔧 Annonce API Debug</h3>
      
      <div className="mb-4">
        <h4 className="font-semibold">Paginated Query:</h4>
        <p>Loading: {paginatedLoading ? 'Yes' : 'No'}</p>
        <p>Error: {paginatedError ? 'Yes' : 'No'}</p>
        <p>Data count: {paginatedData?.data?.length || 0}</p>
        {paginatedError && (
          <p className="text-red-600">Error: {String(paginatedErrorDetails)}</p>
        )}
      </div>

      <div className="mb-4">
        <h4 className="font-semibold">Infinite Query:</h4>
        <p>Loading: {infiniteLoading ? 'Yes' : 'No'}</p>
        <p>Error: {infiniteError ? 'Yes' : 'No'}</p>
        <p>Pages count: {infiniteData?.pages?.length || 0}</p>
        {infiniteError && (
          <p className="text-red-600">Error: {String(infiniteErrorDetails)}</p>
        )}
      </div>

      <p className="text-sm text-gray-600">Check browser console for detailed logs</p>
    </div>
  )
}

export default AnnonceDebug
