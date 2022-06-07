import styled from 'styled-components';

import { theme, Colour } from '../../../../styles/theme';

const FactBoxTitle = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: ${theme.spacing('S8')};

  & > svg {
    flex: 0 0 45px;
    vertical-align: text-bottom;
    margin-right: ${theme.spacing('S6')};
  }
`;

const Title = styled.div`
  font-size: ${theme.fontSize('FS16')};
  font-weight: ${theme.fontWeight('FW400')};
  color: ${theme.colour(Colour.NEUTRAL, 'N0')};

  & > h1,
  h2,
  h3,
  h4,
  h5 {
    display: inline;
  }

  & > h1 {
    font-size: ${theme.fontSize('FS32')};
  }

  & > h2 {
    font-size: ${theme.fontSize('FS28')};
  }

  & > h3 {
    font-size: ${theme.fontSize('FS16')};
  }

  & > h4 {
    font-size: ${theme.fontSize('FS14')};
  }
`;

export default { FactBoxTitle, Title };
