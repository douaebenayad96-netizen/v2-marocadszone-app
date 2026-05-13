import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { FaPhone, FaLink, FaCalendarAlt, FaTrash, FaPlay } from 'react-icons/fa'
import { formatRelativeTime } from '../../utils/helpers'

interface VideoAnnouncementCardProps {
  id: number
  title: string
  videoUrl: string
  contactType: 'phone' | 'url'
  phoneNumber?: string
  url?: string
  createdAt: string
  onDelete?: (id: number) => void
}

const VideoAnnouncementCard = ({
  id,
  title = 'Video Announcement',
  videoUrl,
  contactType = 'phone',
  phoneNumber = '',
  url = '',
  createdAt = new Date().toISOString(),
  onDelete
}: VideoAnnouncementCardProps) => {
  const { t } = useTranslation()
  const [isDeleting, setIsDeleting] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  
  // Format date with fallback
  const formattedDate = formatRelativeTime(createdAt)
  
  const handleDelete = () => {
    if (onDelete && !isDeleting) {
      setIsDeleting(true)
      onDelete(id)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Video thumbnail with play button overlay */}
      <div className="relative">
        <div className="aspect-video bg-gray-100">
          <video 
            ref={videoRef}
            src={videoUrl} 
            className="w-full h-full object-cover"
            controls
            preload="metadata"
          />
        </div>
        
        {/* Delete button */}
        {onDelete && (
          <button 
            onClick={handleDelete}
            disabled={isDeleting}
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors z-10"
            aria-label={t('Supprimer', 'Delete')}
          >
            <FaTrash size={14} />
          </button>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
        
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <FaCalendarAlt className="text-gray-500 mr-2" />
          <span>{formattedDate}</span>
        </div>
        
        <div className="flex items-center text-sm">
          {contactType === 'phone' && phoneNumber && (
            <div className="flex items-center bg-blue-50 px-3 py-2 rounded-md w-full">
              <FaPhone className="text-blue-600 mr-2" />
              <a href={`tel:${phoneNumber}`} className="text-blue-700 hover:underline">
                {phoneNumber}
              </a>
            </div>
          )}
          
          {contactType === 'url' && url && (
            <div className="flex items-center bg-green-50 px-3 py-2 rounded-md w-full">
              <FaLink className="text-green-600 mr-2" />
              <a 
                href={url.startsWith('http') ? url : `https://${url}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-700 hover:underline truncate"
              >
                {url}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoAnnouncementCard