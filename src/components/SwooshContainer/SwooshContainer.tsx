import { styled } from "styled-components";
import swoosh from "/src/assets/swoosh.svg";
import { useLayoutEffect, useMemo, useRef } from "react";
import { ShootingStar } from "../ShootingStar";
import { createStars } from "../../utils/stars";

const StyledContainer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 9;
  overflow: hidden;
`;

const SwooshImage = styled.img`
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 11;
`;

const NightSky = styled.canvas`
  width: 100%;
  height: 100%;
`;

export const SwooshContainer = ({
  gradientColors,
  currentHour,
}: {
  gradientColors: [string, string, string];
  currentHour: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const containerWidth = containerRef.current?.clientWidth ?? 1000;
  const containerHeight = containerRef.current?.clientHeight ?? 1000;

  const stars = useMemo(
    () => createStars(containerWidth, containerHeight),
    [containerWidth, containerHeight]
  );

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Define the gradient
    const gradient = ctx.createLinearGradient(0, 0, 25, canvas.height);
    gradient.addColorStop(0, gradientColors[0]);
    gradient.addColorStop(0.6, gradientColors[1]);
    gradient.addColorStop(1, gradientColors[2]);

    // Apply the gradient to the canvas context
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach((star) => {
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
      ctx.fillRect(star.x, star.y, star.size, star.size);

      const shouldFadeIn =
        currentHour >= star.fadeInHour || currentHour <= star.fadeOutHour
          ? 1
          : 0;

      if (shouldFadeIn && star.opacity < 1) {
        star.opacity += 0.01; // Increase opacity gradually
      } else if (star.opacity > 0) {
        star.opacity -= 0.01; // Decrease opacity gradually
      }
    });
  }, [gradientColors, JSON.stringify(stars)]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const cs = getComputedStyle(container);

    /// these will return dimensions in *pixel* regardless of what
    /// you originally specified for image:
    const width = parseInt(cs.getPropertyValue("width"), 10);
    const height = parseInt(cs.getPropertyValue("height"), 10);

    /// now use this as width and height for your canvas element:
    canvas.width = width;
    canvas.height = height;
  }, []);

  return (
    <StyledContainer ref={containerRef}>
      {(currentHour > 22 || currentHour <= 4) && <ShootingStar />}
      <SwooshImage src={swoosh} alt="Swoosh" />

      <NightSky ref={canvasRef} />
    </StyledContainer>
  );
};
