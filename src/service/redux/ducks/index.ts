import { combineReducers } from 'redux';

import { authReducer as auth } from './auth';
import { userReducer as user } from './user';
import { inscriptionReducer as inscription } from './inscription';
import { appReducer as app } from './app';
import {cvReducer as cv} from './cv';
import {formationReducer as formation} from './formation';
import {paymentReducer as payment} from './payment';
import {offerReducer as offer} from './offer';
import {MatchingReducer as matching} from './matching';
import {subscriptionReducer as subscription} from './subscription';
import {tenderReducer as tender} from './tender';
import { mobileReducer as mobile } from './mobile';
export const combinedReducer = combineReducers({
  auth,
  cv,
  inscription,
  offer,
  matching,
  mobile,
  user,
  app,
  subscription,
  formation,
  payment,
  tender,
});
