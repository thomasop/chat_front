import { Dispatch, SetStateAction, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../utils/store";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080");
interface Proptype {
  setEditMessage: Dispatch<SetStateAction<boolean>>;
}

/**
 * React component - Fetch edit message
 * @param {Proptype} Props
 * @param {Dispatch<SetStateAction<boolean>>} Props.setEditMessage - for display this one time
 * @return {null}
 */
const EditMessage = ({ setEditMessage }: Proptype): null => {
  const { otherIdUser } = useSelector((state: RootState) => state.editMessage);
  const { conversationId } = useSelector(
    (state: RootState) => state.conversation
  );
  useEffect(() => {
    const fetchEdit = async () => {
      let response = await fetch(
        `http://localhost:8080/message/edit/${conversationId}/${otherIdUser}`
      );
      let json = await response.json();
      if (json.result.length > 0) {
        socket.emit("send-edit-new-msg", json);
      }
      setEditMessage(false);
    };
    fetchEdit();
  }, [conversationId, otherIdUser, setEditMessage]);
  return null;
};

export default EditMessage;
