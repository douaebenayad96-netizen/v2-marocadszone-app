import { RiArrowLeftSLine } from "react-icons/ri"

import { User } from "../../services/types/user"
import { Prestataire } from "../../services/types/prestataire"
import { Link } from "react-router-dom"
import ProfileImg from "../account/ProfileImg"

type ConversationTopBarProps = {
  prestataire: Prestataire | User
  onClosed: () => void
}

const ConversationTopBar = ({ prestataire, onClosed }: ConversationTopBarProps) => {

  return (
    <div
      className="z-10 flex items-center justify-between p-4 border-t shadow-card-shadow-border border-gray-200 absolute top-0 left-0 w-full bg-white"
    >
      <div className="flex w-fit">
        <div
          onClick={onClosed}
          className="mr-4 flex items-center justify-center w-fit lg:hidden"
        >
          <RiArrowLeftSLine className="text-xl cursor-pointer" />
        </div>
        <div
          className="w-max"
        >
          <ProfileImg
            name={prestataire?.first_name + ' ' + prestataire?.last_name}
            size="lg"
            avatar={(prestataire?.media && prestataire?.media[0]) ? prestataire?.media[0].original_url : undefined}
          />
        </div>

        <div
          className="mx-4 capitalize"
        >
          <h4
            className="font-semibold"
          >
            <Link
              to={`/prestataire/${prestataire?.id}`}
              target="_blank"
              className="hover:underline"
            >
              {prestataire?.first_name} {prestataire?.last_name}
            </Link>
          </h4>
          <p
            className="text-sm lowercase"
          >
            {prestataire?.email}
          </p>
        </div>
      </div>

      {/* <div
        className="flex items-center justify-center w-fit mr-1 text-primary-white"
      >
        <div
          className="capitalize bg-primary-blue flex justify-center items-center px-2 py-[6px] rounded-lg hover:bg-primary-orange transition-all duration-300 cursor-pointer gap-1"
        >
          <RiPhoneLine className="text-xl" />
          <p
            className="text-sm font-semibold hidden lg:block"
          >call</p>
        </div>
        <div
          className="ml-2 capitalize bg-primary-blue flex justify-center items-center px-2 py-[6px] rounded-lg hover:bg-primary-orange transition-all duration-300 cursor-pointer gap-1"
        >
          <RiVidiconLine className="text-xl" />
          <p
            className="text-sm font-semibold hidden lg:block"
          >video call
          </p>
        </div>

        <div
          className="ml-2 capitalize bg-primary-blue flex justify-center items-center px-2 py-[6px] rounded-lg hover:bg-primary-orange transition-all duration-300 cursor-pointer gap-1"
        >
          <RiMoreFill className="text-xl" />

        </div>
      </div> */}
    </div>
  )
}

export default ConversationTopBar