import styled from 'styled-components';

import ContainerSC from "../../../components/container/styled";
import {Colour, theme} from "../../theme";

const onMobileView = '@media (max-width: 900px)';

const Container = styled(ContainerSC.Container)`
  padding-top: ${theme.spacing('S4')};
  ${onMobileView} {
    padding-top: ${theme.spacing('S2')};
  }
`;

const Header = styled.section`
  margin-bottom: ${theme.spacing('S10')};
`;

const Title = styled.h1`
  font-size: ${theme.fontSize('FS32')};
  margin-bottom: ${theme.spacing('S4')};
  ${onMobileView} {
    font-size: ${theme.fontSize('FS18')};
    word-break: break-word;
  }
`;

const Subtitle = styled.p`
  font-size: ${theme.fontSize('FS16')};
  line-height: ${theme.fontSize('FS24')};
  max-width: 800px;

  ${onMobileView} {
    font-size: ${theme.fontSize('FS14')};
  }
`;

const SiteMapRoot = styled.ul`
  display: flex;
  flex-flow: column;
  font-size: ${theme.fontSize('FS12')};
  list-style: none;
  padding: ${theme.spacing('S12')};
`;

const SiteMapBranch = styled.ul`
  list-style: none;
  padding-left: 2rem;
`;

const SiteMapLeaf = styled.li`
  border-left: 1px solid ${theme.colour(Colour.NEUTRAL, 'N0')};
  padding-left: 8px;

  &:before {
    position: relative;
    top: -8px;
    left: -8px;
    height: 24px;
    width: 16px;
    display: inline-block;
    content: "";
    border-bottom: 1px solid ${theme.colour(Colour.NEUTRAL, 'N0')};
  }
`;

const SiteMapLink = styled.a`
  align-items: center;
  display: inline-flex;

  &:before {
    display: flex;
    content: '';
    width: 18px;
    height: 16px;
    background-image: url('data:image/svg+xml,%3Csvg%20width%3D%226%22%20height%3D%2210%22%20viewBox%3D%220%200%206%2010%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0.6875%201.0625L4.625%204.99999L0.6875%208.9375%22%20stroke%3D%22white%22%20stroke-linecap%3D%22round%22%2F%3E%0A%3C%2Fsvg%3E%0A');
    background-repeat: no-repeat;
    background-size: 8px;
    background-position: left center;
  }
`;

export default { Container, Header, Title, Subtitle, SiteMapRoot, SiteMapBranch, SiteMapLeaf, SiteMapLink };
