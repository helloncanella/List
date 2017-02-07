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
        this.props.navigator.push({ name: 'party', id })
    }

    renderParty(party) {
        const {image, text, partyContainer, partyName, partyDay, card} = styles
            , {photosUrl, name, address, date, hour, canvas, _id: id} = party
            , goToParty = this.goToParty.bind(this, id)


        return (
            <TouchableHighlight onPress={goToParty} {...pressStyle}>
                <View style={card}>
                    <View style={partyContainer}>
                        <Image style={[imageDimensions(0.9), image]} source={{ uri: photosUrl[0] }} resizeMode="cover" />
                        <View style={grid}>
                            <Text style={partyName}>{name}</Text>
                            <Text style={partyDay}>{date+' - '+hour}</Text>
                        </View>
                    </View>
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
    partyContainer: {
        marginBottom: 30,
        elevation   : 1,
        borderWidth : 0.0,
        paddingBottom: 10,
        borderRadius:5
    },
    card:{
        flexDirection: 'row',
        justifyContent: 'center',
       
    },
    background: {
        backgroundColor: 'white'
    },

    partyName: {
        fontSize: typography.big,
        color: color.primary
    },
    partyDay: {
        fontSize: typography.normal
    }

});


PartiesList.propTypes = {
    navigator: PropTypes.object.isRequired
}
