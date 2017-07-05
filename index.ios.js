/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} from 'react-native';
const Main = require('./App/Components/Main.js')
export default class GitApp extends Component {
  render() {
    return (
      <NavigatorIOS
       style={styles.container}
       initialRoute={{
         title:'GitHub',
         component:Main
       }}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('GitApp', () => GitApp);
