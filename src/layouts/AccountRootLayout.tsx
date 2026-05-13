import { Outlet } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import usePageDirection from '../hooks/usePageDirection'
import SideBar from '../components/layouts/SideBar'
import Navbar from '../components/layouts/Navbar'

const AccountRootLayout = () => {
  usePageDirection()

  return (
    <div className='bg-primary-white h-screen max-h-screen w-full overflow-hidden flex'>
      <Navbar forProfile />
      <SideBar />
      <main
        className='overflow-x-hidden h-screen flex-1 bg-gray-50 pt-nav pb-sidebar-profile'
      >
        <AnimatePresence>
          <Outlet />
        </AnimatePresence>
      </main>
    </div>
  )
}

export default AccountRootLayout