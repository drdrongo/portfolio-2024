// import { DetailedHTMLProps, HTMLAttributes } from "react";
import { styled } from "styled-components";

interface StarProps {
  $top: number;
  $left: number;
  $big: boolean;
  opacity: 1 | 0;
}

const getStarStyle = (props: StarProps) => ({
  style: {
    top: `${props.$top}px`,
    left: `${props.$left}px`,
    opacity: props.opacity,
  },
});

export const Star = styled.div.attrs<StarProps>(getStarStyle)`
  width: ${(props) => (props.$big ? 2 : 1)}px;
  height: ${(props) => (props.$big ? 2 : 1)}px;
  position: absolute;
  background-color: #fff;
  box-shadow: 0 0 10px 3px rgba(255, 255, 255, 0.5);
  transition: opacity 1.5s;
`;
