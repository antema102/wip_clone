import { SubscriptionBDL } from "../bdl/Subscription.bdl";

export const SubscriptionSA = () => {
  const {getAllSubscriptionByRole} = SubscriptionBDL();
  return {
    getAllSubscriptionByRole: (token: string) =>
      getAllSubscriptionByRole(token),
  };
};
