import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
export function useDimensions() {
  const [dimensions, setDimensions] = useState(Dimensions.get("window"));
  const onChange = ({ window }) => {
    setDimensions(window);
  };
  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", onChange);
    return () => {
      if (
        typeof (subscription === null || subscription === void 0
          ? 0
          : subscription.remove) === "function"
      ) {
        subscription.remove();
      } 
    };
  }, []);
  return dimensions;
}
