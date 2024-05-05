import { styled, keyframes } from "styled-components";
import satellite from "/src/assets/satellite.png";

const satelliteAnimation = keyframes`
  0% { top: 200px; left: -5%; transform: rotate(0deg); }
  20% { top: 140px; left: 50%; transform: rotate(40deg); }
  40% { top: 140px; left: 100%; opacity: 1; transform: rotate(80deg); }
  41% { top: 120px; left: 100%; opacity: 0; }
  100% { opacity: 0; top: 200px; left: 0%; }
`;

const StyledSatellite = styled.img`
  height: 10px;
  width: 10px;
  position: absolute;
  left: -10%;
  z-index: 10;
  background-size: contain;
  animation-name: ${satelliteAnimation};
  animation-duration: 13s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-delay: 0.5s;
`;

export function Satellite() {
  return <StyledSatellite src={satellite} alt="Satellite" />;
}
