import { useTranslation } from "react-i18next"

import { Prestataire } from "../../services/types/prestataire"
import PrestataireReviewsList from "./PrestataireReviewsList"

type PrestataireReviewsSectionProps = {
  prestataire: Prestataire
}

const PrestataireReviewsSection = ({ prestataire }: PrestataireReviewsSectionProps) => {
  const { t } = useTranslation()

  return (
    <div
      className="mt-8"
    >
      <h2
        className="title-h3"
      >
        {
          t('avis_et_commentaires')
        }
      </h2>
      <PrestataireReviewsList id={prestataire.id} />
    </div>
  )
}

export default PrestataireReviewsSection