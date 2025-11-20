import React from 'react';
import { styles } from './style';
import { v4 as uuid } from 'uuid';

interface videoPlayerProps {
  id?: any;
  filePath: string;
  width?: number | string;
  height?: number | string;
  poster?: string;
  isStyled?: boolean;
  autoplay?: boolean;
}

const VideoPlayer = ({
  filePath,
  width,
  height,
  poster,
  isStyled = true,
  autoplay = true,
  id = uuid(),
}: videoPlayerProps) => {
  return (
    <>
      {filePath !== '' ? (
        <video
          width={width || '100%'}
          height={height || 300}
          id={id}
          controls
          autoPlay={autoplay}
          poster={poster || 'https://i.picsum.photos/id/866/1600/900.jpg'}
          style={isStyled ? styles.videoShape : null}
        >
          <source id={id} src={filePath} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : null}
    </>
  );
};

export default VideoPlayer;
