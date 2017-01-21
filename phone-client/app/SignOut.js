// app/SignOut.js

import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';


class SignOut extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Sign Out View</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

export default SignOut;