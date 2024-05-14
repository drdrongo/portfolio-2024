import { useRef } from "react";

type RGB = [number, number, number];

export type HourlyColors = [
  RGB,
  RGB,
  RGB,
  RGB,
  RGB,
  RGB,
  RGB,
  RGB,
  RGB,
  RGB,
  RGB,
  RGB,
  RGB,
  RGB,
  RGB,
  RGB,
  RGB,
  RGB,
  RGB,
  RGB,
  RGB,
  RGB,
  RGB,
  RGB
];

/* ==================== Setup ==================== */
// Duration is not what it says. It's a multiplier in the calculateIncrement() function.
// duration = 1-4, fast-to-slow

export const useColorTransition = (
  hourlyColors: HourlyColors,
  initialHour: number
) => {
  const fps = 30;
  const duration = 4;

  const isCompletedRef = useRef(false);
  const increment = useRef<RGB>(hourlyColors[initialHour]);
  const transHandler = useRef<number>();
  const currentColor = useRef(hourlyColors[initialHour]);
  const targetColor = useRef<RGB>(
    hourlyColors[initialHour + 1 > hourlyColors.length - 1 ? 0 : initialHour]
  );
  const currentHex = useRef<string>(rgb2hex(currentColor.current));

  // Calculates the distance between the RGB values.
  // We need to know the distance between two colors
  // so that we can calculate the increment values for R, G, and B.
  function calculateDistance(colorArray1: RGB, colorArray2: RGB): RGB {
    const distance: RGB = [0, 0, 0];
    for (let i = 0; i < 3; i++) {
      distance[i] = Math.abs(colorArray1[i] - colorArray2[i]);
    }
    return distance;
  }

  // Calculates the increment values for R, G, and B using distance, fps, and duration.
  // This calculation can be made in many different ways.
  function calculateIncrement(
    distanceArray: number[],
    fps = 30,
    duration = 1
  ): RGB {
    const tempIncrement: RGB = [0, 0, 0];
    for (let i = 0; i < distanceArray.length; i++) {
      let incr = Math.abs(Math.floor(distanceArray[i] / (fps * duration)));
      if (incr === 0) {
        incr = 1;
      }
      tempIncrement[i] = incr;
    }
    return tempIncrement;
  }

  // Converts RGB array [32,64,128] to HEX string #204080
  // It's easier to apply HEX color than RGB color.
  function rgb2hex(colorArray: RGB): string {
    const color = [];
    for (let i = 0; i < colorArray.length; i++) {
      let hex = colorArray[i].toString(16);
      if (hex.length < 2) {
        hex = "0" + hex;
      }
      color.push(hex);
    }
    return "#" + color.join("");
  }

  /* ==================== Transition Initiator ==================== */
  const startTransition = (currentHour: number) => {
    if (isCompletedRef.current) {
      isCompletedRef.current = false;
    }

    clearInterval(transHandler.current);

    targetColor.current = hourlyColors[currentHour];

    const distance = calculateDistance(
      currentColor.current,
      targetColor.current
    );

    increment.current = calculateIncrement(distance, fps, duration);
    transHandler.current = setInterval(transition, 1500 / fps);
  };

  const checkColor = (i: number) => {
    if (currentColor.current[i] > targetColor.current[i]) {
      currentColor.current[i] -= increment.current[i];
      if (currentColor.current[i] <= targetColor.current[i]) {
        increment.current[i] = 0;
      }
    } else {
      currentColor.current[i] += increment.current[i];
      if (currentColor.current[i] >= targetColor.current[i]) {
        increment.current[i] = 0;
      }
    }
  };

  /* ==================== Transition Calculator ==================== */
  const transition = () => {
    // checking R
    checkColor(0);

    // checking G
    checkColor(1);

    // checking B
    checkColor(2);

    // applying the new modified color
    currentHex.current = rgb2hex(currentColor.current);

    // transition ended. Determine if next one can be started
    if (
      increment.current[0] === 0 &&
      increment.current[1] === 0 &&
      increment.current[2] === 0
    ) {
      isCompletedRef.current = true;
    }
  };

  return {
    hex: currentHex,
    isCompletedRef,
    startTransition,
  };
};
