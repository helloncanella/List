import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Image, Dimensions } from 'react-native'
import { typography, pressStyle, grid, color } from 'ui/stylesheets/global.js'
import { database } from 'library/database.js'
import { MeteorListView } from 'react-native-meteor'

var Orientation = require('react-native-orientation');

export class PartiesList extends Component {

    constructor(props) {
        super()
        this.state = {
            photoWidth: 0,
            photoHeight: 0
        }
        this.renderParty = this.renderParty.bind(this)
        this.setPhotoDimension = this.setPhotoDimension.bind(this)
    }

    componentDidMount() {
        this.setPhotoDimension()
        this.resizePhotsOnPhoneReorientation()
    }

    goToParty(id) {
        this.props.navigator.push({ name: 'party', id })
    }


    setPhotoDimension() {
        const {width} = Dimensions.get("window")
            , aspectRatio = 4 / 3


        this.setState({ photoWidth: width, photoHeight: width / aspectRatio })
    }

    getPhotoDimensions() {
        const {photoWidth: width, photoHeight: height} = this.state
        return { width, height }
    }

    resizePhotsOnPhoneReorientation() {
        Orientation.addOrientationListener(this.setPhotoDimension)
    }

    logout() {
        //TODO: Remove to especialized component
        const logoutStyle = {           
            color: 'white',
            fontSize: 20,
        }

        const touchContainer = {
            // zIndex: 1,
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,0)',
            right: 15,
            top: 15
        }

        const {navigator} = this.props
            , onPress = () => {
                navigator.push({ name: 'login' })
                database.logout()
            }

        return (
            <TouchableHighlight {...pressStyle} onPress={onPress} style={touchContainer}>
                <Text style={logoutStyle}>sign out</Text>
            </TouchableHighlight>
        )
    }

    renderParty(party) {
        const {image, text, partyContainer, partyName, partyDay} = styles
            , {photosUrl, name, address, date, hour, canvas, _id: id} = party
            , dimmensions = this.getPhotoDimensions()
            , goToParty = this.goToParty.bind(this, id)

        return (
            <TouchableHighlight onPress={goToParty} {...pressStyle}>
                <View style={partyContainer}>
                    <Image style={dimmensions} source={{ uri: photosUrl[0] }} resizeMode="cover" />
                    <View style={grid}>
                        <Text style={partyName}>{name}</Text>
                        <Text style={partyDay}>{date}- {hour}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    render() {
        const {container, text, background} = styles
            , { loadingParties } = this.props
            , Logout = () => this.logout()

        return (
            <View style={[container, background]}>
                <MeteorListView
                    key={this.state.photoWidth}
                    collection="parties"
                    renderRow={this.renderParty}
                    enableEmptySections={true}
                    />
                <Logout />
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
        position: 'relative'
    },
    partyContainer: {
        marginBottom: 15,
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