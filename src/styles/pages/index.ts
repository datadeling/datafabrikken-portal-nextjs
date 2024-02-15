import styled, { css } from 'styled-components';

import ContainerSC from '../../components/container/styled';

import InfoBoxSC from '../../components/info-box/components/info-box/styled';
import InfoBoxTitleSC from '../../components/info-box/components/info-box-title/styled';

import { theme, Colour } from '../theme';

const onMobileView = '@media (max-width: 900px)';

const BannerContainer = styled(ContainerSC.Container)`
  flex: 1 0 100%;
`;

const Container = styled(ContainerSC.Container)``;

const BannerInfoBoxRow = styled.div`
  display: flex;
  z-index: 1;
  margin-bottom: ${theme.spacing('S24')};
  gap: ${theme.spacing('S8')};

  & > ${InfoBoxSC.InfoBox} {
    background-color: ${theme.colour(Colour.BLUE, 'B16')};
    color: ${theme.colour(Colour.BLUE, 'B52')};
    box-shadow: 0 12px 48px ${theme.colour(Colour.BLUE, 'B38', 15)};

    & ${InfoBoxTitleSC.Title} {
      color: ${theme.colour(Colour.BLUE, 'B52')};
    }

    &:hover {
      background-color: ${theme.colour(Colour.BLUE, 'B48')};
      color: ${theme.colour(Colour.BLUE, 'B16')};

      & ${InfoBoxTitleSC.Title} {
        color: ${theme.colour(Colour.BLUE, 'B16')};
        & > svg {
          color: ${theme.colour(Colour.BLUE, 'B16')};
        }
      }
    }

    ${onMobileView} {
      flex-basis: 100%;
      margin-bottom: 0;
      box-shadow: 0 6px 24px ${theme.colour(Colour.BLUE, 'B38', 15)};
    }
  }

  ${onMobileView} {
    flex-direction: column;
  }
`;

const Row = styled.div`
  display: flex;
  margin-bottom: ${theme.spacing('S96')};

  & > ${InfoBoxSC.InfoBox} {
    margin: ${theme.spacing('S8')};
    & > ${InfoBoxSC.InfoBoxRow} {
      & > ${InfoBoxSC.IconWrapper} {
        & svg {
          fill: none;
        }
      }
    }
  }

  ${onMobileView} {
    flex-direction: column;
    margin-bottom: ${theme.spacing('S32')};
  }
`;

const Title = styled.h1`
  display: 'flex';
  flex-grow: 1;
  margin-top: ${theme.spacing('S40')};
  max-width: 36%;
  font-size: ${theme.fontSize('FS32')};

  @media (max-width: 1251px) {
    max-width: 50%;
  }

  ${onMobileView} {
    flex-grow: 0;
    font-size: ${theme.fontSize('FS18')};
    max-width: 100%;
    margin-top: ${theme.spacing('S64')};
    margin-bottom: ${theme.spacing('S10')};
  }
`;

const BannerSection = styled.section<{ $bg?: any }>`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  ${({ $bg }) =>
    $bg &&
    css`
      background: url(${$bg});
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    `};

  ${onMobileView} {
    height: auto;
    ${({ $bg }) =>
      $bg &&
      css`
        background: url(${$bg});
        background-repeat: no-repeat;
        background-size: contain;
        background-position-y: 68px;
      `};
  }
`;

const BannerSectionGradient = styled.div`
  position: absolute;
  display: flex;
  height: 100%;
  width: 100%;
  background: linear-gradient(
    90deg,
    ${theme.colour(Colour.BLUE, 'B54', 100)} 0%,
    ${theme.colour(Colour.BLUE, 'B54', 0)} 100%,
    ${theme.colour(Colour.BLUE, 'B54', 0)} 100%
  );

  ${onMobileView} {
    height: 50%;
    background: linear-gradient(
      0deg,
      ${theme.colour(Colour.BLUE, 'B54', 100)} 40%,
      ${theme.colour(Colour.BLUE, 'B54', 10)} 50%,
      ${theme.colour(Colour.BLUE, 'B54', 0)} 100%
    );
  }
`;

const MainContentSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: ${theme.colour(Colour.BLUE, 'B54')};
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 1200px;
  margin: 0 auto;

  & > ${Row} {
    &:first-child {
      margin-top: ${theme.spacing('S88')};
      justify-content: center;
    }
  }

  @media (max-width: 1251px) {
    & {
      width: 100%;
    }
  }

  ${onMobileView} {
    & > ${Row} {
      &:first-child {
        margin-top: ${theme.spacing('S24')};
        justify-content: center;
      }
    }
  }
`;

const IllustrationBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${theme.spacing('S10')};

  & > svg {
    margin-right: ${theme.spacing('S10')};
  }

  ${onMobileView} {
    flex-direction: column;
    align-items: flex-start;
    & > svg {
      margin-right: 0;
    }
  }
`;

const IllustrationContent = styled.div`
  display: flex;
  flex-direction: column;
  & h2 {
    font-size: ${theme.fontSize('FS24')};
  }
`;

const NewsRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${theme.spacing('S10')};
  margin-bottom: ${theme.spacing('S96')};

  & ${InfoBoxSC.ContentWrapper} {
    & > div:last-child {
      font-size: ${theme.fontSize('FS10')};
    }
  }

  ${onMobileView} {
    flex-direction: column;
    margin-bottom: ${theme.spacing('S32')};
  }
`;

const Topics = styled.div`
  flex-direction: column;
  width: 80%;

  & > div:not(:first-child) {
    margin: ${theme.spacing('S4')} 0;
  }

  & > ${IllustrationBox} {
    & > svg {
      min-width: 165px;
    }
  }

  ${onMobileView} {
    width: 100%;
  }
`;

const Teaser = styled.div`
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  & > ${IllustrationBox} {
    & > svg {
      margin-right: ${theme.spacing('S24')};
    }
  }

  & ul > li {
    margin-bottom: 12px;
    margin-left: 0px !important;
    display: flex;
    align-items: center;
    list-style: none !important;
  }

  & ul > li::before {
    color: transparent;
    font-size: 1px;
    content: '';
    margin-right: 15px;
    padding: 18px 10px;
    background-image: url('data:image/svg+xml, %3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M4.5%2010.515L10.53%2016.485L19.5%207.51501%22%20stroke%3D%22white%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%3C%2Fsvg%3E%0A');
    background-repeat: no-repeat;
    background-size: 25px;
    background-position: center center;
  }

  ${onMobileView} {
    & h2 {
      font-size: ${theme.fontSize('FS16')};
    }

    & ul > li {
      font-size: ${theme.fontSize('FS10')};
    }
  }
`;

const ArrowDown = styled.a`
  display: flex;
  justify-content: center;
  transform: translateX(-50%);
  position: absolute;
  bottom: ${theme.spacing('S24')};
  left: calc(50% - 26px);
  background-color: ${theme.colour(Colour.BLUE, 'B48')};
  border-radius: 50%;
  width: 52px;
  height: 52px;

  animation: arrowdown 2500ms linear infinite normal forwards;

  & > svg {
    width: 35px;
  }

  @keyframes arrowdown {
    0% {
      transform: translate(8px, 7px);
      animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
    }
    20% {
      transform: translate(8px, 11px);
      animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
    }
    36% {
      transform: translate(8px, 8px);
      animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
    }
    52% {
      transform: translate(8px, 11px);
      animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
    }
    68% {
      transform: translate(8px, 8px);
      animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
    }
    84% {
      transform: translate(8px, 11px);
      animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
    }
    100% {
      transform: translate(8px, 7px);
    }
  }

  ${onMobileView} {
    display: none;
  }
`;

const LinkWrapper = styled.div``;

const ShutDown = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 120px;
  padding: 2em 0;
  background-color: #efcc79;
  color: #000;

  ${onMobileView} {
    margin-top: 80px;
    padding: 2em 1em;
  }
`;

const ShutDownContent = styled(ContainerSC.Container)`
  a {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export default {
  Container,
  Title,
  BannerSection,
  BannerSectionGradient,
  BannerContainer,
  BannerInfoBoxRow,
  MainContentSection,
  MainContent,
  IllustrationBox,
  IllustrationContent,
  LinkWrapper,
  Row,
  NewsRow,
  Topics,
  Teaser,
  ArrowDown,
  ShutDown,
  ShutDownContent
};
