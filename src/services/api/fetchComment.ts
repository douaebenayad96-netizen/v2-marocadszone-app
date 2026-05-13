import axiosConfig from "../config/axiosConfig";

export const sendComment = async (announcementId: number, body: string) => {
  const response = await axiosConfig.post(
    `announcements/${announcementId}/comments`,
    { body }
  );
  return response.data;
};
