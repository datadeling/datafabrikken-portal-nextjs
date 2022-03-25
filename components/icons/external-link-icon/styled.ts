import styled from 'styled-components';
import ExternalLinkIconBase from '../../../public/images/icon-new-window-light.inline.svg';

const ExternalLinkIcon = styled(ExternalLinkIconBase)`
  & > path {
    fill: currentColor;
  }
`;

export default { ExternalLinkIcon };
