import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {useSelector} from 'react-redux';
import {styles} from './style';
import { UploadFileService } from '../../../../../service/applicatif/UploadFile.sa';
import { HttpStatus } from '../../../../../data/constants/Http-status';
import { useFavorites } from '../../../../../service/redux/ducks/favorites';
import { icons, images } from '../../../../../resources/constants';
import { resultDate } from '../../../../../data/factory/dateFactory';

const Item = props => {
  const {offer, showDetails, index} = props;
  const {accessToken} = useSelector(({auth}: any) => auth);

  const [avatar, setAvatar] = useState('');
  const {downloadImageById} = UploadFileService();

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

  const {allFavoris, removeFavoris, addFavoris} = useFavorites();

  useEffect(() => {
    const val =
      allFavoris &&
      allFavoris.find((element: any) => element?.ref === offer.ref);

    if (val) {
      handleSelection(offer);
    }
  }, [allFavoris]);

  const handleSelection = item => {
    if (selectedItems.includes(item?.ref)) {
      setSelectedItems(selectedItems.filter(ln => ln != item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const addOrRemove = item => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(ln => ln != item));
      removeFavoris(item.id);
    } else {
      setSelectedItems([...selectedItems, item]);
      addFavoris(item.id);
    }
  };

  return (
    <TouchableOpacity
      key={index}
      style={styles.card_templateItem}
      onPress={() => showDetails(offer.id)}>
      <Image
        source={avatar ? {uri: avatar} : images.avatar_6}
        style={styles.image}
      />
      <View style={styles.wrapperTextItem}>
        <Text style={styles.itemTitle}>{offer?.name}</Text>
        <Text style={styles.jobPlaceItem}>{offer?.lieu}</Text>

        <Text style={styles.jobPlaceItem}>{offer?.type?.name}</Text>
      </View>
      <TouchableOpacity
        style={styles.footerFrame}
        onPress={() => addOrRemove(offer)}>
        <Text style={styles.candidatExp}>{resultDate(offer.createdAt)}</Text>
        <View style={styles.favorisView}>
          <Image
            style={styles.favorisImage}
            source={
              selectedItems.includes(offer) ? icons.favoris : icons.deFavoris
            }
          />
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const FlatOffer = props => {
  const {offerList, showDetails} = props;

  return (
    <ScrollView style={styles.listItemOffer}>
      {offerList?.map((offer, index) => (
        <Item offer={offer} index={index} showDetails={showDetails} />
      ))}
      <View style={{height: 100}}></View>
    </ScrollView>
  );
};
export default FlatOffer;
