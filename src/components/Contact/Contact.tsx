import { useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPenNib,
} from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { Button } from "../Button";
import {
  ContentContainer,
  ErrorContainer,
  ErrorMessage,
  ExplanationText,
  FlexContainer,
  FontAwesomeIconStyled,
  HeaderText,
  Input,
  InputContainer,
  LoadingContainer,
  MyForm,
  StepItem,
  StepsContainer,
  SuccessContent,
  TRANSITION_DURATION,
  TRANSITION_NAME,
  TextArea,
  TextContent,
} from "./styles";
import Typewriter from "../Typewriter/Typewriter";
import useAutoSizeTextArea from "../../hooks/useAutoSizeTextArea";
import { LoadingSpinner } from "./LoadingSpinner";
import { VerticalSpacer } from "../VerticalSpacer/VerticalSpacer";

// async function mockFetchRequest(success: boolean): Promise<{ ok: boolean }> {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({ ok: success });
//     }, 1000);
//   });
// }

async function waitAsync() {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2500);
  });
}

type Step =
  | "transitioning"
  | "name"
  | "email"
  | "message"
  | "success"
  | "sending";

const baseTransitionProps = {
  timeout: TRANSITION_DURATION,
  classNames: TRANSITION_NAME,
  unmountOnExit: true,
};

