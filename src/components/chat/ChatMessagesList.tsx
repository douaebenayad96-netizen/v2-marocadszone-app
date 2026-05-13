import ChatLoader from "../ui/ChatLoader"
import MessageCon from "./Message"
import { Prestataire } from "../../services/types/prestataire"
import { User } from "../../services/types/user"
import { Message } from "../../services/types/chat"

type ChatMessagesListProps = {
  messagesList: Message[]
  isLoading: boolean
  isError: boolean
  user: User
  prestataire: Prestataire | User
  lang: string
  messageRef: React.MutableRefObject<HTMLDivElement | null>
}

const ChatMessagesList = ({ messagesList, isLoading, isError, user, prestataire, lang, messageRef }: ChatMessagesListProps) => {
  return (
    <div
      className={"w-full flex flex-col-reverse hide-scrollbar messages-box overflow-y-auto pt-[90px] px-4 relative"}
    >
      {
        isLoading && (
          <div className="flex items-center justify-center absolute top-0 left-0 z-50 w-full h-full">
            <ChatLoader />
          </div>
        )
      }
      <div
        ref={messageRef}
        className="h-[10px] bg-red-50 w-full bg-transparent"
      ></div>
      {
        !isError && messagesList.slice().reverse().map((message, i) => (
          <MessageCon
            key={i}
            message={message}
            isLastOne={i === 0}
            showRight={message.sender_id !== user?.id}
            userImage={
              message.sender_id === user?.id
                ? (user?.media && user?.media[0])
                  ? user?.media[0].original_url
                  : undefined
                : (prestataire?.media && prestataire?.media[0])
                  ? prestataire?.media[0].original_url
                  : undefined
            }
            showUserImage={i === 0 || (i > 0 && message.sender_id !== messagesList[messagesList.length - i].sender_id)}
            direction={lang === 'ar' ? 'rtl' : 'ltr'}
            className="mb-1.5"
          />
        ))}
    </div>
  )
}

export default ChatMessagesList