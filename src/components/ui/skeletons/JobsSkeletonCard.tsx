import Skeleton from "react-loading-skeleton"

const JobsSkeletonCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-full flex flex-col overflow-hidden">
      {/* Image Skeleton */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <Skeleton height={192} className="rounded-t-xl scale-110" />
      </div>

      {/* Content Skeleton */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Job Type Badge Skeleton */}
        <Skeleton width={80} height={24} className="mb-3 rounded-full" />

        {/* Title Skeleton */}
        <Skeleton height={24} className="mb-2" />
        <Skeleton height={16} width="60%" className="mb-2" />

        {/* Company/Location Skeleton */}
        <div className="flex items-center mb-3">
          <Skeleton circle width={16} height={16} className="mr-2" />
          <Skeleton width={80} height={16} className="mr-4" />
          <Skeleton circle width={16} height={16} className="mr-2" />
          <Skeleton width={60} height={16} />
        </div>

        {/* Description Skeleton */}
        <Skeleton count={2} height={14} className="mb-4" />

        {/* Salary/Apply Skeleton */}
        <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between items-center">
          <Skeleton width={80} height={16} />
          <Skeleton width={90} height={36} className="rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export default JobsSkeletonCard