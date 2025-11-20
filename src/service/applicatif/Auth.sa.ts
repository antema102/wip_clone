import { AuthBDL } from '../bdl/Auth.bdl';

export const AuthService = () => {
  const { loginWithEmail, logOut, loginWithGoogle } = AuthBDL();

  return {
    loginWithEmail: async (data) => {
      return await new Promise(async (success, error) => {
        const res: any = await loginWithEmail(data).catch((exception) => {
          error(exception);
        });
        if (res && res.data) {
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
        }
        success(res);
      });
    },
    loginWithGoogle: async (data: any) => {
      return await new Promise(async (success, error) => {
        const res: any = await loginWithGoogle(data).catch((exception) => {
          error(exception);
        });
        if (res && res.data) {
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
        }
        success(res);
      });
    },
    logOut: async (token) => {
      return await new Promise(async (error) => {
        const res: any = await logOut(token)
          .then(() => {
            localStorage
              .getAllKeys()
              .then((keys) => localStorage.multiRemove(keys))
              .then(() => {
                console.log('success');
              });
          })
          .catch((exception) => {
            error(exception);
          });
      });
    },
  };
};
