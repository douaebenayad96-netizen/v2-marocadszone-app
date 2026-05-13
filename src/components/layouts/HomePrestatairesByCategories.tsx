import { usePopularSpecialities } from "../../services/api/fetchCategory"
import HomePrestatairesCategory from "./HomePrestatairesCategory"

const HomePrestatairesByCategories = () => {
  const { data: popularCategories } = usePopularSpecialities()

  let categories: any[] = []
  if (Array.isArray(popularCategories)) {
    categories = popularCategories
  } else if (popularCategories && Array.isArray((popularCategories as any).data)) {
    categories = (popularCategories as any).data
  }

  console.log('popularCategories:', popularCategories)
  console.log('categories:', categories)

  return (
    <>
      {categories.map((category) => (
        <HomePrestatairesCategory key={category.id} category={category} />
      ))}
    </>
  )
}

export default HomePrestatairesByCategories