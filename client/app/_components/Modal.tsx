"use client";
import React from "react";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ onClose, children, className }) => {
  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-40"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-lg p-6 w-11/12 max-w-sm relative ${
          className || ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-2xl font-bold text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
