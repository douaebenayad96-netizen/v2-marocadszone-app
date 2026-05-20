import axios from "axios";

const axiosConfig = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const apiClientV2 = axios.create({
  baseURL: import.meta.env.VITE_API_V2_URL,
});

// Helper to get token from localStorage
const getToken = () => {
  try {
    const { state } = JSON.parse(
      localStorage.getItem("auth-storage") as string
    );
    return state?.token;
  } catch {
    return null;
  }
};

// Add auth token to requests
const authInterceptor = (config: any) => {
  const token = getToken();

  console.log("TOKEN SENT:", token);
  console.log("API URL:", config.baseURL, config.url);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

axiosConfig.interceptors.request.use(authInterceptor, (error) =>
  Promise.reject(error)
);

apiClientV2.interceptors.request.use(authInterceptor, (error) =>
  Promise.reject(error)
);

// Log requests (optional)
axiosConfig.interceptors.request.use(
  (config) => config,
  (error) => {
    console.error("❌ Request Error:", error.message);
    return Promise.reject(error);
  }
);

// Log responses (optional)
axiosConfig.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export { apiClientV2 };
export default axiosConfig;
