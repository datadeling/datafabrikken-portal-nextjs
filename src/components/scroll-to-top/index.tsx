import React, { FC } from 'react';

import UpIcon from '../icons/up-icon';

import SC from './styled';
import Translation from '../translation';

interface Props {
  invertColor?: boolean;
  alternativeBackgroundColor?: boolean;
}

const ScrollToTop: FC<Props> = ({
  invertColor,
  alternativeBackgroundColor
}) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <SC.ScrollToTop
      $invertColor={invertColor}
      $alternativeBackgroundColor={alternativeBackgroundColor}
    >
      <SC.ScrollButton onClick={scrollToTop}>
        <Translation id='toTop' />
        <UpIcon />
      </SC.ScrollButton>
    </SC.ScrollToTop>
  );
};

export default ScrollToTop;
