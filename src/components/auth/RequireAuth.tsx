import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLoginModelStore } from "../../services/store/LoginModelStore";
import { useAuthStore } from "../../services/store/authStore";

type RequireAuthProps = {
  children: React.ReactNode;
};

const RequireAuth = ({ children }: RequireAuthProps) => {
  const [isChecking, setIsChecking] = useState(true);
  const navigate = useNavigate();
  const { openLoginModel } = useLoginModelStore();
  const { token, user } = useAuthStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!token || !user) {
        openLoginModel();
        navigate("/");
      }

      setIsChecking(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [token, user, openLoginModel, navigate]);

  if (isChecking) {
    return <div>Loading...</div>;
  }

  if (token && user) {
    return <>{children}</>;
  }

  return null;
};

export default RequireAuth;