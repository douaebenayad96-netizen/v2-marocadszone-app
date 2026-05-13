import { format } from "date-fns"

import { Conversation } from "../../services/types/chat"
import { User } from "../../services/types/user"
import ProfileImg from "../account/ProfileImg"
import { useAuthStore } from "../../services/store/authStore"

type ConversationChatProps = {
  conversation: Conversation
  onClick: () => void
  isSelected: boolean
}

const ConversationChat = ({ conversation, onClick, isSelected }: ConversationChatProps) => {
  const user = useAuthStore(state => state.user) as User
  const prestataire = user.id === conversation.user1.id ? conversation.user2 : conversation.user1
  const latestMessage = conversation.messages.length > 0 ? conversation.messages[conversation.messages.length - 1] : null

  return (
    <div
      onClick={onClick}
      className={`${isSelected ? 'bg-gray-100' : 'bg-white'} px-4 py-[15px] lg:rounded-md cursor-pointer transition-all flex gap-4 items-stretch justify-center hover:bg-gray-100`}
    >
      <div
        className='flex items-center justify-center'
      >
        <div className='relative w-max'>
          <ProfileImg
            name={prestataire?.first_name + ' ' + prestataire?.last_name}
            size="md"
            avatar={(prestataire?.media && prestataire?.media[0]) ? prestataire?.media[0].original_url : undefined}
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
            {
              prestataire?.first_name + ' ' + prestataire?.last_name
            }
          </h5>
          <p className='text-[13px] line-clamp-1'>
            {
              latestMessage?.content
            }
          </p>
        </div>
        <div
          dir="ltr"
          className='flex flex-col items-center justify-between ml-2'
        >
          <small
            className='text-xs mb-[2px] text-gray-1 w-max'
          >
            {
              latestMessage && latestMessage.created_at
                ? format(new Date(latestMessage.created_at), 'h:mm a')
                : 'N/A'
            }
          </small>
        </div>
      </div>
    </div>
  )
}

export default ConversationChat