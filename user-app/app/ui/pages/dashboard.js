import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PartiesList from 'ui/components/parties-list.js'

export default class Dashboard extends Component {
    render() {
        const {container} = styles

        return (
            <View style={container}>
                <PartiesList navigator={this.props.navigator} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});


Dashboard.propTypes = {}