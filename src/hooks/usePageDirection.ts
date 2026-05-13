import { useEffect } from "react"
import { useTranslation } from "react-i18next"

const usePageDirection = () => {
  const { i18n } = useTranslation()
  const lang = i18n.language
  
  useEffect(() => {
    if (lang === "ar") {
      document.body.dir = "rtl"
      // change the font-family to arabic
      document.body.style.fontFamily = "'Cairo', sans-serif"
    } else {
      document.body.dir = "ltr"
      // change the font-family to latin
      document.body.style.fontFamily = "DM Sans, sans-serif"
    }
  }, [lang])
}

export default usePageDirection