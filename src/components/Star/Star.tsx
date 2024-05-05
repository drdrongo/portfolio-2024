// import { DetailedHTMLProps, HTMLAttributes } from "react";
import { styled } from "styled-components";

interface StarProps {
  $top: number;
  $left: number;
  $big: boolean;
  opacity: 1 | 0;
}

const MyColorBackgroundAttribute = (props: StarProps) => ({
  $top: props.$top,
  $left: props.$left,
  $big: props.$big,
  opacity: props.opacity,
});

export const Star = styled.div.attrs<StarProps>(MyColorBackgroundAttribute)`
  width: ${(props) => (props.$big ? 2 : 1)}px;
  height: ${(props) => (props.$big ? 2 : 1)}px;

  position: absolute;
  background-color: #fff;
  box-shadow: 0 0 10px 3px rgba(255, 255, 255, 0.5);
  transition: opacity 1.5s;

  /* Apply styles using props received from the attributes function */
  top: ${(props) => `${props.$top}px`};
  left: ${(props) => `${props.$left}px`};
  opacity: ${(props) => props.opacity};
`;
