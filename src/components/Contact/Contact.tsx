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
import { TypeAnimation } from "react-type-animation";
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
    // console.log({ response });
  };

  const advanceStep = async () => {
    if (step === "transitioning") return;

    const isValid = step === "success" || (await trigger(step));
    if (isValid) setStep("transitioning");
  };

  const name = watch("name");
  const email = watch("email");
  const message = watch("message");

  const stepRefName = useRef(null);
  const stepRefEmail = useRef(null);
  const stepRefMessage = useRef(null);

  const [complete, setComplete] = useState(false);

  const [sequence, setSequence] = useState(["Your Name"]);

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
        onExited={() => setStep("name")}
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
        onExited={() => setComplete(true)}
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
              <StepItem ref={stepRefName}>
                <FontAwesomeIcon icon={faUser} />{" "}
                <Typewriter text={step === "name" ? "Your Name" : name} />
              </StepItem>
            </CSSTransition>

            {/* STEP: Email */}
            <CSSTransition
              in={step !== "name" && step !== "transitioning"}
              nodeRef={stepRefEmail}
              {...baseTransitionProps}
            >
              <StepItem ref={stepRefEmail}>
                <FontAwesomeIcon icon={faEnvelope} />{" "}
                <Typewriter text={step === "email" ? "Your Email" : email} />
              </StepItem>
            </CSSTransition>

            {/* STEP: Message */}
            <CSSTransition
              in={
                step !== "name" && step !== "email" && step !== "transitioning"
              }
              nodeRef={stepRefMessage}
              {...baseTransitionProps}
            >
              <StepItem ref={stepRefMessage}>
                <FontAwesomeIcon icon={faPenNib} />{" "}
                <Typewriter
                  text={step === "message" ? "Your Message" : message}
                />
              </StepItem>
            </CSSTransition>
          </StepsContainer>

          {/* INPUT: name */}
          <CSSTransition
            in={step === "name"}
            onExited={() => setStep("email")}
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
            onExited={() => setStep("message")}
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
            onExited={() => setStep("success")}
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
