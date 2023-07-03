import { Dispatch, SetStateAction, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../utils/store";
import { DataGetMessages } from "../../../../types/data/DataType";

interface Proptypes {
  setData: Dispatch<SetStateAction<DataGetMessages | null>>;
}

/**
 * React component - Fetch get messages
 * @param {Proptypes} Props
 * @param {Dispatch<SetStateAction<Data | null>>} Props.setData - store messages
 * @return {null}
 */
const GetMessages = ({ setData }: Proptypes): null => {
  const { conversationId } = useSelector(
    (state: RootState) => state.conversation
  );
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.login.token);
  useEffect(() => {
    const getData = async () => {
      let response = await fetch(
        `http://localhost:8080/message/all/${conversationId}`,
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      let json: DataGetMessages = await response.json();
      if (!json.result) {
        dispatch({
          type: "logoutUser/toggle",
        });
      } else {
        json.result.sort(function (a, b) {
          return new Date(a.date).valueOf() - new Date(b.date).valueOf();
        });
        setData(json);
      }
    };
    if (conversationId !== null || conversationId !== "") {
      getData();
    }
  }, [conversationId, dispatch, setData, token]);
  return null;
};

export default GetMessages;
