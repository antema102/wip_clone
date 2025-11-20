import api from "../technique/api";
import urls from "../../data/constants/urls";

export const SubscriptionBDL = () => ({
  getAllSubscriptionByRole: (token: string) =>
    api.get(`${urls.GET_SUBSCRIPTION}`, token),
});
