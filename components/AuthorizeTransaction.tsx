import React from "react";
import Keyboard from "./Keyboard";

const AuthorizeTransaction = ({
  pin,
  handleKey,
  handleDelete,
  triggerToast,
}: {
  pin: string;
  handleKey: (key: string) => void;
  handleDelete: () => void;
  triggerToast: (message: string) => void;
}) => {
  return (
    <div className="animate-fade-in flex flex-col flex-1">
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-[280px]">
        <p className="text-neutral-500 font-medium text-[14px] text-center">
          Enter your transaction PIN
        </p>

        {/* PIN Digit Indicators */}
        <div className="flex justify-center gap-3.5 mt-6 mb-2">
          {[0, 1, 2, 3].map((idx) => {
            const isFilled = pin.length > idx;
            const isActive = pin.length === idx;
            return (
              <div
                key={idx}
                className={`w-[58px] h-[58px] rounded-[12px] bg-white border flex items-center justify-center text-[22px] font-bold transition-all ${
                  isActive
                    ? "border-[#D2B627] ring-1 ring-[#D2B627]"
                    : "border-neutral-200"
                }`}
              >
                {isFilled ? (
                  <span className="text-neutral-800 text-[20px] font-bold mt-1 select-none">
                    *
                  </span>
                ) : isActive ? (
                  <span className="text-neutral-600 font-light animate-blink select-none">
                    |
                  </span>
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>

        {/* Forgot PIN Link */}
        <button
          type="button"
          onClick={() => triggerToast("PIN reset flow requested")}
          className="text-[#D2B627] hover:underline cursor-pointer font-bold text-[14px] mt-8 mx-auto block text-center bg-transparent border-none outline-none"
        >
          Forgot PIN?
        </button>
      </div>

      {/* Fixed Keyboard */}
      <Keyboard onKey={handleKey} onDelete={handleDelete} />
    </div>
  );
};

export default AuthorizeTransaction;
