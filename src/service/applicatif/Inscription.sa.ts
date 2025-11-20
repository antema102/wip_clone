import { InscriptionBDL } from '../bdl/Inscription.bdl';
export const InscriptionService = () => {
  const { inscription, postSendEmail, resendEmail } = InscriptionBDL();

  return {
    inscription: async (data) => {
      return await new Promise(async (success, error) => {
        const res: any = await inscription(data).catch((exception) => {
          error(exception);
        });
        if (res?.data?.user?.role === 'candidate') {
          if (res.data.accessToken) {
            await localStorage.setItem('accessToken', res.data.accessToken);
          }
          if (res.data.refreshToken) {
            await localStorage.setItem('refreshToken', res.data.refreshToken);
          }
          if (res.data.user) {
            await localStorage.setItem(
              '@utilisateur',
              JSON.stringify(res.data.user)
            );
          }
          const token = await localStorage.getItem('accessToken')
        }
        success(res);
      });
    },
    postSendEmail,
    resendEmail,
  };
};
