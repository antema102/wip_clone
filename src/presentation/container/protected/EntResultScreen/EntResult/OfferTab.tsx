import { Fragment, useEffect, useState } from 'react';

import FlatOffer from './FlatOffer';
import styles from './styles';
import { useOfferr } from '../../../../../service/redux/ducks/offer';
import Loader from '../../../../components/Loader';
import { useNavigate } from 'react-router-dom';
import { Divider } from 'primereact/divider';
import { DataView } from 'primereact/dataview';
import { paginatorTemplateCustom } from '../../../../components/PaginatoTemplateCustom';
import { useMobile } from '../../../../../service/hooks/useMobile';
export const OfferTab = (props) => {
  const { avatar } = props;

  const { isMobile } = useMobile();

  const navigate = useNavigate();
  const displayDetail = (ItemDetail) => {
    navigate('/EnterpriseOfferDetailsScreen', {
      state: {
        id: ItemDetail.id,
        candidat: true,
        typeId: ItemDetail?.type?.id,
      },
    });
  };
  const { companyId, ItemDetail } = props?.route?.params || {};
  const id = companyId || ItemDetail?.senderId;
  const [offerList, setOfferList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { allOfferJobByEnt } = useOfferr();

  useEffect(() => {
    getOfferJobById();
  }, []);

  const getOfferJobById = async () => {
    try {
      const response = await allOfferJobByEnt('', id);
      setOfferList(response?.data?.items);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const renderItemTemplate = (item: any) => (
    <Fragment>
      <FlatOffer
        avatar={avatar}
        key={item.id}
        variable={item}
        displayDetail={displayDetail}
      />
      <Divider type={'dashed'} />
    </Fragment>
  );

  // const displayFlatOffer = () => {
  //   return (
  //     <div>
  //       {offerList?.map(item => (
  //         <div>
  //           <FlatOffer
  //             avatar={avatar}
  //             key={item.id}
  //             variable={item}
  //             displayDetail={displayDetail}
  //           />
  //         </div>
  //       ))}
  //     </div>
  //   );
  // };

  return (
    <div style={styles.contenOffer}>
      {isLoading ? <Loader /> : null}
      <div style={{ padding: 20 }}>
        <DataView
          value={offerList}
          layout="list"
          itemTemplate={renderItemTemplate}
          {...(!isMobile
            ? {
                paginator: true,
                paginatorTemplate: paginatorTemplateCustom,
                rows: 4,
              }
            : {})}
        />
      </div>
    </div>
  );
};
