import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Keyboard from "./Keyboard";
import { initiateTransfer } from "@/services/transfer";

import { RecipientInterface } from "@/store/selectedRecipientStore";

import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/auth";
import Loading from "./Loading";
import { queryClient } from "@/lib/queryClient";
import Link from "next/link";

const AuthorizeTransaction = ({
  pin,
  handleKey,
  handleDelete,

  selectedRecipient,
  amount,
  reason,
  setStep,
  setTransactionResult,
}: {
  pin: string;
  handleKey: (key: string) => void;
  handleDelete: () => void;

  selectedRecipient: RecipientInterface | null;
  amount: number;
  reason: string;
  setStep: Dispatch<SetStateAction<number>>;
  setTransactionResult: Dispatch<SetStateAction<any>>;
}) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { data: me } = useQuery({
    queryKey: ["me"],
    queryFn: getUser,
  });

  useEffect(() => {
    if (pin.length !== 4) {
      return;
    }
    if (!selectedRecipient?.accountId) {
      return;
    }

    if (!me?.data?.accountId) {
      throw new Error("Account not found. Please try again.");
    }

    const run = async () => {
      try {
        setLoading(true);
        const transactionResult = await initiateTransfer({
          pin,
          fromAccountId: me.data.accountId,
          toAccountId: selectedRecipient.accountId,
          amount,
          reason,
        });

        setTransactionResult(transactionResult.data);

        queryClient.invalidateQueries({ queryKey: ["balance"] });
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
        queryClient.invalidateQueries({
          queryKey: ["recent-counterparties"],
        });

        setStep(5);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [pin, me, selectedRecipient, amount, reason]);

  if (loading) {
    return <Loading />;
  }
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
                className={`w-[48px] h-[54px] rounded-[10px] bg-white border flex items-center justify-center text-[22px] font-bold transition-all ${
                  isActive
                    ? "border-amber-500 ring-1 ring-amber-500"
                    : "border-neutral-200"
                }`}
              >
                {isFilled ? (
                  <span className="text-neutral-800 text-[20px] font-bold mt-1 select-none">
                    *
                  </span>
                ) : isActive ? (
                  <span className="w-[1.5px] h-[18px] bg-neutral-900 animate-blink select-none" />
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>

        <span className="h-10 mt-5 text-red-500 text-sm">{error}</span>

        {/* Forgot PIN Link */}
        <Link
          href="/account/reset-pin"
          className="text-[#D2B627] hover:underline cursor-pointer font-semibold text-[14px] mt-4 mx-auto block text-center bg-transparent border-none outline-none"
        >
          Forgot PIN?
        </Link>
      </div>

      {/* Fixed Keyboard */}
      <Keyboard onKey={handleKey} onDelete={handleDelete} digits={pin} />
    </div>
  );
};

export default AuthorizeTransaction;
