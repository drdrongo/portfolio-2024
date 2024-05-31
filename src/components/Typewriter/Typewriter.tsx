import { useState, useEffect, useRef } from "react";
import { styled } from "styled-components";

const Text = styled.span`
  white-space: nowrap;
`;

function longestStartingSubstring(str1: string, str2: string) {
  let longestSubstring = "";

  for (let i = 1; i <= str1.length; i++) {
    let substring = str1.slice(0, i);
    if (str2.startsWith(substring)) {
      longestSubstring = substring;
    } else {
      break;
    }
  }

  return longestSubstring;
}

const MAX_LENGTH = 30;

export const Typewriter = ({
  initText,
  text,
  delay = 40,
}: {
  initText: string;
  text: string;
  delay?: number;
}) => {
  const [currentText, setCurrentText] = useState(initText);

  const indexRef = useRef(initText.length - 1);

  const timeoutRef = useRef<NodeJS.Timeout>();

  const unTypeText = () => {
    const endIndex = longestStartingSubstring(currentText, text).length;

    if (indexRef.current >= endIndex) {
      new Promise(
        (resolve) =>
          (timeoutRef.current = setTimeout(() => {
            setCurrentText((prevText) =>
              prevText.substring(0, prevText.length - 1)
            );

            indexRef.current = indexRef.current - 1;

            resolve(0);
          }, delay))
      ).then(() => {
        if (indexRef.current >= endIndex) {
          unTypeText();
        } else {
          setTimeout(typeText, 250);
        }
      });
    }
  };

  const typeText = () => {
    if (indexRef.current < text.length) {
      new Promise(
        (resolve) =>
          (timeoutRef.current = setTimeout(() => {
            // setCurrentText((prevText) => prevText + text[indexRef.current]);
            setCurrentText(text.substring(0, indexRef.current + 1));
            indexRef.current = indexRef.current + 1;
            resolve(0);
          }, delay))
      ).then(() => {
        if (indexRef.current < MAX_LENGTH && indexRef.current < text.length) {
          typeText();
        }
      });
    }
  };

  useEffect(() => {
    if (text === "") {
      return;
    }

    unTypeText();

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [text]);

  return <Text>{currentText}</Text>;
};

export default Typewriter;
