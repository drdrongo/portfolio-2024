import { styled } from "styled-components";
import swoosh from "/src/assets/swoosh.svg";
import { useEffect, useRef } from "react";
import { ShootingStar } from "../ShootingStar";
import { Stars } from "../Stars";

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

  useEffect(() => {
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
  }, [gradientColors]);

  return (
    <StyledContainer>
      {(currentHour > 22 || currentHour <= 4) && <ShootingStar />}
      <Stars
        currentHour={currentHour}
        containerWidth={(containerRef.current?.clientWidth ?? 2000) + 1000}
      />
      <SwooshImage src={swoosh} alt="Swoosh" />

      <NightSky
        // $background={gradientColors}
        ref={canvasRef}
      />
    </StyledContainer>
  );
};
