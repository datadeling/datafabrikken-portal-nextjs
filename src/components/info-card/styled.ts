import styled, { css } from 'styled-components';

import ClockIconBase from '../../../public/images/icon-clock-sm.inline.svg';
import CubeIconBase from '../../../public/images/cube.inline.svg';
import { theme, Colour } from '../../styles/theme';

const Image = styled.img`
  max-width: 100%;
  height: 250px;
  object-fit: cover;
`;

const ProviderLogo = styled.img`
  max-height: 50px;
  object-fit: contain;
  object-position: left;
  margin: ${theme.spacing('S4')} 0;
`;

const CourseContent = styled.div`
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  padding: ${theme.spacing('S20')};
  line-height: ${theme.fontSize('FS16')};
  background-color: ${theme.colour(Colour.BLUE, 'B48')};
  color: ${theme.colour(Colour.NEUTRAL, 'N0')};

  & > h4 {
    color: ${theme.colour(Colour.BLUE, 'B16')};
    font-size: ${theme.fontSize('FS14')};
    line-height: ${theme.fontSize('FS20')};
    margin: ${theme.spacing('S8')} 0;
    & > svg {
      width: 20px;
      vertical-align: middle;
    }
  }
`;

const CourseFacts = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: ${theme.spacing('S8')} 0;
`;

const CourseProvider = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing('S16')};
  background-color: ${theme.colour(Colour.NEUTRAL, 'N0')};
  color: ${theme.colour(Colour.BLUE, 'B52')};
`;

const Fact = styled.span`
  display: flex;
  align-items: center;
  margin-right: ${theme.spacing('S12')};
`;

const IconBaseStyle = css`
  height: 20px;
  width: 20px;
  margin-right: ${theme.spacing('S4')};
  & > path,
  circle {
    stroke: swhite;
    stroke-width: 1px;
  }
`;

const ClockIcon = styled(ClockIconBase)`
  ${IconBaseStyle};
`;

const BoxIcon = styled(CubeIconBase)`
  ${IconBaseStyle};
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  line-height: ${theme.fontSize('FS12')};
`;

const Card = styled.a`
  display: flex;
  flex-direction: column;
  border-radius: 2px;
  overflow: hidden;
  box-shadow: 2.9px 2.9px 3.6px rgba(0, 0, 0, 0.049),
    8.1px 7.9px 10px rgba(0, 0, 0, 0.07),
    19.6px 19px 24.1px rgba(0, 0, 0, 0.091), 65px 63px 80px rgba(0, 0, 0, 0.14);

  &:hover {
    cursor: pointer;

    background-color: ${theme.colour(Colour.BLUE, 'B16')};

    & > ${Image}, & > ${CourseProvider} {
      opacity: 0.5;
    }

    & > ${CourseContent} {
      color: ${theme.colour(Colour.BLUE, 'B52')};
      background-color: ${theme.colour(Colour.BLUE, 'B16')};
      & > h4 {
        color: ${theme.colour(Colour.BLUE, 'B52')};
        & > a {
          border-color: ${theme.colour(Colour.BLUE, 'B52')};
        }
      }

      & > ${CourseFacts} svg > path {
        stroke: ${theme.colour(Colour.BLUE, 'B52')};
      }

      & > ${Tags} > div:first-child {
        color: ${theme.colour(Colour.BLUE, 'B52')};
        background-color: ${theme.colour(Colour.BLUE, 'B16')};
      }
    }
  }
`;

export default {
  Card,
  CourseContent,
  CourseProvider,
  CourseFacts,
  Fact,
  Image,
  ProviderLogo,
  ClockIcon,
  BoxIcon,
  Tags
};
