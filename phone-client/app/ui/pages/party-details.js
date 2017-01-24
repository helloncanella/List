import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View, Image, TouchableHighlight, ScrollView } from 'react-native'
import { database } from 'library/database.js'
import Dowloading from 'ui/components/downloading.js'
import { imageDimensions, grid, typography, color, pressStyle } from 'ui/stylesheets/global.js'
import BackButton from 'ui/components/back-button.js'



class PartyDetails extends Component {

    header() {
        const {partyName, partyDay, titles, header} = styles
            , {name, address, date, hour, _id: id} = this.props.party
            , ListMeButton = () => this.listMeButton()

        return (
            <View style={[grid, header]}>
                <Text style={[partyName, titles]}>{name}</Text>
                <Text style={[partyDay, titles]}>{date}- {hour}</Text>
                <ListMeButton />
            </View>
        )
    }

    listMeButton() {
        const {userIsListed, toggleUserPresence} = this.props
            , {listMeButton, highlightedButton, buttonTex} = styles

        const additionalStyle = userIsListed ? highlightedButton : null
            , text = userIsListed ? "Sair da lista" : "Entrar na lista"

        return (
            <TouchableHighlight {...pressStyle} style={[listMeButton, additionalStyle]} onPress={toggleUserPresence}>
                <Text style={buttonTex}>{text}</Text>
            </TouchableHighlight>
        )
    }

    description() {
        const {descriptionTopics} = this.props.party
            , {topic: topicStyle, descriptionTitle, descriptionText} = styles

        const topics = descriptionTopics.map(({ text, title }, index) => {
            return (
                <View style={topicStyle} key={index}>
                    <Text style={descriptionTitle}>{title}</Text>
                    <Text style={descriptionText}>{text}</Text>
                </View>
            )
        })

        return (
            <View style={grid}>
                {topics}
            </View>
        )

    }

    party() {

        const {photosUrl} = this.props.party
            , Header = () => this.header()
            , Description = () => this.description()

        return (
            <ScrollView>
                <Image style={imageDimensions()} source={{ uri: photosUrl[0] }} resizeMode="cover" />
                <Header />
                <Description />
            </ScrollView>
        )
    }

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
    header: {
        alignItems: 'center',
    },
    backButton: {
        top: 10,
        left: -0,
        position: 'absolute'
    },
    listMeButton: {
        backgroundColor: '#F06292',
        width: 150,
        paddingTop: 8,
        paddingBottom: 8,
        marginTop: 10,
        borderRadius: 10
    },
    buttonTex: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20
    },
    highlightedButton: {
        backgroundColor: color.primary
    },
    topic: {
        marginBottom: 10
    },
    titles: {
        textAlign: 'center',
    },
    partyName: {
        fontSize: typography.big,
        color: color.primary,
    },
    partyDay: {
        fontSize: typography.normal
    },
    descriptionTitle: {
        fontSize: 25,
        marginBottom: 10,
        // color: color.secondary,
        fontWeight: 'bold'
    },
    descriptionText: {
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
        toggleUserPresence: () => database.call('party.toggleUserPresence', partyId)
    }


}, PartyDetails)


// PartyDetails.propTypes = {
//     id: PropTypes.string.isRequired,
//     navigator: PropTypes.object.isRequired
// }