import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { database } from 'library/database.js'
import { color } from 'ui/stylesheets/global.js'
import List from 'ui/components/list.js'

export class Notifications extends Component {

	pastTime() {
		return '1 min. atrás'
	}

	onSelectNotification(notificationId) {
		alert(notificationId)
	}

	formatedNotifications() {

		return this.props.notifications.map(notification => {
			const {_id: notificationId, message, sender, timeStamp, status, unread} = notification
				, customStyle = {
					backgroundColor: unread ?  color.unreadNotification : 'transparent'
				}

			return {
				image: sender.imageUrl,
				primaryText: message,
				secondaryText: this.pastTime(timeStamp),
				payload: notificationId,
				style: customStyle
			}
		})

	}

	render() {
		const {container} = styles
			, notifications = this.formatedNotifications()
			, onSelectItem = this.onSelectNotification.bind(this)

		return (
			<View style={container}>
				<List data={notifications} onSelectItem={onSelectItem}></List>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}

});

Notifications.propTypes = {}

export default database.createContainer((props) => {
	return {
		notifications: [
			{ _id: '123456', unread: true, message: 'Você não recebeu nenhum desconto!', sender: { imageUrl: 'https://goo.gl/RhKWbz' }, timeStamp: '123456' },
			{ _id: '123456', unread: false, message: 'Você é um lixo, mas toma aí 5% de desconto', sender: { imageUrl: 'https://goo.gl/RhKWbz' }, timeStamp: '123456' }
		]
	}
}, Notifications)