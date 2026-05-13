import { useTranslation } from "react-i18next"

import { usePrestations } from "../../services/api/fetchPrestation"
import SectionHeader from "./SectionHeader"
import ServiceCardSkeleton from "../ui/skeletons/ServiceCardSkeleton"
import ServiceCard from "../annonce/ServiceCard"

const HomeServices = () => {
  const { t } = useTranslation()
  const {
    data: prestations,
    isLoading,
    isError,
  } = usePrestations(1, true)

  return (
    <section className="app-container section-py">
      <SectionHeader
        title={t('home.services.h2')}
        subtitle={t('home.services.p')}
        buttonTitle={t('home.voir_toutes')}
        to="/services"
      />
      <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {
          (isLoading || isError) && (
            Array.from(Array(8).keys()).map((n) => (
              <ServiceCardSkeleton key={n} />
            ))
          )
        }
        {
          prestations?.data.map((prestation) => (
            <ServiceCard key={prestation.id} prestation={prestation} />
          ))
        }
      </div>
    </section>
  )
}

export default HomeServices