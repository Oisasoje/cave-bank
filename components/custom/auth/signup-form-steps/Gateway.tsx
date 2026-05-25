import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

const Gateway = ({
  setCurrentStep,
}: {
  setCurrentStep: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div className="text-center flex flex-col items-center justify-end h-[90dvh] gap-56">
      <div>
        <h1 className="text-3xl leading-none font-bold mb-4">
          Simple. Secure.
          <br />
          Built For The Cave.
        </h1>
        <p className="text-foreground/80">
          Manage your Cave Coins with ease. Transfer funds, receive rewards, and
          stay connected to the ecosystem from one secure wallet.
        </p>
      </div>
      <div className="flex flex-col gap-2 w-full justify-self-end">
        <Button onClick={() => setCurrentStep(1)}>Get Started</Button>
        <Button variant="outline" asChild>
          <Link href="/auth/login">Login</Link>
        </Button>
      </div>
    </div>
  );
};

export default Gateway;
