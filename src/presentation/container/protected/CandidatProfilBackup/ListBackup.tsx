import React, { useEffect, useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
;
import { useFavorites } from '../../../../service/redux/ducks/favorites';
import { ProfilBackup } from '../../../components/CandidatProfilBackup/ProfilBackup';
import Loader from '../../../components/CreateCV/Loader';
import { DataView } from 'primereact/dataview';
import { Divider } from 'primereact/divider';
import { COLORS, icons } from '../../../../resources/constants';
import { paginatorTemplateCustom } from '../../../components/PaginatoTemplateCustom';
import NotFounds from '../../../components/NotFounds';
import { useMobile } from '../../../../service/hooks/useMobile';
import MiniLoader from '../../../components/MiniLoader';
export const ListBackup = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { isFavorite, detailsFavorites } = props;
  const [listFavorite, setListFavorite] = useState<any>([]);

  const { user } = useSelector(({ auth }) => auth);

  const { deleteFavoris, allFavorites } = useFavorites();

  const { isMobile,loading } = useMobile()

  const removeFavoris = async (idJob) => {
    setIsLoading(false);
    try {
      const response = await deleteFavoris(user?.accessToken, idJob);

      if (!response?.isError) {
        await getAllFavorites();
      }
    } catch (error) { }
  };

  const renderItemTemplate = (item, index) => (
    <Fragment>
      <ProfilBackup
        item={item}
        index={index}
        isFavorite={isFavorite}
        removeFavoris={removeFavoris}
        detailsFavorites={detailsFavorites}
      />
    </Fragment>
  );

  const getAllFavorites = async () => {
    try {
      const responseAllFav = await allFavorites(user?.accessToken);
      if (!responseAllFav?.isError) {
        const { items } = responseAllFav.data;
        setListFavorite(items[0]?.job || []);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setListFavorite([]);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getAllFavorites();
  }, []);

  const loadingGlobal=isLoading||loading;


  return (
    <div >
      {/** Listes des candidtas */}
      {loadingGlobal ? <Loader /> :
        listFavorite.length ? (
          <DataView
            value={listFavorite}
            layout="list"
            itemTemplate={renderItemTemplate}
            {...(!isMobile
              ? {
                paginator: true,
                rows: 3,
                paginatorTemplate: paginatorTemplateCustom
              }
              : {})}
          />
        ) : (
          <NotFounds label='Aucun poste n’a été enregistré' />
        )}
    </div>
  );
};