import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { useState } from 'react'
import { LiaShippingFastSolid } from 'react-icons/lia'

import { MdOutlineElectricBolt } from 'react-icons/md'
import { RiBrush4Line } from 'react-icons/ri'
import { AiOutlineTool } from 'react-icons/ai'
import PrestataireMapMarker from './PrestataireMapMarker'
import { MapStyles } from '../../utils/mapStyles'

const PrestatairesMap = () => {
  const [center] = useState({ lat: 46.71109, lng: 1.7191036 })
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_API_GOOGLE_MAPS_KEY
  })

  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={center}
          zoom={5}
          options={{
            disableDoubleClickZoom: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            gestureHandling: "greedy",
            styles: MapStyles
          }}
        >
          <PrestataireMapMarker
            coordinates={center}
            icon={<MdOutlineElectricBolt />}
            color='bg-orange-500'
          />
          <PrestataireMapMarker
            coordinates={{ lat: 48.8566, lng: 2.3522 }}
            icon={<RiBrush4Line />}
            color='bg-blue-500'
          />
          <PrestataireMapMarker
            coordinates={{ lat: 43.296482, lng: 5.36978 }}
            icon={<AiOutlineTool />}
            color='bg-green-500'
          />
          <PrestataireMapMarker
            coordinates={{ lat: 43.7101728, lng: 7.2619532 }}
            icon={<LiaShippingFastSolid />}
            color='bg-red-500'
          />
        </GoogleMap>
      )}
    </>
  )
}

export default PrestatairesMap