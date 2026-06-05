interface ProgressBarProps {
  currentStep: number;
  totalSteps?: number;
}

export default function ProgressBar({
  currentStep,
  totalSteps = 4,
}: ProgressBarProps) {
  return (
    <div className="flex gap-1.5 w-full">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div
          key={i}
          className={`h-[3px] flex-1 rounded-full ${
            i < currentStep ? "bg-black" : "bg-neutral-200"
          }`}
        />
      ))}
    </div>
  );
}
