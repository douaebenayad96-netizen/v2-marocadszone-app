import { RiLoader4Line } from "react-icons/ri"
import { useTranslation } from "react-i18next"

import { useDemandesPrestations } from "../../services/api/fetchPrestation"
import { useAuthStore } from "../../services/store/authStore"
import SampleButton from "../ui/SampleButton"
import ListView from "../common/ListView"
import EmptyPic from '../assets/img/Empty-bro.svg'
import { useServiceTypeModelStore } from "../../services/store/serviceTypeModel"
import DemandCard from "../annonce/DemandCard"

const ProfileDemandesList = () => {
  const { t } = useTranslation()
  const token = useAuthStore(state => state.token)
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useDemandesPrestations(token as string, 1)
  const [openServiceTypeModel] = useServiceTypeModelStore((state) => [state.openServiceTypeModel])

  const handleDemandeServiceClick = () => {
    openServiceTypeModel()
  }

  return (
    <>
      <ListView
        className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mt-8'
        data={data?.pages}
        isLoading={isLoading || isFetchingNextPage || isError}
        renderItem={(page) => (
          page.data.map((demande) => (
            <DemandCard key={demande.id} demande={demande} />
          ))
        )}
        skeletonItem={<DemandCard.Skeleton />}
        totalSkeletonItems={8}
      />
      {/* empty list */}
      {
        !isLoading && !isError && data?.pages[0].data.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-8">
            <div
              className="w-48 h-48 flex items-center justify-center rounded-full bg-primary-gray-100"
            >
              <img
                draggable={false}
                src={EmptyPic}
                alt="empty"
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-primary-blue-all-800 mt-2">
              {t('no_demandes_yet')}
            </h3>
            <div>
              <p className="text-sm font-medium text-primary-gray-500 mt-2 text-center">
                {t('no_demandes_yet_description')}
              </p>
            </div>
            <span
              onClick={handleDemandeServiceClick}
              className="text-sm font-bold text-center cursor-pointer text-primary-blue-all-800 hover:underline mt-8">
              {t('btn_demande_service')}
            </span>
          </div>
        )
      }
      {
        hasNextPage ? (
          <div className="flex justify-center mt-8 w-fit mx-auto">
            <SampleButton
              callback={() => fetchNextPage()}
              text={t("voir_plus")}
              icon={isLoading && <RiLoader4Line className="animate-spin" />}
            />
          </div>
        ) : null
      }
    </>
  )
}

export default ProfileDemandesList