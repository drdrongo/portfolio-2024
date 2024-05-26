import { ReactNode } from "react";
import { styled } from "styled-components";

import rgba from "color-rgba";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  mainColor?: string;
  children?: ReactNode;
}

const StyledButton = styled.button<{
  color?: string;
  backgroundColor?: string;
  $rgbValues?: string;
}>`
  position: relative;
  padding: 0.8em 1.6em;
  font-weight: bold;
  color: ${(props) => props.backgroundColor ?? props.theme.colors.white};

  border: 1px solid rgb(${(props) => props.$rgbValues});

  background-color: ${(props) =>
    `rgb(${props.$rgbValues})` ?? props.theme.colors.black};
  box-shadow: none;
  transition: box-shadow 0.3s, background-color 0.3s;
  &:hover {
    background-color: rgba(0, 0, 0, 0);
    box-shadow: 0px 0px 5px 5px rgba(${(props) => props.$rgbValues}, 0.3);
    transition: box-shadow 0.3s, background-color 0.3s;
    border: 1px solid rgb(${(props) => props.$rgbValues});
  }
`;

const InwardShadow = styled.div<{ $rgbValues: string }>`
  position: absolute;
  inset: 0;

  box-shadow: none;
  transition: box-shadow 0.3s, background-color 0.3s;

  &:hover {
    box-shadow: inset 0px 0px 5px 5px rgba(${(props) => props.$rgbValues}, 0.3);
    transition: box-shadow 0.3s, background-color 0.3s;
  }
`;

export const Button = ({
  mainColor = "rgb(0, 120, 255)",
  children,
  ...rest
}: ButtonProps) => {
  const [r, g, b] = rgba(mainColor) ?? [0, 120, 255];
  const rgbValues = [r, g, b].join(", ");

  return (
    <StyledButton {...rest} $rgbValues={rgbValues}>
      <InwardShadow $rgbValues={rgbValues} />
      {children}
    </StyledButton>
  );
};
