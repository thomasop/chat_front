import React, { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { User } from "../../../../types/data/DataType";

interface Proptype {
  searchData: User;
  setDisplayDiv: Dispatch<React.SetStateAction<string>>;
  setInputValue: Dispatch<React.SetStateAction<string>>;
}

/**
 * React component - Handler for send add conversation
 * @param {Proptype} Props
 * @param {User} Props.searchData - Store user data
 * @param {Dispatch<SetStateAction<string>>} Props.setDisplayDiv - close div modal
 * @param {Dispatch<SetStateAction<string>>} Props.setInputValue - clear input value
 * @return {JSX.Element}
 */
const HandleClickBtn = ({
  searchData,
  setDisplayDiv,
  setInputValue,
}: Proptype): JSX.Element => {
  const dispatch = useDispatch();
  const handleDisplayModal = (e: any, dataId: number) => {
    let allConversations = document.querySelectorAll(".getConversations__p");
    let number = 0;
    let conversationId = "";
    Object.entries(allConversations).map((allConversation) => {
      if (
        allConversation[1].textContent?.split(" : ")[1] === e.target.textContent
      ) {
        if (allConversation[1].getAttribute("data-myval")) {
          let idConversation = allConversation[1]
            .getAttribute("data-myval")
            ?.toString()!;
          conversationId = idConversation;
        }

        number++;
      }
      return null;
    });
    if (number > 0) {
      dispatch({
        type: "conversation/conversation",
        payload: {
          displayDivMessage: "flex",
          conversationId: conversationId,
          nameOtherUser: e.target.textContent,
        },
      });
      setInputValue("");
      setDisplayDiv("none");
    } else {
      dispatch({
        type: "modal/modalDisplay",
        payload: {
          display: "block",
          userNameAdd: e.target.textContent,
          userIdAdd: dataId.toString(),
          opacity: "0.6",
        },
      });
      setInputValue("");
      setDisplayDiv("none");
    }
  };

  return (
    <>
      <button
        className="search__btn"
        onClick={(e) => handleDisplayModal(e, searchData.id)}
      >
        {searchData.firstname?.charAt(0).toUpperCase()}
        {searchData.firstname?.slice(1, searchData.firstname.length)}{" "}
        {searchData.lastname?.charAt(0).toUpperCase()}
        {searchData.lastname?.slice(1, searchData.lastname.length)}
      </button>
    </>
  );
};

export default HandleClickBtn;
