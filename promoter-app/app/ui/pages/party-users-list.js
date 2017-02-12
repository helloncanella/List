import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Image } from 'react-native'
import Loading from 'ui/components/downloading.js'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { grid, color, typography, pressStyle } from 'ui/stylesheets/global.js'
import { database } from 'library/database.js'
import { openFacebook } from 'library/helpers.js'
import ReturnMenu from 'ui/components/return-menu.js'
import UsersSwipeCards from 'ui/components/users-swipe-cards.js'



class PartyUsersList extends Component {

    constructor() {
        super()
        this.state = {
            userFromTopCard: {}
        }
    }

    renderDiscountButton({value: discount, quantity}) {
        const {userId} = this.state.userFromTopCard
            , giveDiscount = this.props.giveDiscount.bind(null, userId, discount)
            , {buttonText, roundButton} = styles

        return (
            <View key={discount}>
                <TouchableHighlight style={styles.roundButton} onPress={giveDiscount} {...pressStyle}>
                    <Text style={buttonText}>{'-' + discount * 100 + '%'}</Text>
                </TouchableHighlight>
            </View>
        )
    }

    discountButtons() {
        const renderDiscountButton = this.renderDiscountButton.bind(this)
            , {availableDiscounts} = this.props.party

        return (
            <View style={styles.directionRow}>
                {availableDiscounts.map(renderDiscountButton)}
            </View>
        )
    }

    refuseButton() {
        return (
            <View style={styles.roundButton}>
                <Icon name="close" size={typography.big} />
            </View>
        )
    }

    buttons() {
        const RefuseButton = this.refuseButton.bind(this)
            , DiscountButtons = this.discountButtons.bind(this)

        return (
            <View style={styles.buttonsContainer}>
                <RefuseButton />
                <DiscountButtons />
            </View>
        )
    }

    setTopCardUser(user) {
        this.setState({ userFromTopCard: user })
    }

    cards() {
        const {usersRequesting} = this.props
        return <UsersSwipeCards users={usersRequesting} onNewCard={this.setTopCardUser.bind(this)} />
    }

    list() {
        const Cards = this.cards.bind(this)
            , Buttons = this.buttons.bind(this)
        
        const {container, marginTop} = styles

        return (
            <View style={[container, marginTop]}>
                <Cards />
                <Buttons />
            </View>
        )
    }

    content() {
        const List = this.list.bind(this)
        return this.props.userIsLoading ? <Loading /> : <List />
    }

    render() {
        const {container} = styles
            , Content = this.content.bind(this)

        return (
            <View style={container}>
                <ReturnMenu navigator={this.props.navigator} />
                <Content />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: typography.normal,
        color: 'gray',
    },
    roundButton: {
        width: 65,
        height: 65,
        borderRadius: 32.5,
        borderWidth: 1,
        borderColor: 'rgb(204,204,204)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20
    },
    buttonsContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        paddingBottom:20        
    },
    selectedButtonText:{
        color: 'white'
    },
    selectedButton: {
        backgroundColor: color.primary,
        borderColor: 'transparent'
    },
    directionRow: {
        flexDirection: 'row',
    }

});

const findUsers = usersList => database.collection('users').find({ _id: { $in: usersList } })

export default database.createContainer(props => {

    const usersSubscription = database.subscribe("users.socialData")
        , partiesSubscription = database.subscribe("parties")

    const party = database.collection("parties").findOne({ _id: props.partyId }) || {}
        , {refusedUsers = [], usersRequesting = [], _id: partyId } = party


    return {
        userIsLoading: !usersSubscription.ready(),
        party,
        refusedUsers: findUsers(refusedUsers).map(user => user._id),
        usersRequesting: findUsers(usersRequesting),
        giveDiscount: (userId, discount) => database.call('party.giveDiscount', { userId, discount, partyId }),
        refuseUser: userId => database.call('party.refuseUser', { userId, partyId }),
        navigator: props.navigator
    }

}, PartyUsersList)


PartyUsersList.propTypes = {
    partyId: PropTypes.string.isRequired
}


