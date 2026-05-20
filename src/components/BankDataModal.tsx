import { AxiosError } from "axios";
import React, { useState } from "react";
import { RiCheckLine } from "react-icons/ri";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { Close } from "../assets/icons/Close";
import qr_code from "../assets/img/qr-code.jpg";
import { choosePlanApi } from "../services/api/fetchTarification";
import { useAuthStore } from "../services/store/authStore";
import { useLoginModelStore } from "../services/store/LoginModelStore";
import { cn } from "../utils/helpers";
import { useNavigate } from "react-router-dom";

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
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [isChecked, setIsChecked] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();
  const { setUser, user } = useAuthStore();
  const { openRegisterModel } = useLoginModelStore();

  const { mutate: chosePlan } = useMutation({
    mutationFn: (id: string) => choosePlanApi(id),
    onSuccess: ({ data }) => {
      setUser(data);
      setShowSuccessModal(true);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.log(error.response?.data);
      if (
        error?.response?.data?.message ===
        "User must have a company to choose a plan"
      ) {
        toast.info(t("bank_modal.company_required"));
      }
      if (
        error.response?.data?.message ===
        "User already has a plan or subscription."
      ) {
        toast.info(t("bank_modal.already_subscribed"));
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

  // Success Modal
  if (showSuccessModal) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black/50 fixed top-0 left-0 z-[9999] px-4">
        <div className="bg-white rounded-2xl p-8 w-full max-w-xl text-center shadow-2xl">
          <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-5xl font-bold text-green-600">
            ✓
          </div>
          <h2 className="mb-3 text-3xl font-bold text-green-700">
            {t("bank_modal.thank_you")}
          </h2>
          <p className="mb-6 text-lg font-semibold text-gray-900">
            {t("bank_modal.request_success")}
          </p>
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-left">
            <p className="font-bold text-green-800">
              {t("bank_modal.status_pending")}
            </p>
            <p className="mt-2 text-sm text-gray-700">
              {t("bank_modal.payment_instructions")}
            </p>
          </div>
          <p className="mb-6 text-sm text-gray-700">
            {t("bank_modal.activation_message")}
          </p>
          <button
            onClick={() => {
              setOpenBank(false);
              onClose && onClose();
              navigate("/user-account/annonces");
            }}
            className="rounded-lg bg-primary-orange px-8 py-3 font-semibold text-white hover:bg-primary-orange-dark"
          >
            {t("bank_modal.view_my_ads")}
          </button>
        </div>
      </div>
    );
  }

  // Main Modal
  return (
    <div
      className="w-full h-full flex items-center justify-center bg-black/50 fixed top-0 left-0 z-[9999]"
      onClick={() => setOpenBank(false)}
    >
      <div
        className={`space-y-4 bg-white p-8 w-full max-w-[720px] md:w-[50%] max-h-[90vh] overflow-y-auto overflow-x-hidden ${isRTL ? "rtl" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex justify-end">
          <Close onClick={() => setOpenBank(false)} className="cursor-pointer" />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start">
          <div className="space-y-4 flex-1">
            <p className="text-sm">{t("bank_modal.dear_customer")}</p>
            <p className="text-sm">
              {t("bank_modal.thank_you_message")}{" "}
              <span className="font-semibold">MarocAdsZone</span>{" "}
              {t("bank_modal.invitation_to_pay")}
              <span className="font-semibold"> {t("bank_modal.transfer")}</span>
            </p>

            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-semibold">
                  {t("bank_modal.beneficiary_name")} :{" "}
                </span>
                DEVTI TECHNOLOGIE
              </p>
              <p className="text-sm">
                <span className="font-semibold">{t("bank_modal.rib")} : </span>
                230 640 4567404221016900 42
              </p>
              <p className="text-sm">
                <span className="font-semibold">{t("bank_modal.iban")} : </span>
                MA64 2306 4045 6740 4221 0169 0042
              </p>
              <p className="text-sm">
                <span className="font-semibold">
                  {t("bank_modal.swift_code")} :{" "}
                </span>
                CIHMMAMC
              </p>
            </div>
          </div>

          <div className="w-28 h-28 sm:w-32 sm:h-32 bg-gray-100 flex items-center justify-center rounded shrink-0">
            <img src={qr_code} alt="QR Code" className="w-full h-full object-contain" />
          </div>
        </div>

        <p className="text-sm">
          {t("bank_modal.after_payment")}
          <span className="font-semibold">
            {" "}
            {t("bank_modal.contact_whatsapp_email")}
          </span>
        </p>

        <p className="text-sm">
          {t("bank_modal.activation_confirmation")}{" "}
          <span className="font-semibold">https://marocadszone.com/</span>
        </p>

        <p className="text-sm">
          {t("bank_modal.more_info")}
          <span className="font-semibold">
            {" "}
            {t("bank_modal.contact_whatsapp_email")}
          </span>
        </p>

        <div className={`flex items-center justify-between pt-4 ${isRTL ? "flex-row-reverse" : ""}`}>
          <div className={`flex items-center space-x-2 ${isRTL ? "flex-row-reverse space-x-reverse" : ""}`}>
            <Checkbox
              value={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              name="payment_confirmation"
            />
            <span className="text-sm">{t("bank_modal.checkbox_label")}</span>
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
            {t("bank_modal.confirm")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankDataModal;