import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import styles from './styles';
import { NewsService } from '../../../../service/applicatif/News.sa';
import { COLORS, images } from '../../../../resources/constants';
import { dateToStringMoreAccurate } from '../../../../data/factory/dateFactory';
import { NEWS_INFORMARIONS } from '../../../../data/constants/strings';
import Loader from '../../../components/Loader';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomModal from '../../../components/Modal';
import NewsWebViewScreen from '../NewsWebView';
import { useMobile } from '../../../../service/hooks/useMobile';
const NewsInformationScreen = (props: any) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [list, setList] = useState<any>(state.info || {});
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const { isMobile } = useMobile()
  const { getNewsById } = NewsService();

  const showDescription = () => {
    if (isMobile) {
      navigate('/NewsInformationScreenDescription', { state: { data: list } })
    } else {
      setVisible(true);
    }
  }

  const NewsById = async id => {
    setIsLoading(true);

    try {
      const res: any = await getNewsById(id);
      if (!res?.isError) {
        setList(res?.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!state?.info && state?.id) {
      NewsById(state?.id);
    }
  }, []);

  return (
    <ScrollView style={{ backgroundColor: COLORS.white, flex: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
      <CustomModal title={list?.category?.toUpperCase()} visible={visible} setVisible={setVisible} content={<NewsWebViewScreen data={list} />} />
      <View style={[isMobile ? { padding: 14 } : {}, styles.wrapperImg]}>
        <Image
          source={list?.image ? { uri: list?.image } : images.home}
          style={isMobile ? { width: '100%', height: 250, borderRadius: 10 } : styles.itemImg}
        />
      </View>
      <View style={{ paddingHorizontal: 16 }}>
        <View style={styles.wrapperText}>
          <Text style={styles.category}>{list?.category?.toUpperCase()}</Text>
          <TouchableOpacity
            onPress={showDescription}>
            <Text style={styles.title}>{list?.title}</Text>
          </TouchableOpacity>
          <Text style={styles.content}>{list?.description}</Text>
        </View>

        <Text style={styles.date}>
          {list?.publishedAt ? dateToStringMoreAccurate(list?.publishedAt) : ''}
        </Text>
        <Text style={styles.source}>{list?.author}</Text>

        {list?.url && (
          <TouchableOpacity
            style={styles.seeMoreContainer}
            onPress={showDescription}>
            <Text style={styles.seeMoreText}>{NEWS_INFORMARIONS.SEE_MORE}</Text>
          </TouchableOpacity>
        )}

      </View>
      {isLoading ? <Loader /> : null}
    </ScrollView>
  );
};

export default NewsInformationScreen;
