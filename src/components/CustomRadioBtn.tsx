import React from "react";

interface Props {
  label?: string;
  align?: "left" | "right";
}

export const CustomRadioBtn: React.FC<Props> = ({ label, align = "left" }) => {
  return (
    <button
      className={`flex items-center gap-2 ${
        align === "right" ? "flex-row-reverse" : ""
      } focus:outline-none`}
    >
      <span className="w-4 h-4 border-2 border-[#DBDBDB] rounded-full flex items-center justify-center">
        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
      </span>

      {label && <span>{label}</span>}
    </button>
  );
};
