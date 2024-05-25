import { ReactNode, useMemo, useRef, useState } from "react";
import { css, styled } from "styled-components";
import {
  SwitchTransition,
  Transition,
  TransitionStatus,
  CSSTransition,
} from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPenNib,
} from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { Button } from "../Button";

// TODO: Implement this: https://reactcommunity.org/react-transition-group/css-transition
const CONTENT_WIDTH = 840;
const transitionDuration = 300;
const transitionName = `example`;

const transitionStyles = () => css`
  &.${transitionName}-enter {
    opacity: 0;
  }
  &.${transitionName}-enter-active {
    opacity: 1;
    transition: opacity ${transitionDuration}ms;
  }
  &.${transitionName}-enter-done {
    opacity: 1;
  }
  &.${transitionName}-exit {
    opacity: 1;
  }
  &.${transitionName}-exit-active {
    opacity: 0;
    transition: opacity ${transitionDuration}ms;
  }
  &.${transitionName}-exit-done {
    opacity: 0;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0 30px;
  width: ${CONTENT_WIDTH}px;
  flex-grow: 1;
  min-height: 400px;
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

const HeaderText = styled.h1`
  font-family: "poppins";
`;

const ExplanationText = styled.p`
  text-align: start;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: stretch;
  gap: 8px;
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  height: 24px;
`;

const MyForm = styled.form`
  height: 200px;
  width: 100%;
  display: flex;
  flex-direction: column;

  ${transitionStyles}
`;

const InputContainer = styled.section`
  font-size: 1.5em;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  gap: 16px;
  margin-bottom: 24px;

  background-color: #2b305f;
  color: white;
  border-radius: 8px;

  border: 1px solid #2b305f;
  &:focus-within {
    border: 1px solid #3548f4;
  }

  ${transitionStyles}
`;

const Input = styled.input`
  all: unset;
  width: 100%;
  font-size: 1.2rem;
  padding: 4px 0;
`;

const ErrorMessage = styled.p`
  font-size: 0.9rem;
  color: #e83c3c;
`;

const StepsContainer = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  width: 100%;
  gap: 8px;
`;

const StepItem = styled.div`
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

type Step = "transitioning" | "name" | "email" | "message" | "success";

export function Contact() {
  const [step, setStep] = useState<Step>("name");

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  const successRef = useRef(null);
  const formRef = useRef(null);

  const completed = useState({
    name: "",
    email: "",
    message: "",
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm<{
    name: string;
    email: string;
    message: string;
  }>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async ({
    name,
    email,
    message,
  }: {
    name: string;
    email: string;
    message: string;
  }) => {
    const url = "/send-mail";
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "same-origin", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ name, email, message }), // body data type must match "Content-Type" header
    });
    console.log({ response });
  };

  const advanceStep = async () =>
    // stepName: "name" | "email" | "message" | "success"
    {
      if (step === "transitioning") return;

      const isValid = step === "success" || (await trigger(step));
      if (!isValid) {
        console.log(`INVALID ${step}`);
        // setStep(step);
        return;
      }
      setStep("transitioning");
    };

  const name = watch("name");
  const email = watch("email");
  const message = watch("message");

  const stepRefName = useRef(null);
  const stepRefEmail = useRef(null);
  const stepRefMessage = useRef(null);

  const [complete, setComplete] = useState(false);

  return (
    <ContentContainer>
      <TextContent>
        <HeaderText>Contact</HeaderText>
        <ExplanationText>
          If you'd like to reach out for a project collaboration or just to say
          hello, please fill out the form below or send an email to
          hayatoclarke@gmail.com. Let's get in touch!
        </ExplanationText>
      </TextContent>

      <CSSTransition
        in={complete}
        onExited={() => setStep("name")}
        timeout={transitionDuration}
        classNames={transitionName}
        unmountOnExit
        nodeRef={successRef}
      >
        <InputContainer ref={successRef}>
          <p>Thanks Chump!</p>
          <Button
            onClick={() => {
              reset();
              setComplete(false);
            }}
          >
            Send Another?
          </Button>
        </InputContainer>
      </CSSTransition>

      <CSSTransition
        in={step !== "success"}
        onExited={() => setComplete(true)}
        timeout={transitionDuration}
        classNames={transitionName}
        unmountOnExit
        nodeRef={formRef}
      >
        <MyForm ref={formRef}>
          <StepsContainer>
            {/* Step Name */}
            <CSSTransition
              in={step !== "name" && !!name}
              onExited={() => setComplete(true)}
              timeout={transitionDuration}
              classNames={transitionName}
              unmountOnExit
              nodeRef={stepRefName}
            >
              <StepItem ref={stepRefName}>
                <FontAwesomeIcon icon={faUser} /> {name}
              </StepItem>
            </CSSTransition>

            {/* Step Email */}
            <CSSTransition
              in={step !== "email" && !!email}
              onExited={() => setComplete(true)}
              timeout={transitionDuration}
              classNames={transitionName}
              unmountOnExit
              nodeRef={stepRefEmail}
            >
              <StepItem ref={stepRefEmail}>
                <FontAwesomeIcon icon={faEnvelope} /> {email}
              </StepItem>
            </CSSTransition>

            {/* Step Message */}
            <CSSTransition
              in={step !== "message" && !!message}
              onExited={() => setComplete(true)}
              timeout={transitionDuration}
              classNames={transitionName}
              unmountOnExit
              nodeRef={stepRefMessage}
            >
              <StepItem ref={stepRefMessage}>
                <FontAwesomeIcon icon={faPenNib} /> {message}
              </StepItem>
            </CSSTransition>
          </StepsContainer>

          <ErrorContainer>
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
            {errors.message && (
              <ErrorMessage>{errors.message.message}</ErrorMessage>
            )}
          </ErrorContainer>
          <CSSTransition
            in={step === "name"}
            onExited={() => setStep("email")}
            classNames={transitionName}
            timeout={transitionDuration}
            unmountOnExit
            nodeRef={nameRef}
          >
            <InputContainer ref={nameRef}>
              <FontAwesomeIcon fontSize="1.2rem" icon={faUser} />
              <Input
                id="name"
                type="text"
                placeholder="name"
                {...register("name", { required: "Name is required" })}
              />
            </InputContainer>
          </CSSTransition>

          <CSSTransition
            in={step === "email"}
            onExited={() => setStep("message")}
            timeout={transitionDuration}
            classNames={transitionName}
            unmountOnExit
            nodeRef={emailRef}
          >
            <InputContainer ref={emailRef}>
              <FontAwesomeIcon fontSize="1.2rem" icon={faUser} />
              <Input
                id="email"
                type="text"
                placeholder="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
              />
            </InputContainer>
          </CSSTransition>

          <CSSTransition
            in={step === "message"}
            onExited={() => setStep("success")}
            timeout={transitionDuration}
            classNames={transitionName}
            unmountOnExit
            nodeRef={messageRef}
          >
            <InputContainer ref={messageRef}>
              <FontAwesomeIcon fontSize="1.2rem" icon={faUser} />
              <Input
                id="message"
                type="text"
                placeholder="message"
                {...register("message", {
                  required: "Message is required",
                })}
              />
            </InputContainer>
          </CSSTransition>

          <FlexContainer>
            <Button type="button" onClick={advanceStep}>
              Next
            </Button>

            <Button
              mainColor="rgb(0, 103, 97)"
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={step !== "message" || message.length === 0}
            >
              Submit Your Message
            </Button>
          </FlexContainer>
        </MyForm>
      </CSSTransition>
    </ContentContainer>
  );
}
