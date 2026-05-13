import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'

const PrestataireCardSkeleton = () => {
  return (
    <div className="shadow-card-sm p-3 rounded-md space-y-2">
      {/* Card Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton circle width={40} height={40} />
          <div>
            <Skeleton width={80} height={16} />
            <div className="flex items-center gap-1.5 mt-1">
              <Skeleton circle width={12} height={12} />
              <Skeleton width={60} height={12} />
            </div>
          </div>
        </div>
      </div>

      {/* Card Body Skeleton */}
      <Skeleton height={180} className="rounded-lg" />

      {/* Card Footer Skeleton */}
      <div className="space-y-2">
        <div className="flex items-center gap-1">
          <Skeleton circle width={24} height={24} />
          <Skeleton width={180} height={14} />
        </div>

        <div>
          <Skeleton height={16} className="mb-1" />
          <Skeleton height={16} width="80%" />
        </div>

        <div className="flex gap-2">
          <Skeleton width={40} height={24} borderRadius={20} />
          <Skeleton width={60} height={24} borderRadius={20} />
          <Skeleton width={50} height={24} borderRadius={20} />
        </div>

        <div className="flex justify-between pt-1">
          <Skeleton width={80} height={16} />
        </div>
      </div>
    </div>
  )
}

export const PrestataireCardV2Skeleton = () => {
  return (
    <div className="shadow-card-sm p-3 rounded-md space-y-2">
      {/* Card Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton circle width={40} height={40} />
          <div>
            <Skeleton width={80} height={16} />
            <div className="flex items-center gap-1.5 mt-1">
              <Skeleton circle width={12} height={12} />
              <Skeleton width={60} height={12} />
            </div>
          </div>
        </div>
      </div>

      {/* Card Body Skeleton */}
      <Skeleton height={180} className="rounded-lg" />

      {/* Card Footer Skeleton */}
      <div className="space-y-2">
        <div className="flex items-center gap-1">
          <Skeleton circle width={24} height={24} />
          <Skeleton width={180} height={14} />
        </div>

        <div>
          <Skeleton height={16} className="mb-1" />
          <Skeleton height={16} width="80%" />
        </div>

        <div className="flex gap-2">
          <Skeleton width={40} height={24} borderRadius={20} />
          <Skeleton width={60} height={24} borderRadius={20} />
          <Skeleton width={50} height={24} borderRadius={20} />
        </div>

        <div className="flex justify-between pt-1">
          <Skeleton width={80} height={16} />
        </div>
      </div>
    </div>
  )
}

export default PrestataireCardSkeleton