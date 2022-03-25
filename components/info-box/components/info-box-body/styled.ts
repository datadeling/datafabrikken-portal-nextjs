import styled, { css } from 'styled-components';

import { theme } from '../../../../styles/theme';

const onMobileView = '@media (max-width: 900px)';

type infoBoxBodyProps = {
  truncate?: boolean;
};
const Body = styled.div<infoBoxBodyProps>`
  font-size: ${theme.fontSize('FS12')};
  flex-grow: 1;
  line-height: 1.5;
  ${({ truncate }) =>
    truncate &&
    css`
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    `}

  ${onMobileView} {
    font-size: inherit;
    line-height: inherit;
  }
`;

export default { Body };
