import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../utils/store";

/**
 * React component - Logout user
 * @return {null}
 */
const Logout = (): null => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, userId } = useSelector((state: RootState) => state.login);
  useEffect(() => {
    const logout = async () => {
      const response = await fetch("https://devops-workshop-api-ted65ogcgq-ew.a.run.app/user/logout", {
        headers: {
          authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "post",
        body: JSON.stringify({
          userId: userId,
        }),
      });
      await response.json();
      dispatch({
        type: "login/loginUser",
        payload: { token: "", userId: "", userLog: false },
      });
      document.cookie = "userId =; Max-Age=0";
      document.cookie = "token =; Max-Age=0";
      navigate("/");
    };
    logout();
  }, [dispatch, navigate, token, userId]);
  return null;
};

export default Logout;
