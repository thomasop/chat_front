import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../utils/store";
import { DataGetUsers } from "../../../../types/data/DataType";

/**
 * React component - Fetch get users
 * @return {null}
 */
const GetUsers = (): null => {
  const token = useSelector((state: RootState) => state.login.token);
  const dispatch = useDispatch();
  useEffect(() => {
    const getDatas = async () => {
      let response = await fetch("http://localhost:8080/user/all", {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      let json: DataGetUsers = await response.json();
      if (!json.results) {
        dispatch({
          type: "logoutUser/toggle",
        });
      } else {
        dispatch({
          type: "user/getUser",
          payload: { user: json.results },
        });
      }
    };
    if (token.length > 0) {
      getDatas();
    }
  }, [dispatch, token]);
  return null;
};

export default GetUsers;
