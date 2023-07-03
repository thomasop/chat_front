import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../utils/store";
import DisplayEachMessage from "./DisplayEachMessage";

/**
 * React component - Display conversation with all messages and input add message
 * @return {JSX.Element}
 */
const DisplayMessages = (): JSX.Element => {
  const { displayDivMessage, nameOtherUser, idOtherUser, conversationId } = useSelector(
    (state: RootState) => state.conversation
  );
  const dispatch = useDispatch()
  const { width } = useSelector((state: RootState) => state.screenWidth);

  const styleDiv = {
    display: displayDivMessage,
  };
  const handlerClick = () => {
    dispatch({
      type: 'mobileDisplayConversation/toggle',
      payload: {display: 'block'}
    })
    dispatch({
      type: "conversation/conversation",
      payload: {
        displayDivMessage: "none",
        conversationId: conversationId,
        nameOtherUser: nameOtherUser,
        idOtherUser: idOtherUser,
      },
    });
  }
  return (
    <>
      {(displayDivMessage === "none" && (
        <div className="getMessage getMessage__none">
          Vous devez selectionner une conversation
        </div>
      )) ||
        (displayDivMessage === "flex" && (
          <>
            <div className="getMessage" style={styleDiv}>
              {Number(width) < 600 && (
                <button onClick={() => handlerClick()} className="getMessage__back">&lt;</button>
              )}
              <h1 className="getMessage__h1">{nameOtherUser}</h1>
              <DisplayEachMessage />
            </div>
          </>
        ))}
    </>
  );
};

export default DisplayMessages;
