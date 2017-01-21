import React, { Component, PropTypes } from 'react'
import { Navigation } from 'ui/components/navigation.js'
import { fileSystem } from 'library/file-system.js' 

export class StartUp extends Component {
  constructor() { 
    super()
    this.userIsLogged = fileSystem.userIsLogged()
  }

  render() {
    return <Navigation userIsLogged={this.userIsLogged} />;
  }
}
  