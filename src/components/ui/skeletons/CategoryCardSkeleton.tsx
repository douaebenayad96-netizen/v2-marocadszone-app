import Skeleton from "react-loading-skeleton"

const CategoryCardSkeleton = () => {
  return (
    <div className="block relative group rounded-2xl overflow-hidden">
      <div className='aspect-[5/6]'>
        <Skeleton height={150} className="scale-[4] md:scale-[3]" />
      </div>
      <div className="absolute inset-0"></div>
      <div className="absolute inset-0 flex flex-col justify-end items-start p-4 ">
        <h3 className="text-2xl font-semibold">
          <Skeleton width={150} />
        </h3>
        <p className="text-sm">
          <Skeleton width={100} />
        </p>
      </div>
    </div>
  )
}

export default CategoryCardSkeleton