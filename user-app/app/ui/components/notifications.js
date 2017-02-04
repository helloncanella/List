import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default class Notifications extends Component {
  render() {
    const {container} = styles
    return (
      <View style={container}></View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  }
});


Notifications.propTypes = {}