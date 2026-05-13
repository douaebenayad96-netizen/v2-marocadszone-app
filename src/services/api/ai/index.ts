import { apiAiClient } from "../../apiAiClient";

// export const generateAIDescription = async (data) => {
//   const response = await apiAiClient.post("/generate-description", { data });
//   return response.data;
// };

// export const getConversationWithAi = async ({ email }) => {
//   const params = {
//     email,
//   };
//   const response = await apiAiClient.get(`public/chat-bot/user-conversation`, {
//     params,
//   });
//   return response.data;
// };

export const generateConversationWithAi = async (data: any) => {
  const response = await apiAiClient.post("client/generate-response", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};