import { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";

import { QueryKeys } from "../../utils/QueryKeys";
import axiosConfig, {
  apiClientV2,
  default as axios,
} from "../config/axiosConfig";
import {
  AuthResponse,
  ChangePassword,
  FirebaseAuthResponse,
  LoginUser,
  RegisterUser,
  UpdateUser,
  UpdateUserInfo,
} from "../types/auth";
import { PasswordReset } from "../types/resetPassword";

// login auth
async function fetchLoginAuth(loginUser: LoginUser) {
  try {
    const { data } = await axios.post<AuthResponse>(
      `/login/announcer`,
      loginUser
    );
    return data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 401) {
      throw new Error("Invalid credentials");
    }
    if (axiosError.response?.status === 422) {
      throw new Error("Invalid input data");
    }
    if (axiosError.response?.status === 429) {
      throw new Error("Too many attempts. Please try again later.");
    }
    throw error;
  }
}

/**
 * @description useLoginAuth hook to login user
 * @returns useMutation object
 * @param loginUser
 */
export function useLoginAuth() {
  return useMutation(QueryKeys.loginAuth, fetchLoginAuth);
}

// register auth
async function fetchRegisterAuth(registerUser: RegisterUser) {
  try {
    const { data } = await axios.post<AuthResponse>(
      `/register/announcer`,
      registerUser
    );
  return data;

  } catch (error: any) {

    const status = error?.response?.status;

    if (status === 422) {
  const errors = error?.response?.data?.errors;
  const firstError = errors
    ? Object.values(errors).flat()[0]
    : error?.response?.data?.message || "Invalid registration data";

  throw new Error(String(firstError));
}

    if (status === 409) {
      throw new Error("User already exists");
    }

    // 👇 هادي أهم حاجة باش ما يبقاش loading stuck
    throw new Error(
      error?.response?.data?.message || "Server error"
    );
  }
}

/**
 * @description useRegisterAuth hook to register user
 * @returns useMutation object
 * @param registerUser
 */
export function useRegisterAuth() {
  return useMutation({
  mutationKey: [QueryKeys.registerAuth],
  mutationFn: fetchRegisterAuth,
});
}
async function fetchVerifyOtp(payload: { email: string; otp: string }) {
  try {
    const { data } = await axios.post(`/verify-otp`, payload);
    return data;
  } catch (error: any) {
    throw new Error(
      error?.response?.data?.message || "Code OTP invalide"
    );
  }
}

export function useVerifyOtp() {
  return useMutation({
    mutationKey: ["verifyOtp"],
    mutationFn: fetchVerifyOtp,
  });
}

// Register seller
async function fetchRegisterSeller(registerUser: RegisterUser) {
  const { data } = await axios.post(`/register/announcer`, registerUser);
  return data;
}

/**
 * @description useRegisterSeller hook to register seller
 * @returns useMutation object
 * @param registerUser
 */
export function useRegisterSeller() {
  return useMutation(QueryKeys.registerSeller, fetchRegisterSeller);
}

