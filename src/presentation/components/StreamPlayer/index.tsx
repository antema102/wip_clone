import React from 'react';
import { styles } from './style';
import { v4 as uuid } from 'uuid';
import { useSelector } from 'react-redux';

import urls from '../../../data/constants/urls';
import { ROLEACCOUNT } from '../../../data/constants/strings';

interface videoPlayerProps {
  id?: any;
  width?: number | string;
  height?: number | string;
  poster?: string;
  isStyled?: boolean;
  isExample?: boolean;
  candidatId?: string;
  viewOnly?: boolean;
}

const StreamPlayer = ({
  width,
  height,
  poster,
  isStyled = true,
  id = uuid(),
  isExample,
  candidatId,
  viewOnly,
}: videoPlayerProps) => {
  const { user } = useSelector(({ auth }: any) => auth);
  const userId = candidatId || user?.id;
  const handlingVideoURL = () => {
    if (isExample) {
      return urls.DOWNLOAD_VIDEO_EXAMPLE_STREAM;
    } else if (user?.role === ROLEACCOUNT.company) {
      if (viewOnly) {
        return `${urls.STREAM}/${userId}`;
      } else {
        return `${urls.STREAM_VIDEO_ENTERPRISE}/${userId}`;
      }
    } else {
      return `${urls.STREAM}/${userId}`;
    }
  };
  return (
    <>
      <video
        width={width || '100%'}
        height={height || 300}
        id={id}
        controls
        autoPlay={true}
        poster={poster || 'https://i.picsum.photos/id/866/1600/900.jpg'}
        style={isStyled ? styles.videoShape : null}
      >
        <source id={id} src={`${handlingVideoURL()}`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </>
  );
};

export default StreamPlayer;
