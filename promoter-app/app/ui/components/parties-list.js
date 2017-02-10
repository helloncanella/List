import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native'
import { typography, pressStyle, grid, color, imageDimensions } from 'ui/stylesheets/global.js'
import { database } from 'library/database.js'
import { MeteorListView } from 'react-native-meteor'


export class PartiesList extends Component {

    constructor(props) {
        super()
        this.renderParty = this.renderParty.bind(this)
    }

    goToParty(id) {
        this.props.navigator.push({ name: 'party-users-list', partyId:id })
    }

    nightclub(nightclubData) {
        const {nightclubNameStyle, thumbnail, nightclubStyle, addressStyle} = styles
            , {name: nightclubName, logoUrl: nightclubLogo, addresses} = nightclubData
            , {city, neighborhood} = addresses[0]

        return (
            <View style={[nightclubStyle, grid]}>
                <Image style={thumbnail} source={{ uri: nightclubLogo }} />
                <View>
                    <Text style={nightclubNameStyle}>{nightclubName}</Text>
                    <Text style={addressStyle}>{neighborhood + ' - ' + city}</Text>
                </View>
            </View>
        )
    }

    party(partyData) {
        const {image, text, partyName, partyDay} = styles
            , {photosUrl, name, date, hour, canvas,} = partyData

        return (
            <View>
                <Image style={[imageDimensions(0.9), image]} source={{ uri: photosUrl[0] }} resizeMode="cover" />
                <View style={grid}>
                    <Text style={partyName}>{name}</Text>
                    <Text style={partyDay}>{date + ' - ' + hour}</Text>
                </View>
            </View>
        ) 
    }

    renderParty(party) {
        const {partyContainer, card} = styles            
            , goToParty = this.goToParty.bind(this, party._id)

        const NightclubInfo = this.nightclub.bind(this, party.nightclub)
            , PartyInfo = this.party.bind(this, party)

        return (
            <TouchableHighlight onPress={goToParty} {...pressStyle} style={partyContainer}>
                <View style={card}>
                    <NightclubInfo />
                    <PartyInfo />
                </View>
            </TouchableHighlight>
        )
    }

    render() {
        const {container, text, background} = styles
            , { loadingParties } = this.props

        return (
            <View style={[background, container]}>
                <MeteorListView
                    collection="parties"
                    renderRow={this.renderParty}
                    enableEmptySections={true}
                    />
            </View>
        );
    }




}

const {createContainer} = database
export default createContainer(() => {
    const subscription = database.subscribe('parties')

    return {
        loadingParties: !subscription.ready(),
        // parties: database.collection('parties').find()
    }

}, PartiesList)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        zIndex: 10,
        justifyContent: 'center',
        paddingTop: 10
    },
    card: {
        marginBottom: 30,
        elevation: 1,
        borderWidth: 0.0,
        paddingBottom: 10,
        borderRadius: 5
    },
    nightclubStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    addressStyle: {
        fontSize: typography.small
    },
    nightclubNameStyle: {
        fontSize: typography.normal,
        color: color.primary
    },
    thumbnail: {
        width: 55,
        height: 55,
        borderRadius: 27.5,
        marginRight: 10
    },
    partyContainer: {
        flexDirection: 'row',
        justifyContent: 'center',

    },
    background: {
        backgroundColor: 'white'
    },
    partyName: {
        fontSize: 25,
        color: color.primary
    },
    partyDay: {
        fontSize: typography.normal
    }
});


PartiesList.propTypes = {
    navigator: PropTypes.object.isRequired
}
