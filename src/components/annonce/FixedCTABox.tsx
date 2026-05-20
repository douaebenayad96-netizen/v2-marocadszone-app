import { useTranslation } from "react-i18next";
import { RiWhatsappFill, RiPhoneFill } from "react-icons/ri";
import { Prestataire } from "../../services/types/prestataire";
import { Annonce } from "../../services/types/annonce";

type FixedCTABoxProps = {
  prestataire?: Prestataire;
  annonce?: Annonce;
};

const getAnnonceTypeAndDetailLabel = (annonce?: Annonce, t?: any) => {
  if (!annonce) return null;

  const announceType = annonce.announce_type;
  if (!announceType) return null;

  const itemCondition = annonce.item_condition;

  const badgeType =
    announceType === "sale"
      ? t ? t("fixed_cta.sale") : "Vente"
      : announceType === "rental"
      ? t ? t("fixed_cta.rental") : "Location"
      : announceType === "service"
      ? t ? t("fixed_cta.service") : "Service"
      : null;

  if (!badgeType) return null;

  const detail =
    (announceType === "sale" &&
      (itemCondition === "good_condition"
        ? t ? t("fixed_cta.good_condition") : "Bon état"
        : itemCondition === "new"
        ? t ? t("fixed_cta.new") : "Neuf"
        : itemCondition === "used"
        ? t ? t("fixed_cta.used") : "Occasion"
        : null)) ||
    (announceType === "rental" &&
      (itemCondition === "rental_day"
        ? t ? t("fixed_cta.per_day") : "Par jour"
        : itemCondition === "rental_week"
        ? t ? t("fixed_cta.per_week") : "Par semaine"
        : itemCondition === "rental_month"
        ? t ? t("fixed_cta.per_month") : "Par mois"
        : null)) ||
    (announceType === "service" &&
      (itemCondition === "service_hour"
        ? t ? t("fixed_cta.per_hour") : "Par heure"
        : itemCondition === "service_day"
        ? t ? t("fixed_cta.per_day") : "Par jour"
        : itemCondition === "service_mission"
        ? t ? t("fixed_cta.per_mission") : "Par mission"
        : null)) ||
    null;

  return { badgeType, detail };
};

const FixedCTABox = ({ prestataire, annonce }: FixedCTABoxProps) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const data = annonce || prestataire;
  const typeAndDetail = getAnnonceTypeAndDetailLabel(annonce, t);

  const defaultAvatar = "https://img.freepik.com/free-photo/luxurious-car-parked-highway-with-illuminated-headlight-sunset_181624-60607.jpg";

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50 p-4 ${isRTL ? "rtl" : ""}`}>
      <div className="app-container-max-xl flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Section gauche (droite en arabe) : Avatar + Titre */}
        <div className={`flex items-center gap-3 ${isRTL ? "flex-row" : "flex-row"} w-full md:w-auto`}>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 flex-shrink-0">
            <img
              src={defaultAvatar}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <h4 className="text-lg font-semibold text-gray-800">
            {data?.title || data?.first_name || 'Annonce'}
          </h4>
        </div>

        {/* Section centrale : Prix + Badges */}
        <div className={`flex-1 ${isRTL ? "text-right" : "text-left"}`}>
          <p className="text-sm text-gray-500">{t("fixed_cta.price")}</p>
          <div className={`flex flex-wrap items-center gap-3 ${isRTL ? "justify-start" : "justify-start"}`}>
            <h3 className="text-2xl font-bold text-orange-500">
              {annonce?.price
                ? `${annonce.price.toLocaleString()} MAD`
                : t("fixed_cta.price_not_available")}
            </h3>
            {typeAndDetail?.badgeType && typeAndDetail.detail && (
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-xs font-semibold">
                  {typeAndDetail.badgeType}
                </span>
                <span className="inline-flex items-center rounded-full bg-green-100 text-green-700 px-3 py-1 text-xs font-semibold">
                  {typeAndDetail.detail}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Boutons WhatsApp et Appel */}
        <div className={`flex flex-row gap-3 w-full md:w-auto ${isRTL ? "flex-row" : "flex-row"}`}>
          <button
            className="bg-green-50 flex items-center justify-center rounded-full p-3 hover:bg-opacity-90 transition-colors"
            onClick={() => {
              if (data?.phone_number) {
                window.open(`https://api.whatsapp.com/send?phone=${data.phone_number}`, "_blank");
              }
            }}
          >
            <RiWhatsappFill className="text-3xl text-green-500" />
          </button>
          <button
            className="bg-blue-50 flex items-center justify-center rounded-full p-3 hover:bg-opacity-90 transition-colors"
            onClick={() => {
              if (data?.phone_number) {
                window.location.href = `tel:${data.phone_number}`;
              }
            }}
          >
            <RiPhoneFill className="text-3xl text-blue-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FixedCTABox;