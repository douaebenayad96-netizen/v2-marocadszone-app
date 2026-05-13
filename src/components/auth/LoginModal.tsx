import { IoCloseOutline } from "react-icons/io5"
import { motion, AnimatePresence } from "framer-motion"
import React from "react"
import { useTranslation } from "react-i18next"

import LoginForm from "./LoginForm"
import RegisterForm from "../auth/RegisterForm"
import { useLoginModelStore } from "../../services/store/LoginModelStore"
//import SelectSignInUserType from "./SelectSignInUserType"

const LoginModal = () => {
  const { isOpen, setIsLoginSelected, isLoginSelected, setIsOpen } = useLoginModelStore()
  //const [asPrestataireOrParticulier, setAsPrestataireOrParticulier] = useState<'prestataire' | 'particulier' | null>(null)
  const { t } = useTranslation()

  const handleCloseClick = () => {
    setIsOpen(false)
    //setAsPrestataireOrParticulier(null)
  }

  // stop scrolling when modal is open
  if (isOpen) {
    document.body.style.overflow = "hidden"
  } else {
    document.body.style.overflow = "unset"
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          // fade in and out
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[999] flex items-center justify-center w-full h-full bg-black bg-opacity-70"
        >
          <motion.div
            // to make the modal appear from the bottom
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.3 }}
            className="relative w-[calc(100vw-16px)] max-w-[400px] mx-auto bg-white rounded-lg overflow-x-hidden">
            <div className="px-8 pt-5 relative">
              <div className="text-lg font-bold text-gray-700 text-center">
                {t("se_connecter")}
              </div>
              <div
                onClick={handleCloseClick}
                className="absolute top-5 right-8 transform translate-x-[0px] translate-y-[-3px] transition-all p-2 cursor-pointer border border-primary-gray-500 hover:bg-primary-gray-500 hover:text-white rounded-full">
                <IoCloseOutline className="text-lg" />
              </div>
            </div>
            <div className="line mt-5"></div>
            {/* menu login or register */}
            <div className="px-8">
              <div className="flex items-center justify-center mt-5">
                <div
                  onClick={() => {
                    setIsLoginSelected(true)
                  }}
                  className={`w-1/2 cursor-pointer flex justify-between items-center flex-col group text-gray-600  hover:text-primary-blue-all-900 ${isLoginSelected ? "text-primary-blue-all-900" : ""}`}>
                  <button
                    className="py-3 text-base font-medium text-center"
                  >
                    {t("se_connecter")}
                    {/* hover line */}
                  </button>
                  <div className={`w-0 h-[2px] bg-primary-blue-all-800 group-hover:w-full transition-all ${isLoginSelected ? "w-full" : "w-0"}`}
                  ></div>
                </div>
                <div className="mx-1"></div>
                {/* register */}
                <div
                  onClick={() => {
                    setIsLoginSelected(false)
                  }}
                  className={`w-1/2 cursor-pointer flex justify-between items-center flex-col group text-gray-600  hover:text-primary-blue-all-900 ${isLoginSelected ? "" : "text-primary-blue-all-900"}`}>
                  <button
                    className=" py-3 text-base font-medium text-center"
                  >
                    {t("s_inscrire")}
                    {/* hover line */}
                  </button>
                  <div className={`w-0 h-[2px] bg-primary-blue-all-800 group-hover:w-full transition-all ${isLoginSelected ? "w-0" : "w-full"}`}
                  ></div>
                </div>
              </div>
            </div>
            {isLoginSelected && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="px-8 py-5">
                <LoginForm />
              </motion.div>
            )}
            {!isLoginSelected && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="px-8 py-5">
                <RegisterForm />
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoginModal