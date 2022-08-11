import React, { useEffect, useRef, useState, useContext } from "react";
import ToastContainer from "../toastContainer";

export const ToastContext = React.createContext({});

export const ToastProvider = ({ children, ...props }) => {
  const toastRef = useRef(null);
  const [refState, setRefState] = useState({});

  useEffect(() => {
    setRefState(toastRef.current);
  }, []);

  return (
    <ToastContext.Provider value={refState}>
      {children}
      <ToastContainer ref={toastRef} {...props} />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
