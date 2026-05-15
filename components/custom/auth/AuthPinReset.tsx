"use client";

import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CircleAlert } from "lucide-react";

const AuthPinReset = () => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  return (
    <>
      <InputOTP
        maxLength={6}
        inputMode="numeric"
        onChange={(value) => setPin(value)}
      >
        <InputOTPGroup className="gap-1 w-full justify-between">
          <InputOTPSlot
            className={`border-x rounded-lg bg-gray-100 size-12 ${error && "border-destructive/30 bg-destructive/10"}`}
            index={0}
          />
          <InputOTPSlot
            className={`border-x rounded-lg bg-gray-100 size-12 ${error && "border-destructive/30 bg-destructive/10"}`}
            index={1}
          />
          <InputOTPSlot
            className={`border-x rounded-lg bg-gray-100 size-12 ${error && "border-destructive/30 bg-destructive/10"}`}
            index={2}
          />
          <InputOTPSlot
            className={`border-x rounded-lg bg-gray-100 size-12 ${error && "border-destructive/30 bg-destructive/10"}`}
            index={3}
          />
          <InputOTPSlot
            className={`border-x rounded-lg bg-gray-100 size-12 ${error && "border-destructive/30 bg-destructive/10"}`}
            index={4}
          />
          <InputOTPSlot
            className={`border-x rounded-lg bg-gray-100 size-12 ${error && "border-destructive/30 bg-destructive/10"}`}
            index={5}
          />
        </InputOTPGroup>
      </InputOTP>

      {error && (
        <div className="mt-2 flex items-center gap-2 text-red-500">
          <CircleAlert size={16} />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="mt-8 flex flex-col items-center">
        <Button variant="link" className="p-0">
          Resend Code
        </Button>
        <Button asChild variant="link" className="p-0 text-foreground/60">
          <Link href="/auth/login">Cancel</Link>
        </Button>
      </div>
    </>
  );
};

export default AuthPinReset;
