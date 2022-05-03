import styled from 'styled-components';
import { theme } from '../../styles/theme';

import NewsLetterIconBase from '../../../public/images/newsletter-default.svg';

const onDesktopView = '@media (min-width: 992px)';

const NewsletterSubscribe = styled.div`
  align-items: flex-start;
  display: flex;
  flex-flow: column;
  justify-content: space-evenly;
  font-size: ${theme.fontSize('FS12')};
  margin-bottom: ${theme.spacing('S48')};
  gap: ${theme.fontSize('FS8')};

  ${onDesktopView} {
    & {
      align-items: center;
      font-size: ${theme.fontSize('FS14')};
      flex-flow: row-reverse;
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
`;

const Title = styled.h3`
  font-size: ${theme.fontSize('FS18')};
  margin-bottom: ${theme.spacing('S10')};
`;

const Subtitle = styled.p`
  line-height: ${theme.fontSize('FS24')};
  margin-bottom: ${theme.spacing('S8')};
`;

const Disclaimer = styled.div`
  font-size: ${theme.fontSize('FS10')};

  & > a {
    text-decoration: underline;
  }
`;

const NewsLetterIcon = styled(NewsLetterIconBase)`
  height: 150px;
  transform: scale(-1, 1);
  ${onDesktopView} {
    & {
      height: 200px;
      transform: scale(1);
    }
  }
`;

export default {
  NewsletterSubscribe,
  Container,
  Title,
  Subtitle,
  Disclaimer,
  NewsLetterIcon
};
