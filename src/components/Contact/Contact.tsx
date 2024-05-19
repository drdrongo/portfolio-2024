import { useState } from "react";
import { styled } from "styled-components";

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

export function Contact() {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [message, setMessage] = useState<string>();

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

  return (
    <ContentContainer>
      <TextContent>
        <HeaderText>Contact</HeaderText>
        <ExplanationText>Contact me!</ExplanationText>

        <form>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="message">Message</label>
          <input
            id="message"
            type="text"
            name="message"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="button" onClick={handleSubmit}>
            Send
          </button>
        </form>
      </TextContent>
    </ContentContainer>
  );
}
