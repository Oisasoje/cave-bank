"use client";
import { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Button } from "../ui/button";

const PhoneNumberInputForm = () => {
  const [value, setValue] = useState<string | undefined>();
  const [error, setError] = useState();
  const errorStyle = {
    border: "1px solid red",
    borderRadius: "8px",
  };

  return (
    <form>
      <div className="mb-4">
        <PhoneInput
          placeholder="Enter phone number"
          value={value}
          onChange={setValue}
          style={error && errorStyle}
        />
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
      </div>

      <Button type="submit" size="lg" className="w-full">
        Continue
      </Button>
    </form>
  );
};

export default PhoneNumberInputForm;
