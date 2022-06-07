import React, {
  Children,
  FC,
  isValidElement,
  memo,
  PropsWithChildren
} from 'react';

import FactBoxTitle from '../fact-box-title';
import FactBoxBody from '../fact-box-body';

import SC from './styled';

interface Props {
  small?: boolean;
}

const FactBox: FC<PropsWithChildren<Props>> = ({ small = false, children }) => {
  const renderFactBoxTitle = () =>
    Children.map(children, child =>
      isValidElement(child) && child.type === FactBoxTitle ? child : null
    )?.shift();

  const renderFactBoxBody = () =>
    Children.map(children, child =>
      isValidElement(child) && child.type === FactBoxBody ? child : null
    )?.shift();

  return (
    <SC.FactBox $small={small}>
      {renderFactBoxTitle()}
      {renderFactBoxBody()}
    </SC.FactBox>
  );
};

export default memo(FactBox);
