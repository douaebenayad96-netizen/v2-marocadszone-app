import Skeleton from "react-loading-skeleton"

type UserInfoBoxSkeletonProps = {
  size?: 'small' | 'large' | 'medlarg'
}

const UserInfoBoxSkeleton = ({ size = 'small' }: UserInfoBoxSkeletonProps) => {

  if (size === 'medlarg') {
    return (
      <div className="flex items-center space-x-3">
        <Skeleton circle={true} width={60} height={60} />
        <div>
          <Skeleton width={120} height={15} />
          <div className="flex items-center space-x-2">
            <Skeleton width={50} height={15} />
            <Skeleton width={40} height={15} />
          </div>
        </div>
      </div>
    )
  }

  if (size === 'large') {
    return (
      <div className="flex items-center space-x-3">
        <Skeleton circle={true} width={80} height={80} />
        <div>
          <Skeleton width={150} height={10} />
          <div className="flex items-center space-x-2">
            <Skeleton width={50} height={10} />
            <Skeleton width={40} height={10} />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton width={50} height={10} />
            <Skeleton width={40} height={10} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-3">
      <Skeleton circle={true} width={40} height={40} />
      <div>
        <Skeleton width={100} height={10} />
        <div className="flex items-center space-x-2">
          <Skeleton width={50} height={10} />
          <Skeleton width={40} height={10} />
        </div>
      </div>
    </div>
  )
}

export default UserInfoBoxSkeleton