// get user info
async function fetchGetUserInfo(token: string) {
  const { data } = await axios.get(`/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.data.user as UpdateUser;
}

/**
 * @description useGetUserInfo hook to get user info
 * @returns useQuery object
 * @param token
 */
export function useGetUserInfo(token: string, enabled: boolean = true) {
  return useQuery(
    [QueryKeys.getUserInfo, token],
    () => fetchGetUserInfo(token),
    {
      enabled,
    }
  );
}

// /profile - update user info
async function fetchUpdateUserInfo({
  token,
  user,
}: {
  token: string;
  user: UpdateUser;
}) {
  const { data } = await axios.put(`/profile`, user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

/**
 * @description useUpdateUserInfo hook to update user info
 * @returns useMutation object
 * @param token // user token
 * @param user // user info
 */
export function useUpdateUserInfo() {
  return useMutation(QueryKeys.updateUserInfo, fetchUpdateUserInfo);
}

// /adresse/update - update user adresse
async function fetchUpdateUserAdresse({
  token,
  user,
}: {
  token: string;
  user: UpdateUserInfo;
}) {
  const { data } = await axios.put(`/adresse/update`, user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

/**
 * @description useUpdateUserAdresse hook to update user adresse
 * @returns useMutation object
 * @param token // user token
 * @param user // adresse & city & zip
 */
export function useUpdateUserAdresse() {
  return useMutation(QueryKeys.updateUserAdresse, fetchUpdateUserAdresse);
}

// change-password - change user password
async function fetchChangePassword({
  token,
  changePassword,
}: {
  token: string;
  changePassword: ChangePassword;
}) {
  const { data } = await axios.put(`/change-password`, changePassword, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

/**
 * @description useChangePassword hook to change user password
 * @returns useMutation object
 * @param token
 * @param data
 */
export function useChangePassword() {
  return useMutation(QueryKeys.changePassword, fetchChangePassword);
}

// sign in with google "/login/google"
async function fetchLoginGoogle(code: string) {
  try {
    const { data } = await axios.post<AuthResponse>(`/login/google`, { code });
    return data;
  } catch (error) {
    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as {
        response?: { status?: number; statusText?: string; data?: unknown };
      };

      if (axiosError.response?.status === 404) {
        console.error(
          "🚨 404 Error: The /login/google endpoint does not exist on the backend"
        );
        throw new Error(
          "Google login endpoint not found. Please contact support."
        );
      }
    }
    throw error;
  }
}

/**
 * @description useLoginGoogle hook to login with google
 * @returns useMutation object
 * @param code
 */
export function useLoginGoogle() {
  return useMutation(QueryKeys.loginGoogle, fetchLoginGoogle);
}

// Firebase OAuth authentication "/auth/firebase"
async function fetchFirebaseAuth(firebaseData: {
  idToken: string;
  email: string | null;
  providerId: string;
}) {
  try {
    const { data } = await apiClientV2.post<FirebaseAuthResponse>(
      `/auth/firebase`,
      firebaseData
    );
    return data;
  } catch (error) {
    console.error("❌ Firebase auth failed:", error);
    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as {
        response?: { status?: number; statusText?: string; data?: unknown };
      };
      console.error("📊 Error details:", {
        status: axiosError.response?.status,
        statusText: axiosError.response?.statusText,
        data: axiosError.response?.data,
        url: "/auth/firebase",
      });
    }
    throw error;
  }
}

/**
 * @description useFirebaseAuth hook for Firebase OAuth authentication (login/register)
 * @returns useMutation object
 * @param firebaseData - Firebase user data and ID token
 */
export function useFirebaseAuth() {
  return useMutation("firebaseAuth", fetchFirebaseAuth);
}

async function postPrestation(postData: FormData, token: string) {
  const { data } = await axios.post("/artisan/validate/profile", postData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

/**
 * usePostPrestation is a custom hook that uses react-query's useMutation to post a job
 * @param token
 * @returns
 */
export function usePostPrestation() {
  return useMutation(
    ({ postData, token }: { postData: FormData; token: string }) =>
      postPrestation(postData, token)
  );
}

// change-cover - change user cover
async function fetchCover({
  token,
  cover,
}: {
  token: string;
  cover: ChangePassword;
}) {
  const { data } = await axios.post(`/change-password`, cover, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

/**
 * @description useChangePassword hook to change user password
 * @returns useMutation object
 * @param token
 * @param data
 */
export function useCover() {
  return useMutation(QueryKeys.changePassword, fetchCover);
}

// /user/update - update user
async function fetchUpdateUserDes({
  token,
  user,
}: {
  token: string;
  user: UpdateUser;
}) {
  const { data } = await axios.put(`/profile/section3`, user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

/**
 * @description useUpdateUserInfo hook to update user info
 * @returns useMutation object
 * @param token // user token
 * @param user // user info
 */
export function useUpdateUserDes() {
  return useMutation(QueryKeys.updateUserInfo, fetchUpdateUserDes);
}

// /user/update - update user
async function fetchUpdateUserMap({
  token,
  user,
}: {
  token: string;
  user: UpdateUser;
}) {
  const { data } = await axios.put(`/profile/section2`, user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

/**
 * @description useUpdateUserInfo hook to update user info
 * @returns useMutation object
 * @param token // user token
 * @param user // user info
 */
export function useUpdateUserMaps() {
  return useMutation(QueryKeys.updateUserInfo, fetchUpdateUserMap);
}

// /user/update - update user
async function fetchUpdateUserAv({
  token,
  user,
}: {
  token: string;
  user: UpdateUser;
}) {
  const { data } = await axios.put(`/update-artisan-availability`, user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

/**
 * @description useUpdateUserInfo hook to update user info
 * @returns useMutation object
 * @param token // user token
 * @param user // user info
 */
export function useUpdateUserAv() {
  return useMutation(QueryKeys.updateUserInfo, fetchUpdateUserAv);
}

// /user/update - update user
async function fetchUpdateUserDoc({
  token,
  user,
}: {
  token: string;
  user: FormData;
}) {
  const { data } = await axios.post(`/profile/section5`, user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

/**
 * @description useUpdateUserInfo hook to update user info
 * @returns useMutation object
 * @param token // user token
 * @param user // user info
 */
export function useUpdateUserDoc() {
  return useMutation(QueryKeys.updateUserInfo, fetchUpdateUserDoc);
}

// /user/update - update user
async function fetchUpdateUserPro({
  token,
  user,
}: {
  token: string;
  user: FormData;
}) {
  const { data } = await axios.post(`/update-profile-picture`, user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

/**
 * @description useUpdateUserInfo hook to update user info
 * @returns useMutation object
 * @param token // user token
 * @param user // user info
 */
export function useUpdateUserPro() {
  return useMutation(QueryKeys.updateUserInfo, fetchUpdateUserPro);
}

// /user/update - update user
async function fetchUpdateUserCover({
  token,
  user,
}: {
  token: string;
  user: FormData;
}) {
  const { data } = await axios.post(`/update-cover-picture`, user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

/**
 * @description useUpdateUserInfo hook to update user info
 * @returns useMutation object
 * @param token // user token
 * @param user // user info
 */
export function useUpdateUserCover() {
  return useMutation(QueryKeys.updateUserInfo, fetchUpdateUserCover);
}

// /user/update - update user
async function fetchUpdateUserGallery({
  token,
  user,
}: {
  token: string;
  user: FormData;
}) {
  const { data } = await axios.post(`/profile/section4`, user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

/**
 * @description useUpdateUserInfo hook to update user info
 * @returns useMutation object
 * @param token // user token
 * @param user // user info
 */
export function useUpdateUserGallery() {
  return useMutation(QueryKeys.updateUserInfo, fetchUpdateUserGallery);
}

export const sendReset = async (email: string) => {
  const response = await axiosConfig.post("password/send-reset", { email });
  return response.data;
};

export const resetPassword = async (data: PasswordReset) => {
  const response = await axiosConfig.post("password/reset", data);
  return response.data;
};