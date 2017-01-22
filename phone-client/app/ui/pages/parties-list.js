import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Image, Dimensions } from 'react-native'
import { typography, pressStyle } from 'ui/stylesheets/global.js'
import { database } from 'library/database.js'
import { MeteorListView } from 'react-native-meteor'

var Orientation = require('react-native-orientation');

export class PartiesList extends Component {

    constructor(props) {
        super()
    }

    componentDidMount(){
        Orientation.addOrientationListener(()=>alert('HALLO'));
    }

    logout() {
        database.logout()
        this.props.navigator.push({ name: 'login' })
    }

    renderParty(party) {
        const {partyStyle, image, container} = styles
            , {photosUrl, name, address, date, hour, canvas} = party

        return (
            <View style={[partyStyle, container]}>
                <Image style={image} source={{ uri: photosUrl[0] }} resizeMode="cover" />
            </View>
        )
    }

    render() {
        const {container, text, background} = styles
            , { loadingParties } = this.props;

        return (
            <View style={[container, background]}>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        backgroundColor: 'white'
    },
    partyStyle: {
        alignSelf: 'stretch',
        flex: 1,
    },
    text: {
        fontSize: typography.big
    },
    height: {},
    image: {
        flex: 1,
        alignSelf: 'stretch',
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").width*3/4
    },
    positionRelative:{
        position: 'relative'
    },   
    canvas: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },

});


PartiesList.propTypes = {}