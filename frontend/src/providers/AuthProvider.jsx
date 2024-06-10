import { useEffect, useState } from "react";
import { checkUser } from "../services/apiUser";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";
import { addProducts, updateEditProductId } from "../store/slices/productSlice";
import { message } from "antd";

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAutenticated, setIsisAutenticated] = useState(false);
  useEffect(() => {
    async function checkIsLogin() {
      try {
        const data = await checkUser();
        if (!data.isSuccess) {
          throw new Error(data.message);
        }
        setIsisAutenticated(true);
      } catch (err) {
        message.error("Login Again!");
        dispatch(addProducts({}));
        dispatch(updateEditProductId(null, "1"));
        dispatch(setUser(null));
        navigate("/");
      }
    }
    checkIsLogin();
  }, [navigate, dispatch]);

  if (isAutenticated) return children;
}

export default AuthProvider;
