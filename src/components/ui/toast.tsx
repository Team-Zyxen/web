"use client";

import { useEffect } from "react";

export default function Toast({
  message,
  type = "success",
  onClose,
}: {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // auto close after 3 sec

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`
        fixed bottom-6 right-6 px-5 py-3 rounded-lg text-white shadow-lg
        animate-toast-slide
        ${type === "success" ? "bg-green-700" : "bg-red-600"}
      `}
    >
      {message}
    </div>
  );
}
