import { css, styled } from "styled-components";

export const CONTENT_WIDTH = 840;
export const TRANSITION_DURATION = 300;
export const TRANSITION_NAME = `fade`;

export const transitionStyles = () => css`
  &.${TRANSITION_NAME}-enter {
    opacity: 0;
  }
  &.${TRANSITION_NAME}-enter-active {
    opacity: 1;
    transition: opacity ${TRANSITION_DURATION}ms;
  }
  &.${TRANSITION_NAME}-enter-done {
    opacity: 1;
  }
  &.${TRANSITION_NAME}-exit {
    opacity: 1;
  }
  &.${TRANSITION_NAME}-exit-active {
    opacity: 0;
    transition: opacity ${TRANSITION_DURATION}ms;
  }
  &.${TRANSITION_NAME}-exit-done {
    opacity: 0;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0 30px;
  width: ${CONTENT_WIDTH}px;
  flex-grow: 1;
  min-height: 400px;
`;

export const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
  margin-bottom: 16px;
`;

export const HeaderText = styled.h1`
  font-family: "poppins";
`;

export const ExplanationText = styled.p`
  text-align: start;
`;

export const FlexContainer = styled.div`
  display: flex;
  align-items: stretch;
  gap: 8px;
`;

export const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  height: 24px;
  flex-shrink: 0;
`;

export const MyForm = styled.form`
  height: 200px;
  width: 100%;
  display: flex;
  flex-direction: column;

  ${transitionStyles}
`;

export const InputContainer = styled.section`
  font-size: 1.5em;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  gap: 16px;
  /* margin-bottom: 24px; */

  background-color: #2b305f;
  color: white;
  border-radius: 8px;

  border: 1px solid #2b305f;
  &:focus-within {
    border: 1px solid #3548f4;
  }

  ${transitionStyles}
`;

export const Input = styled.input`
  all: unset;
  width: 100%;
  font-size: 1.2rem;
  padding: 4px 0;
`;

export const ErrorMessage = styled.p`
  font-size: 0.9rem;
  color: #e83c3c;
`;

export const StepsContainer = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  width: 100%;
  gap: 8px;
  margin-bottom: 16px;
`;

export const StepItem = styled.div`
  height: 100%;
  background-color: grey;
  padding: 8px 16px;
  max-width: 260px;
  white-space: pre;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;

  ${transitionStyles}

  svg {
    margin-right: 4px;
  }
`;
