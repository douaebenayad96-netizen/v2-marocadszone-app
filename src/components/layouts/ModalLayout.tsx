import React from "react"
import { IoCloseOutline } from "react-icons/io5"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "../../utils/helpers"

type ModalLayoutProps = {
  children: React.ReactNode
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  className?: string
  defaultHeader?: boolean
  headerText?: string
  headerClassName?: string
  rtl?: boolean
}

const ModalLayout = ({ children, isOpen, setIsOpen, className, defaultHeader, headerText, headerClassName, rtl }: ModalLayoutProps) => {

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
          className="fixed inset-0 z-[999] flex items-center justify-center w-full h-full bg-black bg-opacity-40"
        >
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.3 }}
            className={`relative ${className}`}
          >
            {defaultHeader && (
              <>
                <div className="px-8 pt-5 relative">
                  <div className={cn('text-lg font-bold text-gray-700 text-center', headerClassName)}>
                    {headerText}
                  </div>
                  <div
                    onClick={() => setIsOpen(false)}
                    className={`absolute top-5 ${rtl ? 'left-8' : 'right-8'} transform translate-x-[0px] translate-y-[-3px] transition-all p-2 cursor-pointer border border-primary-gray-500 hover:bg-primary-gray-500 hover:text-white rounded-full`}
                  >
                    <IoCloseOutline className="text-lg" />
                  </div>
                </div>
                <div className="line mt-5"></div>
              </>
            )
            }
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ModalLayout