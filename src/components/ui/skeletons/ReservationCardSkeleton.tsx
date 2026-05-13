import Skeleton from "react-loading-skeleton"

import UserInfoBoxSkeleton from "./UserInfoBoxSkeleton"

const ReservationCardSkeleton = () => {
  return (
    <div className='bg-white shadow-card-sm p-4 rounded-md'>
      <div>
        <UserInfoBoxSkeleton />
        {/* status */}
        <div className="flex items-center gap-2 mt-1">
          <span>
            <Skeleton width={60} height={10} />
          </span>
          <span >
            <Skeleton width={60} height={10} />
          </span>
        </div>
      </div>
      <div className="line my-2"></div>
      {/* service details */}
      <div>
        <span className="w-full">
          <Skeleton height={12} count={2} />
        </span>
      </div>
      {/* service date */}
      <div className="flex items-center gap-2 mt-2">
        <span>
          <Skeleton width={60} height={10} />
        </span>
        <span>
          <Skeleton width={80} height={10} />
        </span>
      </div>
      {/* price */}
      <div className="flex items-center gap-2 mt-2">
        <span>
          <Skeleton width={60} height={10} />
        </span>
        <span>
          <Skeleton width={60} height={10} />
        </span>
      </div>
      {/* address */}
      <div className="flex items-center gap-2 mt-2">
        <span>
          <Skeleton width={60} height={10} />
        </span>
        <span>
          <Skeleton width={140} height={10} />
        </span>
      </div>
      {/* actions */}
      <div className="mt-2">
        <span>
          <Skeleton width={100} height={10} />
        </span>
      </div>
      {/* contact */}
      <div className="mt-3 w-full">
        <Skeleton height={40} />
      </div>
    </div>
  )
}

export default ReservationCardSkeleton