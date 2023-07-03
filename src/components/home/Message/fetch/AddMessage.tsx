import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../utils/store";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080");

/**
 * React component - Fetch add message
 * @return {JSX.Element}
 */
const AddMessage = (): JSX.Element => {
  const { conversationId } = useSelector(
    (state: RootState) => state.conversation
  );
  const [inputMessage, setInputMessage] = useState<string>("");
  const dispatch = useDispatch();
  const { idOtherUser, nameOtherUser } = useSelector(
    (state: RootState) => state.conversation
  );
  const [displayErrorMessage, setDisplayErrorMessage] =
    useState<boolean>(false);
  const { userId, token } = useSelector((state: RootState) => state.login);
  const updateUseState = (e: any) => {
    socket.emit("send-writing", [e.target.value, idOtherUser, nameOtherUser, "writing"])
    setInputMessage(e.target.value);
  };
  const handlerSubmit = () => {
    const addMessage = async () => {
      let response = await fetch("http://localhost:8080/message/add", {
        method: "post",
        body: JSON.stringify({
          content: inputMessage,
          user: userId,
          conversation: conversationId,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      });
      let json = await response.json();
      if (!json.result) {
        dispatch({
          type: "logoutUser/toggle",
        });
      } else {
        setInputMessage("");
        socket.emit("send-msg", json);
      }
    };
    if (inputMessage.trim().length > 0 && displayErrorMessage === false) {
      addMessage();
      setDisplayErrorMessage(false);
      socket.emit("send-writing", ["", idOtherUser, nameOtherUser, "finish"])
    } else if (inputMessage.trim().length === 0) {
      setDisplayErrorMessage(true);
    }
  };
  return (
    <>
      <div className="getMessage__send">
        <textarea
          className="getMessage__send--input"
          name=""
          id=""
          value={inputMessage}
          onChange={updateUseState}
        ></textarea>
        <button className="getMessage__send--btn" onClick={handlerSubmit}>
          Envoyer
        </button>
      </div>
      {displayErrorMessage && (
        <div className="getMessage__send--color">
          Un message ne peut pas être vide
        </div>
      )}
    </>
  );
};

export default AddMessage;
