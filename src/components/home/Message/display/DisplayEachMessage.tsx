import { useEffect, useState } from "react";
import GetMessages from "../fetch/GetMessages";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../utils/store";
import EditMessage from "../fetch/EditMessage";
import {
  DataDisplayEachMessages,
  Message,
} from "../../../../types/data/DataType";
import AddMessage from "../fetch/AddMessage";


const socket = io("https://devops-workshop-api-ted65ogcgq-ew.a.run.app");

/**
 * React component - Display all messages
 * @return {JSX.Element}
 */
const DisplayEachMessage = (): JSX.Element => {
  const [displayBottomBtn, setDisplayBottomBtn] = useState<boolean>(false);
  const { userId } = useSelector((state: RootState) => state.login);
  const [editMessage, setEditMessage] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState<Message | null>(null);
  const [isWriting, setIsWriting] = useState<boolean>(false);
  const [isWritingId, setIsWritingId] = useState<string>("");

  const [editNewMessage, setEditNewMessage] = useState<Message[] | null>(null);
  const [datas, setDatas] = useState<null | DataDisplayEachMessages>(null);
  const { idOtherUser, nameOtherUser } = useSelector(
    (state: RootState) => state.conversation
  );

  const dispatch = useDispatch();

/*   useEffect(() => {
    let allDivHeight = document.querySelector(".getMessage");
    let divHeight = document.querySelector(".getMessage__div--flex");
    if (allDivHeight && divHeight) {
      console.log(divHeight)
      allDivHeight.scrollTop = divHeight?.clientHeight!
    }
    console.log(allDivHeight?.scrollTop)
  }, []) */
  useEffect(() => {
    socket.on("get-msg", (data) => {
      setNewMessage(data);
    });
    return () => {
      socket.off("get-msg");
    };
  }, []);
  if (newMessage) {
    const addNewMessage = async (newMessage: Message) => {
      if (datas?.result[0].conversationId === newMessage.conversationId) {
        setDatas({ result: [...datas?.result!, newMessage] });
        setNewMessage(null);
      }
      let allDivHeight = document.querySelector(".getMessage");
      if (allDivHeight?.scrollTop! > -40 && newMessage) {
        dispatch({
          type: "editMessage/edit",
          payload: { otherIdUser: idOtherUser },
        });
        setEditMessage(true);
      }
    };
    if (newMessage && !datas?.result.includes(newMessage)) {
      addNewMessage(newMessage);
    }
  }
  useEffect(() => {
    socket.on("get-edit-new-msg", (data) => {
      if (data.length > 0) {
        setEditNewMessage(data);
      }
    });
    return () => {
      socket.off("get-edit-new-msg");
    };
  }, []);
  if (editNewMessage) {
    const editNew = async () => {
      datas?.result.map((d, index) => {
        editNewMessage.map((mm: any) => {
          if (mm.id === d.id) {
            let tt = datas;
            tt.result[index] = { ...tt.result[index], new: false };
            setDatas(tt);

            setEditNewMessage(null);
          }
          return null;
        });
        return null;
      });
    };
    if (editNewMessage) {
      editNew();
    }
  }
  useEffect(() => {
    socket.on("get-writing", (data) => {
      if (data[3] === "writing") {
        setIsWritingId(data[1]);
        if (data[0].length > 0) {
          setIsWriting(true);
        } else {
          setIsWriting(false);
        }
      } else {
        if (isWriting === true) {
          setIsWriting(false)
        }
      }
    });
    return () => {
      socket.off("get-writing");
    };
  }, [idOtherUser, isWriting, userId]);
  const oncscroll = () => {
    let divHeight = document.querySelector(".getMessage__div--flex");
    let allDivHeight = document.querySelector(".getMessage");
    if (divHeight && allDivHeight) {
      if (allDivHeight?.scrollTop < -40) {
        setDisplayBottomBtn(true);
      } else {
        setDisplayBottomBtn(false);
        dispatch({
          type: "editMessage/edit",
          payload: { otherIdUser: idOtherUser },
        });
        setEditMessage(true);
      }
    }
  };
  let divAllMessages = document.querySelector(".getMessage")!;
  divAllMessages.addEventListener("scroll", (event: any) => {
    oncscroll();
  });

  const goToBottom = () => {
    let divHeight = document.querySelector(".getMessage__div--flex");
    let allDivHeight = document.querySelector(".getMessage");
    if (allDivHeight) {
      allDivHeight.scrollTop += divHeight?.clientHeight!;
      dispatch({
        type: "editMessage/edit",
        payload: { otherIdUser: idOtherUser },
      });
      setEditMessage(true);
    }
  };
  let test = document.querySelector(".getMessage__btn");
  if (test) {
    test.addEventListener("click", (event: any) => {
      goToBottom();
    });
  }
  const jsxRender = () => {
    return (
      <div className="getMessage__div--flex">
        {datas?.result.map((message, index) => {
          return (
            (message.user.id.toString() === userId && (
              <div key={index} className="getMessage__div--float">
                <div className="getMessage__div--sizefloat">
                  <h3 className="getMessage__div--h3">
                    {message.user.firstname} {message.user.lastname}
                  </h3>
                  <p className="getMessage__div--content">{message.content}</p>
                  <p className="getMessage__div--date">
                    {new Date(message.date).toLocaleString()}
                  </p>
                </div>
              </div>
            )) ||
            (message.user.id.toString() !== userId && (
              <div key={index} className="getMessage__div">
                <div className="getMessage__div--size">
                  {message.new === true && (
                    <span className="getMessage__new">Nouveau</span>
                  )}
                  <h3 className="getMessage__div--h3">
                    {message.user.firstname} {message.user.lastname}
                  </h3>
                  <p className="getMessage__div--content">{message.content}</p>
                  <p className="getMessage__div--date">
                    {new Date(message.date).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          );
        })}
      </div>
    );
  };

  return (
    <>
      {editMessage === true && <EditMessage setEditMessage={setEditMessage} />}
      <GetMessages setData={setDatas} />
      {datas && datas?.result !== null && jsxRender()}
      <div className="getMessage__sending">
        {isWriting === true && isWritingId === userId && (
          <p className="getMessage__writing">
            {nameOtherUser} est en train d'écrire ...
          </p>
        )}
        {displayBottomBtn === true && (
          <button className="getMessage__btn">
            <img src="./arrow-down.svg" alt="" />
          </button>
        )}
        <AddMessage />
      </div>
    </>
  );
};

export default DisplayEachMessage;
