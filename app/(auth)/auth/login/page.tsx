import PhoneNumberInputForm from "@/components/custom/auth/PhoneNumberInputForm";
import Link from "next/link";

const LoginPage = () => {
  return (
    <>
      <h1 className="font-semibold text-2xl mb-1">Welcome back</h1>
      <p className="mb-6">Enter your Cave phone number to continue</p>

      <PhoneNumberInputForm />

      <div className="flex items-center text-sm justify-center gap-1 mt-2">
        <p>Don&apos;t have a Cave Bank account?</p>
        <Link href="/auth/signup" className="font-semibold text-foreground">
          Sign up
        </Link>
      </div>
    </>
  );
};

export default LoginPage;
