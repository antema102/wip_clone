import { SubscriptionBDL } from '../bdl/Subscription.bdl';

export const SubscriptionSA = () => {
  const { getAllSubscriptionByRole } = SubscriptionBDL();
  return {
    getAllSubscriptionByRole: async (token: string) =>
      await getAllSubscriptionByRole(token),
  };
};
