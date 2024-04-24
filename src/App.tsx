import { ThemeProvider, keyframes } from "styled-components";
import { styled } from "styled-components";
import "./App.css";
import hayato from "./assets/hayato-shaped.png";
import blob from "./assets/blob.svg";
import swoosh from "./assets/swoosh.svg";
import satellite from "./assets/satellite.png";
import airplane from "./assets/airplane.png";

import { COLORS } from "./constants/theme";
import { gradient2 } from "./constants/gradients";
import { useRef } from "react";

const theme = {
  colors: COLORS,
};

const AppContainer = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
  width: 100vw;
`;

const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.navy};
  position: relative;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px 0 20px;
  width: 840px;
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

const SwooshImage = styled.img`
  position: absolute;
  bottom: 0;
  z-index: 11;
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

const SwooshContainer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 9;
  overflow: hidden;
`;

const slowRotationAnimation = keyframes`
 from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`;

const skyWheelSize = 40000;
const skyWheelOffset = -skyWheelSize / 6;

const SkyWheel = styled(gradient2)`
  height: ${skyWheelSize}px;
  width: ${skyWheelSize}px;
  border-radius: 50%;
  position: absolute;
  top: ${skyWheelOffset}px;
  left: ${skyWheelOffset}px;
  animation-name: ${slowRotationAnimation};
  animation-duration: 60s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;

const Satellite = styled.img`
  height: 15px;
  width: 15px;
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  background-size: contain;
`;
const Airplane = styled(Satellite)`
  position: absolute;
  top: 0;
  left: 0;
`;

function App() {
  const skyWheelRef = useRef<HTMLDivElement | null>(null);

  const getSkyWheelStyles = () => {
    if (!skyWheelRef.current) return;

    const computedStyle = window.getComputedStyle(skyWheelRef.current);
    console.log(computedStyle);

    // It might be easier to control all the animations in javascript instead.
  };

  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <SectionContainer>
          <SwooshContainer>
            <Satellite src={satellite} alt="satellite" />

            <Airplane src={airplane} alt="airplane" />
            {/* Now you need to add the rest of the background in here, right? */}
            <SwooshImage src={swoosh} alt="" />
            <SkyWheel ref={skyWheelRef} />
          </SwooshContainer>

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
                <CtaButton onClick={getSkyWheelStyles}>Get In Touch</CtaButton>
              </TextContent>

              <BlobContainer>
                <RotatedImage src={blob} alt="blob" />
                <Image src={hayato} alt="hayato" />
              </BlobContainer>
            </ContentContainer>
          </AbsoluteContainer>
        </SectionContainer>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
