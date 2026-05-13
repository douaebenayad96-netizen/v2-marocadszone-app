import { useEffect, useRef, useState } from "react"
import { useWindowSize } from "@uidotdev/usehooks"
import { useTranslation } from "react-i18next"

import { User } from "../../services/types/user"
import { Prestataire } from "../../services/types/prestataire"
import { useFetchConversationDetailsByIdPrestataire } from "../../services/api/fetchChat"
import { Message } from "../../services/types/chat"
import ChatMessagesList from "./ChatMessagesList"
import notificationSound from '../assets/audio/mixkit-long-pop-2358.wav'
import ConversationTopBar from "./ConversationTopBar"
import SendMessageBox from "./SendMessageBox"

type ChatViewBoxProps = {
  prestataire: Prestataire | User
  user: User
  token: string
  onSend: () => void
  isChatOpen: boolean
  setIsChatOpen: (isChatOpen: boolean) => void
}

const ChatViewBox = ({ prestataire, user, token, onSend, isChatOpen, setIsChatOpen }: ChatViewBoxProps) => {
  const lang = useTranslation().i18n.language
  const { width } = useWindowSize()
  const [isMobile, setIsMobile] = useState(true)
  const { data: messagesData, isLoading, isError, refetch } = useFetchConversationDetailsByIdPrestataire(prestataire?.id, token as string, false)
  const [messagesList, setMessagesList] = useState<Message[]>([])
  const messageRef = useRef<HTMLDivElement>(null)
  const notificationRef = useRef(new Audio(notificationSound))

  useEffect(() => {
    if (isChatOpen && user) {
      refetch()
    }
  }, [isChatOpen, user, refetch, prestataire])

  useEffect(() => {
    if (messagesData) {
      setMessagesList(messagesData.messages)
    }
  }, [messagesData])

  useEffect(() => {
    if (isChatOpen === false) return
    const interval = setInterval(() => {
      refetch()
    }, 2000)
    return () => clearInterval(interval)
  }, [refetch, isChatOpen])

  useEffect(() => {
    return () => {
      setMessagesList([])
    }
  }, [prestataire])

  useEffect(() => {
    if (!width) return
    const handleResize = () => {
      if (width > 1024) {
        setIsMobile(false)
        // setIsChatOpen(true)
      } else {
        setIsMobile(true)
      }
    }
    if (width > 1024) {
      handleResize()
      window.addEventListener('resize', handleResize)
    } else {
      handleResize()
    }

    return () => window.removeEventListener('resize', handleResize)
  }, [isMobile, width, setIsChatOpen])

  useEffect(() => {
    if (!messagesData) return
    if (messagesData?.messages.length > messagesList.length) {
      const newMessage = messagesData.messages[messagesData.messages.length - 1]

      if (newMessage.sender_id !== user?.id) {
        notificationRef.current.play()
      }
    }
  }, [messagesData, messagesList, user])

  const scrollToBottom = () => {
    messageRef.current?.scrollIntoView({ behavior: 'instant', block: 'nearest' })
  }

  return (
    <div
      className={`text-primary-gray-800 bg-white chat-box-h shadow-card-shadow-border w-full fixed bottom-0 top-0 ${isChatOpen ? 'left-0' : 'left-[100%]'} lg:visible lg:translate-x-0 lg:static transition-all duration-300 z-[100]`}
    >
      <ConversationTopBar
        prestataire={prestataire}
        onClosed={() => {
          setIsChatOpen(false)
        }}
      />
      <ChatMessagesList
        messagesList={messagesList}
        isLoading={isLoading}
        isError={isError}
        user={user}
        prestataire={prestataire}
        lang={lang}
        messageRef={messageRef}
      />
      <SendMessageBox
        isMobile={isMobile}
        prestataire={prestataire}
        user={user}
        token={token}
        setMessagesList={setMessagesList}
        refetch={() => {
          refetch()
          onSend()
        }}
        messagesData={messagesData}
        scrollToBottom={scrollToBottom}
      />
    </div>
  )
}

export default ChatViewBox