import styled from 'styled-components';

import { theme } from '../../../../styles/theme';

import LinkSC from '../../../link/styled';

const ContentBoxBody = styled.div`
  font-size: ${theme.fontSize('FS12')};
  display: flex;
  flex-direction: column;
  line-height: 1.5;
  & > *:not(:last-child) {
    margin-bottom: ${theme.spacing('S10')};
  }
  ${LinkSC.Link} {
    font-size: ${theme.fontSize('FS10')};
  }

  & > div > p > a {
    text-decoration: underline;
  }
`;

export default { ContentBoxBody };
