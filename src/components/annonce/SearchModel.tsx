import { IoCloseOutline } from "react-icons/io5"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import React from "react"
import SearchInput from "../reviews/SearchInput"


type SearchModelProps = {
  showSearchModel: boolean
  setShowSearchModel: (show: boolean) => void
}

const SearchModel = ({ showSearchModel, setShowSearchModel }: SearchModelProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleCloseSearchModel = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowSearchModel(false)
    }
  }

  const handleSearch = (search: string) => {
    setShowSearchModel(false)
    navigate(`/services?title=${search}`)
  }

  if (showSearchModel) {
    // stop scrolling
    document.body.style.overflow = 'hidden'
  } else {
    // enable scrolling
    document.body.style.overflow = 'auto'
  }

  return (
    <AnimatePresence>
      {
        showSearchModel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseSearchModel}
            className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 flex justify-center items-start pt-nav z-[9999]"
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: .3 }}
              className="w-[calc(100vw-16px)] max-w-[500px]">
              {/* close btn */}
              <div
                className="flex justify-end mb-4"
              >
                <span
                  onClick={() => setShowSearchModel(false)}
                  className="text-primary-white text-3xl cursor-pointer hover:text-primary-blue-all-500 transition-all"
                >
                  <IoCloseOutline />
                </span>
              </div>
              {/* search bar */}
              <div
                className="bg-white rounded-md py-4 px-4 relative"
              >
                <SearchInput
                  btnText={t('rechercher')}
                  placeholder={t('rechercher_un_service')}
                  callback={handleSearch}
                />
              </div>
            </motion.div>
          </motion.div>
        )
      }
    </AnimatePresence>
  )
}

export default SearchModel