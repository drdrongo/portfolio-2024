import { useState } from "react";
import { styled } from "styled-components";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

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

const appearDuration = 500;
const transitionName = `example`;

const Container = styled.section`
  font-size: 1.5em;
  padding: 0;
  margin: 0;

  &.${transitionName}-appear {
    opacity: 0.01;
  }

  &.${transitionName}-appear-active {
    opacity: 1;
    transition: opacity ${appearDuration}ms ease-out;
  }
`;

export function Contact() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async () => {
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

  const [step, setStep] = useState<"name" | "email" | "message" | "success">(
    "name"
  );

  const nextItem = () => {
    if (step === "name") {
      setStep("email");
    } else if (step === "email") {
      setStep("name");
    } else if (step === "message") {
      setStep("success");
    }
  };

  const [displayed, setDisplayed] = useState<
    "name" | "email" | "message" | "success"
  >();

  return (
    <ContentContainer>
      <TextContent>
        <HeaderText>Contact</HeaderText>
        <ExplanationText>Contact me!</ExplanationText>

        <form>
          {displayed === "name" && (
            <CSSTransitionGroup
              transitionName={transitionName}
              transitionAppear={true}
              transitionAppearTimeout={appearDuration}
            >
              <Container>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Container>
            </CSSTransitionGroup>
          )}

          {displayed === "email" && (
            <>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="text"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </>
          )}

          {/* <label htmlFor="message">Message</label>
          <input
            id="message"
            type="text"
            name="message"
            onChange={(e) => setMessage(e.target.value)}
          /> */}

          <button type="button" onClick={nextItem}>
            Next
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={step !== "message" || message.length === 0}
          >
            Submit Your Message
          </button>
        </form>
      </TextContent>
    </ContentContainer>
  );
}
