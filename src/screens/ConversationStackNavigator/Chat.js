import React, { Component } from 'react'
import { View, Text, Platform, StyleSheet, TouchableHighlight, Image } from 'react-native'
import { } from '../../actions/ChatActions'
import { connect } from 'react-redux'

const backImage = require('../../../node_modules/react-navigation-stack/src/views/assets/back-icon.png')


class Chat extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Olá',
        headerLeft: () => (
            <TouchableHighlight
                onPress={async () => {
                    await navigation.state.params.setActiveChat('')
                    navigation.goBack()
                }}
                underlayColor={'transparent'}
            >
                <Image source={backImage} style={styles.imageBack} />
            </TouchableHighlight>
        )
    })

    render() {
        return (
            <View style={styles.container}>
                <Text>Chat</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
    },
    imageBack: {
        width: 25,
        height: 25,
        marginLeft: 20,
    }
})

const mapStateToProps = state => ({
    uid: state.AuthReducer.uid,
})

const ConnectChat = connect(mapStateToProps, { })(Chat)

export default ConnectChat
