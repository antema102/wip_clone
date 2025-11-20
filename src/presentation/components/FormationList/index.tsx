import React, { useEffect, useState } from 'react';
;
import { useSelector } from 'react-redux';
import { useFormation } from '../../../service/redux/ducks/formation';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';
import { ListFormation } from './ListFormation';
import { stylesCard } from '../SideBarCandidat/styles';

export const EnterpriseFormationList = () => {
  const navigate = useNavigate();
  const { findAllFormationByCompanyId } = useFormation();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [formationList, setFormationList] = useState<string[]>([]);

  const { user, accessToken } = useSelector(({ auth }) => auth);


  const findAllFormation = async () => {
    try {
      const response = await findAllFormationByCompanyId(accessToken, user?.id);
      if (!response.isError) {
        setFormationList(response);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const displayFormationDetails = (formation: string) => {
    navigate('/EnterpriseOfferSheetScreen', {
      state: {
        formation,
        isFormation: true}});
  };

  useEffect(() => {
    init();
    setRefreshing(false);
  }, []);

  const init = () => {
    findAllFormation();
    setRefreshing(false);
  };

  return (
    <div style={{}}>
      <div style={stylesCard.containerFormList}>
        {!isLoading ? (
          <ListFormation
            data={formationList}
            displayOfferSheet={displayFormationDetails}
            displayOfferSheetApply={null}
            isFormation={true}
          />
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export const EnterpriseFormationListScreen: any = EnterpriseFormationList;
