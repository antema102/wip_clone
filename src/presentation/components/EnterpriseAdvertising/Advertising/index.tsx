import React from 'react';
import { styles } from './styles';
import { COLORS, images } from '../../../../resources/constants';
import { useNavigate } from 'react-router-dom';
interface AdvertisingType {
  isAd: number;
  data: {
    image: string;
    file: string;
    isVideo: string;
    name: string;
    title: string;
    description: string;
    link: string;
    contact: string;
  };
}

export const Advertising = (props: AdvertisingType) => {
  const navigate = useNavigate();
  const { data, isAd } = props;
  const advertisementImage = `${isAd ? data?.image : data?.file}`;
  return (
    <button
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 24,
        padding: 24,
        borderRadius: 10,
        backgroundColor: 'rgba(51, 153, 255, 0.1)',
        margin: 20,
      }}
      onClick={() => {
        navigate('/EntrepriseOfferCreateScreen', {
          state: {
            data,
            advertisement: isAd ? 0 : 1,
          },
        });
      }}
    >
      <div style={styles.candidateImgContainer}>
        <img
          style={styles.candidatImg}
          src={data.isVideo ? images.thumbnail : { uri: advertisementImage }}
        />
      </div>
      <div style={styles.candidateDetailsContainer}>
        <span style={styles.candidatName}>{isAd ? data.name : data.title}</span>
        <span style={styles.candidatPost}>{data.description}</span>
        <span style={styles.candidatPost}>
          {isAd ? data.link : data?.contact}
        </span>
      </div>
    </button>
  );
};
