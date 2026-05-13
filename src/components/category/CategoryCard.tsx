import { Link } from 'react-router-dom'

import NoImage from '../../assets/img/no-image.png'
import { useTranslation } from 'react-i18next'
import { Category } from '../../services/types/category'

type CategoryCardProps = {
  category: Category
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  let message = ''

  if (category.prestataires_count === 0) {
    message = 'Aucun artisan trouvé'
  } else if (category.prestataires_count < 10) {
    message = 'Moins de 10 artisans'
  } else {
    if (category.prestataires_count > 2500) {
      message = t('home.prestatairesCat.moreThan2500')
    } else if (category.prestataires_count > 1000) {
      message = t('home.prestatairesCat.moreThan1000')
    } else if (category.prestataires_count > 100) {
      message = t('home.prestatairesCat.moreThan100')
    } else {
      message = 'Plus de 10 artisans'
    }
  }

  return (
    <Link
      to={`/annonces?category=${category.id}`}
      className="block rounded-full w-60 h-60 relative group bg-white cursor-pointer rounded-3xl overflow-hidden shadow-card-sm hover:opacity-80 hover:shadow-card-shadow-border transition-opacity transition-shadow"
    >
      <div
        className='rounded-full w-96 h-96'
      >   
<img
  className="object-cover rounded-full w-60 h-60 group-hover:scale-105 transition-transform duration-200 group-hover:-rotate-1"
  src={
    category.picture
      ? category.picture.startsWith('http') || category.picture.startsWith('//')
        ? category.picture
        : `http://${category.picture}`
      : category.media?.[0]?.original_url || NoImage
  }
  alt={`Category: ${category.label}`}
  onError={(e) => {
    console.warn("Image failed to load for category:", category.label, "URL:", category.picture);
    (e.currentTarget as HTMLImageElement).src = NoImage;
  }}
/>

      </div>
      {/* shadow */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-primary-blue to-transparent group-hover:bg-primary-blue group-hover:bg-opacity-50 transition-all duration-200"
      ></div>
      {/* content */}
      <div
        className="absolute inset-0 flex flex-col justify-center items-start p-4 text-white"
      >
        <h3 className="text-2xl font-semibold">
          {
            lang === 'fr' && category.label
          }
          {
            lang === 'en' && category.label
          }
          {
            lang === 'ar' && category.label
          }
        </h3>
        <p className="text-sm">
          {
            message
          }
        </p>
      </div>
    </Link>
  )
}

export default CategoryCard