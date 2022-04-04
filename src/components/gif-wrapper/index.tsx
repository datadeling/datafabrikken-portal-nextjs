import React, { FC, memo, useState } from 'react';
import Image from 'next/image';

import Translation from '../translation';

import SC from './styled';

const pauseIconSrc = '/../icons/pause-icon';
const playIconSrc = '/../icons/play-icon';

interface Props {
  src: string;
  alt?: string;
  height: number;
  width: number;
}

const GifWrapper: FC<Props> = ({ src, alt, height, width }) => {
  const [hidden, setHidden] = useState(true);

  return (
    <SC.GifContainer
      height={height}
      width={width}
      $src={src}
      $showGif={!hidden}
    >
      <SC.AccessibleGif src={src} alt={alt} />

      {hidden ? (
        <SC.PlayButton onClick={() => setHidden(false)}>
          <Image layout='fill' alt='PlayIcon' src={playIconSrc} />
          <Translation id='community.comments.gif.play' />
        </SC.PlayButton>
      ) : (
        <SC.PauseButton onClick={() => setHidden(true)}>
          <Image layout='fill' alt='PauseIcon' src={pauseIconSrc} />
          <span>
            <Translation id='community.comments.gif.pause' />
          </span>
        </SC.PauseButton>
      )}
    </SC.GifContainer>
  );
};

export default memo<FC<Props>>(GifWrapper);
