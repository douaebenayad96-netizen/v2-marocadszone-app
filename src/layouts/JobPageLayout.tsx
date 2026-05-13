import { Outlet, useLocation } from 'react-router-dom'

import Navbar from '../components/layouts/Navbar'
import usePageDirection from '../hooks/usePageDirection'

const JobPageLayout = () => {
  usePageDirection()
  const path = useLocation().pathname

  return (
    <div>
      <Navbar
        forPostJob
        forProfile={path.includes('/job/annonce')}
      />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default JobPageLayout