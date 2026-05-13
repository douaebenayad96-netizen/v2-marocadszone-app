import SimpleBar from "simplebar-react"
import { useTranslation } from "react-i18next"
import useScrollPosition from "../../hooks/useScrollPosition"
import { useMetierByCategory } from "../../services/api/fetchCategory"
import { Category } from "../../services/types/category"
import SpecialityCardSelect from "./SpecialityCardSelect"
import ListView from "../common/ListView"

type SelectMetierListProps = {
  onSelectMetier: (metier: Category) => void
  onBack: () => void
  selctedSpecialite: Category
}

const SelectMetierList = ({ onSelectMetier, onBack, selctedSpecialite: category }: SelectMetierListProps) => {
  const { isScrollOnTop, scrollableNodeRef } = useScrollPosition()
  const { data: metiers, isLoading, isError } = useMetierByCategory(category.id.toString())
  const { i18n, t } = useTranslation()
  const lang = i18n.language

  return (
    <div>
      <div
        className={`px-4 md:px-6 py-1 ${!isScrollOnTop && 'shadow-md'}`}
      >
        <h2 className="text-lg font-bold">
          {
            lang === 'fr' && category?.label
          }
          {
            lang === 'en' && category?.label
          }
          {
            lang === 'ar' && category?.label
          }
        </h2>
        <div
          className="flex justify-between gap-2 items-center w-fit"
        >
          <div
            onClick={() => onBack()}
            className="text-primary-blue-all-800 cursor-pointer hover:underline"
          >
            {t('prestatairesFilter.specialite')}
          </div>
          <span
            className="text-gray-500"
          >
            {">"}
          </span>
          <div
            className="text-gray-500"
          >
            {t('prestationsFilter.select_metier')}
          </div>
        </div>
      </div>
      <SimpleBar
        scrollableNodeProps={{ ref: scrollableNodeRef }}
        className="max-h-[calc(100dvh-12rem)] min-h-[441px] overflow-y-auto p-4 md:p-6 pt-0 md:pt-0"
      >
        <ListView
          className="grid grid-cols-1 gap-4 mt-4"
          isLoading={isLoading || isError}
          data={metiers}
          renderItem={(cat, index) => (
            <SpecialityCardSelect
              key={index}
              category={cat}
              onValueSelect={onSelectMetier}
            />
          )}
          skeletonItem={<SpecialityCardSelect.Skeleton />}
          totalSkeletonItems={12}
        />
        {/* list Empty */}
        {
          !isLoading && !isError && metiers?.length === 0 && (
            <div
              className="flex items-center justify-center h-40"
            >
              <p
                className="text-gray-500"
              >
                Aucun métier trouvé pour cette spécialité !
              </p>
            </div>
          )
        }
      </SimpleBar>
    </div>
  )
}

export default SelectMetierList