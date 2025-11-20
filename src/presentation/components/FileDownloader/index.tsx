import React, { useState } from 'react';
import { View, Text, Image, Linking, TouchableOpacity } from 'react-native';

import style from '../Inputs/style';
import { removeProtocolFromString } from '../../../data/factory';
import { icons } from '../../../resources/constants';
import globalStyle from '../../globalStyle/globalStyle';
import { PDFViewerScreen } from '../../container/protected/PDFVIewerScreen';
import * as stringsFr from '../../../data/constants/strings';
import * as stringsEn from '../../../data/constants/strings_en';
import { useLang } from '../../../data/translation';

interface FileDownloader {
  data: any;
  isPortfolio?: boolean;
}

const FileDownloader = (props: FileDownloader) => {
  const { data, isPortfolio } = props;
  const [visible, setVisible] = useState(false);
  const showPDFViewer = () => {
    if (isPortfolio) {
      Linking.openURL(`https://${removeProtocolFromString(data)}`);
    } else {
      setVisible(true);
    }
  };

  const { lang } = useLang();
  const activeString = lang === 'fr' ? stringsFr : stringsEn;

  return (
    <>
      <PDFViewerScreen visible={visible} setVisible={setVisible} data={data.file} isDownloadAllowed={false} />
      <TouchableOpacity onPress={() => showPDFViewer()}>
        <View style={globalStyle.fileDownloaderContainer}>
          <Image
            source={isPortfolio ? { uri: icons.globe } : { uri: icons.filetext }}
            style={style.fileImage}
          />
          <View style={globalStyle.displayLeftVerticalFile}>
            <Text style={style.txtBlue}>
              {isPortfolio ? activeString.DETAIL_PROFIL.PORTFOLIO : data.name}
            </Text>
            {!isPortfolio && <Text style={style.txtBlue}>{data.reference}</Text>}
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default FileDownloader;
