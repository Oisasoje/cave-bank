"use client";
import { Dispatch, SetStateAction } from "react";
import StepsTrack from "../../StepsTrack";

const Step1 = ({
  setCurrentStep,
}: {
  setCurrentStep: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <>
      <StepsTrack totalSteps={4} currentStep={1} />
    </>
  );
};

export default Step1;
