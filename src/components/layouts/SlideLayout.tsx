import { AnimatePresence, motion } from 'framer-motion'

type SlideLayoutProps = {
  children: React.ReactNode,
  showSlide: boolean,
  setShowSlide: React.Dispatch<React.SetStateAction<boolean>>
}

const SlideLayout = ({ children, showSlide, setShowSlide }: SlideLayoutProps) => {
  return (
    <AnimatePresence>
      {showSlide && (
        <div>
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3 }}
            className="fixed z-[65] left-0 top-0 bottom-0 bg-white overflow-auto"
          >
            {children}
          </motion.div>
          {/* shadow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed z-[60] left-0 top-0 right-0 bottom-0 bg-black bg-opacity-50"
            onClick={() => setShowSlide(false)}
          ></motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default SlideLayout