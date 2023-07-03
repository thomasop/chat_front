import { useEffect, useState } from "react";
import CheckUserLog from "../components/CheckUserLog";
import Modal from "../components/home/Modal/display/Modal";
import DisplayConversation from "../components/home/Conversation/display/DisplayConversation";
import Logout from "../components/home/Logout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../utils/store";
import Search from "../components/home/Search/display/Search";
import DisplayMessages from "../components/home/Message/display/DisplayMessages";

/**
 * React component - Home page
 * @return {JSX.Element}
 */
const Home = (): JSX.Element => {
  const [userLogout, setUserLogout] = useState<boolean>(false);
  const { userLog } = useSelector((state: RootState) => state.login);
  const { logout } = useSelector((state: RootState) => state.logoutUser);
  const { display, opacity } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch()
  const opacityStyle = {
    opacity: opacity,
  };
  const modalStyle = {
    display: display,
  };
  let width = document.body.clientWidth.toString()
  useEffect(() => {
    dispatch({
      type: 'screenWidth/editWidth',
      payload: { width: width}
    })
  }, [dispatch, width])
  
  return (
    <>
      <CheckUserLog />
      {userLogout === true && <Logout />}
      {(logout === true && (
        <div className="home home__flex">
          <h2 className="home__redirect">
            Une erreur s'est produite lors de votre authentification, veuillez
            vous reconnecter.
          </h2>
          <p className="home__redirect">
            <button onClick={() => setUserLogout(true)}>
              Retour vers la connection
            </button>
          </p>
        </div>
      )) ||
        (logout === false && userLog === true && (
          <>
            <div className="home" style={opacityStyle}>
              <Search />
              <div className="getAll">
                <DisplayConversation />
                <DisplayMessages />
              </div>
              <button className="logout" onClick={() => setUserLogout(true)}>
                Logout
              </button>
            </div>
            <div style={modalStyle} className="modal">
              <Modal />
            </div>
          </>
        ))}
    </>
  );
};

export default Home;
