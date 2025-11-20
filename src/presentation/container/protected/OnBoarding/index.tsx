import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Text, View, Image, ScrollView } from 'react-native'
import { Dialog } from 'primereact/dialog';
import { Carousel } from 'primereact/carousel';
import { images } from '../../../../resources/constants';
import { styles } from './styles';

const OnBoarding = () => {

  const { onboarding1, onboarding2, onboarding3 } = images;

  const onBoardings = [
    {
      title: 'WIPwork',
      description:
        'World Intermediation Plateform met en relation instantanément et sans intermédiaire les differents acteurs du monde de l’emploi.',
      img: onboarding1,
    },
    {
      title: 'Entreprise, candidat ou particulier, ',
      description:
        'Trouvez les meilleurs profils en adéquation avec vos attentes et atteignez de nouveaux sommets ensemble !',
      img: onboarding2,
    },
    {
      title: 'Connectez-vous maintenant !',
      description:
        'Pour rejoindre une communauté passionnée de talents et d’opportunités.',
      img: onboarding3,
    },
  ];


  const responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '991px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1
    }
  ];


  const itemTemplate = (item: any) => {
    return (
      <Fragment>
        <View style={{ alignItems: 'center', marginHorizontal: 30, bottom: 60 }}>
          <View style={styles.Logo}>
            <Image
              style={styles.productImg}
              source={images.logo}
            />
          </View>
          <Text style={styles.name}>{item?.title}</Text>
          <Text style={styles.description}>{item?.description}</Text>
        </View>
        <View style={styles.separator}></View>
      </Fragment>
    );
  };
  return (
      <View style={styles.container}>
        <Carousel value={onBoardings} numVisible={1} numScroll={1} responsiveOptions={responsiveOptions} className="custom-carousel" circular
          autoplayInterval={3000} itemTemplate={itemTemplate} />
      </View>
  );
};

export default OnBoarding;