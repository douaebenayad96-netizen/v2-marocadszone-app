import { useEffect, useRef } from 'react'
import { useJsApiLoader } from '@react-google-maps/api'
import { GoLocation } from 'react-icons/go'
import { Prestataire } from '../../services/types/prestataire'

type ProviderLocationBoxProps = {
  prestataire: Prestataire
}

const ProviderLocationBox = ({ prestataire }: ProviderLocationBoxProps) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_API_GOOGLE_MAPS_KEY
  })
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const coordinates = JSON.parse(prestataire.coordinates);
    const latitude = parseFloat(coordinates.latitude);
    const longitude = parseFloat(coordinates.longitude);

    // Initialize Google Maps
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: latitude, lng: longitude },
      zoom: 15,
    });

    // Add marker
    new window.google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map,
      title: prestataire.adresse,
    });
  }, [prestataire]);

  return (
    <div className="shadow-card-shadow-border rounded-lg overflow-hidden">
      {isLoaded && <></>
      }      <div ref={mapRef} style={{ width: '100%', height: '400px' }}></div>

      <div className="px-4 py-2 max-w-[320px]">
        <div
          className="flex items-center gap-2"
        >
          <div
            className="bg-primary-blue-all-100 text-blue-950 rounded-full p-2 text-lg"
          >
            <GoLocation />
          </div>
          <div>
            <span
              className="text-gray-900 font-medium"
            >
              {
                prestataire?.adresse ? prestataire?.adresse : prestataire?.city?.label
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProviderLocationBox