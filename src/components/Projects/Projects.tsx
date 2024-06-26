import { styled } from "styled-components";
import movieLab from "/src/assets/movieLab.png";
import outings from "/src/assets/outings.png";
import { Project } from "./elements/Project";

const CONTENT_WIDTH = 840;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  width: ${CONTENT_WIDTH}px;
  flex-grow: 1;
  margin-bottom: 64px;
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  width: 100%;
`;

const HeaderText = styled.h1`
  font-family: "poppins";
`;

const ExplanationText = styled.p`
  text-align: center;
  margin-bottom: 24px;
`;

export function Projects() {
  const myProjects: {
    title: string;
    description: string;
    src: string;
    url: string;
    skills: string[];
  }[] = [
    {
      title: "Movie Lab",
      description: "This was a really cool project to do",
      src: movieLab,
      url: "https://movie-lab-eight.vercel.app/",
      skills: ["React", "NextJS", "CSS-Modules"],
    },
    {
      title: "Outings",
      description:
        "A small app made for my partner and I to keep track of things we want to do together, and to make date decisions easier.",
      src: outings,
      url: "https://outings.vercel.app/",
      skills: ["React", "PWA", "NextJS", "CSS-Modules"],
    },
  ];

  return (
    <ContentContainer data-aos="fade-up" data-aos-duration="1000">
      <TextContent>
        <HeaderText>Projects</HeaderText>
        <ExplanationText>Check them out</ExplanationText>

        {myProjects.map((props, idx) => (
          <Project
            key={props.title}
            {...props}
            direction={idx % 2 === 0 ? "ltr" : "rtl"}
          />
        ))}
      </TextContent>
    </ContentContainer>
  );
}
