import { motion } from "framer-motion"
import { useState } from "react"
import { useTranslation } from "react-i18next"

import ConversationsList from "../../components/chat/ConversationsList"
import ChatViewBox from "../../components/chat/ChatView"
import { Conversation } from "../../services/types/chat"
import { useAuthStore } from "../../services/store/authStore"
import { User } from "../../services/types/user"
import { useFetchConversationsList } from "../../services/api/fetchChat"

const MessagesPage = () => {
  const { t } = useTranslation()
  const user = useAuthStore(state => state.user) as User
  const token = useAuthStore(state => state.token) as string
  const { data: conversationsList, isLoading, isError, refetch } = useFetchConversationsList(token)
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: .15 }}
      className='flex flex-row w-full h-screen-no-nav-no-footer overflow-hidden'
    >
      <div
        className='w-full lg:min-w-[380px] lg:max-w-[380px] overflow-hidden lg:mr-1'
      >
        <ConversationsList
          onSelectedConversation={(conversation) => {
            setSelectedConversation(conversation)
            setIsChatOpen(true)
          }}
          selectedConversationId={selectedConversation?.id || null}
          isLoading={isLoading}
          isError={isError}
          conversationsList={conversationsList}
        />
      </div>
      {
        selectedConversation ? (
          <ChatViewBox
            prestataire={user.id === selectedConversation.user1.id ? selectedConversation.user2 : selectedConversation.user1}
            user={user}
            token={token}
            onSend={() => {
              refetch()
            }}
            isChatOpen={isChatOpen}
            setIsChatOpen={setIsChatOpen}
          />
        ) : (
          <div
            className="w-full bg-white shadow-card-shadow-border overflow-hidden hidden lg:block"
          >
            <div className='flex flex-col justify-center items-center h-full'>
              <h5 className='title-h3 mb-5'>
                {t('selectionnez_une_conversation')}
              </h5>
              <p className='text-center text-gray-1'>
                {t('selectionnez_une_conversation_description')}
              </p>
            </div>
          </div>
        )
      }
    </motion.div>
  )
}

export default MessagesPage