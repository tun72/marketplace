import { useEffect } from "react";
import { checkUser } from "../services/apiUser";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";
import { addProducts, updateEditProductId } from "../store/slices/productSlice";
import { message } from "antd";

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    async function checkIsLogin() {
      try {
        const data = await checkUser();

        if (!data.isSuccess) {
          throw new Error("Loagin Again!");
        }
      } catch (err) {
        // console.log(err);
        message.error("Login Again!");
        dispatch(addProducts({}));
        dispatch(updateEditProductId(null, "1"));
        dispatch(setUser(null));
        navigate("/");
      }
    }
    checkIsLogin();
  }, [navigate, dispatch]);
  
  return children;
}

export default AuthProvider;
