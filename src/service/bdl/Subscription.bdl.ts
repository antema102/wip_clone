import api from '../technique/api';
import urls from '../../data/constants/urls';

export const SubscriptionBDL = () => ({
  getAllSubscriptionByRole: async (token: string) =>
    await api.get(`${urls.GET_SUBSCRIPTION}`, token),
});
