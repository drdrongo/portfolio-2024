import { useState, useEffect, useRef } from "react";

export const Typewriter = ({
  initText,
  text,
  delay = 65,
}: {
  initText: string;
  text: string;
  delay?: number;
}) => {
  const [currentText, setCurrentText] = useState(initText);

  const indexRef = useRef(initText.length - 1);

  const timeoutRef = useRef<NodeJS.Timeout>();

  const unTypeText = () => {
    if (indexRef.current >= 0) {
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
        if (indexRef.current >= 0) {
          unTypeText();
        } else {
          setTimeout(typeText, 350);
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
        if (indexRef.current < text.length) {
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

  return <span>{currentText}</span>;
};

export default Typewriter;
