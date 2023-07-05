import { useEffect, useState } from "react";
import GetConversations from "../fetch/GetConversations";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../utils/store";
import { io } from "socket.io-client";
import EditMessage from "../../Message/fetch/EditMessage";
import { DataConversation, Message } from "../../../../types/data/DataType";

const socket = io("https://devops-workshop-api-ted65ogcgq-ew.a.run.app");

/**
 * React component - Display all conversation
 * @return {JSX.Element}
 */
const DisplayConversation = (): JSX.Element => {
  const dispatch = useDispatch();
  const { userId } = useSelector((state: RootState) => state.login);
  const { displayDivMessage, conversationId } = useSelector(
    (state: RootState) => state.conversation
  );
  const [datasConv, setDatasConv] = useState<null | DataConversation[]>(null);
  const [editMessage, setEditMessage] = useState<boolean>(false);
  const [editNewMessage, setEditNewMessage] = useState<Message[] | null>(null);
  const [updateNewMessage, setUpdateNewMessage] = useState<boolean>(false);
  const { display } = useSelector(
    (state: RootState) => state.mobileDisplayConversation
  );
  const { width } = useSelector((state: RootState) => state.screenWidth);
  const [newConversation, setNewConversation] =
    useState<DataConversation | null>(null);
  const [newMessage, setNewMessage] = useState<Message | null>(null);
  const conversationStyle = {
    display: display,
  };
  useEffect(() => {
    socket.on("get-conv", (data) => {
      if (data) {
        setNewConversation(data);
      }
    });
    return () => {
      socket.off("get-conv");
    };
  }, []);
  if (newConversation) {
    const addNewConversation = async (newConversation: any) => {
      if (newConversation) {
        if (datasConv) {
          setDatasConv([newConversation, ...datasConv]);
          setNewConversation(null);
        }
      }
    };
    if (newConversation && !datasConv?.includes(newConversation)) {
      addNewConversation(newConversation);
    }
  }

  useEffect(() => {
    socket.on("get-msg", (data) => {
      if (data) {
        setNewMessage(data);
      }
    });
    return () => {
      socket.off("get-msg");
    };
  }, []);
  if (newMessage) {
    datasConv?.map((data, index) => {
      if (data.id === newMessage.conversationId) {
        if (newMessage.id !== data.last_message_id) {
          let addNewMessageInConversation = datasConv;
          addNewMessageInConversation[index] = {
            ...data,
            last_message_id: newMessage.id,
            message: newMessage,
          };
          setDatasConv(addNewMessageInConversation);
          setNewMessage(null);
        }
      }
      return null;
    });
  }
  useEffect(() => {
    socket.on("get-edit-new-msg", (data) => {
      if (data.length > 0) {
        console.log("dddd");
        setEditNewMessage(data);
      }
    });
  }, [datasConv, updateNewMessage]);
  if (editNewMessage) {
    datasConv?.map((dataConv, index) => {
      if (
        Number(dataConv.id) === Number(conversationId) &&
        updateNewMessage === true
      ) {
        if (dataConv.message.new === true) {
          let newArray = datasConv;
          newArray[index] = {
            ...newArray[index],
            message: { ...newArray[index].message, new: false },
          };

          setDatasConv(newArray);
          setUpdateNewMessage(false);
          setEditNewMessage(null);
        }
      }
      return null;
    });
  }
  const updateState = (id: number, p: DataConversation) => {
    console.log(p.userOneAsId.id)
    console.log(userId)
    if (Number(width) > 1000) {
      if (displayDivMessage === "none") {
        setUpdateNewMessage(true);
      }
      if (p.userTwoAsId.id.toString()  === userId.toString() ) {
        console.log('test')
        if (conversationId.toString() === id.toString()) {
          console.log("a");
          if (displayDivMessage === "flex") {
            dispatchConversation(
              "none",
              id,
              otherUserName(p),
              p.userOneAsId.id.toString()
            );
          } else {
            dispatchConversation(
              "flex",
              id,
              otherUserName(p),
              p.userOneAsId.id.toString()
            );
          }
        } else {
          console.log("b");
          let newDiv = document.getElementById(id.toString());
          if (newDiv) {
            dispatchConversation(
              "flex",
              id,
              otherUserName(p),
              p.userOneAsId.id.toString()
            );
            dispatch({
              type: "editMessage/edit",
              payload: { otherIdUser: p.userOneAsId.id },
            });
            setEditMessage(true);
          } else {
            dispatchConversation(
              "flex",
              id,
              otherUserName(p),
              p.userOneAsId.id.toString()
            );
          }
        }
      }
      if (p.userOneAsId.id.toString() === userId.toString()) {
        console.log('test2')
        if (conversationId.toString() === id.toString()) {
          console.log("c");
          if (displayDivMessage === "flex") {
            dispatchConversation(
              "none",
              id,
              otherUserName(p),
              p.userTwoAsId.id.toString()
            );
          } else {
            dispatchConversation(
              "flex",
              id,
              otherUserName(p),
              p.userTwoAsId.id.toString()
            );
          }
        } else {
          console.log("d");
          let newDiv = document.getElementById(id.toString());
          if (newDiv) {
            dispatchConversation(
              "flex",
              id,
              otherUserName(p),
              p.userTwoAsId.id.toString()
            );
            dispatch({
              type: "editMessage/edit",
              payload: { otherIdUser: p.userTwoAsId.id },
            });
            setEditMessage(true);
          } else {
            dispatchConversation(
              "flex",
              id,
              otherUserName(p),
              p.userTwoAsId.id.toString()
            );
          }
        }
      }
    } else if (Number(width) < 600) {
      dispatch({
        type: "mobileDisplayConversation/toggle",
        payload: { display: "none" },
      });
      if (displayDivMessage === "none") {
        setUpdateNewMessage(true);
      }
      if (p.userTwoAsId.id === Number(userId)) {
        if (conversationId.toString() === id.toString()) {
          console.log("a");
          let newDiv = document.getElementById(id.toString());
            if (newDiv) {
              dispatchConversation(
                "flex",
                id,
                otherUserName(p),
                p.userTwoAsId.id.toString()
              );
              dispatch({
                type: "editMessage/edit",
                payload: { otherIdUser: p.userTwoAsId.id },
              });
              setEditMessage(true);
            } else {
              dispatchConversation(
                "flex",
                id,
                otherUserName(p),
                p.userTwoAsId.id.toString()
              );
            }
        } else {
          let newDiv = document.getElementById(id.toString());
          console.log("b");
          if (newDiv) {
            dispatchConversation(
              "flex",
              id,
              otherUserName(p),
              p.userOneAsId.id.toString()
            );
            dispatch({
              type: "editMessage/edit",
              payload: { otherIdUser: p.userOneAsId.id },
            });
            setEditMessage(true);
          } else {
            dispatchConversation(
              "flex",
              id,
              otherUserName(p),
              p.userOneAsId.id.toString()
            );
          }
        }
      }
      if (p.userOneAsId.id === Number(userId)) {
        if (conversationId.toString() === id.toString()) {
          console.log("c");
          let newDiv = document.getElementById(id.toString());
          if (newDiv) {
            dispatchConversation(
              "flex",
              id,
              otherUserName(p),
              p.userTwoAsId.id.toString()
            );
            dispatch({
              type: "editMessage/edit",
              payload: { otherIdUser: p.userTwoAsId.id },
            });
            setEditMessage(true);
          } else {
            dispatchConversation(
              "flex",
              id,
              otherUserName(p),
              p.userTwoAsId.id.toString()
            );
          }
        } else {
          let newDiv = document.getElementById(id.toString());
          console.log("d");
          if (newDiv) {
            dispatchConversation(
              "flex",
              id,
              otherUserName(p),
              p.userTwoAsId.id.toString()
            );
            dispatch({
              type: "editMessage/edit",
              payload: { otherIdUser: p.userTwoAsId.id },
            });
            setEditMessage(true);
          } else {
            dispatchConversation(
              "flex",
              id,
              otherUserName(p),
              p.userTwoAsId.id.toString()
            );
          }
        }
      }
    }
  };

  const dispatchConversation = (
    display: string,
    id: number,
    nameOtherUser: string,
    idOtherUser: string
  ) => {
    dispatch({
      type: "conversation/conversation",
      payload: {
        displayDivMessage: display,
        conversationId: id,
        nameOtherUser: nameOtherUser,
        idOtherUser: idOtherUser,
      },
    });
  };

  const otherUserName = (p: DataConversation) => {
    if (Number(userId) === p.userOneAsId.id) {
      return (
        p.userTwoAsId.firstname.charAt(0).toUpperCase() +
        p.userTwoAsId.firstname.slice(1) +
        " " +
        p.userTwoAsId.lastname.charAt(0).toUpperCase() +
        p.userTwoAsId.lastname.slice(1)
      );
    } else {
      return (
        p.userOneAsId.firstname.charAt(0).toUpperCase() +
        p.userOneAsId.firstname.slice(1) +
        " " +
        p.userOneAsId.lastname.charAt(0).toUpperCase() +
        p.userOneAsId.lastname.slice(1)
      );
    }
  };
  const jsxRender = () => {
    return (
      <div className="getAll__div" style={conversationStyle}>
        <div className="getConversations">
          {datasConv?.map((p, index) => {
            if (
              conversationId.toString() === p.id.toString() &&
              displayDivMessage === "flex"
            ) {
              return (
                <button
                  key={index}
                  className="getConversations__div--color"
                  onClick={() => updateState(p.id, p)}
                >
                  <p className="getConversations__p--color" data-myval={p.id}>
                    Conversation avec : {otherUserName(p)}
                  </p>

                  <h2 className="getConversations__h1--color">
                    {(Number(userId) === p.message.userId && "Vous") ||
                      (Number(userId) !== p.message.userId &&
                        p.message.user.firstname?.charAt(0).toUpperCase() +
                          p.message.user.firstname?.slice(
                            1,
                            p.message.user.firstname.length
                          ) +
                          " " +
                          p.message.user.lastname?.charAt(0).toUpperCase() +
                          p.message.user.lastname?.slice(
                            1,
                            p.message.user.lastname.length
                          ))}
                  </h2>
                  <p className="getConversations__content--color">
                    {p.message.content}
                  </p>
                  <div className="getConversations__date--div">
                    <p className="getConversations__date--color">
                      {new Date(p.message.date).toLocaleString()}
                    </p>
                    {p.message.new === true &&
                      p.message.userId !== Number(userId) && (
                        <span
                          id={p.id.toString()}
                          className="getConversations__new--color"
                        >
                          nouveau
                        </span>
                      )}
                  </div>
                </button>
              );
            } else {
              return (
                <button
                  key={index}
                  className="getConversations__div"
                  onClick={() => updateState(p.id, p)}
                >
                  <p className="getConversations__p" data-myval={p.id}>
                    Conversation avec : {otherUserName(p)}
                  </p>

                  <h2 className="getConversations__h1">
                    {(Number(userId) === p.message.userId && "Vous") ||
                      (Number(userId) !== p.message.userId &&
                        p.message.user.firstname?.charAt(0).toUpperCase() +
                          p.message.user.firstname?.slice(
                            1,
                            p.message.user.firstname.length
                          ) +
                          " " +
                          p.message.user.lastname?.charAt(0).toUpperCase() +
                          p.message.user.lastname?.slice(
                            1,
                            p.message.user.lastname.length
                          ))}
                  </h2>
                  <p className="getConversations__content">
                    {p.message.content}
                  </p>
                  <div className="getConversations__date--div">
                    <p className="getConversations__date">
                      {new Date(p.message.date).toLocaleString()}
                    </p>
                    {p.message.new === true &&
                      p.message.userId !== Number(userId) && (
                        <span
                          id={p.id.toString()}
                          className="getConversations__new"
                        >
                          nouveau
                        </span>
                      )}
                  </div>
                </button>
              );
            }
          })}
        </div>
      </div>
    );
  };
  return (
    <>
      {editMessage === true && <EditMessage setEditMessage={setEditMessage} />}
      <GetConversations setDatas={setDatasConv} />
      {(datasConv && jsxRender()) ||
        (!datasConv && "Aucune conversation existe")}
    </>
  );
};

export default DisplayConversation;
