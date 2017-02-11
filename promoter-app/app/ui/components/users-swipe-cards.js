import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {imageDimensions, typography, grid, color} from 'ui/stylesheets/global.js'
import {age, openFacebook} from 'library/helpers.js'
import SwipeCards from 'react-native-swipe-cards';
import Card from 'ui/components/card.js'

export default class UsersSwipeCards extends Component {

	card(cardData) {
		const {_id: userId, services} = cardData
			, {link, first_name: name, picture: image, birthday } = services.facebook
			, picture = image.data.url
			, {text, textContainer, name:nameStyle} = styles			

		return (
			<Card onPress={()=>openFacebook(link)}>
				<Image style={imageDimensions(0.85)} source={{ uri: picture }} resizeMode="cover" />
				<View style={[textContainer, grid]}>
					<Text style={[text, nameStyle]}>{`${name}, `}</Text>
					<Text style={[text]}>{`${age(birthday)}`}</Text>
				</View>
			</Card>
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
	},
	textContainer:{
		flexDirection: 'row'
	},
	text:{
		fontSize: 22,
	},
	name: {
		color: color.secondary
	}
})