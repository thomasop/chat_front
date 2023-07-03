import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../utils/store";

/**
 * React component - Logout user
 * @return {null}
 */
const LogoutUser = (): null => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state: RootState) => state.login);
  useEffect(() => {
    dispatch({
      type: "login/loginUser",
      payload: { token: "", userId: "", userLog: false },
    });
    document.cookie = "userId =; Max-Age=0";
    document.cookie = "token =; Max-Age=0";
    navigate("/");
  }, [dispatch, navigate, token]);

  return null;
};

export default LogoutUser;
