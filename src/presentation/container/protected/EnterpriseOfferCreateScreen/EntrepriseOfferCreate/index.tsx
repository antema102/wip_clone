import React, { useState } from 'react';
;
import { defaultValues } from './dto';
import { Form } from './FormWeb';
import { FormAdvertisement } from './FormAdvertisement';
import { FormPost } from './FormPost';
import { formsStyles } from '../../../../globalStyle/formStyles';
import { useSelector } from 'react-redux';
import { useLogin } from './useLogin';
import MainPageHeader from '../../../../components/MainPageHeader';
import { styles } from './styles';
import { COLORS } from '../../../../../resources/constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormTender } from './FormTender';
import { TitleLabels } from './titleLabels';
import { TitleLabels_en } from './titleLabels_en';
import { useLang } from '../../../../../data/translation';
import HeaderTitle from '../../HeaderTitle';
import TitleRefont from '../../../../components/TitleRefont';
const dataws = {
    ...defaultValues};

const EntrepriseOfferCreate = (props: any) => {
    const [dataDto, setDataDto] = useState(dataws);
    const [postSucces, setPostSuccess] = useState(false);
    const [IsLoading, setIsLoading] = useState(false);

    const { lang } = useLang();
    const activeString = lang === 'fr' ? TitleLabels : TitleLabels_en;

    const { user, accessToken } = useSelector(({ auth }: any) => auth);
    const navigate = useNavigate();
    const { state } = useLocation();
    const [error, setError] = useState('');
    const { handleSubmit, handleCancel } = useLogin(props);
    const detailOffer = state?.offerDetail;
    const advertisement = state?.advertisement;
    const costsPrice = state?.costsPrice;
    const data = state?.data;

    const returnTitle = () => {
        if (data && advertisement === 0) {
            return activeString.titleLab.visual_pub;
        }
        if (data && advertisement === 1) {
            return activeString.titleLab.visual_annonce;
        }
        if (!data && advertisement === 0) {
            return activeString.titleLab.create_pub;
        }
        if (!data && advertisement === 1) {
            return activeString.titleLab.create_annonce;
        }
        if (!data && advertisement === 2) {
            return activeString.titleLab.create_offer;
        }
        if (!data && !advertisement) {
            return activeString.titleLab.create_job;
        }
    };


    return (

        <div style={[styles.containers, { backgroundColor: COLORS.white, marginTop: 42, borderRadius: 10 }]}>
            <TitleRefont title={returnTitle()} />
            <div style={formsStyles.formLogInscr}>
                <div style={{}}>
                    {advertisement === undefined && !postSucces && !IsLoading ? (
                        <Form
                            data={detailOffer}
                            insciptionAction={null}
                            error={error}
                            onCancelForm={handleCancel}
                            onSubmitForm={handleSubmit}
                            navigation={navigate}
                        />
                    ) : (
                        <div />
                    )}
                    {advertisement === 0 && !postSucces && !IsLoading ? (
                        <FormAdvertisement
                            costsPrice={costsPrice}
                            modiferData={data}
                            data={detailOffer}
                            insciptionAction={null}
                            error={error}
                            onCancelForm={handleCancel}
                            onSubmitForm={handleSubmit}
                            navigation={navigate}
                        />
                    ) : (
                        <div />
                    )}
                    {advertisement === 2 && !postSucces && !IsLoading ? (
                        <FormTender
                            costsPrice={costsPrice}
                            modiferData={data}
                            data={detailOffer}
                            insciptionAction={null}
                            error={error}
                            onCancelForm={handleCancel}
                            onSubmitForm={handleSubmit}
                            navigation={navigate}
                        />
                    ) : (
                        <div />
                    )}

                    {advertisement === 1 && !postSucces && !IsLoading ? (
                        <FormPost
                            costsPrice={costsPrice}
                            modiferData={data}
                            data={detailOffer}
                            insciptionAction={null}
                            error={error}
                            onCancelForm={handleCancel}
                            onSubmitForm={handleSubmit}
                            navigation={navigate}
                        />
                    ) : (
                        <div />
                    )}

                </div>
            </div>
        </div>
    );
};
export default EntrepriseOfferCreate;
