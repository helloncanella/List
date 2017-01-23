import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { database } from 'library/database.js'
import Dowloading from 'ui/components/downloading.js'
import {imageDimensions, grid, typography, color} from 'ui/stylesheets/global.js'

class PartyDetails extends Component {
    party() {
        const {partyName, partyDay, container, titles} = styles
            , {photosUrl, name, address, date, hour, canvas, _id: id} = this.props.party

        return (
            <View style={container}>
                <Image style={imageDimensions()} source={{ uri: photosUrl[0] }} resizeMode="cover" />
                <View style={grid}>
                    <Text style={[partyName, titles]}>{name}</Text>
                    <Text style={[partyDay, titles]}>{date} - {hour}</Text>
                </View>
            </View>
        )
    }

    render() {
        return this.props.loadingParty ? <Dowloading /> : this.party()
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: 'white'
    },
    titles: {
        textAlign: 'center'
    },
    partyName: {
        fontSize: typography.big,
        color: color.primary,
    },
    partyDay: {
        fontSize: typography.normal
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