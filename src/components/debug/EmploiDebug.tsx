import { useGetJobOffers } from '../../services/api/fetchService'

interface AxiosError {
  response?: {
    status?: number
    statusText?: string
    data?: unknown
  }
  config?: {
    url?: string
  }
}

/**
 * Debug component to test the /emploi endpoint
 */
const EmploiDebug = () => {
  const { data, isLoading, isError, error } = useGetJobOffers(undefined, true)

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Emploi API Debug</h1>
      
      <div className="space-y-6">
        {/* Environment Info */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Environment Configuration</h2>
          <div className="space-y-2 text-sm">
            <div><strong>API URL:</strong> {import.meta.env.VITE_API_URL}</div>
            <div><strong>Full Endpoint:</strong> {import.meta.env.VITE_API_URL}/job-offers</div>
            <div><strong>Mode:</strong> {import.meta.env.MODE}</div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Loading...</h2>
            <p>Making request to /emploi endpoint...</p>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="bg-red-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-3 text-red-800">Error Details</h2>
            <div className="space-y-3">              {error && typeof error === 'object' && 'response' in error ? (
                <div>
                  <h3 className="font-medium mb-2">HTTP Error:</h3>
                  <div className="bg-red-100 p-3 rounded text-sm">
                    <div><strong>Status:</strong> {(error as AxiosError).response?.status || 'Unknown'}</div>
                    <div><strong>Status Text:</strong> {(error as AxiosError).response?.statusText || 'Unknown'}</div>
                    <div><strong>URL:</strong> {(error as AxiosError).config?.url || 'Unknown'}</div>
                    <div><strong>Response Data:</strong></div>
                    <pre className="mt-2 text-xs">
                      {JSON.stringify((error as AxiosError).response?.data, null, 2)}
                    </pre>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="font-medium mb-2">General Error:</h3>
                  <div className="bg-red-100 p-3 rounded text-sm">
                    <pre>{error ? JSON.stringify(error, null, 2) : 'Unknown error'}</pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Success State */}
        {!isLoading && !isError && data && (
          <div className="bg-green-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-3 text-green-800">Success!</h2>
            <div className="space-y-3">
              <div>
                <h3 className="font-medium mb-2">Response Summary:</h3>
                <div className="bg-green-100 p-3 rounded text-sm">
                  <div><strong>Data Length:</strong> {data.data?.length || 0} items</div>
                  <div><strong>Current Page:</strong> {data.current_page || 'N/A'}</div>
                  <div><strong>Total Pages:</strong> {data.last_page || 'N/A'}</div>
                  <div><strong>Total Items:</strong> {data.total || 'N/A'}</div>
                </div>
              </div>
              
              {data.data && data.data.length > 0 && (
                <div>
                  <h3 className="font-medium mb-2">First Item Sample:</h3>
                  <div className="bg-green-100 p-3 rounded text-xs">
                    <pre>{JSON.stringify(data.data[0], null, 2)}</pre>
                  </div>
                </div>
              )}
              
              <div>
                <h3 className="font-medium mb-2">Full Response:</h3>
                <div className="bg-green-100 p-3 rounded text-xs max-h-64 overflow-y-auto">
                  <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Test Manual Request */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Manual Test</h2>
          <p className="mb-3 text-sm">You can also test the endpoint manually:</p>
          <div className="space-y-2">
            <div className="bg-gray-100 p-2 rounded font-mono text-sm">
              <strong>cURL:</strong><br/>
              curl -X GET "{import.meta.env.VITE_API_URL}/job-offers"
            </div>
            <div className="bg-gray-100 p-2 rounded font-mono text-sm">
              <strong>Browser:</strong><br/>
              <a                href={`${import.meta.env.VITE_API_URL}/job-offers`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {import.meta.env.VITE_API_URL}/job-offers
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmploiDebug
