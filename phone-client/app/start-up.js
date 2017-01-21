import React, { Component, PropTypes } from 'react'
import { Navigation } from 'ui/components/navigation.js'
import { database } from 'library/database.js'

export class StartUp extends Component {
	constructor(props) {
		super(props)

		this.state = {
			databaseConnected: false,
			userIsLogged: false
		}

		this.onDatabaseConnected = this.onDatabaseConnected.bind(this)
		this.printError = this.printError.bind(this)
	}

	componentDidMount() {
		this.connectDatabase()
	}

	printError(error) {
		return alert(error)
	}

	onDatabaseConnected() {
		this.setState({
			databaseConnected: true,
			userIsLogged: database.userIsLogged()
		})
	}

	connectDatabase() {
		const {onDatabaseConnected, printError} = this
		database.connect().then(onDatabaseConnected).catch(printError)
	}

	render() {
		return this.state.databaseConnected ? <Navigation userIsLogged={this.state.userIsLogged} /> : null
	}
}
