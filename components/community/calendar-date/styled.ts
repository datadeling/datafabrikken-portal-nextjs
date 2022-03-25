import styled from 'styled-components';
import { theme } from '../../../styles/theme';

const CalendarDate = styled.div`
  display: flex;
  margin-bottom: ${theme.spacing('S10')};

  & > svg {
    margin-right: ${theme.spacing('S4')};
  }
`;

export default { CalendarDate };
