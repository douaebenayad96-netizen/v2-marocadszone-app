import SimpleBar from 'simplebar-react'

import ConversationChat from './ConversationChat'
import { Conversation } from '../../services/types/chat'
import { useTranslation } from 'react-i18next'

import ConversationChatSkeleton from '../ui/skeletons/ConversationChatSkeleton'
import { Link } from 'react-router-dom'

type ConversationsListProps = {
  onSelectedConversation: (conversation: Conversation) => void
  selectedConversationId: number | null
  isLoading: boolean
  isError: boolean
  conversationsList: Conversation[] | undefined
}

const ConversationsList = ({ onSelectedConversation, selectedConversationId, isLoading, isError, conversationsList }: ConversationsListProps) => {
  const { t } = useTranslation()

  return (
    <SimpleBar
      className='px-4 pb-2'
      style={{
        height: '100%'
      }}
    >
      <div>
        <h5 className='title-h3 my-5'>
          {t('tous_les_messages')}
        </h5>
      </div>
      <div className='flex flex-col gap-1'>
        {
          (isLoading || isError) && (
            [...Array(10)].map((_, i) => (
              <ConversationChatSkeleton
                key={i}
              />
            ))
          )
        }
        {
          conversationsList
            ?.sort((a, b) => {
              const aLatestMessage = a.messages[a.messages.length - 1]
              const bLatestMessage = b.messages[b.messages.length - 1]

              if (!aLatestMessage || !bLatestMessage) {
                return 0
              }

              const aTimestamp = new Date(aLatestMessage.created_at || 0).getTime()
              const bTimestamp = new Date(bLatestMessage.created_at || 0).getTime()

              return bTimestamp - aTimestamp
            })
            .map((conversation, i) => (
              <ConversationChat
                key={i}
                conversation={conversation}
                onClick={() => onSelectedConversation(conversation)}
                isSelected={selectedConversationId === conversation?.id}
              />
            ))
        }

        {
          conversationsList?.length === 0 && (
            <div className='flex flex-col justify-center items-center h-full'>
              <h5 className='title-h4 mb-5 mt-8'>
                {t('aucune_conversation')}
              </h5>
              <Link
                to="/annonces"
                className="text-sm font-bold text-center text-primary-blue-all-800 hover:underline"
                target='_blank'
                rel='noreferrer'
              >
                {t('parcourir_tous_les_prestataires')}
              </Link>
            </div>
          )
        }
      </div>
    </SimpleBar>
  )
}

export default ConversationsList