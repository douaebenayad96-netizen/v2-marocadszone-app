import { GrLinkNext } from "react-icons/gr"
import Skeleton from "react-loading-skeleton"
import { useTranslation } from "react-i18next"

import { Category } from "../../services/types/category"
import NoImage from "../../assets/img/no-image.png"

type SpecialityCardSelectProps = {
  onValueSelect: (specialite: Category) => void
  category: Category
}

const SpecialityCardSelect = ({ onValueSelect, category }: SpecialityCardSelectProps) => {
  const { i18n } = useTranslation()
  const lang = i18n.language

  return (
    <div
      onClick={() => onValueSelect(category)}
      className="shadow-card-sm p-4 flex items-center justify-between rounded-lg transition-all hover:bg-gray-50 cursor-pointer group">
      <div
        className="flex items-center gap-2"
      >
        <div
          className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden"
        >
          <img
            src={category?.media && category.media[0]?.original_url ? category.media[0].original_url : NoImage}
            alt="category picture"
            className="w-full h-full object-cover transition-all group-hover:scale-110"
          />
        </div>
        <div>
          <p
            className="text-sm font-bold"
          >
            {
              lang === 'fr' && category?.label
            }
            {
              lang === 'en' && category?.label
            }
            {
              lang === 'ar' && category?.label
            }
          </p>
        </div>
      </div>
      <div>
        <GrLinkNext
          className={lang === 'ar' ? 'transform rotate-180' : ''}
        />
      </div>
    </div>
  )
}

SpecialityCardSelect.Skeleton = () => {
  return (
    <div
      className="shadow-card-sm p-4 flex items-center justify-between rounded-lg transition-all hover:bg-gray-50 cursor-pointer group">
      <div
        className="flex items-center gap-2"
      >
        <div
          className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden"
        >
          <Skeleton
            width={48}
            height={48}
          />
        </div>
        <div>
          <Skeleton
            width={120}
            height={16}
          />
        </div>
      </div>
      <div>
        <Skeleton width={24} height={24} />
      </div>
    </div>
  )
}

export default SpecialityCardSelect