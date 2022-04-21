import { css } from 'styled-components';

export default css`
  html,
  body {
    height: 100%;
  }

  body {
    overflow-x: hidden;
    overflow-y: scroll;
  }

  body,
  #__next {
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
  }

  body.no-scroll {
    overflow: hidden;
  }
`;
