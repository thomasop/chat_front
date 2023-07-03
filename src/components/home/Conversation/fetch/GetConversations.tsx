import { Dispatch, SetStateAction, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../utils/store";
import {
  ResultGetConversations,
  DataConversation,
} from "../../../../types/data/DataType";

interface Proptype {
  setDatas: Dispatch<SetStateAction<null | DataConversation[]>>;
}

/**
 * React component - Fetch get all conversation
 * @param {Proptype} Props
 * @param {Dispatch<SetStateAction<null | Data[]>>} Props.setDatas - store conversations
 * @return {null}
 */
const GetConversations = ({ setDatas }: Proptype): null => {
  const { token, userId } = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch();
  useEffect(() => {
    const getDatas = async () => {
      let response = await fetch(
        `http://localhost:8080/conversation/all/${userId}`,
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      let json: ResultGetConversations = await response.json();
      if (!json.result) {
        dispatch({
          type: "logoutUser/toggle",
        });
      } else {
        let ar: DataConversation[] = [];
        json.result.map((data: DataConversation) => {
          if (data.last_message_id === data.message.id) {
            ar.push(data);
          }
          return null;
        });
        ar.sort((a, b) => {
          return (
            new Date(b.message.date).valueOf() -
            new Date(a.message.date).valueOf()
          );
        });
        setDatas(ar);
      }
    };
    if (userId !== "") {
      getDatas();
    }
  }, [dispatch, setDatas, token, userId]);
  return null;
};

export default GetConversations;
