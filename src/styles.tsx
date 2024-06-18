import { styled } from "styled-components";

const CONTENT_WIDTH = 840;

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  position: relative;
  background-color: ${(props) => props.theme.colors.navy};
`;

export const SectionContainer = styled.section<{
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

export const TopSectionContainer = styled(SectionContainer)`
  min-height: 100vh;
`;

export const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  width: ${CONTENT_WIDTH}px;
  flex-grow: 1;
`;

export const BlobContainer = styled.div`
  position: relative;
  height: 320px;
  width: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.img`
  position: absolute;
  inset: 0;
`;

export const RotatedImage = styled(Image)`
  transform: rotate(-98deg) translateY(6px) translateX(-11px);
  position: absolute;
  inset: 0;
`;

export const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;

export const HeaderText = styled.h1`
  font-family: "poppins";
`;

export const AbsoluteContainer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
`;

export const ColorFade = styled.div<{ direction: "up" | "down" }>`
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
