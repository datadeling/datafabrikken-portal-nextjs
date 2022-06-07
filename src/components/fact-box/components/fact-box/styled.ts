import styled, { css } from 'styled-components';

import { theme, Colour } from '../../../../styles/theme';

const onMobileView = '@media (max-width: 900px)';

type factBoxProps = {
  $small?: boolean;
};

const IconWrapper = styled.div`
  align-items: flex-start;
  display: flex;
  flex: 0 0 20%;

  & > svg,
  img {
    height: 100px;
    width: 100px;
  }

  ${onMobileView} {
    margin-bottom: ${theme.spacing('S10')};
  }
`;

const FactBox = styled.div<factBoxProps>`
  background-color: ${theme.colour(Colour.BLUE, 'B48')};
  color: ${theme.colour(Colour.NEUTRAL, 'N0')};
  box-shadow: 0 12px 48px ${theme.colour(Colour.BLUE, 'B56', 50)};
  display: flex;
  flex-direction: column;
  line-height: 1.15;
  margin-bottom: ${theme.spacing('S20')};
  padding: ${theme.spacing('S20')};

  ${({ $small }) =>
    $small &&
    !onMobileView &&
    css`
      flex-basis: 40%;
    `}

  & ${IconWrapper} * {
    stroke: ${theme.colour(Colour.BLUE, 'B52')};
  }
`;

export default { FactBox, IconWrapper };
