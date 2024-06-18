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
import { Button } from "./components/Button";
import { scrollTo } from "./utils/tools";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  AppContainer,
  SectionContainer,
  TopSectionContainer,
  ContentContainer,
  BlobContainer,
  Image,
  RotatedImage,
  TextContent,
  HeaderText,
  AbsoluteContainer,
  ColorFade,
} from "./styles";

const theme = { colors: COLORS };

const INITIAL_HOUR = 18;

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

  useEffect(() => {
    AOS.init();
  }, []);

  const [gradientColors, setGradientColors] = useState<
    [string, string, string]
  >([currentHex1.current, currentHex2.current, currentHex3.current]);

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
    setGradientColors([
      currentHex1.current,
      currentHex2.current,
      currentHex3.current,
    ]);

    const colorChangeIntv = setInterval(() => {
      setGradientColors([
        currentHex1.current,
        currentHex2.current,
        currentHex3.current,
      ]);
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
              <TextContent data-aos="fade-right" data-aos-duration="1000">
                <HeaderText>Hayato Clarke</HeaderText>
                <p>
                  Looking forward to having great-looking websites?
                  <br />
                  Get in touch with this wiz-kid programmer.
                  <br />
                  He will make you a really great-looking website.
                </p>
                <Button onClick={() => scrollTo("contact")}>
                  Get In Touch
                </Button>
              </TextContent>

              <BlobContainer
                data-aos="fade-left"
                data-aos-duration="1000"
                data-aos-offset="300"
              >
                <RotatedImage src={blob} alt="blob" />
                <Image src={hayato} alt="hayato" />
              </BlobContainer>
            </ContentContainer>
          </AbsoluteContainer>
        </TopSectionContainer>

        {/* My Skills */}
        <ColorFade direction="down" />
        <SectionContainer id="skills">
          <MySkills />
        </SectionContainer>

        {/* My Projects */}
        <ColorFade direction="up" />
        <SectionContainer $background="black" id="projects">
          <Projects />
        </SectionContainer>

        {/* Contact */}
        <ColorFade direction="down" />
        <SectionContainer
          id="contact"
          // data-aos="fade-up"
          // data-aos-duration="1000"
        >
          <Contact />
        </SectionContainer>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
