const StepsTrack = ({
  totalSteps,
  currentStep,
}: {
  totalSteps: number;
  currentStep: number;
}) => {
  return (
    <div className="flex items-center justify-between w-full gap-2">
      {[...Array(totalSteps)].map((_, index) => (
        // <p>something</p>
        <div
          key={index}
          className={`h-1 w-full rounded-full ${index < currentStep ? "bg-black" : "bg-gray-300"}`}
        />
      ))}
    </div>
  );
};

export default StepsTrack;
