import React from 'react';
;
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { FormationSA } from '../../../service/applicatif/Formation.sa';
import ItemsComponent from '../ItemsComponent';
import Loader from '../Loader';
import styles from './styles';
import { DataView } from 'primereact/dataview';
import { Divider } from 'primereact/divider';

const ListItem = (props: any) => {
  const [ListFormation, setListFormation] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const {item, isAll} = props;
  const navigation = useNavigate();
  const {accessToken} = useSelector(({auth}: any) => auth);
  const {getFormationsByCategoryName, findAll} = FormationSA();

  const getFormations = async () => {
    setIsLoading(true);
    if (isAll) {
      const res = await findAll(accessToken);
      setListFormation(res?.data);
    }
    setIsLoading(false);
  };

  const getAnnouncesByCategory = async (name: string) => {
    setIsLoading(true);
    if (!isAll) {
      const res = await getFormationsByCategoryName(accessToken, name);
      setListFormation(res?.data?.items);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getFormations();
  }, [isAll]);

  useEffect(() => {
    getAnnouncesByCategory(item);
  }, [item]);

  const showDetailFormation = formation => {
    navigation('/EnterpriseOfferDetailsScreen', {state: {
      formation,
      candidat: true,
      isFormation: true}
  });
  };

  const renderItemTemplate = (formation, index) => (
    <>
    <ItemsComponent
      offer={formation}
      index={index}
      showDetails={() => showDetailFormation(formation)}
    />
    <Divider type={'dashed'} />
    </>
  );

  return (
    <div style={{overflowY: "auto", ...styles.listItemOffer}}>
      {isLoading && <Loader />}
      {ListFormation && <DataView value={ListFormation} layout="list" itemTemplate={renderItemTemplate} paginator rowsPerPageOptions={[4, 10, 50, 100]} rows={4} />}
    </div>
  );
};

export default ListItem;
