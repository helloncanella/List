import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View, ListView, Image, TouchableHighlight } from 'react-native'
import {typography, color, grid, pressStyle} from 'ui/stylesheets/global.js'

const rowHasChanged = (r1, r2) => r1 !== r2
    , ds = new ListView.DataSource({ rowHasChanged })

export default class List extends Component {

    touchProps() {
        return {
            underlayColor:pressStyle.underlayColor,
            activeOpacity: pressStyle.activeOpacity,
            style: styles.container
        } 
    }

    renderRow({primaryText, headerText = '', secondaryText = '', image, payload, style: customStyle = {}}) {

        const {thumbnail, row, secondaryTextStyle, primaryTextStyle, headerStyle, textContainer} = styles
            , touchProps = this.touchProps()
            , {onSelectItem} = this.props
            , {big} = typography


        return (
            <TouchableHighlight {...touchProps} onPress={() => onSelectItem(payload)}>
                <View style={[row, customStyle]} >
                    {image ? <Image style={thumbnail} source={{ uri: image }} /> : null}
                    <View style={textContainer}>
                        {headerText ? <Text style={headerStyle}>{headerText}</Text> : null}
                        <Text style={primaryTextStyle}>{primaryText}</Text>
                        {secondaryText ? <Text style={secondaryTextStyle}>{secondaryText}</Text> : null}
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    render() {
        const {data} = this.props

        return (
            <ListView
                style={styles.container}
                dataSource={ds.cloneWithRows(data)}
                renderRow={this.renderRow.bind(this)}
                enableEmptySections={true}
                />
        )
    }
}

List.propTypes = {
    onSelectItem: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: color.borderLine,
        padding: grid.padding,
        alignItems: 'center'
    },
    thumbnail: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10
    },
    textContainer:{
        flex: 2/3
    },
    headerStyle: {
        marginBottom: 2,
        fontSize: typography.small,
        color: color.silentText
    },
    secondaryTextStyle: {
        fontSize: 13,
        color: color.silentText
    },
    primaryTextStyle: {
        fontSize: typography.small,
        color: color.primary,
        marginBottom: 3
    }
});
