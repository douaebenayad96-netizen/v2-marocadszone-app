import { OverlayViewF, OverlayView } from '@react-google-maps/api'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { IoIosPerson } from 'react-icons/io'
import PressetataireMapCard from './PressetataireMapCard'
import { TCandidatures } from '../../services/types/candidature'
import { TService } from '../../services/types/serviceType'
import { cn } from '../../utils/helpers'

type PrestataireMapMarkerProps = {
  coordinates: {
    lat: number
    lng: number
  }
  showDetailsPrestataire?: boolean
  setShowDetailsPrestataire?: (show: boolean) => void
  setCoordinates?: (coordinates: { lat: number, lng: number }) => void
  candidature?: TCandidatures
  selectedCandidateId?: number | null
  setSelectedCandidateId?: (id: number | null) => void
  demand?: TService | undefined
  icon?: React.ReactNode
  color?: string
}

const PrestataireMapMarker = ({ coordinates, color, icon, showDetailsPrestataire, candidature, selectedCandidateId, demand, setSelectedCandidateId, setShowDetailsPrestataire, setCoordinates }: PrestataireMapMarkerProps) => {
  const markerRef = useRef<HTMLDivElement>(null)
  const [positionClass, setPositionClass] = useState('absolute bottom-[28px] left-0 transform -translate-x-[calc(50%-0px)]')

  const handleMarkerClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    if (setShowDetailsPrestataire) setShowDetailsPrestataire(true)
    if (setSelectedCandidateId) setSelectedCandidateId(candidature?.id || null)
    if (setCoordinates) setCoordinates(coordinates)
  }

  useLayoutEffect(() => {
    const handlePosition = () => {
      if (!markerRef.current) return 'absolute bottom-[28px] left-0 transform -translate-x-[calc(50%-0px)]'
      return markerRef.current.getBoundingClientRect().top < 0
        ? 'absolute top-[28px] left-0 transform -translate-x-[calc(50%-0px)]'
        : 'absolute bottom-[28px] left-0 transform -translate-x-[calc(50%-0px)]'
    }

    setPositionClass(handlePosition())
  }, [showDetailsPrestataire])

  return (
    <OverlayViewF
      position={coordinates}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <div className='relative'>
        <button
          onClick={handleMarkerClick}
          className={
            cn(
              "absolute top-0 left-0 transform -translate-y-1/2 -translate-x-1/2 p-2 bg-primary-orange text-white hover:scale-[1.02] transition-all rounded-full shadow-xl cursor-pointer text-2xl flex items-center justify-center",
              color || 'bg-primary-orange'
            )
          }
        >
          {icon || <IoIosPerson />}
        </button>
        {/* listing card */}
        <AnimatePresence>
          {
            (showDetailsPrestataire && candidature && selectedCandidateId === candidature?.id) && (
              <motion.div
                ref={markerRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className={`${positionClass}`}
              >
                <div
                  className="h-fit bg-white rounded-xl cursor-default shadow-xl"
                >
                  <PressetataireMapCard
                    candidature={candidature}
                    demand={demand}
                  />
                </div>
              </motion.div>
            )
          }
        </AnimatePresence>
      </div>
    </OverlayViewF>
  )
}

export default PrestataireMapMarker