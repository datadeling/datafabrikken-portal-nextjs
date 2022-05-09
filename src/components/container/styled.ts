import styled, { css } from 'styled-components';

import { theme } from '../../styles/theme';

import { Variant } from './enums';

const onMobileView = '@media (max-width: 900px)';

type ContainerProps = {
  $variant?: Variant;
};

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: ${({ $variant }) => ($variant ? `${$variant}px` : '1200px')};
  z-index: 10;

  ${({ $variant }) => {
    if ($variant === Variant.WIDTH_720) {
      return css`
        @media (max-width: 721px) {
          & {
            width: 100%;
            padding: 0 ${theme.spacing('S32')};
          }
        }
      `;
    } else if ($variant === Variant.WIDTH_990) {
      return css`
        @media (max-width: 721px) {
          & {
            width: 100%;
            padding: 0 ${theme.spacing('S32')};
          }
        }
      `;
    } else {
      return css`
        @media (max-width: 1251px) {
          & {
            width: 100%;
            padding: 0 ${theme.spacing('S32')};
          }
        }
      `;
    }
  }}

  ${onMobileView} {
    & {
      padding: 0 calc(12px + (32 - 12) * ((100vw - 320px) / (900 - 320)));
    }
  }
`;

export default { Container };
