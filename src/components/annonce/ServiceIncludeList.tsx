import { FaCheck } from 'react-icons/fa'

import { useEffect, useState } from 'react'
import { Prestation } from '../../services/types/prestation'

type ServiceIncludeListProps = {
  prestation: Prestation
}

const ServiceIncludeList = ({ prestation }: ServiceIncludeListProps) => {
  const [inclus, setInclus] = useState<string[]>([])

  useEffect(() => {
    if (prestation?.inclus) {
      setInclus(JSON.parse(prestation?.inclus) as string[])
    }
  }, [prestation])

  return (
    <div
      className="mt-2 text-gray-700"
    >
      <div className='flex items-center flex-wrap gap-2'>
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
      </div>
    </div>
  )
}

export default ServiceIncludeList