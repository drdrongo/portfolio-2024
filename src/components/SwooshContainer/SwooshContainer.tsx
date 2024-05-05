import { styled } from "styled-components";
import swoosh from "/src/assets/swoosh.svg";
import { useRef } from "react";
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

type NightSkyProps = {
  $background: string;
};

const getNightSkyBackgroundColor = (props: NightSkyProps) => ({
  style: { background: props.$background },
});

const NightSky = styled.div.attrs<NightSkyProps>(getNightSkyBackgroundColor)`
  width: 100%;
  height: 100%;
`;

export const SwooshContainer = ({
  gradientColors,
  currentHour,
}: {
  gradientColors: string;
  currentHour: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <StyledContainer>
      {(currentHour > 22 || currentHour <= 4) && <ShootingStar />}
      <Stars
        currentHour={currentHour}
        containerWidth={(containerRef.current?.clientWidth ?? 2000) + 1000}
      />
      <SwooshImage src={swoosh} alt="Swoosh" />

      <NightSky $background={gradientColors} />
    </StyledContainer>
  );
};
