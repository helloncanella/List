import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import { typography, pressStyle } from 'ui/stylesheets/global.js'
import { database } from 'library/database.js'


export default class PartiesList extends Component {

    constructor() {
        super()
        this.logout = this.logout.bind(this)
    }

    logout() {
        database.logout()
        this.props.navigator.push({ name: 'login' })
    }

    render() {
        const {container, text} = styles
        console.log(this.props.loadingParties, this.props.parties)

        return (
            <View style={container}>
                <Text style={text}>Parties</Text>
                <TouchableHighlight onPress={this.logout} {...pressStyle} >
                    <Text style={text}>Logout</Text>
                </TouchableHighlight>
            </View>
        );
    }

    // constructor() {
    //     super();
    //     const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    //     this.state = {
    //         dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    //     };
    // }

    // render() {
    //     return (
    //         <ListView
    //             dataSource={this.state.dataSource}
    //             renderRow={(rowData) => <Text>{rowData}</Text>}
    //             />
    //     );
    // }
}

// const {createContainer} = database
// export default createContainer(() => {
//     const subscription = database.subscribe('parties')

//     return {
//         loadingParties: !subscription.ready(),
//         parties: database.collection('parties').find()
//     }

// }, PartiesList)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    text: {
        fontSize: typography.big
    }

});


PartiesList.propTypes = {}