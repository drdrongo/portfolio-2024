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
  HeaderText,
  Input,
  InputContainer,
  MyForm,
  StepItem,
  StepsContainer,
  TRANSITION_DURATION,
  TRANSITION_NAME,
  TextContent,
} from "./styles";
import Typewriter from "../Typewriter/Typewriter";

type Step = "transitioning" | "name" | "email" | "message" | "success";

const baseTransitionProps = {
  timeout: TRANSITION_DURATION,
  classNames: TRANSITION_NAME,
  unmountOnExit: true,
};

export function Contact() {
  const [step, setStep] = useState<Step>("name");

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  const successRef = useRef(null);
  const formRef = useRef(null);

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
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
  };

  const name = watch("name");
  const email = watch("email");
  const message = watch("message");

  const stepRefName = useRef(null);
  const stepRefEmail = useRef(null);
  const stepRefMessage = useRef(null);

  const [complete, setComplete] = useState(false);

  // name | email | message
  const [completedStep, setCompletedStep] = useState<Step[]>([]);

  const nextStepRef = useRef<Step>("email");

  const nextSequenceStep = (
    {
      name: "email",
      email: "message",
      message: "success",
      transitioning: "transitioning",
      success: "name",
    } satisfies Record<string, Step>
  )[step];

  const changeStep = async (nextStep: Step) => {
    if (step === nextStep || step === "transitioning" || step === "success")
      return;

    const isValid = await trigger(step);
    if (!isValid) return;

    setCompletedStep((prev) => Array.from(new Set([...prev, step])));
    nextStepRef.current = nextStep;
    setStep("transitioning");
  };

  const handleInputExited = () => setStep(nextStepRef.current);

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

      {/* SUCCESS MESSAGE */}
      <CSSTransition
        in={complete}
        nodeRef={successRef}
        {...baseTransitionProps}
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

      {/* FORM */}
      <CSSTransition
        in={step !== "success"}
        nodeRef={formRef}
        {...baseTransitionProps}
      >
        <MyForm ref={formRef}>
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
            nodeRef={nameRef}
            {...baseTransitionProps}
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

          {/* INPUT: email */}
          <CSSTransition
            in={step === "email"}
            onExited={handleInputExited}
            nodeRef={emailRef}
            {...baseTransitionProps}
          >
            <InputContainer ref={emailRef}>
              <FontAwesomeIcon fontSize="1.2rem" icon={faEnvelope} />
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

          {/* INPUT: message */}
          <CSSTransition
            in={step === "message"}
            onExited={handleInputExited}
            nodeRef={messageRef}
            {...baseTransitionProps}
          >
            <InputContainer ref={messageRef}>
              <FontAwesomeIcon fontSize="1.2rem" icon={faPenNib} />
              <Input
                id="message"
                type="text"
                placeholder="message"
                {...register("message", { required: "Message is required" })}
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
            <Button type="button" onClick={() => changeStep(nextSequenceStep)}>
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
