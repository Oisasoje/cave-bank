import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

export default function ConfettiAnimation() {
  const { width, height } = useWindowSize();

  return (
    <Confetti
      width={width}
      height={height}
      numberOfPieces={600}
      recycle={false}
      gravity={0.15}
      initialVelocityY={12}
      tweenDuration={6000}
      colors={["#D2B627", "#F5D94E", "#0E1719", "#ffffff", "#a89520"]}
    />
  );
}
