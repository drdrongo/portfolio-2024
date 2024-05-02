import { styled, keyframes } from "styled-components";

const satelliteAnimation = keyframes`
  0% { top: 200px; left: -10%; transform: rotate(0deg); }
  25% { top: 140px; left: 45%; transform: rotate(40deg); }
  50% { top: 140px; left: 100%; opacity: 1; transform: rotate(80deg); }
  51% { top: 120px; left: 100%; opacity: 0; }
  100% { opacity: 0; top: 200px; left: 0%; }
`;

export const Satellite = styled.img`
  height: 12px;
  width: 12px;
  position: absolute;
  left: -10%;
  z-index: 10;
  background-size: contain;
  animation-name: ${satelliteAnimation};
  animation-duration: 14s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-delay: 0.5s;
`;
