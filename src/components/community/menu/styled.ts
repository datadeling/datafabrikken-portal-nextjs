import styled from 'styled-components';

import LinkBase from 'next/link';

import TopicIconBase from '../../../../public/images/icon-topic.inline.svg';
import { theme, Colour } from '../../../styles/theme';

const onMobileView = '@media (max-width: 900px)';

const Link = styled(LinkBase)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: ${theme.spacing('S4')};
  position: relative;
  white-space: nowrap;
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

const ExternalLink = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: ${theme.spacing('S4')};
  position: relative;
  white-space: nowrap;
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

const Menu = styled.ul`
  display: flex;
  gap: ${theme.spacing('S12')};
  padding-top: ${theme.spacing('S10')};
  padding-bottom: ${theme.spacing('S10')};

  ${onMobileView} {
    justify-content: space-between;
    gap: 0;
  }
`;

const TopicIcon = styled(TopicIconBase)`
  path {
    stroke: ${theme.colour(Colour.BLUE, 'B16')};
  }
`;

export default { Link, ExternalLink, Menu, TopicIcon };
