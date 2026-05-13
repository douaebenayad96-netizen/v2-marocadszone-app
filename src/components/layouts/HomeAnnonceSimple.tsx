import { useEffect, useState } from "react"
import SectionHeader from "./SectionHeader"
import axiosConfig from "../../services/config/axiosConfig"
import { PrestataireCardV2 } from '../annonce/PrestataireCard'
import { Annonce } from "../../services/types/annonce"

const HomeAnnonceSimple = () => {
  const [annonces, setAnnonces] = useState<Annonce[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAnnonces = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // Test if the endpoint is accessible
        console.log('🔍 Fetching announcements...')
        
        const response = await axiosConfig.get('/announces')
        const data = response.data
        
        // Log the response structure
        console.log('📦 Raw response:', data)
        
        // Handle different response formats
        const announcements = Array.isArray(data) ? data : 
                            data.data && Array.isArray(data.data) ? data.data : 
                            []
                            
        console.log('✅ Processed announcements:', announcements.length)
        setAnnonces(announcements)
      } catch (error) {
        console.error('❌ Error fetching announcements:', error)
        setError('Unable to load announcements')
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnnonces()
  }, [])

  return (
    <section className="app-container section-py">
      <SectionHeader
        title="Découvrez les Annonces Près de Chez Vous"
        subtitle="Explorez les dernières annonces disponibles."
        buttonTitle="Voir Toutes les Annonces"
        to="/annonces"
      />
      <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {isLoading && (
          <>
            {[...Array(8)].map((_, index) => (
              <div key={index} className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>
            ))}
          </>
        )}
        
        {!isLoading && error && (
          <div className="col-span-full text-center py-8">
            <p className="text-red-500">{error}</p>
          </div>
        )}
        
        {!isLoading && !error && annonces.length === 0 && (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">Aucune annonce disponible pour le moment</p>
          </div>
        )}
        
        {!isLoading && !error && annonces.map((annonce) => (
          <PrestataireCardV2 key={annonce.id} annonce={annonce} />
        ))}
      </div>
    </section>
  )
}

export default HomeAnnonceSimple
