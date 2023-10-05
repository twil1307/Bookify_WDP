import "./_global.scss";
import {
  useEffect,
  useMemo,
  useReducer,
  useState,
  useRef,
  useCallback,
} from "react";
import {  
  ModalContext,
  UserContext,
  CoordinatesContext,
  WebSocketContext,
} from "@/utils/contexts";

import { modalReducer, toastMessageReducer } from "./utils/reducers";
import { Modal } from "./components";
import { Container } from "@mui/material";
import VerifyAuth from "./utils/hooks/verifyAuth";

const appInitState = {
  isOpen: false,
  isOverlay: false,
};
const sessionUser = {};

const websocketEndPoint = `ws://localhost:${process.env.REACT_APP_BACK_END_PORT}/notification`;

function App({ children }) {
  const { verifyData, firstLogin, userLocal } = VerifyAuth();
  
  const [modalState, dispatch] = useReducer(modalReducer, appInitState);
  const [user, setUser] = useState(userLocal);
  const [isLogin, setLogin] = useState(firstLogin);
  const updateData = useCallback(() => {
    setLogin(firstLogin);
    setUser(userLocal);
  }, [firstLogin, userLocal]);
  useEffect(() => {
    // console.log(user);
    // console.log(isLogin);
    updateData();
  }, [firstLogin, userLocal]);
  const [currentCoordinates, setCurrentCoordinates] = useState();
  const [toastMessages, setToastMessages] = useReducer(toastMessageReducer, []);
  const websocket = useRef();

  const modal = useMemo(() => {
    return {
      modalState,
      dispatch,
    };
  }, [modalState]);

  const userContextValue = useMemo(
    () => ({
      user,
      setUser,
      isLogin,
      setLogin,
    }),
    [isLogin, user, firstLogin, userLocal]
  );

  const toastMessageContextValue = useMemo(
    () => ({
      setToastMessages,
    }),
    []
  );

  useEffect(() => {
    const nav = navigator.geolocation;
    nav.getCurrentPosition((pos) => {
      if (pos) {
        const { latitude, longitude } = pos?.coords;
        setCurrentCoordinates({
          latitude,
          longitude,
        });
      }
    });
  }, []);


  useEffect(() => {
    websocket.current = new WebSocket(`${websocketEndPoint}/${user._id}`);
  }, [user]);

  return (
    <WebSocketContext.Provider value={websocket.current}>
       <ModalContext.Provider value={modal}> 
      <CoordinatesContext.Provider value={currentCoordinates}>
        <UserContext.Provider value={userContextValue}>
         {children}
         {modalState.isOpen && (
                  <div className="overlay">
                    <Modal>{modalState.renderModal()}</Modal>
                  </div>
                )}
        </UserContext.Provider>
      </CoordinatesContext.Provider>
       </ModalContext.Provider>
    </WebSocketContext.Provider>
  );
}

export default App;
