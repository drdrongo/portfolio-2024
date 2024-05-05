import { useMemo } from "react";
import { createStarCoords } from "./createStarCoords";
import { Star } from "./Star";

export function Stars({
  currentHour,
  containerWidth,
}: {
  currentHour: number;
  containerWidth: number;
}) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const starCoords = useMemo(() => createStarCoords(containerWidth), []);

  return (
    <>
      {starCoords.map(({ left, top, big, fadeInHour, fadeOutHour }, index) => {
        return (
          <Star
            key={index}
            opacity={
              currentHour >= fadeInHour || currentHour <= fadeOutHour ? 1 : 0
            }
            $big={big}
            $left={left}
            $top={top}
          />
        );
      })}
    </>
  );
}
