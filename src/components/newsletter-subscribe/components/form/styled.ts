import styled from 'styled-components';
import { Colour, theme } from '../../../../styles/theme';

const onDesktopView = '@media (min-width: 992px)';

const NewsletterForm = styled.div`
  display: flex;
  flex-flow: column;
  gap: ${theme.spacing('S10')};
`;

const Container = styled.div`
  display: flex;
  flex-flow: column;
  gap: ${theme.spacing('S6')};
  ${onDesktopView} {
    & {
      flex-flow: row;
    }
  }
`;

const InputField = styled.div`
  align-items: center;
  background-color: rgb(255, 255, 255);
  box-sizing: border-box;
  border: 1px solid rgb(18, 22, 25);
  border-radius: 5px;
  display: flex;
  height: 50px;
  position: relative;

  & > input {
    border: none;
    background-color: transparent;
    display: flex;
    flex: 1;
    font-size: ${theme.fontSize('FS14')};
    padding: ${theme.spacing('S4')};
  }

  ${onDesktopView} {
    & {
      min-width: 600px;
    }
  }
`;

const SubmitButton = styled.button`
  align-items: center;
  background-color: ${theme.colour(Colour.BLUE, 'B20')};
  border: 1px solid rgb(18, 22, 25);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  font-size: ${theme.fontSize('FS12')};
  padding: ${theme.spacing('S10')} ${theme.spacing('S12')};
  height: 50px;

  &:hover {
    background-color: ${theme.colour(Colour.BLUE, 'B08')};
  }
  &:active,
  &:focus {
    outline: auto;
  }
`;

const NewsLetterInfo = styled.div`
  display: flex;
  & > div {
    margin-bottom: ${theme.spacing('S12')};
  }
`;

export default {
  NewsletterForm,
  Container,
  InputField,
  SubmitButton,
  NewsLetterInfo
};
