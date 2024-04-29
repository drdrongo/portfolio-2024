import { useEffect, useRef, useState } from "react";

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

export const useColorTransition = (hourlyColors: HourlyColors) => {
  const fps = 30;
  const duration = 3;
  const isCompletedRef = useRef(false);
  const currentHourRef = useRef(0);

  const increment = useRef([0, 0, 0]);
  const transHandler = useRef<number>();

  const currentColor = useRef(hourlyColors[currentHourRef.current]); // TODO: Should be current element's BG color.
  const targetColor = useRef<RGB>(hourlyColors[currentHourRef.current + 1]);

  const currentHex = useRef<string>(rgb2hex(currentColor.current));

  useEffect(() => {
    startTransition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  ): number[] {
    const tempIncrement = [];
    for (let i = 0; i < distanceArray.length; i++) {
      let incr = Math.abs(Math.floor(distanceArray[i] / (fps * duration)));
      if (incr === 0) {
        incr = 1;
      }
      tempIncrement.push(incr);
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
  const startTransition = () => {
    console.log("inside startTransition!!!");
    // clearInterval(transHandler.current);

    // targetColor.current = generateRGB();
    targetColor.current = hourlyColors[currentHourRef.current];
    console.log("targetColor.current", targetColor.current);
    const distance = calculateDistance(
      currentColor.current,
      targetColor.current
    );
    increment.current = calculateIncrement(distance, fps, duration);

    // transHandler.current = setInterval(transition, 1000 / fps);
    transHandler.current = setInterval(transition, 500);
  };

  const timerRef = useRef<number>();

  useEffect(() => {
    // Increment the number every second.
    // The transition function will only continue into the next iteration once the number is incremented.
    // The number will also only transition if the color transition is completed.

    const doTimeoutStuff = () => {
      console.log("inside doTimeoutStuff");
      if (isCompletedRef.current) {
        console.log("inside doTimeoutStuff - isCompleted");

        isCompletedRef.current = false;

        currentHourRef.current =
          currentHourRef.current >= hourlyColors.length
            ? 0
            : currentHourRef.current + 1;

        startTransition();
      }
      clearTimeout(timerRef.current); // Is this necessary?
      timerRef.current = setTimeout(doTimeoutStuff, 1000);
    };

    doTimeoutStuff();
    return clearTimeout(timerRef.current);
  }, []);

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
    console.log("currentColor.current", currentColor.current);
    // checking R
    checkColor(0);

    // checking G
    checkColor(1);

    // checking B
    checkColor(2);

    // applying the new modified color
    currentHex.current = rgb2hex(currentColor.current);

    // transition ended. start a new one
    if (
      increment.current[0] === 0 &&
      increment.current[1] === 0 &&
      increment.current[2] === 0
    ) {
      isCompletedRef.current = true;

      console.log("is Completed");
      // Iterates or resets to 0 when reaching end
      console.log("currentHour", currentHourRef.current);
      // startTransition();
      // Here, we should pass in the next color that we wanna use.
    }
  };

  return currentHex;
};
