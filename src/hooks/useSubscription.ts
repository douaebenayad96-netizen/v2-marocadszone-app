import { useQuery } from "react-query";
import { getMySubscription } from "../services/api/fetchTarification";
import { useAuthStore } from "../services/store/authStore";

const useSubscription = () => {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ["my-subscription"],
    queryFn: getMySubscription,
    enabled: !!user,
  });
};

export default useSubscription;