import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { color } from 'ui/stylesheets/global.js'

export default class TabsWrapper extends Component {
    render() {
        const {container} = styles

        return (
            <ScrollableTabView  style={container} renderTabBar={() => <TabBar />}>
                {this.props.children}
            </ScrollableTabView>
        );
    }
}

class TabBar extends Component {
    constructor(){
        super()
        this.tabIcons = []
    }

    componentDidMount() {
        this._listener = this.props.scrollValue.addListener(this.setAnimationValue.bind(this));

    }

    setAnimationValue({ value, }) {
        this.tabIcons.forEach((icon, i) => {
            const progress = Math.min(1, Math.abs(value - i))
            icon.setNativeProps({
                style: {
                    color: this.iconColor(progress),
                },
            });
        });
    }

    //color between rgb(59,89,152) and rgb(204,204,204)
    iconColor(progress) {
        const red = 216 + (204 - 216) * progress;
        const green = 27 + (204 - 27) * progress;
        const blue = 96 + (204 - 96) * progress;
        return `rgb(${red}, ${green}, ${blue})`;
    }
    
    
    render() {
        return <View style={[styles.tabs, this.props.style]}>
            {this.props.tabs.map((tab, i) => {
                console.log(i, this.props.activeTab)

                return <TouchableOpacity key={tab} onPress={() => this.props.goToPage(i)} style={styles.tab}>
                    <Icon
                        name={tab}
                        size={25}
                        color={this.props.activeTab === i ? 'rgb(216,27,96)' : 'rgb(204,204,204)'}
                        ref={(icon) => { this.tabIcons[i] = icon; }}
                        />
                </TouchableOpacity>;
            })}
        </View>;
    }
}


const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 0,
    },
    tabs: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },
});


TabsWrapper.propTypes = {}


