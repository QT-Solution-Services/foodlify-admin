import { ReactNode, createContext } from "react";
import { ToastContainer, toast } from "react-toastify";

export const ToastContext = createContext<{
  // eslint-disable-next-line
  showToast: (type: "success" | "error" | "warn", message: string) => void;
}>({
  showToast: () => null,
});

export default function ToastContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const showToast = (type: "success" | "error" | "warn", message: string) => {
    toast[type](message, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const value = { showToast };
  return (
    <>
      <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
      <ToastContainer draggable={true} />
    </>
  );
}
