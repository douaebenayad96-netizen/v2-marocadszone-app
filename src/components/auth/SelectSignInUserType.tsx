import { useTranslation } from 'react-i18next'
import { FaRegUser } from 'react-icons/fa'
import { PiUsersThree } from 'react-icons/pi'
import { Link } from 'react-router-dom'

type SelectSignInUserTypeProps = {
  setAsPrestataireOrParticulier: (value: "prestataire" | "particulier" | null) => void
}

const SelectSignInUserType = ({ setAsPrestataireOrParticulier }: SelectSignInUserTypeProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex items-center justify-center min-h-[150px]">
      <button
        onClick={() => setAsPrestataireOrParticulier('prestataire')}
        className="border-2 border-primary-blue-all-900 rounded-lg p-4 flex-1 flex flex-col items-center capitalize justify-center space-x-2 text-primary-blue-all-900 hover:bg-primary-blue-all-900 hover:text-white transition-all"
      >
        <PiUsersThree
          className="text-5xl"
        />
        <span
          className="text-base font-semibold"
        >
          {t("particulier")}
        </span>
        <small
          className="text-sm mt-2"
        >
          {t("j_ai_besoin_d_un_service")}
        </small>
      </button>
      <div
        className="mx-4 text-primary-blue-all-900 font-semibold"
      >
        {t("ou")}
      </div>
      <Link
        to={import.meta.env.VITE_APP_URL}
        target='_blank'
        className="border-2 border-primary-blue-all-900 rounded-lg p-4 flex-1 text-center flex flex-col items-center capitalize justify-center space-x-2 text-primary-blue-all-900 hover:bg-primary-blue-all-900 hover:text-white transition-all"
      >
        <div className="h-[48px] flex items-center">
          <FaRegUser
            className="text-3xl"
          />
        </div>
        <span
          className="text-base font-semibold"
        >
          {t("prestataire")}
        </span>
        <small
          className="text-sm mt-2"
        >
          {t("je_propose_un_service")}
        </small>
      </Link>
    </div>
  )
}

export default SelectSignInUserType