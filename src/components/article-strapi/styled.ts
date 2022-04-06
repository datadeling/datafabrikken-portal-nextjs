import styled from 'styled-components';

import { theme, Colour } from '../../styles/theme';
import ContainerSC from '../container/styled';

const onMobileView = '@media (max-width: 900px)';

const Container = styled(ContainerSC.Container)`
  padding-top: ${theme.spacing('S4')};
  ${onMobileView} {
    padding-top: ${theme.spacing('S2')};
  }
`;

const ParagraphBackground = styled.div`
  padding: ${theme.spacing('S16')} 0;
`;

const ContentSection = styled.section`
  & > ${ParagraphBackground}:nth-of-type(even) {
    background-color: ${theme.colour(Colour.BLUE, 'B04')};
  }
`;

const Header = styled.header`
  margin-bottom: ${theme.spacing('S10')};
  color: ${theme.colour(Colour.NEUTRAL, 'N0')};
  background-color: ${theme.colour(Colour.BLUE, 'B54')};
`;

const Title = styled.h1`
  font-size: ${theme.fontSize('FS32')};
  font-weight: ${theme.fontWeight('FW400')};
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
  margin-bottom: ${theme.spacing('S8')};

  ${onMobileView} {
    font-size: ${theme.fontSize('FS14')};
  }
`;

export default {
  Container,
  ContentSection,
  Header,
  Title,
  Subtitle,
  ParagraphBackground
};
