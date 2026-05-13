import PageHeader from "../components/layouts/PageHeader"
import FaqList from "../components/common/FaqList"

const FaqPage = () => {

  return (
    <div className="pt-nav">
      <div className="min-h-screen page-py page-pt-sm">
        <div className="app-container">
          {/* page header */}
          <PageHeader>
            {/* title */}
            <div>
              <h1
                className="text-5xl text-primary-blue font-bold"
              >
                FAQ
              </h1>
              <div>
                <span
                  className="text-base text-gray-400"
                >
                  Voir les questions fréquemment posées par nos clients
                </span>
              </div>
            </div>
          </PageHeader>
        </div>
        <div className="section-py app-container">
          <h2
            className="title-h4 text-blue-950 font-bold mb-4"
          >
            Questions fréquemment posées
          </h2>
          <FaqList />
        </div>
      </div>
    </div>
  )
}

export default FaqPage