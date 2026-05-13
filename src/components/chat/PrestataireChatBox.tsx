import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from "react-i18next"
import { useEffect, useRef, useState } from "react"

import { Prestataire } from "../../services/types/prestataire"
import { RiSendPlane2Fill } from "react-icons/ri"
import PopupChatTopBar from "./PopupChatTopBar"
import { useAuthStore } from "../../services/store/authStore"
import { useFetchConversationDetailsByIdPrestataire, useSendMessage } from "../../services/api/fetchChat"
import { Message } from "../../services/types/chat"
import { randomId } from "../../utils/helpers"
import ChatLoader from "../ui/ChatLoader"
import MessageCon from "./Message"
import notificationSound from '../assets/audio/mixkit-long-pop-2358.wav'

type PrestataireChatBoxProps = {
  prestataire: Prestataire
  isOpen: boolean
  onClosed: () => void
}

const PrestataireChatBox = ({ prestataire, isOpen, onClosed }: PrestataireChatBoxProps) => {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const user = useAuthStore(state => state.user)
  const token = useAuthStore(state => state.token)
  const { data: messagesData, isLoading, isError, refetch } = useFetchConversationDetailsByIdPrestataire(prestataire?.id, token as string, false)
  const [messagesList, setMessagesList] = useState<Message[]>([])
  const [messageText, setMessageText] = useState('')
  const ref = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLDivElement>(null)
  const { mutateAsync: sendMessage } = useSendMessage(prestataire?.id, token as string)
  const notificationRef = useRef(new Audio(notificationSound))

  useEffect(() => {
    if (isOpen && user) {
      refetch()
    }
  }, [isOpen, user, refetch])

  useEffect(() => {
    scrollToBottom()
  }, [messagesList])

  useEffect(() => {
    if (!messagesData) return
    if (messagesData?.messages.length > messagesList.length) {
      const newMessage = messagesData.messages[messagesData.messages.length - 1]

      if (newMessage.sender_id !== user?.id) {
        notificationRef.current.play()
      }
    }
  }, [messagesData, messagesList, user])

  useEffect(() => {
    if (messagesData) {
      setMessagesList(messagesData.messages)
    }
  }, [messagesData])

  useEffect(() => {
    if (isOpen === false) return
    const interval = setInterval(() => {
      refetch()
    }, 2000)
    return () => clearInterval(interval)
  }, [refetch, isOpen])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user) return

    if (messageText && messageText.trim().length > 0) {
      const messageToSend: Message = {
        content: messageText.trim(),
        conversation_id: messagesData?.id as number,
        id: randomId(),
        sender_id: user.id,
        receiver_id: prestataire?.id as number,
        created_at: new Date().toISOString(),
      }
      setMessagesList((prev) => [...prev, messageToSend])
      scrollToBottom()
      sendMessage(messageToSend.content).then(() => {
        refetch()
      }).catch(err => {
        console.log(err)
      })
      setMessageText('')
    }
  }

  const scrollToBottom = () => {
    messageRef.current?.scrollIntoView({ behavior: 'instant', block: 'nearest' })
  }

  return (
    <AnimatePresence>
      {
        isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-0 right-0 top-0 sm:top-auto overflow-x-hidden left-0 sm:left-auto sm:right-[50px] 2xl:right-[150px] z-50 rounded-t-md shadow-card-shadow-border bg-white"
          >
            <div className="sm:min-h-[392px] w-full sm:max-w-[325px] sm:min-w-[325px]">
              <PopupChatTopBar
                onClosed={onClosed}
                prestataire={prestataire}
              />

              <div className="pb-2">
                <div
                  onWheel={(e) => {
                    const element = e.currentTarget
                    const { scrollTop, scrollHeight, clientHeight } = element
                    if (e.deltaY > 0 && scrollTop === 0) {
                      e.preventDefault()
                      e.stopPropagation()
                    }
                    if (e.deltaY < 0 && scrollTop + clientHeight === scrollHeight) {
                      e.preventDefault()
                      e.stopPropagation()
                    }
                    return false
                  }}
                  onTouchStart={(e) => {
                    e.stopPropagation()
                  }}
                  className="flex-1 h-[calc(100dvh-107px)] sm:h-[285px] px-4 pt-2 relative overflow-y-auto overflow-x-hidden flex flex-col-reverse hide-scrollbar"
                >
                  {
                    isLoading && (
                      <div className="flex items-center justify-center absolute top-0 left-0 z-50 w-full h-full">
                        <ChatLoader />
                      </div>
                    )
                  }

                  {
                    !isLoading && messagesList.length === 0 && (
                      <div className="flex items-start justify-center absolute top-0 left-0 z-50 w-full h-full">
                        <p className="text-white mt-5 bg-black bg-opacity-60 px-2 py-[2px] text-xs rounded-md">
                          {t('envoyez_un_message_a')} {' '} {prestataire?.first_name} {prestataire?.last_name}
                        </p>
                      </div>
                    )
                  }

                  <div
                    ref={messageRef}
                    className="h-[10px] bg-red-50 w-full bg-transparent"
                  ></div>
                  {/* reply */}
                  {
                    !isError && messagesList.slice().reverse().map((message, i) => (
                      <MessageCon
                        key={i}
                        message={message}
                        isLastOne={i === 0}
                        showRight={message.sender_id !== user?.id}
                        userImage={
                          message.sender_id === user?.id
                            ? user?.media
                              ? user?.media[0]?.original_url
                              : undefined
                            : prestataire?.media
                              ? prestataire?.media[0]?.original_url
                              : undefined
                        }
                        showUserImage={i === 0 || (i > 0 && message.sender_id !== messagesList[messagesList.length - i].sender_id)}
                        direction={lang === 'ar' ? 'rtl' : 'ltr'}
                      />
                    ))}
                </div>
                <form
                  autoComplete="off"
                  noValidate
                  onSubmit={onSubmit}
                  className='flex justify-center items-center rounded-md bg-gray-100 mx-2'
                >
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    ref={ref}
                    name="message-text"
                    className="bg-transparent outline-none w-full py-2 px-4 -ml-[1px] text-[.875rem] font-normal placeholder:text-sm placeholder:text-txt-gray-2 placeholder:leading-5 h-[40px] placeholder:capitalize"
                    placeholder={t('enter_your_message')}
                  />
                  <button
                    type="submit"
                    className={"outline-none flex items-center justify-center text-primary-blue-all-800 rounded-lg mx-1 w-9 h-8 text-xl transition-all duration-300 hover:bg-primary-blue-all-800 hover:text-white" + (messageText.length > 0 ? ' bg-primary-blue-all-800 text-white' : '')}
                  >
                    <RiSendPlane2Fill className={lang === 'ar' ? 'transform rotate-180' : ''} />
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        )
      }
    </AnimatePresence>
  )
}

export default PrestataireChatBox