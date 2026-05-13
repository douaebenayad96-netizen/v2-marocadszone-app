import { useFetchCity } from "../../services/api/fetchCity"
import HomePrestatairesCity from "./HomePrestatairesCity"


const HomePrestatairesByCities = () => {
  const { data: villesList } = useFetchCity()
  return (
    <>
      {
        villesList?.slice(0, 5).map((ville) => (
          <HomePrestatairesCity key={ville.id} city={ville} />
        ))
      }
    </>
  )
}

export default HomePrestatairesByCities