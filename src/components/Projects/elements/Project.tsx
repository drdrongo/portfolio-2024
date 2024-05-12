import { styled } from "styled-components";

const ProjectContainer = styled.div<{ direction: "ltr" | "rtl" }>`
  width: 100%;
  height: 360px;
  display: flex;
  flex-direction: ${(props) =>
    props.direction === "ltr" ? "row" : "row-reverse"};
  align-items: stretch;
  justify-content: space-between;
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
  gap: 8px;
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

type ProjectProps = {
  direction: "ltr" | "rtl";
  title: string;
  description: string;
  src: string;
  skills: string[];
};

export const Project = ({
  direction,
  title,
  description,
  src,
  skills,
}: ProjectProps) => {
  return (
    <ProjectContainer direction={direction}>
      <ProjectPreview src={src} alt={title} />
      <ProjectDescriptionBox>
        <h1>{title}</h1>
        <p>{description}</p>
        <SkillPillBox>
          {skills.map((skill) => (
            <SkillPill key={skill}>{skill}</SkillPill>
          ))}
        </SkillPillBox>
      </ProjectDescriptionBox>
    </ProjectContainer>
  );
};
