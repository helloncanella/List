import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Meteor, { createContainer, MeteorListView } from 'react-native-meteor';

Meteor.connect('ws://192.168.1.4:3000/websocket');

class App extends Component {
    renderRow({title, author, url, details}) {
        console.log({title, author, url, details})
        return (
            <View>
                <Text>{title}</Text>
                <Text>{author}</Text>
                <Text>{url}</Text>
                <Text>{details}</Text>
            </View>
        );
    }
    render() {
        const { posts, todosReady } = this.props;
        { console.log(posts) }

        return <MeteorListView
                collection="posts"
                selector={{ done: true }}
                options={{ sort: { createdAt: -1 } }}
                renderRow={this.renderRow}
                enableEmptySections={true}
                />

    }
}


export default createContainer(params => {
    const handle = Meteor.subscribe('allPosts');

    return {
        todosReady: handle.ready(),
        posts: Meteor.collection('posts').find()
    };
}, App)