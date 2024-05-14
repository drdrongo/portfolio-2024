import { ThemeProvider } from "styled-components";
import { styled } from "styled-components";
import "./App.css";
import hayato from "./assets/hayato-shaped.png";
import blob from "./assets/blob.svg";

import { COLORS } from "./constants/theme";
import { useCallback, useEffect, useState } from "react";
import { useColorTransition } from "./utils/color-transition";
import { SwooshContainer } from "./components/SwooshContainer";
import { colorsHigh, colorsLow, colorsMid } from "./constants/hourlyColors";
import { MySkills } from "./components/MySkills";
import { Projects } from "./components/Projects";
import { Navbar } from "./components/Navbar";
import { Contact } from "./components/Contact";

const CONTENT_WIDTH = 840;

const theme = { colors: COLORS };

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  position: relative;
`;

const SectionContainer = styled.section<{
  $background?: string;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  /* min-height: 100vh; */
  background-color: ${(props) => props.$background ?? props.theme.colors.navy};
  position: relative;
  padding-top: 90px;
  padding-bottom: 40px;
`;

const TopSectionContainer = styled(SectionContainer)`
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  width: ${CONTENT_WIDTH}px;
  flex-grow: 1;
`;

const BlobContainer = styled.div`
  position: relative;
  height: 320px;
  width: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  position: absolute;
  inset: 0;
`;

const RotatedImage = styled(Image)`
  transform: rotate(-98deg) translateY(6px) translateX(-11px);
  position: absolute;
  inset: 0;
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;

const CtaButton = styled.button`
  background-color: white;
  color: ${(props) => props.theme.colors.black};
`;

const HeaderText = styled.h1`
  font-family: "poppins";
`;

const AbsoluteContainer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
`;

const ColorFade = styled.div<{ direction: "up" | "down" }>`
  top: 0;
  height: 200px;
  width: 100%;
  background: linear-gradient(
    ${(props) =>
      props.direction === "up"
        ? `${props.theme.colors.navy}, #000`
        : `#000, ${props.theme.colors.navy}`}
  );
`;

const INITIAL_HOUR = 17;

function App() {
  const {
    hex: currentHex1,
    startTransition: startTransition1,
    isCompletedRef: isCompletedRef1,
  } = useColorTransition(colorsHigh, INITIAL_HOUR);
  const {
    hex: currentHex2,
    startTransition: startTransition2,
    isCompletedRef: isCompletedRef2,
  } = useColorTransition(colorsMid, INITIAL_HOUR);
  const {
    hex: currentHex3,
    startTransition: startTransition3,
    isCompletedRef: isCompletedRef3,
  } = useColorTransition(colorsLow, INITIAL_HOUR);

  const [gradientColors, setGradientColors] = useState<string>(
    `linear-gradient(${currentHex1.current}, ${currentHex2.current}, ${currentHex3.current})`
  );

  const [currentHour, setCurrentHour] = useState<number>(INITIAL_HOUR);

  const startTransitions = useCallback(() => {
    startTransition1(currentHour);
    startTransition2(currentHour);
    startTransition3(currentHour);
  }, [currentHour, startTransition1, startTransition2, startTransition3]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (
        isCompletedRef1.current &&
        isCompletedRef2.current &&
        isCompletedRef3.current
      ) {
        setCurrentHour((prev) => (prev >= 23 ? 0 : prev + 1));
      }
    }, 1500);

    return () => clearInterval(intervalId);
  }, [
    currentHour,
    setCurrentHour,
    isCompletedRef1,
    isCompletedRef2,
    isCompletedRef3,
  ]);

  useEffect(() => {
    setGradientColors(
      `linear-gradient(${currentHex1.current}, ${currentHex2.current}, ${currentHex3.current})`
    );

    const colorChangeIntv = setInterval(() => {
      setGradientColors(
        `linear-gradient(${currentHex1.current}, ${currentHex2.current}, ${currentHex3.current})`
      );
    }, 20);

    startTransitions();

    const timeChangeIntv = setInterval(() => {
      if (
        isCompletedRef1.current &&
        isCompletedRef2.current &&
        isCompletedRef3.current
      ) {
        startTransitions();
      }
    }, 200);

    return () => {
      clearInterval(colorChangeIntv);
      clearInterval(timeChangeIntv);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentHour]);

  //I should have two navbars. The first is stuck to the top of the page.
  // The second should appear when the user has scrolled a certain amount.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <Navbar isNavbarVisible={isNavbarVisible} />
        <TopSectionContainer id="top">
          <SwooshContainer
            currentHour={currentHour}
            gradientColors={gradientColors}
          />

          <AbsoluteContainer>
            <ContentContainer>
              <TextContent>
                <HeaderText>Hayato Clarke</HeaderText>
                <p>
                  Looking forward to having great-looking websites?
                  <br />
                  Get in touch with this wiz-kid programmer.
                  <br />
                  He will make you a really great-looking website.
                </p>
                <CtaButton onClick={() => {}}>Get In Touch</CtaButton>
              </TextContent>

              <BlobContainer>
                <RotatedImage src={blob} alt="blob" />
                <Image src={hayato} alt="hayato" />
              </BlobContainer>
            </ContentContainer>
          </AbsoluteContainer>
        </TopSectionContainer>

        {/* My Skills */}
        <ColorFade direction="down" />

        <SectionContainer id="skills">
          {/* <ColorFade direction="down" /> */}
          <MySkills />
        </SectionContainer>

        {/* My Projects */}
        <ColorFade direction="up" />

        <SectionContainer $background="black" id="projects">
          {/* <ColorFade direction="up" /> */}
          <Projects />
        </SectionContainer>

        {/* Contact */}
        <ColorFade direction="down" />

        <SectionContainer id="contact">
          {/* <ColorFade direction="down" /> */}
          <Contact />
        </SectionContainer>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
