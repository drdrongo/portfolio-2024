import { styled } from "styled-components";

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

const Header = styled.a`
  color: white;
  margin-right: auto;
  font-size: 1.8rem;
  font-weight: bold;
`;

const NavLink = styled.a`
  color: white;
  font-size: 1.4rem;
  padding: 8px;
  position: relative;
  margin: 0;
  padding: 0;
  &:hover {
    color: white;
  }

  &:before {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    color: rgba(255, 0, 0, 0.3);
    width: 0%;
    overflow: hidden;
    transition: 0.5s;
  }
  &:hover:before {
    width: 100%;
  }
`;

export const Navbar = ({ isNavbarVisible }: { isNavbarVisible: boolean }) => {
  return (
    <NavbarOuter>
      <NavbarInner $isVisible={isNavbarVisible}>
        <Header href="#page-top">Hayato Clarke</Header>
        <NavLink href="#top" data-text="Top">
          Top
        </NavLink>
        <NavLink href="#skills" data-text="Skills">
          Skills
        </NavLink>
        <NavLink href="#projects" data-text="Projects">
          Projects
        </NavLink>
        <NavLink href="#contact" data-text="Contact">
          Contact
        </NavLink>
      </NavbarInner>
    </NavbarOuter>
  );
};
