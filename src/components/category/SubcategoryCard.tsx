
import { Category } from "../../services/types/category"
import { cn } from "../../utils/helpers"
import NoImage from "../../assets/img/no-image.png"

type SubcategoryCardProps = {
  subCategory: Category
  onClick?: (cat: Category) => void
  isSelected?: boolean
}

const SubcategoryCard = ({ subCategory, onClick, isSelected }: SubcategoryCardProps) => {
  return (
    <div
      onClick={() => onClick && onClick(subCategory)}
      className={cn(
        'group relative bg-white shadow-md rounded-full p-1 transition-all duration-300 cursor-pointer hover:shadow-lg transform hover:scale-105',
        isSelected 
          ? 'bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg ring-2 ring-orange-300 ring-opacity-50 scale-105' 
          : 'border-2 border-gray-100 hover:border-orange-300'
      )}
    >
      <div className="flex items-center">
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-8 h-8 rounded-full overflow-hidden ring-2 transition-all duration-300",
            isSelected 
              ? "ring-orange-200" 
              : "ring-gray-200 group-hover:ring-orange-300"
          )}>
            <img
              src={
                subCategory.picture
                  ? subCategory.picture.startsWith('http') || subCategory.picture.startsWith('//')
                    ? subCategory.picture
                    : `http://${subCategory.picture}`
                  : subCategory.media && subCategory.media[0]?.original_url || NoImage
              }
              alt={subCategory.label}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = NoImage;
              }}
            />
          </div>
        </div>
        
        <div className="flex items-center mx-3">
          <p className={cn(
            "text-sm font-medium transition-all duration-300 truncate max-w-[120px]",
            isSelected 
              ? "text-white" 
              : "text-gray-800 group-hover:text-orange-600"
          )}>
            {subCategory.label}
          </p>
          
          {/* Selected indicator */}
          {isSelected && (
            <div className="ml-2 w-4 h-4 bg-white rounded-full flex items-center justify-center">
              <svg className="w-2.5 h-2.5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SubcategoryCard