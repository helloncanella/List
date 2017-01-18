import React, { Component } from 'react';
import {  AppRegistry } from 'react-native';
import App from './app/index.js'

export default class UListMe extends Component {
  render() {
    return <App />
  }
}


AppRegistry.registerComponent('UListMe', () => UListMe);
