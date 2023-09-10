import { useRouter } from "next/router";
import React, { useState } from "react";

function Modal({ children, onclose }: any) {
  const router = useRouter();
  onclose && router.push("/orders");

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center bg-slate-200/20 backdrop-blur-[3px]`}
    >
      {children}
    </div>
  );
}

export default Modal;
