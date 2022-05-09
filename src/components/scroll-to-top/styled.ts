import styled from 'styled-components';

import { Colour, theme } from '../../styles/theme';

type ScrollToTopProps = {
  $invertColor?: boolean;
  $alternativeBackgroundColor?: boolean;
};

const ScrollButton = styled.button`
  align-items: center;
  appearance: none;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  font-size: ${theme.fontSize('FS12')};
  justify-content: center;
  outline: none;
  padding: ${theme.spacing('S10')} ${theme.spacing('S20')};

  &:hover {
    & > svg * {
      animation-play-state: running !important;
    }
  }
`;

const ScrollToTop = styled.div<ScrollToTopProps>`
  display: flex;
  justify-content: center;
  padding-bottom: ${theme.spacing('S20')};
  padding-top: ${theme.spacing('S20')};
  z-index: 10;
  font-weight: ${theme.fontWeight('FW400')};
  background: ${({ $alternativeBackgroundColor }) =>
    $alternativeBackgroundColor ? theme.colour(Colour.BLUE, 'B04') : 'none'};

  ${ScrollButton} {
    color: ${({ $invertColor }) =>
      $invertColor
        ? theme.colour(Colour.BLUE, 'B38')
        : theme.colour(Colour.BLUE, 'B16')};

    & > svg {
      margin-left: ${theme.spacing('S2')};
      width: 20px;
      fill: ${({ $invertColor }) =>
        $invertColor
          ? theme.colour(Colour.BLUE, 'B38')
          : theme.colour(Colour.BLUE, 'B16')};
    }
  }
`;

export default { ScrollToTop, ScrollButton };
