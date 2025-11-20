import React, { useState } from 'react';
import { Form } from './Form';
import { formsStyles } from '../../../../globalStyle/formStyles';
import { useLogin } from '../../EnterpriseOfferCreateScreen/EntrepriseOfferCreate/useLogin';
import { styles } from './styles';
import { COLORS } from '../../../../../resources/constants';
import TitleRefont from '../../../../components/TitleRefont';
const EntrepriseFormationCreate = (props: any) => {
  const [postSucces, setPostSuccess] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);

  const [error, setError] = useState('');
  const { handleSubmit, handleCancel } = useLogin(props);
  const { navigation, route } = props;
  const detailOffer = route?.params?.detailOffer;
  return (
    <div style={formsStyles.formLogInscr}>
      <TitleRefont title={`Création formation , stage, alternance`} />
      {!postSucces && !IsLoading ? (
        <Form
          data={detailOffer}
          insciptionAction={null}
          error={error}
          onCancelForm={handleCancel}
          onSubmitForm={handleSubmit}
          navigation={navigation}
        />
      ) : (
        <div />
      )}
    </div>
  );
};
export default EntrepriseFormationCreate;
