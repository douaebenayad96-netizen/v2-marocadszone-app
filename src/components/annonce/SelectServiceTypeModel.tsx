import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useServiceTypeModelStore } from "../../services/store/serviceTypeModel"
import { Category } from "../../services/types/category"
import { PostJobPageState } from "../../pages/StepsRegister"
import ModalLayout from "../layouts/ModalLayout"
import SelectSpecialiteList from "../category/SelectSpecialiteList"
import SelectMetierList from "../category/SelectMetierList"

const SelectServiceTypeModal = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { isServiceTypeModelOpen, setServiceTypeModelOpen } = useServiceTypeModelStore()
  const [step, setStep] = useState<"selectSpecialite" | "selectMetier">("selectSpecialite")
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  if (isServiceTypeModelOpen) {
    document.body.style.overflow = "hidden"
  } else {
    document.body.style.overflow = "auto"
  }

  return (
    <ModalLayout
      isOpen={isServiceTypeModelOpen}
      setIsOpen={(value) => {
        setServiceTypeModelOpen(value as boolean)
        setStep("selectSpecialite")
      }}
      defaultHeader
      headerText={t("demander_un_service")}
      className="relative w-[calc(100vw-16px)] max-w-[700px] mx-auto bg-white rounded-lg overflow-x-hidden"
    >
      <AnimatePresence
        mode='popLayout'
        initial={false}
        onExitComplete={() => {
          document.body.style.overflow = "hidden"
        }}
      >
        {step === "selectSpecialite" && (
          <motion.div
            key="selectSpecialite"
            initial={{ opacity: 0, x: -700 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -700 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <SelectSpecialiteList
              onSpecialiteSelect={(specialite) => {
                setSelectedCategory(specialite)
                setStep("selectMetier")
              }}
            />
          </motion.div>
        )}
        {(step === "selectMetier" && selectedCategory) && (
          <motion.div
            key="selectMetier"
            initial={{ opacity: 0, x: 700 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 700 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <SelectMetierList
              onSelectMetier={(metier) => {
                setServiceTypeModelOpen(false)
                setStep("selectSpecialite")
                const stateData: PostJobPageState = {
                  selectedCategory,
                  selectedMetier: metier
                }
                navigate('/user/annonce', { state: stateData })
              }}
              onBack={() => {
                setStep("selectSpecialite")
              }}
              selctedSpecialite={selectedCategory}
            />
          </motion.div>

        )}
      </AnimatePresence>
    </ModalLayout>
  )
}

export default SelectServiceTypeModal