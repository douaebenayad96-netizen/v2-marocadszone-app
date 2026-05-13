import { Category } from "../../services/types/category"
import NoImage from "../../assets/img/no-image.png"
import { cn } from "../../utils/helpers"

type CategoryCardSmallProps = {
  category: Category
  onClick?: (category: Category) => void
  isSelected?: boolean
}

const CategoryCardSmall = ({ category, onClick, isSelected }: CategoryCardSmallProps) => {
  return (
    <div
      onClick={() => onClick && onClick(category)}
      className={cn(
        'block relative group bg-white cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl',
        isSelected 
          ? 'shadow-lg ring-2 ring-orange-500 ring-opacity-50 scale-105' 
          : 'shadow-md hover:shadow-xl'
      )}
    >
      <div className='aspect-square relative'>
        <img
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
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
        
        {/* Gradient overlay */}
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-t transition-all duration-300',
            isSelected 
              ? 'from-orange-600/80 via-orange-500/40 to-transparent' 
              : 'from-gray-900/60 via-gray-800/30 to-transparent group-hover:from-orange-600/70 group-hover:via-orange-500/40'
          )}
        />
        
        {/* Selected indicator */}
        {isSelected && (
          <div className="absolute top-2 right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end items-start p-3">
        <div className="bg-black/20 backdrop-blur-sm rounded-lg px-2 py-1 w-full">
          <h3 className={cn(
            "text-sm font-semibold text-white truncate transition-all duration-200",
            isSelected ? "text-orange-100" : "group-hover:text-orange-100"
          )}>
            {category.label}
          </h3>
        </div>
      </div>
    </div>
  )
}

export default CategoryCardSmall