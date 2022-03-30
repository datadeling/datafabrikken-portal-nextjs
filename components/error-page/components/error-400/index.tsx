import React, { FC } from 'react';

import SC from './styled';
import Translation from '../../../translation';

const Error400: FC = () => (
  <SC.Container>
    <SC.Error400>
      <SC.Error404Icon />
      <SC.Title>
        <Translation id='errorPage.clientError.title' />
      </SC.Title>
      <SC.SubTitle>
        <Translation id='errorPage.clientError.content' />
      </SC.SubTitle>
      <SC.Link to='/'>
        <Translation id='errorPage.clientError.backLink' />
      </SC.Link>
    </SC.Error400>
  </SC.Container>
);

export default Error400;
