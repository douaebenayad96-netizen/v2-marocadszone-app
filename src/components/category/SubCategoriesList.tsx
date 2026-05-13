import { Category } from "../../services/types/category"
import SubcategoryCard from "./SubcategoryCard"


type SubCategoriesListProps = {
  categories: Category[]
  selectedCategoryId: number | undefined
  className?: string
}

const SubCategoriesList = ({ categories, selectedCategoryId, className }: SubCategoriesListProps) => {
  return (
    selectedCategoryId != undefined && (
      <div
        className={`flex items-center gap-2 overflow-x-auto ${className}`}
      >
        {
          categories?.filter((cat => cat.id === selectedCategoryId)).map((category) => {
            return category.sub_categories.map((subCategory) => (
              <SubcategoryCard
                key={subCategory.id}
                subCategory={subCategory}
              />
            ))
          })
        }
      </div>
    )
  )
}

export default SubCategoriesList