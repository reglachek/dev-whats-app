import React, { Component } from 'react'
import { TouchableHighlight, Text, StyleSheet } from 'react-native'

export default class ChatItem extends Component {
    handleChatItem = () => this.props.onPress(this.props.data)
    render() {
        return <TouchableHighlight
            style={styles.item} 
            onPress={this.handleChatItem}
            underlayColor='#DDDDDD'
        >
            <Text>{this.props.data.otherUserName}</Text>
        </TouchableHighlight>
    }
}

const styles = StyleSheet.create({
    item: {
        height: 60,
        justifyContent: 'center',
        paddingLeft: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
    }
})