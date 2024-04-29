import {
  ThemeProvider,
  // keyframes
} from "styled-components";
import { styled } from "styled-components";
import "./App.css";
import hayato from "./assets/hayato-shaped.png";
import blob from "./assets/blob.svg";
import swoosh from "./assets/swoosh.svg";
// import satellite from "./assets/satellite.png";
// import airplane from "./assets/airplane.png";

import { COLORS } from "./constants/theme";
// import { gradient2 } from "./constants/gradients";
import { useEffect, useRef, useState } from "react";
import { HourlyColors, useColorTransition } from "./utils/color-transition";

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

// const slowRotationAnimation = keyframes`
//  from {
//     -ms-transform: rotate(0deg);
//     -moz-transform: rotate(0deg);
//     -webkit-transform: rotate(0deg);
//     -o-transform: rotate(0deg);
//     transform: rotate(0deg);
//   }
//   to {
//     -ms-transform: rotate(360deg);
//     -moz-transform: rotate(360deg);
//     -webkit-transform: rotate(360deg);
//     -o-transform: rotate(360deg);
//     transform: rotate(360deg);
//   }
// `;

// const skyWheelSize = 40000;
// const skyWheelOffset = -skyWheelSize / 6;

// const SkyWheel = styled(gradient2)`
//   height: ${skyWheelSize}px;
//   width: ${skyWheelSize}px;
//   border-radius: 50%;
//   position: absolute;
//   top: ${skyWheelOffset}px;
//   left: ${skyWheelOffset}px;
//   animation-name: ${slowRotationAnimation};
//   animation-duration: 60s;
//   animation-iteration-count: infinite;
//   animation-timing-function: linear;
// `;

// const Satellite = styled.img`
//   height: 15px;
//   width: 15px;
//   position: absolute;
//   z-index: 10;
//   top: 0;
//   left: 0;
//   background-size: contain;
// `;
// const Airplane = styled(Satellite)`
//   position: absolute;
//   top: 0;
//   left: 0;
// `;

const MyColor = styled.div.attrs((props) => ({
  style: {
    background: props.color,
  },
}))`
  width: 100%;
  height: 100%;
  transition: background 0.1s;
`;

const colorsHigh: HourlyColors = [
  [8, 2, 77],
  [24, 5, 56],
  [31, 31, 60],
  [32, 32, 60],
  [33, 33, 60],
  [65, 66, 97],
  [140, 119, 168],
  [149, 174, 211],
  [152, 205, 250],
  [170, 229, 254],
  [138, 221, 253],
  [138, 225, 253],
  [179, 233, 255],
  [179, 235, 255],
  [138, 219, 251],
  [150, 225, 254],
  [92, 187, 227],
  [64, 156, 205],
  [38, 113, 168],
  [164, 64, 13],
  [25, 17, 15],
  [55, 39, 29],
  [14, 13, 51],
  [13, 4, 66],
];

const colorsMid: HourlyColors = [
  [24, 19, 78],
  [47, 13, 106],
  [40, 40, 90],
  [65, 65, 96],
  [81, 81, 110],
  [105, 106, 133],
  [140, 119, 168],
  [149, 174, 211],
  [152, 205, 250],
  [170, 229, 254],
  [91, 161, 189],
  [138, 225, 253],
  [179, 233, 255],
  [108, 162, 182],
  [138, 219, 251],
  [65, 151, 185],
  [92, 187, 227],
  [64, 156, 205],
  [38, 113, 168],
  [13, 56, 164],
  [47, 36, 34],
  [55, 39, 29],
  [15, 13, 83],
  [44, 35, 93],
];

const colorsLow: HourlyColors = [
  [49, 44, 108],
  [54, 27, 101],
  [35, 35, 65],
  [45, 45, 92],
  [71, 71, 118],
  [24, 14, 14],
  [34, 3, 75],
  [105, 129, 165],
  [89, 141, 186],
  [82, 164, 199],
  [79, 169, 205],
  [138, 225, 253],
  [153, 226, 255],
  [108, 162, 182],
  [138, 219, 251],
  [65, 151, 185],
  [92, 187, 227],
  [64, 156, 205],
  [0, 60, 102],
  [8, 28, 79],
  [47, 36, 34],
  [8, 6, 24],
  [39, 37, 117],
  [44, 35, 93],
];

function App() {
  const skyWheelRef = useRef<HTMLDivElement | null>(null);

  const getSkyWheelStyles = () => {
    if (!skyWheelRef.current) return;

    const computedStyle = window.getComputedStyle(skyWheelRef.current);
    console.log(computedStyle);

    // It might be easier to control all the animations in javascript instead.
  };

  const currentHex1 = useColorTransition(colorsLow);
  const currentHex2 = useColorTransition(colorsMid);
  const currentHex3 = useColorTransition(colorsHigh);

  const [myColor, setMyColor] = useState<string>();

  useEffect(() => {
    setInterval(() => {
      const newColor = `linear-gradient(${currentHex1.current}, ${currentHex2.current}, ${currentHex3.current})`;
      setMyColor(newColor);
    }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <SectionContainer>
          <SwooshContainer>
            {/* <Satellite src={satellite} alt="satellite" /> */}

            {/* <Airplane src={airplane} alt="airplane" /> */}
            {/* Now you need to add the rest of the background in here, right? */}
            {<SwooshImage src={swoosh} alt="" />}
            {/* <SkyWheel ref={skyWheelRef} /> */}

            <MyColor color={myColor} />
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
