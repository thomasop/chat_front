import { Dispatch, SetStateAction, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../utils/store";
import { io } from "socket.io-client";
import { DataHandlerSubmit } from "../../../../types/data/DataType";

interface Proptype {
  content: string;
  setInputErrorPassword: Dispatch<SetStateAction<string>>;
  setDisplayAddConversation: Dispatch<SetStateAction<boolean>>;
}

const socket = io("https://devops-workshop-api-ted65ogcgq-ew.a.run.app");

/**
 * React component - Fetch add conversation
 * @param {Proptype} Props
 * @param {string} Props.content - store input content from form and send in API
 * @param {Dispatch<SetStateAction<string>>} Props.setInputErrorPassword - if API return error then display error message in form
 * @param {Dispatch<SetStateAction<boolean>>} Props.setDisplayAddConversation - for call this component one time
 * @return {null}
 */
const AddConversation = ({
  content,
  setInputErrorPassword,
  setDisplayAddConversation,
}: Proptype): null => {
  const dispatch = useDispatch();
  const { userIdAdd } = useSelector((state: RootState) => state.modal);
  const { token, userId } = useSelector((state: RootState) => state.login);
  useEffect(() => {
    const addConversation = async () => {
      const response = await fetch("https://devops-workshop-api-ted65ogcgq-ew.a.run.app/conversation/add", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          userId: userId,
          content: content,
          userIdAdd: userIdAdd,
        }),
      });
      const json = await response.json();
      if (json.error) {
        if (typeof json.error == "object") {
          json.error.map((error: DataHandlerSubmit) => {
            let input: HTMLElement = document.querySelector("." + error.path)!;
            if (input) {
              input.style.display = "block";
              input.textContent = error.msg;
            }
            return null;
          });
        } else {
          let htmlElementDiv = document.querySelector<HTMLElement>(
            ".modal__errorMessages"
          );
          if (htmlElementDiv) {
            htmlElementDiv.style.marginBottom = "10px";
            htmlElementDiv.style.display = "block";
          }
          setInputErrorPassword(json.error);
        }
      } else if (json.status && json.status === 400) {
        dispatch({
          type: "logoutUser/toggle",
        });
      } else {
        dispatch({
          type: "modal/modalDisplay",
          payload: { display: "none", userNameAdd: "", userIdAdd: "" },
        });
        socket.emit("send-conv", json);
      }
    };
    setDisplayAddConversation(false);
    addConversation();
  }, [
    content,
    dispatch,
    setDisplayAddConversation,
    setInputErrorPassword,
    token,
    userId,
    userIdAdd,
  ]);
  return null;
};

export default AddConversation;
