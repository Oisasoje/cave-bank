import AuthPinEntry from "@/components/custom/auth/AuthPinEntry";
import Link from "next/link";

const EnterPinPage = () => {
  return (
    <>
      <h1 className="font-semibold text-2xl mb-1">Hello, Catherine!</h1>
      <p className="mb-6">Enter your PIN to log into your account</p>

      <AuthPinEntry />

      <div className="flex items-center text-sm justify-center gap-1 mt-8">
        <p>Not your account?</p>
        <Link href="/auth/login" className="font-semibold text-foreground">
          Change phone number
        </Link>
      </div>
    </>
  );
};

export default EnterPinPage;
