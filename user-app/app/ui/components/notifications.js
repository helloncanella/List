import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { database } from '/library/database'
import List from '/ui/components/list.js'

export class Notifications extends Component {
	
	formatedTime(){
		return '1 min. atrás'
	}

	onSelectNotification(notificationId) {

	}

	formatedNotifications(){
		return this.props.notification.map((notification)=>{

			const {_id:notificationId, message, sender, timeStamp} = notification
			
			return {
				image: notification.sender.image, 
				primaryText: message, 
				secondaryText, 
				payLoad: notification._id
			}

		})
	}

	render() {
		const {container} = styles
			, notifications = this.formatedNotifications()
			, onSelectItem = this.onSelectNotification.bind(this)

		return (
			<View style={container}>
				<List data={}></List>
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
			{}
		]
	}
})