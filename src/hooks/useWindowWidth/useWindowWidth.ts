import { useState, useEffect } from "react";

import { getWidth } from "./utils";
import { Width } from "../../constants/constants";

function useWindowWidth() {
  const [width, setWidth] = useState<Width>(() => getWidth(window.innerWidth));

  useEffect(() => {
    function updateWidth() {
      setWidth(getWidth(window.innerWidth));
    }

    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return width;
}

export default useWindowWidth;
