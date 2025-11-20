import React, {useState, useEffect} from 'react';
;
import StreamPlayer from '../../../components/StreamPlayer';

type DisplayVideoProps = {
 isExample?:boolean,
 candidatId?: string,
 viewOnly?:boolean}

const DisplayVideo = ({ isExample, candidatId, viewOnly}: DisplayVideoProps ) => {
  return (
    <div style={{minWidth:700, marginTop: 0}}>
        <StreamPlayer isExample={isExample} candidatId={candidatId} viewOnly={viewOnly} />
    </div>
  );
};

export default DisplayVideo;
