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
  ToastMessageContext,
  WebSocketContext,
} from "@/utils/contexts";

import { modalReducer, toastMessageReducer } from "./utils/reducers";
import { Modal, ToastMessage, ToastMessageBox } from "./components";
import { Container } from "@mui/material";
import VerifyAuth from "./utils/hooks/verifyAuth";
import fetchIntercept from "fetch-intercept";
import refreshJwt from "./services/user/refershJwt";
import LogOut from "./services/user/LogOut";

//interceptor
const originalRequest = {};
const unregister = fetchIntercept.register({
  request: function (url, config) {
    originalRequest.url = url;
    originalRequest.config = config;
    return [url, config];
  },

  requestError: function (error) {
    // Called when an error occured during another 'request' interceptor call
    return Promise.reject(error);
  },

  response: function (response) {
    if (response.status == 469) {
      const { url, config } = originalRequest;
      refreshJwt().then((resp) => {
        return fetch(url, config);
      });
    } else if (response.status == 479) {
      localStorage.removeItem("user");
      LogOut();
    }
    return response;
  },

  responseError: function (error) {
    // Handle an fetch error
    return Promise.reject(error);
  },
});

const appInitState = {
  isOpen: false,
  isOverlay: false,
};
const sessionUser = {};

const websocketEndPoint = `ws://localhost:${process.env.REACT_APP_BACK_END_PORT}/notification`;

function App({ children }) {
  const { verifyData, firstLogin, userLocal } = VerifyAuth();

  const [modalState, dispatch] = useReducer(modalReducer, appInitState);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || userLocal
  );
  const [isLogin, setLogin] = useState(firstLogin);
  const updateData = useCallback(() => {
    setLogin(firstLogin);
    setUser(userLocal);
  }, [firstLogin, userLocal]);
  useEffect(() => {
    // websocket.current = new WebSocket(`${websocketEndPoint}/${user?._id}`);
    // console.log(user);
    // console.log(isLogin);
    // updateData();
  }, [user]);
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
    // console.log("rerender");
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

  return (
    <WebSocketContext.Provider value={websocket.current}>
      <ModalContext.Provider value={modal}>
        <CoordinatesContext.Provider value={currentCoordinates}>
          <UserContext.Provider value={userContextValue}>
            <ToastMessageContext.Provider value={toastMessageContextValue}>
              {children}
              {modalState.isOpen && (
                <div className="overlay">
                  <Modal>{modalState.renderModal()}</Modal>
                </div>
              )}
              <ToastMessageBox>
                {toastMessages.map(({ type, message }) => (
                  <ToastMessage type={type} message={message} />
                ))}
              </ToastMessageBox>
            </ToastMessageContext.Provider>
          </UserContext.Provider>
        </CoordinatesContext.Provider>
      </ModalContext.Provider>
    </WebSocketContext.Provider>
  );
}

export default App;
