import styled, { css } from 'styled-components';
import { Colour, theme } from '../../theme';
import ContainerSC from '../../../components/container/styled';

const onMobileView = '@media (max-width: 900px)';
const errorColour = '#cc527a';

const Root = styled.main`
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  word-break: break-word;
  background-color: ${theme.colour(Colour.BLUE, 'B02')};
  color: ${theme.colour(Colour.BLUE, 'B52')};

  & > div:first-child {
    flex: 0;
  }
`;

const FormWrapper = styled.div`
  padding: 48px;
  background: ${theme.colour(Colour.NEUTRAL, 'N0')};
  margin: 0 auto ${theme.spacing('S40')} auto;
  box-shadow: 0px 12px 48px ${theme.colour(Colour.BLUE, 'B38', 15)};
  border-radius: 2px;

  & button {
    border: 0;
  }
`;

const Container = styled(ContainerSC.Container)`
  padding-top: ${theme.spacing('S4')};
  ${onMobileView} {
    padding-top: ${theme.spacing('S2')};
  }
`;

const FormFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${theme.spacing('S20')};
  font-size: ${theme.fontSize('FS12')};
  line-height: 1.5;
`;

const FormField = styled.div<{ $small?: boolean; $error?: string }>`
  & > input {
    margin-bottom: ${theme.spacing('S4')};
  }

  & > input,
  & > textarea {
    border-radius: 2px;
    border-width: 1px;
    border-style: solid;
    padding: ${theme.spacing('S4')};
    width: 100%;
    resize: vertical;
  }
  ${({ $error }) =>
    $error &&
    css`
      & > input,
      & > textarea {
        border: 2px solid ${errorColour};
      }
    `}

  ${({ $small }) =>
    $small &&
    css`
      & > input {
        width: 50%;
      }

      ${onMobileView} {
        & > input {
          width: 100%;
        }
      }
    `}
`;

const FormFieldLabel = styled.p`
  font-weight: ${theme.fontWeight('FW400')};
  font-size: ${theme.fontSize('FS14')};
`;

const FormFieldLabelDescription = styled.p``;

const FormIngress = styled(ContainerSC.Container)`
  font-size: ${theme.fontSize('FS12')};
  line-height: 1.5;
  padding-bottom: ${theme.spacing('S16')};
`;

const SubmitButton = styled.button<{ disabled: boolean }>`
  padding: 14px 22px 14px 24px;
  background-color: ${theme.colour(Colour.BLUE, 'B16')};
  color: ${theme.colour(Colour.BLUE, 'B52')};
  min-width: 170px;

  &:hover {
    background-color: ${theme.colour(Colour.BLUE, 'B48')};
    color: ${theme.colour(Colour.BLUE, 'B16')};
    cursor: pointer;
  }

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: ${theme.colour(Colour.NEUTRAL, 'N15')};
      color: ${theme.colour(Colour.NEUTRAL, 'N50')};
      &:hover {
        background-color: ${theme.colour(Colour.NEUTRAL, 'N15')};
        color: ${theme.colour(Colour.NEUTRAL, 'N50')};
        cursor: default;
      }
    `}
`;

const TextError = styled.div`
  color: #cc527a;
`;

const Confirmation = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing('S20')};

  & > div:last-child {
    flex-grow: 1;
  }
`;

const SubmitFailed = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing('S20')};
  background-color: #fff5f8;
  padding: 12px;
  margin-top: ${theme.spacing('S20')};

  & > div:last-child {
    flex-grow: 1;
  }
`;

export default {
  Root,
  Container,
  FormWrapper,
  FormFieldWrapper,
  FormField,
  FormFieldLabel,
  FormFieldLabelDescription,
  FormIngress,
  SubmitButton,
  TextError,
  Confirmation,
  SubmitFailed
};
