import { AxiosError } from "axios";
import React, { useState } from "react";
import { RiCheckLine } from "react-icons/ri";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { Close } from "../assets/icons/Close";
import qr_code from "../assets/img/qr-code.jpg";
import { choosePlanApi } from "../services/api/fetchTarification";
import { useAuthStore } from "../services/store/authStore";
import { useLoginModelStore } from "../services/store/LoginModelStore";
import { cn } from "../utils/helpers";

const Checkbox: React.FC<{
  value: boolean;
  onChange: () => void;
  name?: string;
}> = ({ value, onChange, name }) => {
  return (
    <button
      type="button"
      onClick={onChange}
      name={name}
      className={cn(
        "w-5 h-5 rounded border border-gray-400 flex items-center justify-center",
        value ? "bg-primary-orange border-primary-orange" : "bg-white"
      )}
    >
      {value && <RiCheckLine className="text-white w-3.5 h-3.5" />}
    </button>
  );
};

interface BankDataModalProps {
  setOpenBank: (open: boolean) => void;
  planId: number;
  onClose?: () => void;
}
const BankDataModal: React.FC<BankDataModalProps> = ({
  setOpenBank,
  planId,
  onClose,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const { setUser, user } = useAuthStore();
  const { openRegisterModel } = useLoginModelStore();
  const { mutate: chosePlan } = useMutation({
    mutationFn: (id: string) => choosePlanApi(id),
    onSuccess: ({ data }) => {
      setUser(data);
      toast.success("Abonnement réussi ");
      setOpenBank(false);
      onClose && onClose();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      if (
        error?.response?.data?.message ===
        "User must have a company to choose a plan"
      ) {
        toast.info(
          "L'utilisateur doit avoir une entreprise pour choisir un plan"
        );
      }
      if (
        error.response?.data?.message ===
        "User already has a plan or subscription."
      ) {
        toast.info("Utilisateur deja a une abonnement");
      }
    },
  });
  const handleOpenRegister = (id: string) => {
    if (!user) {
      openRegisterModel();
      return;
    }
    chosePlan(id);
  };

  return (
    <div
      className="w-full h-full flex items-center justify-center bg-black/50 fixed top-0 left-0 z-[9999]"
      onClick={() => {
        setOpenBank(false);
      }}
    >
      <div
        className="space-y-4 bg-white p-8 w-full max-w-[720px] md:w-[50%] max-h-[90vh] overflow-y-auto overflow-x-hidden"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="w-full flex justify-end">
          <Close
            onClick={() => setOpenBank(false)}
            className="cursor-pointer"
          />
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start">
          <div className="space-y-4 flex-1">
            <p className="text-sm">Cher(e) client(e),</p>
            <p className="text-sm">
              Nous vous remercions d'avoir choisi le pack d'abonnement{" "}
              <span className="font-semibold">MarocAdsZone</span> et vous
              invitons à effectuer un
              <span className="font-semibold"> Virement ou Versement</span> sur
              notre compte bancaire suivant :
            </p>

            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-semibold">Nom du Bénéficiaire : </span>
                DEVTI TECHNOLOGIE
              </p>
              <p className="text-sm">
                <span className="font-semibold">RIB : </span>230 640
                4567404221016900 42
              </p>
              <p className="text-sm">
                <span className="font-semibold">IBAN : </span>MA64 2306 4045
                6740 4221 0169 0042
              </p>
              <p className="text-sm">
                <span className="font-semibold">Code SWIFT : </span>CIHMMAMC
              </p>
            </div>
          </div>

          <div className="w-28 h-28 sm:w-32 sm:h-32 bg-gray-100 flex items-center justify-center rounded shrink-0">
            <img
              src={qr_code}
              alt="QR Code"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <p className="text-sm">
          Une fois le paiement effectué, veuillez nous transmettre par WhatsApp
          ou e-mail l'avis de virement ou versement aux :
          <span className="font-semibold">
            {" "}
            WhatsApp : +212 6 60 10 46 65 - E-mail : info@marocadszone.com
          </span>
          .
        </p>
        <p className="text-sm">
          Dès réception de votre paiement, nous procéderons à l'activation de
          votre annonce sur la plateforme{" "}
          <span className="font-semibold">https://marocadszone.com/</span>.
        </p>
        <p className="text-sm">
          Pour plus d'information merci de nous contacter par
          <span className="font-semibold">
            {" "}
            WhatsApp : +212 6 60 10 46 65 ou E-mail : info@marocadszone.com
          </span>
          .
        </p>
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              value={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              name="payment_confirmation"
            />
            <span className="text-sm">Cocher si vous avez pris une note</span>
          </div>
          <button
            className={cn(
              "px-4 py-2 rounded text-white transition-colors",
              isChecked
                ? "bg-primary-orange hover:bg-primary-orange-dark"
                : "bg-primary-orange-light cursor-not-allowed"
            )}
            disabled={!isChecked}
            onClick={() => handleOpenRegister(String(planId))}
          >
            Confirmé
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankDataModal;
