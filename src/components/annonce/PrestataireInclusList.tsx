import { FaCheck } from 'react-icons/fa'

import { useEffect, useState } from 'react'
import { Prestataire } from '../../services/types/prestataire'

type PrestataireInclusListProps = {
  prestataire: Prestataire
}

const PrestataireInclusList = ({ prestataire }: PrestataireInclusListProps) => {
  const [inclus, setInclus] = useState<string[]>([])

  useEffect(() => {
    if (prestataire?.inclus) {
      setInclus(JSON.parse(prestataire?.inclus) as string[])
    }
  }, [prestataire])

  return (
    <>
      {
        inclus?.map((inc, i) => (
          <div
            key={i}
            className='flex items-center gap-2 p-2 bg-blue-50 rounded-md'
          >
            <div
              className='bg-primary-blue-all-100 text-primary-blue-all-900 rounded-full p-1 text-xs'
            >
              <FaCheck />
            </div>
            <p>
              {inc}
            </p>
          </div>
        ))
      }
    </>
  )
}

export default PrestataireInclusList