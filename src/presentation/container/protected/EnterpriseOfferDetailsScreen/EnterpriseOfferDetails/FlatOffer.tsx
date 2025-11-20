import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { styles } from './style';
import { UploadFileService } from '../../../../../service/applicatif/UploadFile.sa';
import { HttpStatus } from '../../../../../data/constants/Http-status';
import { useFavorites } from '../../../../../service/redux/ducks/favorites';
import { icons, images } from '../../../../../resources/constants';
import { resultDate } from '../../../../../data/factory/dateFactory';

const Item = (props) => {
  const { offer, showDetails, index } = props;
  const { accessToken } = useSelector(({ auth }: any) => auth);

  const [avatar, setAvatar] = useState('');
  const { downloadImageById } = UploadFileService();

  const getAvatar = async (id: string, accessToken) => {
    try {
      const responseGetAvatar: any = await downloadImageById(id, accessToken);
      if (responseGetAvatar) {
        setAvatar(URL.createObjectURL(responseGetAvatar));
      }
    } catch (error) {}
  };
  useEffect(() => {
    getAvatar(offer?.proprietaire?.id, accessToken);
  }, []);
  const [selectedItems, setSelectedItems] = React.useState([]);

  const { allFavoris, removeFavoris, addFavoris } = useFavorites();

  useEffect(() => {
    const val =
      allFavoris &&
      allFavoris.find((element: any) => element?.ref === offer.ref);

    if (val) {
      handleSelection(offer);
    }
  }, [allFavoris]);

  const handleSelection = (item) => {
    if (selectedItems.includes(item?.ref)) {
      setSelectedItems(selectedItems.filter((ln) => ln != item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const addOrRemove = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((ln) => ln != item));
      removeFavoris(item.id);
    } else {
      setSelectedItems([...selectedItems, item]);
      addFavoris(item.id);
    }
  };

  return (
    <button
      key={index}
      style={styles.card_templateItem}
      onClick={() => showDetails(offer.id)}
    >
      <img src={avatar || images.avatar_6} style={styles.image} />
      <div style={styles.wrapperTextItem}>
        <span style={styles.itemTitle}>{offer?.name}</span>
        <span style={styles.jobPlaceItem}>{offer?.lieu}</span>

        <span style={styles.jobPlaceItem}>{offer?.type?.name}</span>
      </div>
      <button
        style={styles.footerFrame}
        onClick={() => {
          addOrRemove(offer);
        }}
      >
        <span style={styles.candidatExp}>{resultDate(offer.createdAt)}</span>
        <div style={styles.favorisView}>
          <img
            style={styles.favorisImage}
            src={
              selectedItems.includes(offer) ? icons.favoris : icons.deFavoris
            }
          />
        </div>
      </button>
    </button>
  );
};

const FlatOffer = (props) => {
  const { offerList, showDetails } = props;

  return (
    <div style={{ overflowY: 'auto', ...styles.listItemOffer }}>
      {offerList?.map((offer, index) => (
        <Item offer={offer} index={index} showDetails={showDetails} />
      ))}
      <div style={{ height: 100 }}></div>
    </div>
  );
};
export default FlatOffer;
