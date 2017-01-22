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
            photoWidth: '',
            photoHeight: ''
        }
        this.renderParty = this.renderParty.bind(this)
        this.setPhotoDimension = this.setPhotoDimension.bind(this)
    }

    componentDidMount() {
        this.setPhotoDimension()
        this.resizePhotsOnPhoneReorientation()
    }

    setPhotoDimension() {
        const {width} = Dimensions.get("window")
            , aspectRatio = 4 / 3            
        this.setState({ photoWidth: width, photoHeight: width / aspectRatio })
    }

    getPhotoDimensions(){
        const {photoWidth: width, photoHeight: height} = this.state
        return {width, height}
    }

    resizePhotsOnPhoneReorientation() {
        Orientation.addOrientationListener(this.setPhotoDimension)
    }

    logout() {
        database.logout()
        this.props.navigator.push({ name: 'login' })
    }

    renderParty(party) {
        const {image, text, partyContainer, partyName, partyDay} = styles
            , {photosUrl, name, address, date, hour, canvas} = party
            , dimmensions = this.getPhotoDimensions()

        return (
            <View style={partyContainer}>
                <Image style={dimmensions} source={{ uri: photosUrl[0] }} resizeMode="cover" />
                <View style={grid}>
                    <Text style={partyName}>{name}</Text>
                    <Text style={partyDay}>{date} - {hour}</Text>
                </View>
            </View>
        )
    }

    render() {
        const {container, text, background} = styles
            , { loadingParties } = this.props;
          
        return (
            <View style={[container, background]}>
                <MeteorListView
                    key={this.state.photoWidth}
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
    partyContainer:{
        marginBottom: 15
    },
    background: {
        backgroundColor: 'white'
    },
  
    partyName: {
        fontSize: typography.big,
        color: color.primary
    },
    partyDay:{
        fontSize: typography.normal
    }

});


PartiesList.propTypes = {}