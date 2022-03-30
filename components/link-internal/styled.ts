import styled from 'styled-components';

const InternalLink = styled.a`
  text-decoration: underline;
  & > svg {
    width: 20px;
    vertical-align: text-bottom;
  }

  &:hover {
    & > svg {
      animation-play-state: running !important;
    }
  }
`;

export default { InternalLink };
