import React, { Component } from 'react'
import { Text, StyleSheet, TouchableHighlight } from 'react-native'

export default class ContactItem extends Component {
    
    handleClick = () => this.props.onPress(this.props.data)

    render() {
        return (
            <TouchableHighlight
                style={styles.buttonArea}
                onPress={this.handleClick}
                underlayColor='#DDDDDD'
            >
                <Text>{this.props.data.name}</Text>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    buttonArea: {
        height: 40,
        justifyContent: 'center',
        paddingLeft: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
    }
})