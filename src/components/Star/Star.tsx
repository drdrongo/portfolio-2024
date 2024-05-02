import { styled } from "styled-components";

export const Star = styled.div<{
  $top: number;
  $left: number;
  $big: boolean;
  opacity: 1 | 0;
}>`
  position: absolute;
  top: ${(props) => props.$top}px;
  left: ${(props) => props.$left}px;
  width: ${(props) => (props.$big ? 2 : 1)}px;
  height: ${(props) => (props.$big ? 2 : 1)}px;
  background-color: #fff;
  box-shadow: 0 0 10px 3px rgba(255, 255, 255, 0.5);
  opacity: ${(props) => props.opacity};
  transition: opacity 1.5s;
`;