export function Contact() {
  const [step, setStep] = useState<Step>("name");
  const [complete, setComplete] = useState(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  const successRef = useRef(null);
  const formRef = useRef(null);

  const stepRefName = useRef(null);
  const stepRefEmail = useRef(null);
  const stepRefMessage = useRef(null);
  const sendingRef = useRef(null);

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setFocus,
    trigger,
    watch,
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

  const name = watch("name");
  const email = watch("email");
  const message = watch("message");

  const sendEmail = () =>
    fetch("/send-mail", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "same-origin", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ name, email, message }), // body data type must match "Content-Type" header
    });

  const onSubmit = async () => {
    setComplete(true);
    changeStep("sending");
    const [response] = await Promise.all([sendEmail(), waitAsync()]);
    if (response.ok) {
      changeStep("success");
      reset();
    } else {
      console.log("not okay");
    }
  };

  const isValidName = name.length > 0;
  const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
    email
  );
  const isValidMessage = message.length > 0;

  // name | email | message
  const [completedStep, setCompletedStep] = useState<Step[]>([
    "name",
    "email",
    "message",
  ]);

  const nextStepRef = useRef<Step>("email");

  const nextSequenceStep = (
    {
      name: "email",
      email: "message",
      message: "success",
      transitioning: "transitioning",
      success: "name",
      sending: "sending",
    } satisfies Record<string, Step>
  )[step];

  const changeStep = async (nextStep: Step = nextSequenceStep) => {
    if (
      step !== nextStep &&
      step !== "transitioning" &&
      step !== "sending" &&
      step !== "success"
    ) {
      const isValid = await trigger(step);
      if (!isValid) return;

      setCompletedStep((prev) => Array.from(new Set([...prev, step])));
    }

    nextStepRef.current = nextStep;
    setStep("transitioning");
  };

  const handleInputExited = () => setStep(nextStepRef.current);

  // Textarea: Resizing correctly
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  useAutoSizeTextArea("message", textAreaRef.current, message);

  const { ref: textAreaRefFromLibrary, ...restMessage } = register("message", {
    required: "Message is required",
  });

  return (
    <ContentContainer data-aos="fade-up" data-aos-duration="1000">
      {/* LOADING */}
      <CSSTransition
        in={step === "sending"}
        nodeRef={sendingRef}
        onExited={() => setStep(nextStepRef.current)}
        {...baseTransitionProps}
      >
        <LoadingContainer ref={sendingRef}>
          <LoadingSpinner />
        </LoadingContainer>
      </CSSTransition>

      {/* SUCCESS MESSAGE */}
      <CSSTransition
        in={step === "success"}
        nodeRef={successRef}
        {...baseTransitionProps}
      >
        <SuccessContent ref={successRef}>
          <HeaderText>Thanks for Reaching Out!</HeaderText>
          <ExplanationText>
            I’m thrilled to hear from you and will get back to you ASAP.
          </ExplanationText>
          <ExplanationText>
            Thanks for being awesome, and I’ll talk to you soon!
          </ExplanationText>
          <VerticalSpacer height="2px" />
          <Button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Return to Top
          </Button>
        </SuccessContent>
      </CSSTransition>

      {/* FORM */}
      <CSSTransition
        in={!complete}
        onExited={() => setStep(nextStepRef.current)}
        nodeRef={formRef}
        {...baseTransitionProps}
      >
        <MyForm ref={formRef} onSubmit={(e) => e.preventDefault()}>
          <TextContent>
            <HeaderText>Contact</HeaderText>
            <ExplanationText>
              If you'd like to reach out for a project collaboration or just to
              say hello, please fill out the form below or send an email to
              hayatoclarke@gmail.com. Let's get in touch!
            </ExplanationText>
          </TextContent>

          {/* STEPS CONTAINER */}
          <StepsContainer>
            {/* STEP: Name */}
            <CSSTransition
              in={true}
              nodeRef={stepRefName}
              {...baseTransitionProps}
            >
              <StepItem ref={stepRefName} onClick={() => changeStep("name")}>
                <FontAwesomeIcon icon={faUser} />{" "}
                <Typewriter
                  initText="Your Name"
                  text={step === "name" ? "" : `${name}`}
                />
              </StepItem>
            </CSSTransition>

            {/* STEP: Email */}
            <CSSTransition
              in={completedStep.includes("name")}
              nodeRef={stepRefEmail}
              {...baseTransitionProps}
            >
              <StepItem ref={stepRefEmail} onClick={() => changeStep("email")}>
                <FontAwesomeIcon icon={faEnvelope} />{" "}
                <Typewriter
                  initText="Your Email"
                  text={step === "email" ? "" : `${email}`}
                />
              </StepItem>
            </CSSTransition>

            {/* STEP: Message */}
            <CSSTransition
              in={completedStep.includes("email")}
              nodeRef={stepRefMessage}
              {...baseTransitionProps}
            >
              <StepItem
                ref={stepRefMessage}
                onClick={() => changeStep("message")}
              >
                <FontAwesomeIcon icon={faPenNib} />{" "}
                <Typewriter
                  initText="Your Message"
                  text={step === "message" ? "" : `${message}`}
                />
              </StepItem>
            </CSSTransition>
          </StepsContainer>

          {/* INPUT: name */}
          <CSSTransition
            in={step === "name"}
            onExited={handleInputExited}
            onEnter={() => setFocus("name")}
            nodeRef={nameRef}
            {...baseTransitionProps}
          >
            <InputContainer ref={nameRef}>
              <FontAwesomeIconStyled fontSize="1.2rem" icon={faUser} />
              <Input
                id="name"
                type="text"
                placeholder="name"
                onKeyDown={(e) => e.key === "Enter" && changeStep()}
                {...register("name", { required: "Name is required" })}
              />
            </InputContainer>
          </CSSTransition>

          {/* INPUT: email */}
          <CSSTransition
            in={step === "email"}
            onExited={handleInputExited}
            onEnter={() => setFocus("email")}
            nodeRef={emailRef}
            {...baseTransitionProps}
          >
            <InputContainer ref={emailRef}>
              <FontAwesomeIconStyled fontSize="1.2rem" icon={faEnvelope} />
              <Input
                id="email"
                type="text"
                placeholder="email"
                onKeyDown={(e) => e.key === "Enter" && changeStep()}
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

          {/* INPUT: message */}
          <CSSTransition
            in={step === "message"}
            onExited={handleInputExited}
            onEnter={() => setFocus("message")}
            nodeRef={messageRef}
            {...baseTransitionProps}
          >
            <InputContainer ref={messageRef}>
              <FontAwesomeIconStyled fontSize="1.2rem" icon={faPenNib} />
              <TextArea
                id="message"
                placeholder="message"
                {...restMessage}
                ref={(e) => {
                  textAreaRefFromLibrary(e);
                  textAreaRef.current = e; // you can still assign to ref
                }}
              />
            </InputContainer>
          </CSSTransition>

          {/* ERRORS */}
          <ErrorContainer>
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
            {errors.message && (
              <ErrorMessage>{errors.message.message}</ErrorMessage>
            )}
          </ErrorContainer>

          {/* BUTTONS: [ NEXT ] [ SUBMIT ] */}
          <FlexContainer>
            <Button
              type="button"
              onClick={() => changeStep()}
              disabled={
                (step === "name" && !isValidName) ||
                (step === "email" && !isValidEmail) ||
                step === "message"
              }
            >
              Next
            </Button>

            <Button
              mainColor="rgb(0, 103, 97)"
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={!isValidName || !isValidEmail || !isValidMessage}
            >
              Submit Your Message
            </Button>
          </FlexContainer>
        </MyForm>
      </CSSTransition>
    </ContentContainer>
  );
}
