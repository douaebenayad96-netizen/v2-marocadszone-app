import { Outlet, ScrollRestoration, useLocation } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import LoginModal from "../components/auth/LoginModal"
import SelectServiceTypeModal from "../components/annonce/SelectServiceTypeModel"
import SEOHead from "../components/seo/SEOHead"
import { getDefaultPageSEO } from "../utils/seoMetadata"

const MainLayout = () => {
  const location = useLocation()
  const defaultSEO = getDefaultPageSEO(location.pathname)

  return (
    <>
      <SEOHead
        title={defaultSEO.title}
        description={defaultSEO.description}
        path={`${location.pathname}${location.search}`}
      />
      <Outlet />

      <SelectServiceTypeModal />
      <LoginModal />
      <ToastContainer />
      <ScrollRestoration />
    </>
  )
}

export default MainLayout
