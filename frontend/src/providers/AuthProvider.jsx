import { useEffect } from "react";
import { checkUser } from "../services/apiUser";
import { useNavigate } from "react-router-dom";

function AuthProvider({ children }) {
  const navigate = useNavigate();
  useEffect(() => {
    async function checkIsLogin() {
      try {
        const data = await checkUser();

        console.log(data);
        if (!data.isSuccess) {
          navigate("/");
        }
      } catch (err) {
        console.log(err);
        console.log(err.response.data.message);
        navigate("/");
      }
    }
    checkIsLogin();
  }, [navigate]);
  return children;
}

export default AuthProvider;
