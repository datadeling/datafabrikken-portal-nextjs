import React, {
  Children,
  ComponentPropsWithoutRef,
  FC,
  isValidElement,
  memo,
  PropsWithChildren
} from 'react';

import Link from 'next/link';
import InfoBoxImage from '../info-box-image';
import InfoBoxIcon from '../info-box-icon';
import InfoBoxTitle from '../info-box-title';
import InfoBoxBody from '../info-box-body';
import InfoBoxBodyRight from '../info-box-body-right';

import SC from './styled';

interface Props extends ComponentPropsWithoutRef<'a'> {
  invertColor?: boolean;
  externalLink?: boolean;
}

const InfoBox: FC<PropsWithChildren<Props>> = ({
  invertColor,
  externalLink,
  children,
  ...props
}) => {
  const renderInfoBoxImage = () =>
    Children.map(children, child =>
      isValidElement(child) && child.type === InfoBoxImage ? (
        <SC.ImageWrapper>{child}</SC.ImageWrapper>
      ) : null
    )?.shift();

  const renderInfoBoxIcon = () =>
    Children.map(children, child =>
      isValidElement(child) && child.type === InfoBoxIcon ? (
        <SC.IconWrapper>{child}</SC.IconWrapper>
      ) : null
    )?.shift();

  const renderInfoBoxDate = () =>
    Children.map(children, child =>
      isValidElement(child) && child.type === SC.Date ? child : null
    )?.shift();

  const renderInfoBoxTitle = () =>
    Children.map(children, child =>
      isValidElement(child) && child.type === InfoBoxTitle ? child : null
    )?.shift();

  const renderInfoBoxBody = () =>
    Children.map(children, child =>
      isValidElement(child) && child.type === InfoBoxBody ? child : null
    )?.shift();

  const renderInfoBoxBodyRight = () =>
    Children.map(children, child =>
      isValidElement(child) && child.type === InfoBoxBodyRight ? (
        <SC.ContentRightWrapper>{child}</SC.ContentRightWrapper>
      ) : null
    )?.shift();

  return (
    <SC.InfoBox $invertColor={invertColor} {...props}>
      <SC.InfoBoxHeader>{renderInfoBoxImage()}</SC.InfoBoxHeader>
      <SC.InfoBoxRow>
        {renderInfoBoxIcon()}
        <SC.ContentWrapper>
          {renderInfoBoxDate()}
          {renderInfoBoxTitle()}
          {renderInfoBoxBody()}
        </SC.ContentWrapper>
        {renderInfoBoxBodyRight()}
      </SC.InfoBoxRow>
    </SC.InfoBox>
  );
};

const LinkWrapper: FC<PropsWithChildren<Props>> = ({
  externalLink,
  href,
  ...props
}) =>
  !externalLink && href ? (
    <Link href={href} passHref>
      <InfoBox {...props} />
    </Link>
  ) : (
    <InfoBox {...props} />
  );

export default memo(LinkWrapper);
