import AuthPinReset from "@/components/custom/auth/AuthPinReset";

const ResetPinPage = () => {
  return (
    <>
      <h1 className="font-semibold text-2xl mb-1">Reset your PIN</h1>
      <p className="mb-6">
        Enter the code we sent to
        <br />
        <span className="font-semibold text-foreground">
          *************ulo@gmail.com
        </span>
      </p>
      <AuthPinReset />
    </>
  );
};

export default ResetPinPage;
