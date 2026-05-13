import { useEffect, useState, useMemo } from "react"
import SectionHeader from "./SectionHeader"
import { useAnnonces, useAnnoncesByLocation } from "../../services/api/fetchAnnonce"
import { PrestataireCardV2 } from '../annonce/PrestataireCard'
import AnnonceCardSkeleton from "../ui/skeletons/AnnonceCardSkeleton"

const HomeAnnonces = () => {
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [useGlobalAnnonces, setUseGlobalAnnonces] = useState(false)

  // Location-based announcements
  const { 
    data: locationAnnoncesData, 
    isLoading: isLocationLoading, 
    isError: isLocationError 
  } = useAnnoncesByLocation(latitude, longitude, 20, !useGlobalAnnonces)

  // Fallback to regular announcements if location is not available
  const { 
    data: regularAnnoncesData, 
    isLoading: isRegularLoading 
  } = useAnnonces(1, useGlobalAnnonces)

  // Determine which data set to use with useMemo
  const annoncesData = useMemo(() => {
    return useGlobalAnnonces 
      ? regularAnnoncesData?.data || [] 
      : locationAnnoncesData || [];
  }, [useGlobalAnnonces, regularAnnoncesData, locationAnnoncesData]);

  const isLoading = useGlobalAnnonces ? isRegularLoading : isLocationLoading
  const isError = useGlobalAnnonces ? false : isLocationError

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setLatitude(latitude)
          setLongitude(longitude)
          setUseGlobalAnnonces(false)
        },
        (error) => {
          console.error("Error getting user's location:", error.message)
          setUseGlobalAnnonces(true)
        }
      )
    } else {
      console.error("Geolocation is not supported by this browser.")
      setUseGlobalAnnonces(true)
    }
  }, [])
  // Debug
  useEffect(() => {
    if (annoncesData.length > 0) {
      console.log("✅ Announcements loaded successfully:", annoncesData.length, "found");
    } else if (isLoading) {
      console.log("⏳ Loading announcements...");
    } else if (isError) {
      console.error("❌ Error loading announcements");
    } else {
      console.warn("⚠️ No announcements found");
    }
  }, [annoncesData, isLoading, isError]);

  return (
    <section className="app-container section-py">      <SectionHeader
        title="Découvrez les Annonces Près de Chez Vous"
        subtitle="Explorez facilement les annonces locales dans votre région."
        buttonTitle="Voir Toutes les Annonces"
        to="/annonces"
      />
      <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {
          isLoading &&
          [...Array(8)].map((_, index) => (
            <AnnonceCardSkeleton key={index} />
          ))
        }
        {
          !isLoading && annoncesData && annoncesData.length > 0 ? (
            annoncesData.slice(0, 8).map((annonce, index) => (
              <PrestataireCardV2 key={annonce.id || index} annonce={annonce} />
            ))
          ) : (
            !isLoading && (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">Aucune annonce trouvée dans votre région</p>
              </div>
            )
          )
        }
      </div>
    </section>
  )
}

export default HomeAnnonces
