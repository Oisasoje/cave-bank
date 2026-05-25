"use client";

import { useState } from "react";
import Gateway from "./Gateway";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const SignupFormContainer = () => {
  const [currentStep, setCurrentStep] = useState(1);

  switch (currentStep) {
    case 0:
      return <Gateway setCurrentStep={setCurrentStep} />;
    case 1:
      return <Step1 setCurrentStep={setCurrentStep} />;
    case 2:
      return <Step2 setCurrentStep={setCurrentStep} />;
    case 3:
      return <Step3 setCurrentStep={setCurrentStep} />;
    default:
      break;
  }
};

export default SignupFormContainer;
