import { BsEmojiSmile } from "react-icons/bs"
import { RiSendPlane2Fill } from "react-icons/ri"
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useState, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useTranslation } from "react-i18next"

import { Conversation, Message } from "../../services/types/chat"
import { User } from "../../services/types/user"
import { Prestataire } from "../../services/types/prestataire"
import { randomId } from "../../utils/helpers"
import { useSendMessage } from "../../services/api/fetchChat"

type SendMessageBoxProps = {
  messagesData: Conversation | undefined | null
  setMessagesList: React.Dispatch<React.SetStateAction<Message[]>>
  prestataire: Prestataire | User
  user: User
  refetch: () => void
  scrollToBottom?: () => void
  isMobile: boolean
  token: string
}

const SendMessageBox = ({ messagesData, setMessagesList, prestataire, user, token, refetch, scrollToBottom, isMobile }: SendMessageBoxProps) => {
  const { t, i18n } = useTranslation()
  const { mutateAsync: sendMessage } = useSendMessage(prestataire?.id, token as string)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isEmojiOpen, setIsEmojiOpen] = useState(false)
  const [isCLickOutside, setIsClickOutside] = useState(false)
  const [messageText, setMessageText] = useState('')

  const handleClickOutsideEmoji = () => {
    if (isEmojiOpen && isCLickOutside) {
      setIsEmojiOpen(false)
    } else {
      setIsClickOutside(true)
    }
  }

  const handleEmojiSelect = (emoji: unknown) => {
    const emojiObj = emoji as { native: string }
    setMessageText((prev) => prev + emojiObj.native)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
      scrollToBottom?.()
      sendMessage(messageToSend.content).then(() => {
        refetch()
      }).catch(err => {
        console.log(err)
      })
      setMessageText('')
    }
  }

  return (
    <div
      className="border-t border-gray-200 w-full h-16 flex items-center justify-stretch py-2 px-2 md:px-4 bg-white"
    >
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
        className='flex justify-center items-center rounded-md w-full bg-gray-100'
      >
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          ref={inputRef}
          name="message-text"
          className="text-txt-dark bg-transparent outline-none w-full py-2 px-4 -ml-[1px] text-[.875rem] font-normal placeholder:text-sm placeholder:text-txt-gray-2 placeholder:leading-5 h-[40px] placeholder:capitalize"
          placeholder={t('enter_your_message')}
        />
        <button
          type="submit"
          className={"outline-none flex items-center justify-center text-gray-500 rounded-lg mx-2 w-9 h-8 text-xl transition-all duration-300 hover:bg-primary-blue-all-800 hover:text-white" + (messageText.length > 0 ? ' bg-primary-blue-all-800 text-white' : '')}
        >
          <RiSendPlane2Fill
            className={i18n.dir() === 'rtl' ? 'transform rotate-180' : ''}
          />
        </button>
      </form>

      <div
        className="relative ml-1"
      >
        <div
          className="flex items-center justify-center text-gray-500 rounded-lg w-[42px] h-10 text-xl transition-all duration-300 hover:bg-gray-100 cursor-pointer"
          onClick={() => {
            setIsEmojiOpen((prev) => !prev)
            setIsClickOutside(false)
          }}
          tabIndex={0}
        >
          <BsEmojiSmile
            className="text-xl"
          />
        </div>
        <AnimatePresence>
          {isEmojiOpen &&
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.1 }}
              tabIndex={0}
              className={`absolute ${!isMobile ? 'right-0 bottom-[247px]' : 'right-[-45px] bottom-[247px]'} z-20 h-full flex items-center justify-center`}
            >
              <Picker
                onClickOutside={handleClickOutsideEmoji}
                onEmojiSelect={handleEmojiSelect}
                data={data}
                autoFocus={inputRef.current?.focus()}
              />
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </div>
  )
}

export default SendMessageBox