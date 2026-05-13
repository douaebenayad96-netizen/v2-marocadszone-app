import { FaMinus } from "react-icons/fa"

import { Prestataire } from "../../services/types/prestataire"
import UserInfoBox from "../account/UserInfoBox"

type PopupChatTopBarProps = {
  onClosed: () => void
  prestataire: Prestataire
}

const PopupChatTopBar = ({ onClosed, prestataire }: PopupChatTopBarProps) => {
  return (
    <div className="flex items-center justify-between bg-white ">
      <div
        className="flex items-center justify-between gap-2 px-4 h-[59px] border-b border-gray-200 w-full"
      >
        {/* back btn */}
        <div
          className="flex items-center"
        >
          <UserInfoBox
            prestataire={prestataire}
            previewOnly={true}
          />
        </div>
        {/* close btn */}
        <button
          onClick={onClosed}
          className="outline-none flex items-center justify-center text-gray-500 rounded-lg w-9 h-8 text-xl transition-all duration-300 hover:bg-gray-100"
        >
          <FaMinus />
        </button>
      </div>
    </div>
  )
}

export default PopupChatTopBar