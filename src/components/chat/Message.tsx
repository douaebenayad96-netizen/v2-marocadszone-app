import { format } from "date-fns"

import NoUserImage from "../assets/img/no-profile.png"
import { Message as MessageType } from "../../services/types/chat"

type MessageProps = {
  message: MessageType
  isLastOne: boolean
  callback?: () => void
  showRight?: boolean
  userImage?: string
  showUserImage?: boolean
  direction?: 'rtl' | 'ltr'
  className?: string
}

const Message = ({ message, showRight, isLastOne, callback, userImage, showUserImage, direction = 'ltr', className = 'mb-1' }: MessageProps) => {

  if (isLastOne) {
    callback && callback()
  }

  const isUser = showRight ? false : true
  const isLtr = `min-w-[65px] rounded-xl text-sm pt-1.5 pb-[10px] px-2 ${isUser ? 'bg-gray-200 text-black rounded-tr-none speech-bubble-right' : 'bg-primary-blue-all-900 rounded-tl-none text-white speech-bubble-left'}`
  const isRtl = `min-w-[65px] rounded-xl text-sm pt-1.5 pb-[10px] px-2 ${isUser ? 'bg-gray-200 text-black rounded-tl-none speech-bubble-left-rtl' : 'bg-primary-blue-all-900 rounded-tr-none text-white speech-bubble-right-rtl'}`
  const formattedDate = format(new Date(message.created_at ? message.created_at : new Date()), 'h:mm a')

  return (
    <div
      className={`flex items-center ${isUser ? 'justify-end' : 'justify-start'} mt-0 ${className}`}
    >
      <div
        className={`flex justify-stretch items-start gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row '}`}
      >
        <div
          className={`flex justify-center items-end ${showUserImage ? 'opacity-100' : 'opacity-0'}`}
        >
          {
            <img
              className="w-8 h-8 min-w-[32px] min-h-[32px] block rounded-full border border-gray-200"
              src={userImage || NoUserImage}
              alt="User"
            />
          }
        </div>
        <div
          className="flex justify-center items-center relative"
        >
          <p
            className={`${direction === 'ltr' ? isLtr : isRtl}`}
          >
            {message.content}
          </p>
          {/* time */}
          <div
            className={`absolute bottom-[0px] right-0 ${isUser ? 'text-gray-500' : 'text-white'} text-[9px] mx-1.5`}
          >
            {formattedDate}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Message