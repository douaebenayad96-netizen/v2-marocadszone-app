import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import CreateAnnonceForm from '../components/annonce/CreateAnnonceForm'
import PageHeader from '../components/layouts/PageHeader'
import SEOHead from '../components/seo/SEOHead'

const PublishAnnoncePage: React.FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleSuccess = () => {
    // Redirect to annonces list or user dashboard after successful creation
    navigate('/annonces')
  }

  const handleCancel = () => {
    // Go back to previous page or annonces list
    navigate(-1)
  }

  return (
    <div className="pt-nav">
      <SEOHead
        title="Publier une annonce gratuite au Maroc - MarocAdsZone"
        description="Publier une annonce gratuite au Maroc en quelques minutes. Immobilier, voitures, emploi et plus encore. Visibilité immédiate."
        path="/publier-une-annonce"
      />
      <div className="app-container page-py page-pt-sm">
        {/* Page Header */}
        <PageHeader>
          <div>
            <h1 className="text-5xl text-primary-blue font-bold">
              Publier une annonce gratuite au Maroc
            </h1>
            <div>
              <span className="text-base text-gray-400">
                {t('Share your services with the community', 'Partagez vos services avec la communauté')}
              </span>
            </div>
          </div>
        </PageHeader>        {/* Create Annonce Form */}
        <div className="mt-8">
          <CreateAnnonceForm 
            onSuccess={handleSuccess}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  )
}

export default PublishAnnoncePage
