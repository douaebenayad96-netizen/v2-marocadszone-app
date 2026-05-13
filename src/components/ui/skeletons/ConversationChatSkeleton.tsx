import Skeleton from "react-loading-skeleton"

import ProfileImg from "../../account/ProfileImg"

const ConversationChatSkeleton = () => {
  return (
    <div
      className={`'bg-white px-4 py-[15px] lg:rounded-md cursor-pointer transition-all flex gap-4 items-stretch justify-center hover:bg-gray-100`}
    >
      <div
        className='flex items-center justify-center'
      >
        <div className='relative w-max'>
          <ProfileImg
            isLoading={true}
            size="md"
            name="Loading..."
          />
        </div>
      </div>
      <div
        className='flex items-stretch justify-center flex-1'
      >
        <div
          className='flex-grow'
        >
          <h5 className='font-semibold text-[15px] mb-[2px] capitalize'>
            <Skeleton width={100} />
          </h5>
          <p className='text-[13px] line-clamp-1'>
            <Skeleton width={200} />
          </p>
        </div>
        <div
          dir="ltr"
          className='flex flex-col items-center justify-between ml-2'
        >
          <small
            className='text-xs mb-[2px] text-gray-1 w-max'
          >
            <Skeleton width={50} />
          </small>
        </div>
      </div>
    </div>
  )
}

export default ConversationChatSkeleton