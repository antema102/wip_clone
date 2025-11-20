import React from 'react';
import {View, FlatList, Text} from 'react-native';
import {Subscription} from '../../components/Subscription';
import {Packages} from '../../components/Packages';
import {SafeAreaView} from 'react-native-safe-area-context';
import globalStyle from '../../globalStyle';
import {styles} from './styles';

export const ListSubscription = (props: any) => {
  const {data, isCredit, isNotAvailable} = props;
  return (
    <View style={globalStyle.containersPageWidth}>
      <View style={{}}>
        {isCredit ? (
          <SafeAreaView>
            {isNotAvailable ? (
              <Text style={styles.noEvents}>
                {' '}
                Ce mode de paiement n'est pas encore disponible dans votre pays
              </Text>
            ) : (
              <FlatList
                data={data}
                renderItem={({item}) => <Packages item={item} />}
                keyExtractor={item => item.id}
              />
            )}
          </SafeAreaView>
        ) : (
          <SafeAreaView>
            <FlatList
              data={data}
              renderItem={({item}) =>
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
              keyExtractor={item => item.id}
            />
          </SafeAreaView>
        )}
      </View>
    </View>
  );
};
