import { AxiosError } from "axios";
import { useMutation } from "react-query";
import axios from "../services/config/axiosConfig";

type VerifyOtpPayload = {
  email: string;
  otp: string;
};

type ResendOtpPayload = {
  email: string;
};

async function fetchVerifyOtp(payload: VerifyOtpPayload) {
  try {
    const { data } = await axios.post(`/verify-otp`, payload);
    return data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 400) {
      throw new Error("Code OTP invalide ou expiré.");
    }
    throw error;
  }
}

export function useVerifyOtp() {
  return useMutation(fetchVerifyOtp);
}

async function fetchResendOtp(payload: ResendOtpPayload) {
  try {
    const { data } = await axios.post(`/otp/resend`, payload);
    return data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 429) {
      throw new Error("Trop de tentatives. Réessayez plus tard.");
    }
    throw error;
  }
}

export function useResendOtp() {
  return useMutation(fetchResendOtp);
}
