import React, { useEffect, useState } from 'react';

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
  const { isMobile } = useMobile();
  const { getNewsById } = NewsService();

  const showDescription = () => {
    if (isMobile) {
      navigate('/NewsInformationScreenDescription', { state: { data: list } });
    } else {
      setVisible(true);
    }
  };

  const NewsById = async (id) => {
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
    <div
      style={{
        overflowY: 'auto',
        backgroundColor: COLORS.white,
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
    >
      <CustomModal
        title={list?.category?.toUpperCase()}
        visible={visible}
        setVisible={setVisible}
        content={<NewsWebViewScreen data={list} />}
      />
      <div
        style={{ ...(isMobile ? { padding: 14 } : {}), ...styles.wrapperImg }}
      >
        <img
          src={list?.image ? { uri: list?.image } : images.home}
          style={
            isMobile
              ? { width: '100%', height: 250, borderRadius: 10 }
              : styles.itemImg
          }
        />
      </div>
      <div style={{ paddingHorizontal: 16 }}>
        <div style={styles.wrapperText}>
          <span style={styles.category}>{list?.category?.toUpperCase()}</span>
          <button onClick={showDescription}>
            <span style={styles.title}>{list?.title}</span>
          </button>
          <span style={styles.content}>{list?.description}</span>
        </div>

        <span style={styles.date}>
          {list?.publishedAt ? dateToStringMoreAccurate(list?.publishedAt) : ''}
        </span>
        <span style={styles.source}>{list?.author}</span>

        {list?.url && (
          <button style={styles.seeMoreContainer} onClick={showDescription}>
            <span style={styles.seeMoreText}>{NEWS_INFORMARIONS.SEE_MORE}</span>
          </button>
        )}
      </div>
      {isLoading ? <Loader /> : null}
    </div>
  );
};

export default NewsInformationScreen;
