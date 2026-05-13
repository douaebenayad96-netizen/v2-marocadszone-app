import { RiWhatsappFill, RiPhoneFill } from "react-icons/ri";
import { Prestataire } from "../../services/types/prestataire";
import { Annonce } from "../../services/types/annonce";

type FixedCTABoxProps = {
  prestataire?: Prestataire;
  annonce?: Annonce;
};

const FixedCTABox = ({ prestataire, annonce }: FixedCTABoxProps) => {
  const data = annonce || prestataire;
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-primary-white shadow-lg border-t border-primary-gray-200 z-50 p-4 font-poppins">
      <div className="app-container-max-xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Price and title section */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 w-full md:w-auto"
        >
          <div
            className="flex items-center gap-2"
          >
            <div
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-gray-200"
            >
              <img
                src="https://img.freepik.com/free-photo/luxurious-car-parked-highway-with-illuminated-headlight-sunset_181624-60607.jpg?t=st=1745668565~exp=1745672165~hmac=4830f225b2c854ff77a1fa5680fd7b23d0674267d544219197fcc4bfd083ec07&w=996"
                alt="User Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
            <h4 className="text-lg font-semibold text-primary-gray-800">
              {data?.title || data?.first_name || 'Annonce'}
            </h4>
          </div>

          <div className="flex-1">
            <p className="text-sm text-primary-gray-500">
              Prix
            </p>
            <h3 className="text-2xl font-bold text-primary-orange">
              {annonce?.price ? `${annonce.price.toLocaleString()} MAD` : 'Prix non disponible'}
            </h3>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-row gap-3 w-full md:w-auto">
          <button
            className="bg-green-50 flex items-center justify-center text-white rounded-full p-3 hover:bg-opacity-90 transition-colors"
            onClick={() => {
              window.open(
                `https://api.whatsapp.com/send?phone=${data?.phone_number}`,
                "_blank"
              );
            }}
          >
            <RiWhatsappFill className="text-3xl text-green-500" />
          </button>
          <button className="px-6 py-3 font-medium rounded-lg hover:bg-opacity-90 transition-colors flex-1 flex items-center justify-center gap-2">
            <RiPhoneFill className="text-3xl text-primary-orange" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FixedCTABox;