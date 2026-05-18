type ErrorResponse = {
  message?: unknown;
  errors?: Record<string, unknown>;
};

const getResponse = (error: unknown) => {
  if (error && typeof error === "object" && "response" in error) {
    return (error as { response?: { status?: number; data?: ErrorResponse; statusText?: string } }).response;
  }

  return undefined;
};

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return undefined;
};

const getFirstValidationMessage = (errors?: Record<string, unknown>) => {
  if (!errors) return undefined;

  const firstError = Object.values(errors).flat()[0];
  return typeof firstError === "string" ? firstError : undefined;
};

const normalizeText = (value = "") =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export const getAuthErrorMessage = (error: unknown) => {
  const response = getResponse(error);
  const responseMessage =
    getFirstValidationMessage(response?.data?.errors) ||
    (typeof response?.data?.message === "string" ? response.data.message : undefined);
  const rawMessage = responseMessage || getErrorMessage(error) || "";
  const normalized = normalizeText(rawMessage);

  if (response?.status === 409 || normalized.includes("already exists")) {
    return "Email already exists.";
  }

  if (
    response?.status === 422 &&
    (normalized.includes("email") || normalized.includes("e-mail")) &&
    (normalized.includes("already") ||
      normalized.includes("taken") ||
      normalized.includes("existe") ||
      normalized.includes("utilise"))
  ) {
    return "Email already exists.";
  }

  if (
    response?.status === 401 ||
    normalized.includes("invalid credentials") ||
    normalized.includes("invalid input data")
  ) {
    return "Email or password is incorrect.";
  }

  if (response?.status === 429 || normalized.includes("too many")) {
    return "Too many attempts. Please try again later.";
  }

  if (responseMessage) return responseMessage;

  return "Something went wrong. Please try again.";
};

export const getOtpErrorMessage = (error: unknown) => {
  const response = getResponse(error);
  const rawMessage =
    (typeof response?.data?.message === "string" ? response.data.message : undefined) ||
    getErrorMessage(error) ||
    "";
  const normalized = normalizeText(rawMessage);

  if (normalized.includes("expired") || normalized.includes("expire")) {
    return "OTP code expired. Request a new code.";
  }

  if (
    response?.status === 400 ||
    response?.status === 422 ||
    normalized.includes("invalid") ||
    normalized.includes("incorrect") ||
    normalized.includes("invalide")
  ) {
    return "Invalid OTP code.";
  }

  if (response?.status === 429 || normalized.includes("too many")) {
    return "Too many OTP attempts. Please try again later.";
  }

  return rawMessage || "OTP verification failed. Please try again.";
};

export const getVideoUploadErrorMessage = (error: unknown) => {
  const response = getResponse(error);
  const responseMessage =
    getFirstValidationMessage(response?.data?.errors) ||
    (typeof response?.data?.message === "string" ? response.data.message : undefined);
  const rawMessage = responseMessage || getErrorMessage(error) || "";
  const normalized = normalizeText(rawMessage);

  if (normalized.includes("firebase") || normalized.includes("upload")) {
    return "Upload failed. Check your connection and try again.";
  }

  if (normalized.includes("too large") || normalized.includes("100mb")) {
    return "Upload failed. The video is too large. Maximum size: 100MB.";
  }

  if (response?.status === 401) {
    return "Your session expired. Sign in and try again.";
  }

  if (response?.status === 413) {
    return "Upload failed. The video is too large.";
  }

  if (response?.status === 422 && responseMessage) {
    return responseMessage;
  }

  if (response?.status && response.status >= 500) {
    return "Upload failed. The server could not publish the video.";
  }

  return rawMessage || "Upload failed. Please try again.";
};

export const getDeleteErrorMessage = (error: unknown, itemLabel = "element") => {
  const response = getResponse(error);

  if (response?.status === 401) {
    return "Your session expired. Sign in and try again.";
  }

  if (response?.status === 403) {
    return `You do not have permission to delete this ${itemLabel}.`;
  }

  if (response?.status === 404) {
    return `This ${itemLabel} was not found or was already deleted.`;
  }

  return `Could not delete this ${itemLabel}. Please try again.`;
};

export const getPasswordResetErrorMessage = (error: unknown) => {
  const response = getResponse(error);
  const rawMessage =
    (typeof response?.data?.message === "string" ? response.data.message : undefined) ||
    getErrorMessage(error) ||
    "";
  const normalized = normalizeText(rawMessage);

  if (response?.status === 404 || normalized.includes("selected") || normalized.includes("introuvable")) {
    return "No account was found for this email.";
  }

  if (response?.status === 429 || normalized.includes("limit") || normalized.includes("too many")) {
    return "Too many requests. Please try again in one hour.";
  }

  if (normalized.includes("token")) {
    return "The reset link is invalid or expired.";
  }

  return rawMessage || "Password reset failed. Please try again.";
};

export const getCompanyErrorMessage = (error: unknown) => {
  const response = getResponse(error);
  const responseMessage =
    getFirstValidationMessage(response?.data?.errors) ||
    (typeof response?.data?.message === "string" ? response.data.message : undefined);
  const rawMessage = responseMessage || getErrorMessage(error) || "";
  const normalized = normalizeText(rawMessage);

  if (
    normalized.includes("company already exists") ||
    normalized.includes("entreprise existe") ||
    normalized.includes("societe existe")
  ) {
    return "A company profile already exists. You can update it instead.";
  }

  if (
    normalized.includes("email") &&
    (normalized.includes("already") ||
      normalized.includes("taken") ||
      normalized.includes("exists") ||
      normalized.includes("utilise") ||
      normalized.includes("existe"))
  ) {
    return "This email is already in use.";
  }

  if (
    normalized.includes("logo") ||
    normalized.includes("image") ||
    normalized.includes("file") ||
    normalized.includes("mimes") ||
    normalized.includes("jpeg") ||
    normalized.includes("png") ||
    normalized.includes("jpg") ||
    normalized.includes("webp")
  ) {
    return "Invalid image. Please use a JPG, PNG, or WebP file.";
  }

  if (response?.status === 401 || normalized.includes("authentication failed")) {
    return "Your session expired. Sign in and try again.";
  }

  if (response?.status === 413 || normalized.includes("too large")) {
    return "Image is too large. Maximum size: 5MB.";
  }

  if (response?.status === 422 && responseMessage) {
    return responseMessage;
  }

  if (normalized.includes("validation failed")) {
    return "Please check the company information and try again.";
  }

  return rawMessage || "Could not save the company information. Please try again.";
};
