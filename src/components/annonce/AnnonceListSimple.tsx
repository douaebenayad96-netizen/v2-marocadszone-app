import { useAnnonces } from '../../services/api/fetchAnnonce'
import { RiLoader4Line } from 'react-icons/ri'
import { PrestataireCardV2 } from './PrestataireCard'

interface AnnonceListSimpleProps {
  limit?: number
}

const AnnonceListSimple = ({ limit = 12 }: AnnonceListSimpleProps) => {
  const { data: annoncesData, isLoading, isError } = useAnnonces(1, true)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RiLoader4Line className="animate-spin text-4xl text-primaryCoral" />
        <span className="ml-2 text-gray-600">Chargement des annonces...</span>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">Erreur lors du chargement des annonces</p>
      </div>
    )
  }

  if (!annoncesData || annoncesData.data.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Aucune annonce trouvée</p>
      </div>
    )
  }

  const displayedAnnonces = annoncesData.data.slice(0, limit)

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedAnnonces.map((annonce) => (
          <PrestataireCardV2 key={annonce.id} annonce={annonce} />
        ))}
      </div>
      
      {annoncesData.data.length > 0 && (
        <div className="mt-6 text-center text-gray-600">
          Affichage de {displayedAnnonces.length} annonce(s) sur {annoncesData.data.length} total
        </div>
      )}
    </div>
  )
}

export default AnnonceListSimple
