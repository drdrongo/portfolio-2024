import { styled } from "styled-components";
import aws from "/src/assets/tool-logos/aws.svg";
import docker from "/src/assets/tool-logos/docker.svg";
import firebase from "/src/assets/tool-logos/firebase.svg";
import github from "/src/assets/tool-logos/github.svg";
import gitlab from "/src/assets/tool-logos/gitlab.svg";
import mysql from "/src/assets/tool-logos/mysql.svg";
import nodejs from "/src/assets/tool-logos/nodejs.svg";
import php from "/src/assets/tool-logos/php.svg";
import postgresql from "/src/assets/tool-logos/postgresql.svg";
import rails from "/src/assets/tool-logos/rails.svg";
import react from "/src/assets/tool-logos/react.svg";
import sass from "/src/assets/tool-logos/sass.svg";
import styledComponents from "/src/assets/tool-logos/styledComponents.svg";
import typescript from "/src/assets/tool-logos/typescript.svg";

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

const SkillsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ITEM_SIZE = 100;

const SkillsColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: ${ITEM_SIZE}px ${ITEM_SIZE}px;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 56px 16px;
`;

const TechIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px 100px;
  height: ${ITEM_SIZE * 0.5}px;
  width: ${ITEM_SIZE}px;
  padding: 8px;
  justify-content: flex-end;
  position: relative;
`;

const TechIcon = styled.img`
  height: ${ITEM_SIZE * 0.4}px;
`;

const TechName = styled.span`
  text-align: center;
  position: absolute;
  top: 100%;
  letter-spacing: 1px;
  font-size: ${ITEM_SIZE * 0.16}px;
`;

const SkillTitle = styled.h3`
  margin-bottom: 32px;
`;

const TechBox = ({ src, name }: { src: string; name: string }) => {
  return (
    <TechIconContainer>
      <TechIcon src={src} alt={name} />
      <TechName>{name}</TechName>
    </TechIconContainer>
  );
};

export function MySkills() {
  return (
    <ContentContainer data-aos="fade-up" data-aos-duration="1000">
      <TextContent>
        <HeaderText>My Skills</HeaderText>
        <ExplanationText>Languages, Frameworks & Libraries</ExplanationText>

        <SkillsContainer>
          <SkillsColumn>
            <SkillTitle>FRONTEND</SkillTitle>
            <SkillsGrid>
              <TechBox src={react} name="react" />
              <TechBox src={sass} name="sass" />
              <TechBox src={styledComponents} name="styled-components" />
              <TechBox src={typescript} name="typescript" />
            </SkillsGrid>
          </SkillsColumn>

          <SkillsColumn>
            <SkillTitle>BACKEND</SkillTitle>
            <SkillsGrid>
              <TechBox src={mysql} name="mysql" />
              <TechBox src={nodejs} name="nodejs" />
              <TechBox src={php} name="php" />
              <TechBox src={postgresql} name="postgresql" />
              <TechBox src={rails} name="rails" />
            </SkillsGrid>
          </SkillsColumn>

          <SkillsColumn>
            <SkillTitle>TOOLS</SkillTitle>
            <SkillsGrid>
              <TechBox src={aws} name="aws" />
              <TechBox src={docker} name="docker" />
              <TechBox src={firebase} name="firebase" />
              <TechBox src={github} name="github" />
              <TechBox src={gitlab} name="gitlab" />
            </SkillsGrid>
          </SkillsColumn>
        </SkillsContainer>
      </TextContent>
    </ContentContainer>
  );
}
