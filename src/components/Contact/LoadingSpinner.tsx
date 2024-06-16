import { styled, keyframes } from "styled-components";

// Keyframes for animations
const dash = keyframes`
  to {
    stroke-dashoffset: 136;
  }
`;

const SpinnerLoaderSvg = styled.div`
  position: relative;
  margin: 0 auto;
  width: 128px;
  text-align: center;

  svg {
    transform-origin: 50% 65%;
  }

  svg polygon {
    stroke-dasharray: 17;
    animation: ${dash} 2.5s cubic-bezier(0.35, 0.04, 0.63, 0.95) infinite;
  }
`;

// React component
export const LoadingSpinner = () => (
  <SpinnerLoaderSvg className="react-spinner-loader-svg">
    <svg width="128" height="128" viewBox="-3 -4 39 39">
      <polygon
        fill="transparent"
        stroke="cyan"
        strokeWidth="1"
        points="16,0 32,32 0,32"
      />
    </svg>
  </SpinnerLoaderSvg>
);
