import ChangePinForm from "@/components/custom/auth/ChangePinForm";

const CreateNewPinPage = () => {
  return (
    <>
      <h1 className="font-semibold text-2xl mb-1">Create a new PIN</h1>
      <p className="mb-6">Choose a 4-digit PIN you'll use going forward</p>

      <ChangePinForm />
    </>
  );
};

export default CreateNewPinPage;
