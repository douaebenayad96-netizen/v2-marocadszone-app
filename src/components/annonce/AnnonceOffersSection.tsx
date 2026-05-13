import { useTranslation } from "react-i18next"
import ListView from "../common/ListView"
import PrestataireOfferCard from "./PrestataireOfferCard"


const AnnonceOffersSection = () => {
  const { t } = useTranslation()

  return (
    <div className="px-4 py-5">
      <h2
        className="title-h4"
      >
        {t('offers')} (12)
      </h2>
      <ListView
        className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-5"
        data={[...Array(12).keys()]}
        renderItem={(item) => (
          <PrestataireOfferCard
            key={item}
          />
        )}
        isLoading={false}
        skeletonItem={<PrestataireOfferCard.Skeleton />}
        totalSkeletonItems={3}
      />
    </div>
  )
}

export default AnnonceOffersSection