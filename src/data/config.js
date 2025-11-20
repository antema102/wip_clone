import {Platform} from 'react-native';
import env from 'react-native-config';
import Config from 'react-native-config';

let url = 'http://localhost:4000/';
let BASE = Config.URL_BACK;

if (Platform.OS === 'web') {
  const {REACT_APP_API_URL} = process.env;
  url = REACT_APP_API_URL;
} else {
  // Load Mobile env
  const {REACT_APP_API_URL} = env;
  url = REACT_APP_API_URL;
}

export default {
  url,
  baseURL: `${BASE.replace(/\/api$/, '')}`,
  apiDocs: `${url}api-docs/`,
  pathApi: 'api/',
  myprivatekey: 'myprivatekey',
};
