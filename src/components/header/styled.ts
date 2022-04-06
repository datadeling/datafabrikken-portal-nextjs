import styled from 'styled-components';
import DropdownMenuBase from '../dropdown-menu';
import { theme, Colour } from '../../styles/theme';

const onMobileView = '@media (max-width: 900px)';

const Header = styled.header`
  color: ${theme.colour(Colour.NEUTRAL, 'N0')};
  display: flex;
  align-items: center;
  height: 80px;
  background: ${theme.colour(Colour.BLUE, 'B54')};
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;

  ${onMobileView} {
    & {
      height: calc(55px + (80 - 55) * ((100vw - 320px) / (900 - 320)));
    }
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  width: 1200px;
  margin: 0 auto;

  @media (max-width: 1251px) {
    & {
      width: 100%;
      margin: 0 ${theme.spacing('S32')};
    }
  }

  ${onMobileView} {
    & {
      margin: 0 calc(12px + (32 - 12) * ((100vw - 320px) / (900 - 320)));
    }
  }
`;

const Link = styled.a`
  padding-bottom: ${theme.spacing('S4')};
  position: relative;
  &:after {
    position: absolute;
    content: '';
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    width: 0;
    margin: 0 auto;
    background-color: ${theme.colour(Colour.BLUE, 'B16')};
  }
  &:hover {
    &:after {
      left: 0;
      right: auto;
      width: 100%;
      transition: width 0.4s cubic-bezier(0.645, 0.045, 0.355, 1) 0.1s;
    }
  }
`;

const NavigationLinks = styled.ul`
  display: flex;
  margin-left: auto;

  & > li {
    flex: 0 0 auto;
  }

  & > li:nth-of-type(n + 2) {
    margin-left: ${theme.spacing('S24')};
  }

  @media (max-width: 1050px) {
    & {
      display: none;
    }
  }
`;

const SkipLink = styled.a`
  border: 0;
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  &:focus,
  &:active {
    background-color: ${theme.colour(Colour.NEUTRAL, 'N20')};
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    margin: 0;
    padding: ${theme.spacing('S6')} ${theme.spacing('S10')};
    overflow: visible;
    text-align: center;
    clip: auto;
    z-index: 1;
  }
`;

const Logo = styled.a`
  font-size: ${theme.fontSize('FS20')};
  font-weight: 600;

  ${onMobileView} {
    font-size: ${theme.fontSize('FS18')};
  }
`;

const DropdownMenu = styled(DropdownMenuBase)`
  display: none;
  margin-left: auto;

  @media (max-width: 1050px) {
    & {
      display: flex;
    }
  }
`;

const MenuButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  appearance: none;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
`;

type burgerProps = {
  open: boolean;
};

const Burger = styled.div<burgerProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 30px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-right: ${theme.spacing('S6')};
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    width: 30px;
    height: 4px;
    background-color: ${theme.colour(Colour.NEUTRAL, 'N0')};
    border-radius: 10px;
    transition: all 200ms linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? '0' : '1')};
      transform: ${({ open }) => (open ? 'translateX(20px)' : 'translateX(0)')};
    }

    :nth-child(3) {
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`;

const Menu = styled.ul`
  overflow-y: hidden;
  list-style: none;
  position: fixed;
  top: calc(55px + (80 - 55) * ((100vw - 320px) / (900 - 320)));
  background: ${theme.colour(Colour.BLUE, 'B52')};
  left: 0;
  bottom: 0;
  height: 100vh;
  width: 100vh;
  overflow: hidden;
  z-index: 9;

  & > li > a {
    display: block;
    padding: ${theme.spacing('S12')} ${theme.spacing('S16')};
    white-space: pre;
    border-top: 1px solid ${theme.colour(Colour.BLUE, 'B48')};
    font-size: 1.5rem;
  }
`;

export default {
  Header,
  Nav,
  NavigationLinks,
  Link,
  SkipLink,
  Logo,
  DropdownMenu,
  MenuButton,
  Menu,
  Burger
};
