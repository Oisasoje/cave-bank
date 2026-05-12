"use client";

import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AuthPinReset = () => {
  const [pin, setPin] = useState("");
  return (
    <>
      <InputOTP
        maxLength={6}
        inputMode="numeric"
        onChange={(value) => setPin(value)}
      >
        <InputOTPGroup className="gap-1 w-full justify-between">
          <InputOTPSlot
            className="border-x rounded-lg bg-gray-100 size-12"
            index={0}
          />
          <InputOTPSlot
            className="border-x rounded-lg bg-gray-100 size-12"
            index={1}
          />
          <InputOTPSlot
            className="border-x rounded-lg bg-gray-100 size-12"
            index={2}
          />
          <InputOTPSlot
            className="border-x rounded-lg bg-gray-100 size-12"
            index={3}
          />
          <InputOTPSlot
            className="border-x rounded-lg bg-gray-100 size-12"
            index={4}
          />
          <InputOTPSlot
            className="border-x rounded-lg bg-gray-100 size-12"
            index={5}
          />
        </InputOTPGroup>
      </InputOTP>

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
