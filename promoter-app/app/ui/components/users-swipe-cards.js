import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {imageDimensions} from 'ui/stylesheets/global.js'

import SwipeCards from 'react-native-swipe-cards';

export default class UsersSwipeCards extends Component {

	card(cardData) {
		const {_id: userId, services} = cardData
			, {link, name, picture: image } = services.facebook
			, picture = image.data.url			

		return (
			<View>
				<Image style={imageDimensions(0.9)} source={{ uri: picture }} resizeMode="cover" />
			</View>
		)
	}

	render() {

		return (
			<SwipeCards
				cards={this.props.users}
				renderCard={this.card.bind(this)}
				showNope={false}
				showYup={false}
				loop={true}
				handleYup={this.handleYup}
				handleNope={this.handleNope}
				/>
		)
	}
}



const styles = StyleSheet.create({
	card: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 300,
		height: 300,
	}
})