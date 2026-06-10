import { useEffect, useState } from "react";

const useDebounce = (input: string, delay = 500) => {
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
