import { styled, keyframes } from "styled-components";

const shootingStarAnimation = keyframes`
  0% { top: -25%; right: 500px; }
  3% { opacity: 0; top: 100%; right: 0px; }
  85% { opacity: 0; }
  100% { opacity: 0; }
`;

export const ShootingStar = styled.div`
  position: absolute;
  right: 50%;
  top: -13.59%;
  width: 1px;
  height: 70px;
  background: #fff;
  transform: rotate(-25deg);

  animation-name: ${shootingStarAnimation};
  animation-duration: 10s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in;
  animation-delay: 2s;
`;
