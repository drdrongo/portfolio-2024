import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

type ProjectProps = {
  direction: "ltr" | "rtl";
  title: string;
  description: string;
  src: string;
  url: string;
  skills: string[];
};

const CONTAINER_HEIGHT = 360;

const ProjectContainer = styled.div<{ direction: "ltr" | "rtl" }>`
  width: 100%;
  height: ${CONTAINER_HEIGHT}px;
  display: flex;
  flex-direction: ${(props) =>
    props.direction === "ltr" ? "row" : "row-reverse"};
  align-items: stretch;
  justify-content: space-between;
  gap: 32px;
`;

const ProjectPreviewBox = styled.div`
  max-height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
`;

const ImageLink = styled.a`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
  transition: all 0.3s;
  top: -100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  &:hover {
    color: white;
    text-decoration: underline;
  }
`;

const LinkContainer = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;
  overflow: hidden;
  &:hover ${ImageLink} {
    transition: all 0.3s;
    top: 0;
  }
`;

const Image = styled.img`
  object-fit: contain;
  position: relative;
  max-width: 100%;
  max-height: ${CONTAINER_HEIGHT}px;
`;

const ProjectDescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  width: 50%;
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

const TitleLink = styled.a`
  color: white;
  font-size: 2rem;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
    color: white;
  }
`;

export const Project = ({
  direction,
  title,
  description,
  src,
  skills,
  url,
}: ProjectProps) => {
  return (
    <ProjectContainer direction={direction}>
      <ProjectPreviewBox>
        <LinkContainer>
          <ImageLink href={url} target="_blank">
            <span style={{ marginRight: 8 }}>{title}</span>{" "}
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </ImageLink>
          <Image src={src} alt={title} />
        </LinkContainer>
      </ProjectPreviewBox>
      <ProjectDescriptionBox>
        <TitleLink href={url} target="_blank">
          {title}
        </TitleLink>
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
