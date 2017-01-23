import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native'
import { database } from 'library/database.js'
import Dowloading from 'ui/components/downloading.js'
import { imageDimensions, grid, typography, color, pressStyle } from 'ui/stylesheets/global.js'
import BackButton from 'ui/components/back-button.js'
import Meteor from 'react-native-meteor' //TODO: remove it!


class PartyDetails extends Component {

    component() {
        const {container, backButton} = styles
            , Party = () => this.party()

        return (
            <View style={container}>
                <Party />
                <BackButton navigator={this.props.navigator} style={backButton} />
            </View>
        )
    }

    listMeButton() {
        const {userIsListed, toggleUserPresence} = this.props
            , {listMeButton, highlightedButton} = styles

        const additionalStyle = userIsListed ? highlightedButton : null
            , text = userIsListed ? "Sair da lista" : "Entrar na lista"

        return (
            <TouchableHighlight {...pressStyle} style={[listMeButton, additionalStyle]} onPress={toggleUserPresence}>
                <Text>{text}</Text>
            </TouchableHighlight>
        )
    }

    party() {
        const {partyName, partyDay, titles} = styles
            , {photosUrl, name, address, date, hour, canvas, _id: id} = this.props.party
            , ListMeButton = () => this.listMeButton()

        return (
            <View>
                <Image style={imageDimensions()} source={{ uri: photosUrl[0] }} resizeMode="cover" />
                <View style={grid}>
                    <Text style={[partyName, titles]}>{name}</Text>
                    <Text style={[partyDay, titles]}>{date} - {hour}</Text>
                </View>
                <ListMeButton />
            </View>
        )
    }

    render() {
        return this.props.loadingParty ? <Dowloading /> : this.component()
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: 'white'
    },
    backButton: {
        top: 10,
        left: -0,
        position: 'absolute'
    },
    listMeButton: {
        backgroundColor: color.secondary,
        // color: 'white',
        // textAlign: 'center',
        width: 150,
        height: 40
    },
    highlightedButton: {
        backgroundColor: color.primary
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
    const partySubscription = database.subscribe('party')

    const {navigator, id: partyId} = props
        , {parties: userParties} = database.loggedUser()

    return {
        loadingParty: !partySubscription.ready(),
        navigator,
        party: database.collection('parties').findOne({ _id: partyId }),
        userIsListed: userParties.indexOf(partyId) > -1 ? true : false,
        toggleUserPresence: () => Meteor.call('party.toggleUserPresence', partyId)
    }


}, PartyDetails)


// PartyDetails.propTypes = {
//     id: PropTypes.string.isRequired,
//     navigator: PropTypes.object.isRequired
// }