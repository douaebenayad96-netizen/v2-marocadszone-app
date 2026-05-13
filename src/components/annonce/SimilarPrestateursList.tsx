import { useSimilarAnnoncesBySlug } from "../../services/api/fetchAnnonce"
import { Annonce } from "../../services/types/annonce"
import ListView from "../common/ListView"
import { PrestataireCardV2 } from "./PrestataireCard"
import PrestataireCardSkeleton from "../ui/skeletons/PrestataireCardSkeleton"

type SimilarPrestateursListProps = {
  annonce?: Annonce
}

const SimilarPrestateursList = ({ annonce }: SimilarPrestateursListProps) => {
  // Use slug-based hook instead of ID-based
  const {
    data: similarAnnonces,
    isLoading,
    isError
  } = useSimilarAnnoncesBySlug(annonce?.slug || '', !!annonce?.slug)
  
  // Debug logging
  console.log('🔍 SimilarPrestateursList Debug:')
  console.log('Annonce slug:', annonce?.slug)
  console.log('Similar annonces data:', similarAnnonces)
  console.log('Is loading:', isLoading)
  console.log('Is error:', isError)
  console.log('Data type:', typeof similarAnnonces)
  console.log('Is array:', Array.isArray(similarAnnonces))
  
  // Ensure data is always an array
  const safeData = Array.isArray(similarAnnonces) ? similarAnnonces : []
  console.log('Safe data:', safeData)
  console.log('Safe data length:', safeData.length)

  return (
    <div>
      <ListView
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        data={safeData}
        isLoading={isLoading || isError}
        renderItem={(item: Annonce) => (
          <PrestataireCardV2
            key={item.id}
            annonce={item}
          />
        )}
        totalSkeletonItems={4}
        skeletonItem={<PrestataireCardSkeleton />}
      />
    </div>
  )
}

export default SimilarPrestateursList