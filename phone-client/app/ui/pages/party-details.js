import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { database } from 'library/database.js'
import Dowloading from 'ui/components/downloading.js'

class PartyDetails extends Component {
    party() {
        const {container} = styles
        return (
            <View style={container}>
                <Text>{this.props.party.name}</Text>
            </View>
        );
    }

    render() {
        return this.props.loadingParty ? <Dowloading /> : this.party()
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});

export default database.createContainer(props => {
    const subscription = database.subscribe('party')
        , {navigator, id} = props

    return {
        loadingParty: !subscription.ready(),
        navigator,
        party: database.collection('parties').findOne({ _id: id })
    }


}, PartyDetails)


// PartyDetails.propTypes = {
//     id: PropTypes.string.isRequired,
//     navigator: PropTypes.object.isRequired
// }