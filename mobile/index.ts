import { AppRegistry } from 'react-native';
import App from './App';
import * as appConfig from './app.json';

AppRegistry.registerComponent(appConfig.expo.name, () => App);
