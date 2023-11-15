import React from "react";
import { Children } from "react";

type ModalContextValue = {
  popup?: boolean;
  onClose?: () => void;
};

const ModalContext = React.createContext<ModalContextValue>({
  popup: false,
  onClose: () => undefined,
});

const ModalContextProvider = (
  props: ModalContextValue & { children: React.ReactNode }
) => {
  return (
    <ModalContext.Provider value={props}>
      {props.children}
    </ModalContext.Provider>
  );
};

const useModalContext = () => React.useContext(ModalContext);

export default ModalContextProvider;

export { ModalContext, useModalContext };
