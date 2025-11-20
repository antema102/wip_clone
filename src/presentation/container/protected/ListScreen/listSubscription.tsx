import React from 'react';
import { Subscription } from '../../components/Subscription';
import { Packages } from '../../components/Packages';
import { SafeAreaView } from 'react-native-safe-area-context';
import globalStyle from '../../globalStyle';
import { styles } from './styles';
export const ListSubscription = (props: any) => {
  const { data, isCredit, isNotAvailable } = props;
  return (
    <div style={globalStyle.containersPageWidth}>
      <div style={{}}>
        {isCredit ? (
          <div>
            {isNotAvailable ? (
              <span style={styles.noEvents}>
                {' '}
                Ce mode de paiement n'est pas encore disponible dans votre pays
              </span>
            ) : (
              <div
                data={data}
                renderItem={({ item }) => <Packages item={item} />}
                keyExtractor={(item) => item.id}
              />
            )}
          </div>
        ) : (
          <div>
            <div
              data={data}
              renderItem={({ item }) =>
                isNotAvailable ? (
                  <Subscription item={item} />
                ) : (
                  <SubscriptionIOS
                    subId={item.id}
                    item={item.package}
                    duration={item.duration}
                    details={item.details}
                    subscriptionId={item.subscriptionId}
                    priceSub={item.priceSub}
                  />
                )
              }
              keyExtractor={(item) => item.id}
            />
          </div>
        )}
      </div>
    </div>
  );
};
