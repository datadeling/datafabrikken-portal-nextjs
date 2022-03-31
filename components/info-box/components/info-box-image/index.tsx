import React, { memo, FC } from 'react';
import Image from 'next/image';
import SC from './styled';

interface Props {
  src: string;
  alt: string;
  hoverSrc?: string;
  hoverAlt?: string;
}

const isSvg = (src: string) => src.endsWith('.svg');

const InfoBoxImage: FC<Props> = ({
  alt,
  src,
  hoverSrc,
  hoverAlt,
  ...props
}) => (
  <SC.InfoBoxImage $hasHover={!!hoverSrc}>
    {isSvg(src) ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt} {...props} />
    ) : (
      <Image objectFit='cover' layout='fill' src={src} alt={alt} {...props} />
    )}
    {hoverSrc &&
      (isSvg(hoverSrc) ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img alt={hoverAlt} src={hoverSrc} {...props} />
      ) : (
        <Image
          objectFit='cover'
          layout='fill'
          alt={hoverAlt}
          src={hoverSrc}
          {...props}
        />
      ))}
  </SC.InfoBoxImage>
);

export default memo(InfoBoxImage);
