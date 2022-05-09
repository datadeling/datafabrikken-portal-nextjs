import styled, { css } from 'styled-components';

import { theme, Colour, Unit } from '../../styles/theme';
import ContainerSC from '../container/styled';

const onMobileView = '@media (max-width: 900px)';
const onDekstopView = '@media (min-width: 901px)';

const Root = styled.div`
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  word-break: break-word;
`;

const Container = styled(ContainerSC.Container)`
  padding-top: ${theme.spacing('S4')};
  ${onMobileView} {
    padding-top: ${theme.spacing('S2')};
  }
`;

const ImageWrapper = styled.div`
  margin-bottom: ${theme.spacing('S16')};
`;

const Image = styled.img`
  max-width: 100%;
`;

const ImageText = styled.div`
  font-size: 0.9rem;
`;

const InfoBoxWrapper = styled.div`
  margin-bottom: ${theme.spacing('S20')};
`;

const Background = styled.div<{
  $altColor?: boolean;
  $showFeaturedImage?: boolean;
}>`
  padding: ${theme.spacing('S16')} 0;
  ${({ $altColor }) =>
    $altColor &&
    css`
      background-color: ${theme.colour(Colour.BLUE, 'B04')};
    `};
  ${({ $showFeaturedImage }) =>
    $showFeaturedImage &&
    css`
      ${onDekstopView} {
        position: relative;
        top: -150px;
        height: 450px;

        ${ImageWrapper} {
          ${Image} {
            box-shadow: 0 12px 48px ${theme.colour(Colour.BLUE, 'B38', 50)};
            width: 100%;
            max-width: 100%;
            height: 500px;
            object-fit: cover;
          }
        }
      }
    `};
`;

const ContentSection = styled.section`
  ${Background}:first-child {
    padding-top: ${theme.spacing('S24')};
  }
`;

const HeaderSection = styled.section<{
  $showFeaturedImage?: boolean;
}>`
  color: ${theme.colour(Colour.NEUTRAL, 'N0')};
  background-color: ${theme.colour(Colour.BLUE, 'B54')};
  padding-bottom: ${theme.spacing('S10')};

  ${({ $showFeaturedImage }) =>
    $showFeaturedImage &&
    css`
      ${onDekstopView} {
        padding-bottom: ${theme.spacing('S96')};
      }
    `};

  ${Container}:first-child {
    margin-top: ${theme.spacing('S4')};
  }
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
  margin-bottom: ${theme.spacing('S8')};

  ${onMobileView} {
    font-size: ${theme.fontSize('FS14')};
    line-height: ${theme.fontSize('FS16')};
  }
`;

const Published = styled.p`
  font-size: ${theme.fontSize('FS10')};
  line-height: ${theme.fontSize('FS18')};
`;

const Body = styled.div`
  font-size: ${theme.fontSize('FS12')};

  ${onMobileView} {
    font-size: ${theme.fontSize('FS10')};
  }

  & > div > h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: ${theme.spacing('S4')};
  }
  & > div > h2 {
    font-size: ${theme.fontSize('FS20')};
  }
  & > div > h3 {
    font-size: ${theme.fontSize('FS16')};
  }
  & > div > h4 {
    font-size: ${theme.fontSize('FS14')};
  }
  & > div > h5 {
    font-size: ${theme.fontSize('FS12')};
  }
  & > div > h6 {
    font-size: ${theme.fontSize('FS10')};
  }
  & > div > p {
    margin-bottom: ${theme.spacing('S20')};
    padding-bottom: 0;
    line-height: 1.5;

    & > a {
      text-decoration: underline;
    }
    & > a.arrow {
      align-items: center;
      display: inline-flex;
      &:after {
        font-family: 'Material Icons';
        content: '\\e5c8';
        font-size: ${theme.fontSize('FS12', Unit.EM)};
        margin-left: ${theme.spacing('S4')};
      }
    }
    & code {
      font: 'Roboto Mono, monospace';
    }
    & em {
      font-style: italic;
    }
  }
  & > div {
    & > div {
      margin-bottom: ${theme.spacing('S10')};
      & > * > a {
        align-items: center;
        text-decoration: underline;
        display: inline-flex;
      }
    }
  }
  & > div > ol,
  ul {
    margin-left: 2em;
  }
  & > div > ul {
    list-style: disc;
  }
  & > div > ol {
    list-style: decimal;
  }
`;

const Quote = styled.div`
  text-decoration: underline;
  font-size: ${theme.fontSize('FS20')};
  font-style: italic;
  line-height: 1.5;
  padding: ${theme.spacing('S6')} ${theme.spacing('S10')};
  margin-bottom: ${theme.spacing('S16')};
  ${onMobileView} {
    font-size: ${theme.fontSize('FS14')};
  }

  & p {
    padding: 0;
  }
`;

export default {
  Root,
  Container,
  ContentSection,
  HeaderSection,
  Title,
  Subtitle,
  Published,
  Body,
  Background,
  ImageWrapper,
  Image,
  ImageText,
  InfoBoxWrapper,
  Quote
};
