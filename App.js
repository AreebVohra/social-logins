import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';

import AppNavigator from './src/navigation/AppNavigator';

export default class App extends Component {
  render() {
    return (
      <View style={{ width: '100%', height: '100%' }}>
        <StatusBar backgroundColor="#02395e" hidden={true} />
        <AppNavigator />
      </View>
    );
  }
}