// Tinder.js
'use strict';

import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import SwipeCards from 'react-native-swipe-cards';

let Card = React.createClass({
  render() {
    return (
      <View style={[styles.card, {backgroundColor: this.props.backgroundColor}]}>
        <Text>{this.props.text}</Text>
      </View>
    )
  }
})

const Cards = [  
  {text: 'Umm...', backgroundColor: 'cyan'},
  {text: 'orange', backgroundColor: 'orange'},
]

export default React.createClass({
  getInitialState() {
    return {
      cards: Cards
    }
  },
  handleYup (card) {
    console.log(`Yup for ${card.text}`)
  },
  handleNope (card) {
    console.log(`Nope for ${card.text}`)
  },

  boteco(){
    return (
      <SwipeCards
        cards={this.state.cards}
        renderCard={(cardData) => <Card {...cardData} />}
        showNope={false}
        showYup={false}
        loop={true}
        handleYup={this.handleYup}
        handleNope={this.handleNope}
      />
    )
  },

  render() {
    return this.boteco()
  }
})

const styles = StyleSheet.create({
  card: {    
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
  }
})