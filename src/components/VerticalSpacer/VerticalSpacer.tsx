import { styled } from "styled-components";

export const VerticalSpacer = styled.div<{ height: string }>`
  height: ${(props) => props.height || "8px"};
`;
