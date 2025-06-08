// import React from "react";
import CarForm from "./CarForm";

export default function CarModal({ open, setOpen, defaultData }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full relative">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
          aria-label="Close modal"
        >
          ✕
        </button>
        <CarForm
          defaultData={defaultData}
          onSuccess={() => setOpen(false)}
        />
      </div>
    </div>
  );
}
