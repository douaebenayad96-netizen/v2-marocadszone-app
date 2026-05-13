import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { useFilterPrestations } from "../../services/api/fetchPrestation"
import { PrestationFilter } from "../../services/types/filter"
import { Prestation } from "../../services/types/prestation"
import ServiceCard from "./ServiceCard"
import { DataType } from "../../services/types/select"
import { generatePageList } from "../../utils/helpers"
import ServiceCardSkeleton from "../ui/skeletons/ServiceCardSkeleton"
import SampleButton from "../ui/SampleButton"
import SimpleDropDown from "../common/SimpleDropDown"

type PrestationsFilterListProps = {
  filter: PrestationFilter
}

const PrestationsFilterList = ({ filter }: PrestationsFilterListProps) => {
  const { t } = useTranslation()
  const [page, setPage] = useState(1)
  const [pagesList, setPagesList] = useState<DataType[]>([])
  const { data, isLoading, isError } = useFilterPrestations(filter, page)
  const navigate = useNavigate()

  useEffect(() => {
    const list = generatePageList(data?.last_page)
    setPagesList(list)
  }, [data])

  const handleNextClick = () => {
    if (data?.current_page && data?.current_page !== data?.last_page) {
      setPage(data?.current_page + 1)
      // scroll to top
      navigate('#top')
    }
  }

  const handlePrevClick = () => {
    if (data?.current_page && data?.current_page !== 1) {
      setPage(data?.current_page - 1)
      // scroll to top
      navigate('#top')
    }
  }

  return (
    <>      <section
        className="cards-grid"
      >
        {isLoading && (
          [...Array(12)].map((_, i) => (
            <ServiceCardSkeleton
              key={i}
            />
          ))
        )}
        {!isLoading && data?.data.map((prestation: Prestation) => (
          <ServiceCard
            key={prestation.id}
            prestation={prestation}
          />
        ))}      </section>
      
      {isError && (
        <div className="text-center text-red-500 mt-8 min-h-[40vh] flex items-center justify-center">
          <div>
            <p className="text-lg mb-2">Erreur de chargement</p>
            <p className="text-sm">Veuillez réessayer plus tard</p>
          </div>
        </div>
      )}
      
      {!isLoading && !isError && data?.data.length === 0 && (
        <div className="text-center text-gray-500 mt-8 min-h-[40vh]">
          {t('prestationsFilter.aucun_prestation_trouve')}
        </div>
      )}      {!isLoading && !isError && data && (
        <div className="mt-8 flex items-center gap-3 justify-center">
          {data?.current_page !== 1 && (
            <div onClick={handlePrevClick}>
              <SampleButton text="Précédent" />
            </div>
          )}
          {data?.last_page && (
            <SimpleDropDown
              text={t(('page'))}
              list={pagesList}
              selectedOne={data?.current_page.toString()}
              onChange={(value) => {
                setPage(parseInt(value))
                navigate('#top')
              }} />
          )}
          {data?.current_page !== data?.last_page && (
            <div onClick={handleNextClick}>
              <SampleButton text="Suivant" />
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default PrestationsFilterList