"use client";

import { Button } from "@/components/ui/button";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const ChangePinForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    newPin: "",
    confirmNewPin: "",
  });

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    alert(JSON.stringify(formData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="new-pin"
          className="mb-2 text-sm font-medium text-foreground/60"
        >
          New PIN
        </label>
        <div className="relative">
          <input
            type={isPasswordVisible ? "text" : "password"}
            inputMode="numeric"
            id="new-pin"
            name="new-pin"
            className="w-full text-xl border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            placeholder="••••"
            onChange={(e) =>
              setFormData({ ...formData, newPin: e.target.value })
            }
          />
          <Button
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            type="button"
            variant="link"
            className="absolute right-3 top-1/2 -translate-y-1/2!"
            size="icon-lg"
          >
            {isPasswordVisible ? (
              <EyeClosed className="size-5" />
            ) : (
              <Eye className="size-5" />
            )}
          </Button>
        </div>
      </div>

      <div>
        <label
          htmlFor="confirm-new-pin"
          className="mb-2 text-sm font-medium text-foreground/60"
        >
          Confirm new PIN
        </label>
        <div className="relative">
          <input
            type={isPasswordVisible ? "text" : "password"}
            inputMode="numeric"
            id="confirm-new-pin"
            name="confirm-new-pin"
            className="w-full text-xl border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            placeholder="••••"
            onChange={(e) =>
              setFormData({ ...formData, confirmNewPin: e.target.value })
            }
          />
          <Button
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            type="button"
            variant="link"
            className="absolute right-3 top-1/2 -translate-y-1/2!"
            size="icon-lg"
          >
            {isPasswordVisible ? (
              <EyeClosed className="size-5" />
            ) : (
              <Eye className="size-5" />
            )}
          </Button>
        </div>
      </div>

      <div className="flex flex-col mt-8">
        <Button type="submit" className="w-full">
          Save new PIN
        </Button>
        <Button variant="link" asChild>
          <Link href="/dashboard">Cancel</Link>
        </Button>
      </div>
    </form>
  );
};

export default ChangePinForm;
