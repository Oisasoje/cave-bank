"use client";

import { useState } from "react";
import { Eye, Lock } from "lucide-react";
import { Button } from "../../ui/button";
import Link from "next/link";

const AuthPinEntry = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <form>
      <div className="relative">
        <Lock
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          size={18}
        />
        <input
          type={passwordVisible ? "text" : "password"}
          className="w-full text-xl border border-gray-400 rounded-lg pl-12 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          placeholder="••••"
        />
        <Button
          onClick={() => setPasswordVisible((prev) => !prev)}
          type="button"
          variant="link"
          className="absolute right-3 top-1/2 -translate-y-1/2!"
          size="icon-lg"
        >
          <Eye className="size-5" />
        </Button>
      </div>

      <div className="flex items-center justify-end">
        <Link
          href="/auth/reset-pin"
          className="text-sm font-medium mt-2 text-foreground"
        >
          Forgot PIN?
        </Link>
      </div>
    </form>
  );
};

export default AuthPinEntry;
