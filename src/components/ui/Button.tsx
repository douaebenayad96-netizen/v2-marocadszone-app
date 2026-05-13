import { Link } from "react-router-dom"
import { GoArrowUpRight } from "react-icons/go"
import { useTranslation } from "react-i18next"

type ButtonProps = {
  title: string
  to?: string
}

const Button = ({ title, to }: ButtonProps) => {
  const { i18n } = useTranslation()
  return (
    <Link
      to={to || "/"}
      className="text-primary-orange text-base font-bold hover:underline"
    >
      <span className="relative z-10 flex items-center gap-1 md:gap-2">
        {title}
        <GoArrowUpRight className={`text-xl ${i18n.language === 'ar' ? '-rotate-90' : '0'}`} />
      </span>
    </Link>
  )
}

export default Button