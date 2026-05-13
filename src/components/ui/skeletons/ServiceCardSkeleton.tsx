import Skeleton from "react-loading-skeleton"

import UserInfoBoxSkeleton from "./UserInfoBoxSkeleton"

const ServiceCardSkeleton = () => {
  return (
    <div className="rounded-md overflow-hidden shadow-card-sm hover:shadow-card-shadow-border">
      <div className="aspect-video scale-115 bg-primary-gray-200 overflow-hidden">
        <Skeleton height={'100%'} className="scale-105" />
      </div>
      <div>
        <div className="px-3 py-3 space-y-2 bg-white">
          <UserInfoBoxSkeleton />
          <div>
            <Skeleton width={200} height={15} count={2} />
          </div>
        </div>
        <div className="flex items-center justify-between px-4 py-[9px] bg-gray-50">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Skeleton width={20} height={20} circle={true} />
              <Skeleton width={30} height={10} />
            </div>
            <span className="text-sm text-gray-300">•</span>
            <span className="text-sm text-gray-500">
              <Skeleton width={50} height={10} />
            </span>
          </div>
          <div className="text-sm font-medium text-gray-900">
            <span className="text-green-500 font-semibold">
              <Skeleton width={60} height={15} />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceCardSkeleton