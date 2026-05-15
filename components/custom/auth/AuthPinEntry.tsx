"use client";

import { useState } from "react";
import { CircleAlert, Eye, Lock } from "lucide-react";
import { Button } from "../../ui/button";
import Link from "next/link";

const AuthPinEntry = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState("");

  return (
    <form>
      <div className="relative">
        <Lock
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          size={18}
        />
        <input
          type={isPasswordVisible ? "text" : "password"}
          inputMode="numeric"
          className={`w-full text-xl border rounded-lg pl-12 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent ${error ? "border-red-500" : "border-gray-400"}`}
          placeholder="••••"
        />
        <Button
          onClick={() => setIsPasswordVisible((prev) => !prev)}
          type="button"
          variant="link"
          className="absolute right-3 top-1/2 -translate-y-1/2!"
          size="icon-lg"
        >
          <Eye className="size-5" />
        </Button>
      </div>

      {error && (
        <div className="mt-2 flex items-center gap-2 text-red-500">
          <CircleAlert size={16} />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="flex mt-2 items-center justify-end">
        <Link
          href="/auth/reset-pin"
          className="text-sm font-medium text-foreground"
        >
          Forgot PIN?
        </Link>
      </div>
    </form>
  );
};

export default AuthPinEntry;
