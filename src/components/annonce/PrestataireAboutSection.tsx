import Skeleton from "react-loading-skeleton"
import { useTranslation } from "react-i18next"
import { FaShoppingCart, FaTags, FaInfoCircle, FaUserAlt, FaLayerGroup, FaFolder } from "react-icons/fa"
import { RiMapPinLine } from "react-icons/ri"
import UserInfoBox from "../account/UserInfoBox"
import { Prestataire } from "../../services/types/prestataire"
import { Annonce } from "../../services/types/annonce"

type PrestataireAboutSectionProps = {
  prestataire?: Prestataire
  annonce?: Annonce
}

const PrestataireAboutSection = ({ prestataire, annonce }: PrestataireAboutSectionProps) => {
  // Only use annonce data, ignore prestataire
  const data = annonce
  const { i18n } = useTranslation()
  const lang = i18n.language as 'fr' | 'en' | 'ar'
  const city = data?.city?.name || data?.city?.label || 'Unknown City'
  const metier = data?.subcategory?.category?.name || data?.subcategory?.category?.label || data?.category?.name || data?.category?.label || 'General'

  return (
    <div className="space-y-6">
      {/* Title Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {data?.title || 'Annonce Title'}
        </h1>
        <div className="flex items-center mt-1 text-gray-500">
          <RiMapPinLine className="mr-1 text-sm" />
          <span className="text-sm">
            {lang === 'fr' ? `Annonce de ${metier} à ${city}` :
              lang === 'en' ? `Ad of ${metier} in ${city}` :
                ` اعلان ${metier} في ${city}`}
          </span>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-3">
        <div className="bg-blue-600 text-white text-xs font-bold rounded-full py-1.5 px-3 flex items-center gap-1.5 shadow-sm">
          <FaLayerGroup className="text-xs" />
          <span>{data?.subcategory?.category?.label || 'Annonce'}</span>
        </div>

        {data?.subcategory && (
          <div className="bg-amber-500 text-white text-xs font-bold rounded-full py-1.5 px-3 flex items-center gap-1.5 shadow-sm">
            <FaFolder className="text-xs" />
            <span>{data.subcategory.label}</span>
          </div>
        )}
      </div>

      {/* Description */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <FaInfoCircle />
          <h3 className="font-medium">Description</h3>
        </div>
        <div 
          className="text-gray-700 leading-relaxed max-w-full"
          style={{
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
            whiteSpace: 'pre-wrap',
            hyphens: 'auto'
          }}
        >
          {data?.description || 'No description available'}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <FaUserAlt />
          <h3 className="font-medium">Contacter par:</h3>
        </div>
        <UserInfoBox
          size='medium'
          previewOnly
          annonce={annonce}
        />
      </div>
    </div>
  )
}

PrestataireAboutSection.Skeleton = () => {
  return (
    <div className="space-y-6">
      {/* Title Skeleton */}
      <div>
        <Skeleton height={32} width={200} className="mb-2" />
        <div className="flex items-center">
          <Skeleton circle height={16} width={16} className="mr-2" />
          <Skeleton height={16} width={180} />
        </div>
      </div>

      {/* Badges Skeleton */}
      <div className="flex gap-3">
        <Skeleton height={28} width={80} borderRadius={16} />
        <Skeleton height={28} width={100} borderRadius={16} />
      </div>

      {/* Description Skeleton */}
      <div className="space-y-2">
        <Skeleton height={20} width={120} />
        <Skeleton count={3} />
      </div>

      {/* Contact Skeleton */}
      <div className="space-y-4">
        <Skeleton height={20} width={120} />
        <div className="flex items-center gap-3">
          <Skeleton circle height={48} width={48} />
          <div className="space-y-2">
            <Skeleton height={16} width={120} />
            <Skeleton height={14} width={80} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrestataireAboutSection