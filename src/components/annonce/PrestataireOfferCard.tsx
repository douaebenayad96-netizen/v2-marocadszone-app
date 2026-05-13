import { GrLocationPin } from "react-icons/gr"
import UserInfoBox from "../account/UserInfoBox"
import { FaWalking } from "react-icons/fa"
import { RiBrush4Line } from "react-icons/ri"
import Skeleton from "react-loading-skeleton"

import SampleButton from "../ui/SampleButton"
import UserInfoBoxSkeleton from "../ui/skeletons/UserInfoBoxSkeleton"
import { useTranslation } from "react-i18next"


const PrestataireOfferCard = () => {
  const { t } = useTranslation()
  const specialite = "Plombier"
  const city = "Casablanca"


  return (
    <div
      className="bg-white shadow-card-sm p-4 rounded-md"
    >
      <UserInfoBox
        size="medlarg"
        prestataire={{
          id: 1,
          first_name: "Ali",
          last_name: "Saidi",
          adresse: "mupt",
          description: "mupt",
          zip: "mupt",
          title: "mupt",
          pubtel: "mupt",
          pubemail: "mupt",
          phone_number: "mupt",
          email: "mupt",
          email_verified_at: "mupt",
          CA: "mupt",
          created_at: "mupt",
          updated_at: "mupt",
          media: [],
          totalAvis: 1,
          avgRating: 1,
          availability: 1,
          speciality_id: 1,
          availability_days: ["0"],
          instant: 1,
          language: "fr",
          advantage: "mupt",
          inclus: "mupt",
          coordinates: "mupt",
          reservation_count: 1,
          city: {
            id: 1,
            created_at: "mupt",
            label: "mupt",
            updated_at: "mupt",
          },
          city_id: 1,
          profession: {
            id: 1,
            created_at: "mupt",
            label: "mupt",
            updated_at: "mupt",
            media: [],
            percentage: 1,
            prestataires_count: 1,
            prestations_count: 1,
          },
          profession_id: 1,
          speciality: {
            id: 1,
            created_at: "mupt",
            label: "mupt",
            updated_at: "mupt",
            media: [],
            percentage: 1,
            prestataires_count: 1,
            prestations_count: 1,
            artisan_specialite_count: 1,
            sub_categories: [],
          }
        }}
      />

      <div className="line my-2">

      </div>

      {/* info card */}
      <div
        className="bg-gray-50 rounded-md py-2"
      >
        <div
          className="flex items-center gap-2 px-2"
        >
          <>
            <div
              className="bg-blue-100 rounded-md px-2 py-0.5"
            >
              47
            </div>
            <div>
              {t('prestations_realisees')}
            </div>
          </>
        </div>
        <div className="py-2 px-2">
          {/* badges */}
          <div className="flex gap-2">
            <p className="text-gray-500 text-xs font-bold flex capitalize items-center gap-1 bg-blue-100 rounded-full px-2 py-0.5">
              <RiBrush4Line />
              {
                specialite ? specialite.length > 14 ? specialite.slice(0, 14) + '...' : specialite : t('aucune_specialite').slice(0, 10) + '...'
              }
            </p>
            <p className="text-gray-500 text-xs font-bold flex capitalize items-center gap-1 bg-blue-100 rounded-full px-2 py-0.5">
              <FaWalking />
              {t('immediat')}
            </p>
            <p className="text-gray-500 text-xs font-bold flex capitalize items-center gap-1 bg-blue-100 rounded-full px-2 py-0.5 line-clamp-1">
              <GrLocationPin />
              {
                city ? city?.length > 14 ? city.slice(0, 14) + '...' : city : t('aucune_ville').slice(0, 8) + '...'
              }
            </p>
          </div>
        </div>
        <div>
          <div className="line mb-2"></div>
          <div
            className="px-2 flex flex-row gap-2 justify-between items-center"
          >
            <p
              className="text-sm font-bold text-gray-500 line-clamp-1"
            >
              les meilleurs prestations de plomberie à Casablanca et régions
            </p>
            <button
              className="text-blue-500 text-sm font-bold min-w-[80px] block hover:underline transition-all"
            >
              {
                t('voir_plus')
              }
            </button>
          </div>
        </div>
      </div>

      {/* contact btns */}
      <div
        className="mt-2"
      >
        <SampleButton
          text="Voire le profile"
        />
        <button
          className="flex items-center justify-center gap-2 bg-primary-orange hover:bg-orange-400 transition-all text-white w-full py-2 rounded-md mt-2"
        >
          Voir sur le map
        </button>
      </div>
    </div>
  )
}

PrestataireOfferCard.Skeleton = () => {
  return (
    <div
      className="bg-white shadow-card-sm p-4 rounded-md"
    >
      <UserInfoBoxSkeleton size="medlarg" />
      <div className="line my-2"></div>
      <div
        className="bg-gray-50 rounded-md py-2"
      >
        <div
          className="flex items-center gap-2 px-2"
        >
          <div
            className="rounded-md px-2 py-0.5"
          >
            <Skeleton
              width={20}
              height={15}
            />
          </div>
          <div>
            <Skeleton
              width={100}
              height={15}
            />
          </div>
        </div>
        <div className="py-2 px-2">
          <div className="flex gap-2">
            <Skeleton
              width={95}
              height={15}
            />
            <Skeleton
              width={95}
              height={15}
            />
            <Skeleton
              width={95}
              height={15}
            />
          </div>
        </div>
        <div>
          <div className="line mb-2"></div>
          <div
            className="flex justify-between items-center px-2"
          >
            <div>
              <Skeleton
                width={100}
                height={15}
              />
            </div>
            <div
              className="flex gap-1 items-center"
            >
              <Skeleton
                width={50}
                height={15}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="mt-2"
      >
        <Skeleton
          width='100%'
          height={35}
        />
        <Skeleton
          width='100%'
          height={35}
        />
      </div>
    </div>
  )
}

export default PrestataireOfferCard