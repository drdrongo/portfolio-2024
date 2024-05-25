import { ReactNode } from "react";
import { styled } from "styled-components";

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
  rgbValues?: string;
}>`
  position: relative;

  color: ${(props) => props.backgroundColor ?? props.theme.colors.white};

  border: 1px solid rgb(${(props) => props.rgbValues});

  background-color: ${(props) =>
    `rgb(${props.rgbValues})` ?? props.theme.colors.black};
  box-shadow: none;
  transition: box-shadow 0.3s, background-color 0.3s;
  &:hover {
    background-color: rgba(0, 0, 0, 0);
    box-shadow: 0px 0px 5px 5px rgba(${(props) => props.rgbValues}, 0.3);
    transition: box-shadow 0.3s, background-color 0.3s;
    border: 1px solid rgb(${(props) => props.rgbValues});
  }
`;

const InwardShadow = styled.div<{ rgbValues: string }>`
  position: absolute;
  inset: 0;

  box-shadow: none;
  transition: box-shadow 0.3s, background-color 0.3s;

  &:hover {
    box-shadow: inset 0px 0px 5px 5px rgba(${(props) => props.rgbValues}, 0.3);
    transition: box-shadow 0.3s, background-color 0.3s;
  }
`;

export const Button = ({
  mainColor = "rgb(0, 120, 255)",
  children,
  ...rest
}: ButtonProps) => {
  const rgbValues = mainColor.match(/\d+/g)?.join(", ") as string;

  return (
    <StyledButton {...rest} rgbValues={rgbValues}>
      <InwardShadow rgbValues={rgbValues} />
      {children}
    </StyledButton>
  );
};
