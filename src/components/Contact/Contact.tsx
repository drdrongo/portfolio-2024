import { ReactNode, useMemo, useRef, useState } from "react";
import { styled } from "styled-components";
import {
  SwitchTransition,
  Transition,
  TransitionStatus,
  CSSTransition,
} from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";

// TODO: Implement this: https://reactcommunity.org/react-transition-group/css-transition
const CONTENT_WIDTH = 840;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0 30px;
  width: ${CONTENT_WIDTH}px;
  flex-grow: 1;
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
  text-align: center;
  margin-bottom: 24px;
`;

const NextStepButton = styled.button`
  background-color: white;
  color: ${(props) => props.theme.colors.black};
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: stretch;
`;

const transitionDuration = 300;
const transitionName = `example`;

const MyForm = styled.form`
  height: 200px;
  width: 100%;
  border: 1px solid red;
  display: flex;
  flex-direction: column;
`;

const Container = styled.section`
  font-size: 1.5em;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  background-color: grey;
  padding: 2px 8px;
  gap: 8px;

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

const InputIcon = styled.span`
  font-size: 1.2rem;
`;

const Input = styled.input`
  all: unset;
  width: 100%;
  font-size: 1.2rem;
  padding: 4px 0;
`;

type Step = "transitioning" | "name" | "email" | "message" | "success";

export function Contact() {
  const [step, setStep] = useState<Step>("name");

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  const successRef = useRef(null);

  const completed = useState({
    name: "",
    email: "",
    message: "",
  });

  const {
    register,
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

  const message = watch("message");

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

  return (
    <ContentContainer>
      <TextContent>
        <HeaderText>Contact</HeaderText>
        <ExplanationText>Contact me!</ExplanationText>

        <FlexContainer>{step}</FlexContainer>
        <MyForm>
          <CSSTransition
            in={step === "name"}
            onExited={() => setStep("email")}
            classNames={transitionName}
            timeout={transitionDuration}
            unmountOnExit
            nodeRef={nameRef}
          >
            <Container ref={nameRef}>
              <FontAwesomeIcon fontSize="1.2rem" icon={faUser} />
              <Input
                id="name"
                type="text"
                placeholder="name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p>{errors.name.message}</p>}
            </Container>
          </CSSTransition>

          <CSSTransition
            in={step === "email"}
            onExited={() => setStep("message")}
            timeout={transitionDuration}
            classNames={transitionName}
            unmountOnExit
            nodeRef={emailRef}
          >
            <Container ref={emailRef}>
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
              {errors.email && <p>{errors.email.message}</p>}
            </Container>
          </CSSTransition>

          <CSSTransition
            in={step === "message"}
            onExited={() => setStep("success")}
            timeout={transitionDuration}
            classNames={transitionName}
            unmountOnExit
            nodeRef={messageRef}
          >
            <Container ref={messageRef}>
              <FontAwesomeIcon fontSize="1.2rem" icon={faUser} />
              <Input
                id="message"
                type="text"
                placeholder="message"
                {...register("message", { required: "Message is required" })}
              />
              {errors.message && <p>{errors.message.message}</p>}
            </Container>
          </CSSTransition>

          <CSSTransition
            in={step === "success"}
            onExited={() => setStep("name")}
            timeout={transitionDuration}
            classNames={transitionName}
            unmountOnExit
            nodeRef={successRef}
          >
            <Container ref={successRef}>
              <HeaderText>Thanks Chump!</HeaderText>
            </Container>
          </CSSTransition>

          <FlexContainer>
            <NextStepButton type="button" onClick={advanceStep}>
              Next
            </NextStepButton>

            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={step !== "message" || message.length === 0}
            >
              Submit Your Message
            </button>
          </FlexContainer>
        </MyForm>
      </TextContent>
    </ContentContainer>
  );
}
