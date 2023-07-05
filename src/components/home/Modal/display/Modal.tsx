import { useState } from "react";
import AddConversation from "../../Conversation/fetch/AddConversation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../utils/store";

/**
 * React component - Display modal
 * @return {JSX.Element}
 */
const Modal = (): JSX.Element => {
  const dispatch = useDispatch();
  const { userNameAdd } = useSelector((state: RootState) => state.modal);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [inputErrorPassword, setInputErrorPassword] = useState<string>("");
  const [displayAddConversation, setDisplayAddConversation] =
    useState<boolean>(false);
  const handleInputMessage = (e: any) => {
    setInputMessage(e.target.value);
  };
  return (
    <>
      <div>
        <button
          className="burgerBtnClose"
          onClick={() => {
            dispatch({
              type: "modal/modalDisplay",
              payload: {
                display: "none",
                userNameAdd: "",
                userIdAdd: "",
                opacity: "1",
              },
            });
          }}
        >
          <div className="burgercloseline">
            <span className="cross">&times;</span>
          </div>
        </button>
      </div>
      <h4 className="modal__h4">
        Aucune conversation existe avec : {userNameAdd}
      </h4>
      <p>Envoyer lui un message pour créer une conversation</p>
      <form
        className="modal__form"
        action="https://devops-workshop-api-ted65ogcgq-ew.a.run.app/addConversation"
        method="post"
        onSubmit={(e) => {
          e.preventDefault();
          setDisplayAddConversation(true);
        }}
      >
        <textarea
          className="modal__content"
          name="content"
          id="content"
          required
          onChange={handleInputMessage}
        ></textarea>
        <div className="modal__errorMessage content"></div>
        <input
          className="modal__btn"
          type="submit"
          value="Envoyer le premier message"
        />
      </form>
      <div className="modal__errorMessages">{inputErrorPassword}</div>
      {displayAddConversation === true && (
        <AddConversation
          content={inputMessage}
          setInputErrorPassword={setInputErrorPassword}
          setDisplayAddConversation={setDisplayAddConversation}
        />
      )}
    </>
  );
};

export default Modal;
