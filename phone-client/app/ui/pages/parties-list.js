import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Image} from 'react-native'
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

    

    logout() {
        //TODO: Move to an especialized component
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
            , goToParty = this.goToParty.bind(this, id)


        return (
            <TouchableHighlight onPress={goToParty} {...pressStyle}>
                <View style={partyContainer}>
                    <Image style={imageDimensions()} source={{ uri: photosUrl[0] }} resizeMode="cover" />
                    <View style={grid}>
                        <Text style={partyName}>{name}</Text>
                        <Text style={partyDay}>{date} - {hour}</Text>
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