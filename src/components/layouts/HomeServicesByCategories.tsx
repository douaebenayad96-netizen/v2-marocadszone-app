import { useCategories } from "../../services/api/fetchCategory"
import HomeServicesByCategory from "./HomeServicesByCategory"

const HomeServicesByCategories = () => {
  const { data: categoriesData } = useCategories(1, true)
  const categories = categoriesData?.data || []
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", categoriesData)
  return (
    <>
      {
        categories?.slice(0, 5).map((category) => (
          <HomeServicesByCategory key={category.id} category={category} />
        ))
      }
    </>
  )
}

export default HomeServicesByCategories