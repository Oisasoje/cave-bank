import { useEffect, useState } from "react";

const useDebounce = (input: string, delay = 300) => {
  const [debouncedValue, setDebounced] = useState(input);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebounced(input);
    }, delay);
    return () => clearTimeout(id);
  }, [input, delay]);
  return debouncedValue;
};
export default useDebounce;
