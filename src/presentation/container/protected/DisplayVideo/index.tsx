import React, {useState, useEffect} from 'react';
import { View } from 'react-native';
import StreamPlayer from '../../../components/StreamPlayer';

type DisplayVideoProps = {
 isExample?:boolean,
 candidatId?: string,
 viewOnly?:boolean,
}

const DisplayVideo = ({ isExample, candidatId, viewOnly}: DisplayVideoProps ) => {
  return (
    <View style={{minWidth:700, marginTop: 0}}>
        <StreamPlayer isExample={isExample} candidatId={candidatId} viewOnly={viewOnly} />
    </View>
  );
};

export default DisplayVideo;
