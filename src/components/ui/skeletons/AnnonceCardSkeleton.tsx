const AnnonceCardSkeleton = () => {
  return (
    <div className="shadow-card-sm p-4 h-full bg-white rounded-md flex flex-col justify-between animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-40 bg-gray-200 rounded-md mb-3"></div>
      
      {/* Title skeleton */}
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
      
      {/* Price skeleton */}
      <div className="h-5 bg-gray-200 rounded w-1/3 mb-4"></div>
      
      {/* Location skeleton */}
      <div className="flex items-center mb-3">
        <div className="w-4 h-4 bg-gray-200 rounded-full mr-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
      
      {/* Date skeleton */}
      <div className="flex items-center">
        <div className="w-4 h-4 bg-gray-200 rounded-full mr-2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/5"></div>
      </div>
      
      {/* Button skeleton */}
      <div className="mt-4 h-10 bg-gray-200 rounded-md"></div>
    </div>
  )
}

export default AnnonceCardSkeleton
