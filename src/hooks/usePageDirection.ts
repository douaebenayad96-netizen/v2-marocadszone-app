import { useEffect } from "react"
import { useTranslation } from "react-i18next"

const usePageDirection = () => {
  const { i18n } = useTranslation()
  const lang = i18n.language

  useEffect(() => {
    const direction = i18n.dir()
    document.body.dir = direction
    document.documentElement.dir = direction
    document.documentElement.lang = lang || 'fr'

    if (direction === 'rtl') {
      document.body.style.fontFamily = "'Cairo', sans-serif"
    } else {
      document.body.style.fontFamily = "DM Sans, sans-serif"
    }
  }, [lang, i18n])
}

export default usePageDirection