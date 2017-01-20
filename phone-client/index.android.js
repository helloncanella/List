import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { StartUp } from 'app/start-up.js'

export default class UListMe extends Component {
  render() {
    return <StartUp />
  }
}


AppRegistry.registerComponent('UListMe', () => UListMe);
