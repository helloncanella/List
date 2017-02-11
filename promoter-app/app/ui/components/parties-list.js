import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native'
import { typography, pressStyle, grid, color, imageDimensions } from 'ui/stylesheets/global.js'
import { database } from 'library/database.js'
import { MeteorComplexListView } from 'react-native-meteor'
import Card from 'ui/components/card.js'

export class PartiesList extends Component {

    constructor(props) {
        super()
        this.renderParty = this.renderParty.bind(this)
    }

    goToParty(id) {
        this.props.navigator.push({ name: 'party-users-list', partyId: id })
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
            , {photosUrl, name, date, hour, canvas, } = partyData

        return (
            <View>
                <Image style={imageDimensions(0.9)} source={{ uri: photosUrl[0] }} resizeMode="cover" />
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
            <Card onPress={goToParty} style={partyContainer}>
                <NightclubInfo />
                <PartyInfo />
            </Card>
        )
    }

    render() {
        const {container, text, background} = styles
            , { loadingParties,  parties} = this.props

        return (
            <View style={[background, container]}>
                <MeteorComplexListView
                    elements={()=>parties}
                    renderRow={this.renderParty}
                    enableEmptySections={true}
                    />
            </View>
        );
    }




}


const {createContainer} = database

export default createContainer(() => {

    const partiesSubscription = database.subscribe('parties')
        , nightclubsSubscription = database.subscribe('nightclubs')
    
    const userId = database.userIsLogged() ? database.loggedUser()._id : null
        , nightclub = database.collection('nightclubs').findOne({ promotersId: userId })||{}        
        , parties = database.collection('parties').find({'nightclub._id':nightclub._id})

    return {
        loadingParties: !partiesSubscription.ready(),
        parties 
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
