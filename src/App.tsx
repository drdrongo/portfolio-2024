import {
  ExecutionContext,
  ThemeProvider,
  // keyframes
} from "styled-components";
import { styled } from "styled-components";
import "./App.css";
import hayato from "./assets/hayato-shaped.png";
import blob from "./assets/blob.svg";
import swoosh from "./assets/swoosh.svg";
import satellite from "./assets/satellite.png";
import airplane from "./assets/airplane.png";

import { COLORS } from "./constants/theme";
// import { gradient2 } from "./constants/gradients";
import { useEffect, useState } from "react";
import { HourlyColors, useColorTransition } from "./utils/color-transition";
import { FastOmit } from "styled-components/dist/types";
import { motion } from "framer-motion";

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

const Satellite = styled.img`
  height: 15px;
  width: 15px;
  position: absolute;
  z-index: 10;
  /* top: 0;
  left: 0; */
  background-size: contain;
`;
const Airplane = styled(Satellite)``;

const MyColorBackgroundAttribute = (
  props: ExecutionContext &
    FastOmit<
      React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
      >,
      never
    >
) => ({
  style: {
    background: props.color,
  },
});

const MyColor = styled.div.attrs(MyColorBackgroundAttribute)`
  width: 100%;
  height: 100%;
`;

const Star = styled.div<{
  top: number;
  left: number;
  big: boolean;
  opacity: 1 | 0;
}>`
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  width: ${(props) => (props.big ? 2 : 1)}px;
  height: ${(props) => (props.big ? 2 : 1)}px;
  background-color: #fff;
  box-shadow: 0 0 10px 3px rgba(255, 255, 255, 0.5);
  opacity: ${(props) => props.opacity};
  transition: opacity 1.5s;
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
  const [gradientColors, setGradientColors] = useState<string>();

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

  const [myTimer, setMyTimer] = useState<number>(0);

  const startTransitions = () => {
    startTransition1(myTimer);
    startTransition2(myTimer);
    startTransition3(myTimer);
  };

  useEffect(() => {
    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setMyTimer((prev) => (prev >= 23 ? 0 : prev + 1));
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
  }, [myTimer, setMyTimer]);

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
  }, [myTimer]);

  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <SectionContainer>
          <SwooshContainer>
            {(myTimer > 20 || myTimer <= 6) && (
              <>
                <Star
                  opacity={myTimer > 20 || myTimer <= 6 ? 1 : 0}
                  big={true}
                  top={200}
                  left={300}
                />
                <Star
                  opacity={myTimer > 20 || myTimer <= 6 ? 1 : 0}
                  big={false}
                  top={184}
                  left={200}
                />
                <Star
                  opacity={myTimer > 20 || myTimer <= 6 ? 1 : 0}
                  big={true}
                  top={10}
                  left={184}
                />
                <Star
                  opacity={myTimer > 20 || myTimer <= 6 ? 1 : 0}
                  big={false}
                  top={300}
                  left={122}
                />
                <Star
                  opacity={myTimer > 20 || myTimer <= 6 ? 1 : 0}
                  big={false}
                  top={260}
                  left={40}
                />
                <Star
                  opacity={myTimer > 20 || myTimer <= 6 ? 1 : 0}
                  big={false}
                  top={109}
                  left={66}
                />
              </>
            )}

            {/* How do I get these to fly across the screen? */}
            <Satellite
              as={motion.img}
              src={satellite}
              alt="satellite"
              initial={{ top: 400, left: "0%" }}
              animate={{ top: 160, left: "100%" }}
              transition={{ duration: 10, ease: "linear" }}
            />

            {/* // TODO: Is there a classier way to do this? It doesnt look good. */}
            <Airplane
              src={airplane}
              alt="airplane"
              as={motion.img}
              initial={{ top: 600, right: "0%", transform: "scaleX(-1)" }}
              animate={{ top: 40, right: "100%", transform: "scaleX(-1)" }}
              transition={{ duration: 10, ease: "linear" }}
            />
            <SwooshImage src={swoosh} alt="" />

            <MyColor color={gradientColors} />
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
                <CtaButton onClick={() => {}}>Get In Touch</CtaButton>
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
