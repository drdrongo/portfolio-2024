import { ThemeProvider } from "styled-components";
import { styled } from "styled-components";
import "./App.css";
import hayato from "./assets/hayato-shaped.png";
import blob from "./assets/blob.svg";

import { COLORS } from "./constants/theme";
import { useEffect, useState } from "react";
import { useColorTransition } from "./utils/color-transition";
import { SwooshContainer } from "./components/SwooshContainer";
import { colorsHigh, colorsLow, colorsMid } from "./constants/hourlyColors";
import { MySkills } from "./components/MySkills";
import { Projects } from "./components/Projects";

const CONTENT_WIDTH = 840;

const theme = { colors: COLORS };

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  position: relative;
`;

const SectionContainer = styled.section<{ background?: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.background ?? props.theme.colors.navy};
  position: relative;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px 0 20px;
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
  transform: rotate(54deg) translateY(-10px);
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

const NavbarOuter = styled.div`
  position: fixed;
  top: 0;
  z-index: 99;
  width: 100%;
  /* border: 1px solid red; */
  height: 80px;
  display: flex;
  justify-content: center;
`;

const NavbarInner = styled.nav<{ isVisible: boolean }>`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: flex-end;
  width: ${CONTENT_WIDTH}px;
  position: absolute;

  transition: top 0.3s ease-out;
  top: ${(props) => (props.isVisible ? 0 : -100)}%;
`;

const Header = styled.a`
  color: white;
  margin-right: auto;
  font-size: 1.8rem;
  font-weight: bold;
`;

const NavLink = styled.a`
  color: white;
  font-size: 1.4rem;
  padding: 8px;
`;

const colorFadeHeight = 250;
const ColorFade = styled.div<{ direction: "up" | "down" }>`
  position: absolute;
  top: ${(props) => (props.direction === "up" ? -colorFadeHeight : 0)}px;
  height: ${colorFadeHeight}px;
  width: 100%;
  background: linear-gradient(
    ${(props) =>
      props.direction === "up" ? "#00000000, #000" : "#000, #00000000"}
  );
`;

function App() {
  const [gradientColors, setGradientColors] = useState<string>("#000");

  const {
    hex: currentHex1,
    isReady: isReady1,
    startTransition: startTransition1,
  } = useColorTransition(colorsLow);
  const {
    hex: currentHex2,
    isReady: isReady2,
    startTransition: startTransition2,
  } = useColorTransition(colorsMid);
  const {
    hex: currentHex3,
    isReady: isReady3,
    startTransition: startTransition3,
  } = useColorTransition(colorsHigh);

  const [currentHour, setCurrentHour] = useState<number>(22);

  const startTransitions = () => {
    startTransition1(currentHour);
    startTransition2(currentHour);
    startTransition3(currentHour);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentHour((prev) => (prev >= 23 ? 0 : prev + 1));
    }, 1500);

    return () => clearInterval(intervalId);
  }, [currentHour, setCurrentHour]);

  useEffect(() => {
    const colorChangeIntv = setInterval(() => {
      setGradientColors(
        `linear-gradient(${currentHex1.current}, ${currentHex2.current}, ${currentHex3.current})`
      );
    }, 20);

    startTransitions();

    const timeChangeIntv = setInterval(() => {
      if (isReady1 && isReady2 && isReady3) {
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
        <NavbarOuter>
          <NavbarInner isVisible={isNavbarVisible}>
            <Header href="#">Hayato Clarke</Header>
            <NavLink href="#">Home</NavLink>
            <NavLink href="#">School</NavLink>
            <NavLink href="#">Work</NavLink>
            <NavLink href="#">Tennis</NavLink>
          </NavbarInner>
        </NavbarOuter>
        <SectionContainer>
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
        </SectionContainer>

        {/* My Skills */}
        <SectionContainer>
          <ColorFade direction="down" />
          <MySkills />
        </SectionContainer>

        {/* My Projects */}
        <SectionContainer background="black">
          <ColorFade direction="up" />
          <Projects />
        </SectionContainer>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
