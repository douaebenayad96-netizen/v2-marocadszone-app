import axiosConfig from "../config/axiosConfig";

export const getPlans = async () => {
  const response = await axiosConfig.get("/plans");
  return response.data;
};

export const choosePlanApi = async (plan_id: string) => {
  const response = await axiosConfig.post("subscription/choose-plan", {
    plan_id,
  });
  return response.data;
};

export const cancelPlan = async () => {
  const response = await axiosConfig.patch("subscription/cancel");
  return response.data;
};
export const activatePlan = async () => {
  const response = await axiosConfig.patch("subscription/activate");
  return response.data;
};
export const getMySubscription = async () => {
  const response = await axiosConfig.get("/subscription/me");
  return response.data;
};

