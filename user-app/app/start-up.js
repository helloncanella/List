import React, { Component, PropTypes } from 'react'
import { Navigation } from 'ui/components/navigation.js'
import { database } from 'library/database.js'
import SplashSreen from 'ui/pages/splash-screen.js'
import Orientation from 'react-native-orientation'

export class StartUp extends Component {
	constructor(props) {
		super(props)

		this.state = {
			databaseConnected: false,
			userIsLogged: false,
			connectionError: false,
		}

		this.onDatabaseConnected = this.onDatabaseConnected.bind(this)
		this.onConnectionError = this.onConnectionError.bind(this)
	}

	componentDidMount() {
		this.fixPhoneOrientation()
		this.connectDatabase()
	}

	fixPhoneOrientation(){
		Orientation.lockToPortrait()
	}

	onConnectionError() {		
		this.setState({connectionError: true}) 
	}
	
	onDatabaseConnected() {	
		this.setState({
			databaseConnected: true,
			userIsLogged: database.userIsLogged()
		})
	}

	connectDatabase() {
		const {onDatabaseConnected, onConnectionError} = this
		database.connect().then(onDatabaseConnected).catch(onConnectionError)
	}

	render() {
		//TODO: Insert error page.
		return this.state.databaseConnected ? <Navigation userIsLogged={this.state.userIsLogged} /> : <SplashSreen />
	}
}
