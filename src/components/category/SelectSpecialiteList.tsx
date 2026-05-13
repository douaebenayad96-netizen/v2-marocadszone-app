import SimpleBar from "simplebar-react"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import useScrollPosition from "../../hooks/useScrollPosition"
import { Category } from "../../services/types/category"
import { useCategories } from "../../services/api/fetchCategory"
import SpecialityCardSelect from "./SpecialityCardSelect"
import ListView from "../common/ListView"


type SelectSpecialiteListProps = {
  onSpecialiteSelect: (specialite: Category) => void
}

const SelectSpecialiteList = ({ onSpecialiteSelect }: SelectSpecialiteListProps) => {
  const { t } = useTranslation()
  const { isScrollOnTop, scrollableNodeRef } = useScrollPosition()
  const [page, setPage] = useState<number>(1)
  const [specialities, setSpecialities] = useState<Category[]>([])
  const { data, isLoading, isError } = useCategories(page, true)

  useEffect(() => {
    if (data) {
      setSpecialities((prevSpecialities) => {
        const newSpecialities = data.data.filter((specialite) => {
          return !prevSpecialities.some((prevSpecialite) => prevSpecialite.id === specialite.id)
        })
        return [...prevSpecialities, ...newSpecialities]
      })
    }
  }, [data])

  const handleLoadMore = () => {
    if (data?.last_page && page < data.last_page) {
      setPage((prevPage) => prevPage + 1)
    }
  }

  return (
    <div>
      <div
        className={`p-4 ${!isScrollOnTop && 'shadow-md'}`}
      >
        <h2 className="text-lg font-bold text-center">
          {t("choisir_un_specialite")}
        </h2>
      </div>
      <SimpleBar
        scrollableNodeProps={{ ref: scrollableNodeRef }}
        className="max-h-[calc(100dvh-12rem)] min-h-[441px] overflow-y-auto p-4 md:p-6 pt-0 md:pt-0"
      >
        <ListView
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
          isLoading={isLoading || isError}
          data={specialities}
          renderItem={(cat, index) => (
            <SpecialityCardSelect
              key={index}
              category={cat}
              onValueSelect={onSpecialiteSelect}
            />
          )}
          skeletonItem={<SpecialityCardSelect.Skeleton />}
          totalSkeletonItems={3}
        />
        {
          data?.last_page && page < data.last_page && (
            <div
              className="flex justify-center mt-4"
            >
              <button
                onClick={handleLoadMore}
                className="text-primary-blue-all-800 font-bol hover:underline"
              >
                Voir plus
              </button>
            </div>
          )
        }
      </SimpleBar>
    </div>
  )
}

export default SelectSpecialiteList