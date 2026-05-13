import { useRef, useEffect } from 'react'

import { useSimilarPrestations } from '../../services/api/fetchPrestation'
import ServiceCardSkeleton from '../ui/skeletons/ServiceCardSkeleton'
import ServiceCard from './ServiceCard'

type SimilarServicesListProps = {
  idService: number
}

const SimilarServicesList = ({ idService }: SimilarServicesListProps) => {
  const { data: similarServicesData, isError, isLoading, refetch } = useSimilarPrestations(idService, false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const callback: IntersectionObserverCallback = (entries) => {
      const entry = entries[0]

      if (entry.isIntersecting) {
        refetch()
      }
    }
    // javascript observer to detect if user is on view
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0
    }

    const observer = new IntersectionObserver(callback, options)

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [refetch])

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      {
        (isLoading || isError) && (
          [...Array(4)].map((_, index) => (
            <ServiceCardSkeleton key={index} />
          ))
        )
      }
      {
        similarServicesData?.slice(0, 4).map((prestation) => (
          <ServiceCard
            key={prestation.id}
            prestation={prestation}
          />
        ))
      }
    </div>
  )
}

export default SimilarServicesList