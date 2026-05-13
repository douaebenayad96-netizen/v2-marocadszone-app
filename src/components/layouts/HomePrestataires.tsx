import { usePrestatairesMaps } from "../../services/api/fetchPrestataire"
import SectionHeader from "./SectionHeader"
import PrestataireCardSkeleton from "../ui/skeletons/PrestataireCardSkeleton"
import { useEffect, useState } from "react"
import PrestataireCard from "../annonce/PrestataireCard"
//import PrestataireCardSkeleton from "./ui/skeletons/PrestataireCardSkeleton"

const HomePrestataires = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const { data: prestatairesData, isLoading, isError } = usePrestatairesMaps(latitude, longitude);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Latitude:", latitude);
          console.log("Longitude:", longitude);
          // Update latitude and longitude states
          setLatitude(latitude);
          setLongitude(longitude);
        },
        (error) => {
          console.error("Error getting user's location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);
  console.log(prestatairesData)


  return (
    <section className="app-container section-py">
      <SectionHeader
        title="Découvrez les Annonces Près de Chez Vous"
        subtitle="Avec la géolocalisation, explorez facilement les annonces locales dans votre région."
        buttonTitle="Voir Toutes les Annonces"
        to="/annonces"
      />
      <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {
          (isLoading || isError) &&
          [...Array(8)].map((_, index) => (
            <PrestataireCardSkeleton key={index} />
          ))
        }
        {
          prestatairesData?.slice(0, 8).map((prestataire) => (
            <PrestataireCard key={prestataire.id} prestataire={prestataire} />
          ))
        }
      </div>
    </section>
  )
}

export default HomePrestataires