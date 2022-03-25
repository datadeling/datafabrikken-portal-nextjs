import React, { FC } from 'react';

import SC from './styled';

const UpIconBase = '/public/images/up-onmouseover.inline.svg';

interface Props {}

const UpIcon: FC<Props> = () => <SC.UpIcon src={UpIconBase} layout='fill' />;

export default UpIcon;
