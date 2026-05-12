import PhoneNumberInputForm from "@/components/custom/PhoneNumberInputForm";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div>
      <h1 className="font-semibold text-2xl mb-1">Welcome back</h1>
      <p className="mb-6">Enter your Cave phone number to continue</p>

      <PhoneNumberInputForm />

      <div className="flex items-center text-sm justify-center gap-1 mt-2">
        <p>Don&apos;t have a Cave Bank account?</p>
        <Link href="/auth/signup" className="font-semibold">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
