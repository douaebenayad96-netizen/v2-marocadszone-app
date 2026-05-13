import { useEffect } from 'react'
import axiosConfig from '../../services/config/axiosConfig'
import { AxiosError } from 'axios'

const AnnonceApiTest = () => {
  useEffect(() => {
    const testApi = async () => {
      try {
        console.log('🔍 Testing annonces API...')
          // Test 1: Liste des annonces
         try {
          const annoncesResponse = await axiosConfig.get('/announces  ')
          console.log('✅ Annonces list response:', annoncesResponse.data)
        } catch (error) {
          // console.error(' Annonces list error:', error)
        }
     
        try {
          const prestationsResponse = await axiosConfig.get('/Announces?page=1')
          console.log('✅ Announces with capital response:', prestationsResponse.data)
        } catch (error) {
          console.error('❌ Announces with capital error:', error)
        }
          // Test 3: Essayez différentes URLs pour voir laquelle fonctionne
        console.log('Test 3: Trying different URLs')
        const testUrls = [
          '/announces',
          '/Announces',
          '/announces/filter',
          '/announces/search',
          '/api/announces',
          '/api/Announces'
        ]
        
        for (const url of testUrls) {
          try {
            console.log(`Testing URL: ${url}`)
            const response = await axiosConfig.get(url)
            console.log(`✅ URL ${url} works:`, response.status)          } catch (error) {
            const axiosError = error as AxiosError
            console.error(`❌ URL ${url} failed:`, axiosError.message)
          }
        }
        
      } catch (error) {
        console.error('❌ API test failed:', error)
      }
    }
    
    testApi()
  }, [])
  
  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4">API Test</h2>
      <p>Vérifiez la console pour voir les résultats des tests API</p>
    </div>
  )
}

export default AnnonceApiTest
