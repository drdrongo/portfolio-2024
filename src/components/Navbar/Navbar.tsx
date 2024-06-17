import { styled } from "styled-components";
import { scrollTo } from "../../utils/tools";

const CONTENT_WIDTH = 840;

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

const NavbarInner = styled.nav<{ $isVisible: boolean }>`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: flex-end;
  width: ${CONTENT_WIDTH}px;
  position: absolute;
  padding: 0 30px;

  transition: top 0.3s ease-out;
  top: ${(props) => (props.$isVisible ? 0 : -100)}%;
`;

const Header = styled.button`
  color: white;
  margin-right: auto;
  font-size: 1.8rem;
  font-weight: bold;
  background-color: transparent;
  border: none;
  padding: 0;

  &:hover {
    border: none;
  }

  &:focus {
    outline: none;
  }
`;

const NavLink = styled.button`
  background-color: transparent;
  color: white;
  font-size: 1.4rem;
  padding: 8px;
  position: relative;
  margin: 0;
  padding: 0;
  border: none;

  &:focus {
    outline: none;
  }
  &:hover {
    color: white;
    background-color: transparent;
    border: none;
  }

  &:before {
    content: attr(data-text);
    position: absolute;
    top: 0%;
    left: 0;
    color: gold;
    height: 0%;
    overflow: hidden;
    transition: 0.7s;
  }
  &:hover:before {
    height: 100%;
  }
`;

export const Navbar = ({ isNavbarVisible }: { isNavbarVisible: boolean }) => {
  return (
    <NavbarOuter>
      <NavbarInner $isVisible={isNavbarVisible}>
        <Header onClick={() => scrollTo("top")}>Hayato Clarke</Header>
        <NavLink data-text="Skills" onClick={() => scrollTo("skills")}>
          Skills
        </NavLink>
        <NavLink data-text="Projects" onClick={() => scrollTo("projects")}>
          Projects
        </NavLink>
        <NavLink data-text="Contact" onClick={() => scrollTo("contact")}>
          Contact
        </NavLink>
      </NavbarInner>
    </NavbarOuter>
  );
};
