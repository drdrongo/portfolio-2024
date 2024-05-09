import { styled } from "styled-components";
import movieLab from "/src/assets/movieLab.png";

const CONTENT_WIDTH = 840;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 30px 0 20px;
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

const ProjectContainer = styled.div<{ direction: "ltr" | "rtl" }>`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: ${(props) =>
    props.direction === "ltr" ? "row" : "row-reverse"};
  align-items: stretch;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const ProjectPreview = styled.img`
  object-fit: contain;
  max-height: 100%;
  max-width: 45%;
`;

const ProjectDescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const SkillPillBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const SkillPill = styled.div`
  background-color: grey;
  color: white;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export function Projects() {
  return (
    <ContentContainer>
      <TextContent>
        <HeaderText>Projects</HeaderText>
        <ExplanationText>Check them out</ExplanationText>

        {/* Movie Lab */}
        <ProjectContainer direction="ltr">
          <ProjectPreview src={movieLab} alt="Movie Lab" />
          <ProjectDescriptionBox>
            <h1>The Movie Lab</h1>
            <p>This was a really cool project to do.</p>
            <SkillPillBox>
              <SkillPill>React</SkillPill>
              <SkillPill>NextJS</SkillPill>
              <SkillPill>StyledComponents</SkillPill>
            </SkillPillBox>
          </ProjectDescriptionBox>
        </ProjectContainer>

        {/* SOmething else */}
        <ProjectContainer direction="rtl">
          <ProjectPreview src={movieLab} alt="Movie Lab" />
          <ProjectDescriptionBox>
            <h1>The Movie Lab</h1>
            <p>This was a really cool project to do.</p>
            <SkillPillBox>
              <SkillPill>React</SkillPill>
              <SkillPill>NextJS</SkillPill>
              <SkillPill>StyledComponents</SkillPill>
            </SkillPillBox>
          </ProjectDescriptionBox>
        </ProjectContainer>

        {/* Third item */}
        <ProjectContainer direction="ltr">
          <ProjectPreview src={movieLab} alt="Movie Lab" />
          <ProjectDescriptionBox>
            <h1>The Movie Lab</h1>
            <p>This was a really cool project to do.</p>
            <SkillPillBox>
              <SkillPill>React</SkillPill>
              <SkillPill>NextJS</SkillPill>
              <SkillPill>StyledComponents</SkillPill>
            </SkillPillBox>
          </ProjectDescriptionBox>
        </ProjectContainer>
      </TextContent>
    </ContentContainer>
  );
}
