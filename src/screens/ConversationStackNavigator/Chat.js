import React, { Component } from 'react'
import { View, ImageBackground, TextInput, FlatList, StyleSheet, TouchableHighlight, Image } from 'react-native'
import {
    setActiveChat,
    sendMessage,
    handleInputChange,
    monitorChat,
    monitorChatOff
} from '../../actions/ChatActions'
import { connect } from 'react-redux'

import MessageItem from '../../components/Chat/MessageItem'

// Guarda imagens
const backImage = require('../../../node_modules/react-navigation-stack/src/views/assets/back-icon.png')
const sendImage = require('../../assets/img/send.png')
const chatBackgroundImage = require('../../assets/img/chatBackground.png')

class Chat extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('otherUserName'),
        gesturesEnabled: true,
        headerLeft: () => (
            <TouchableHighlight
                onPress={navigation.getParam('handleBackButton')}
                underlayColor={'transparent'}
            >
                <Image source={backImage} style={styles.imageBack} />
            </TouchableHighlight>
        )
    })

    // User actions
    handleBackButton = async () => {
        const { setActiveChat, navigation } = this.props

        await setActiveChat('')

        navigation.goBack()
    }

    handleInputChange = text => this.props.handleInputChange(text)

    sendMessage = () => {
        const { sendMessage, message, uid, activeChat } = this.props

        sendMessage(message, uid, activeChat)
    }

    // FlatList
    _keyExtractor = item => `item-key-${item.key}`

    _ref = flatListReference => this.flatListArea = flatListReference

    _onContentSizeChange = () => this.flatListArea.scrollToEnd({ animated:true })

    _onLayout = () => this.flatListArea.scrollToEnd({ animated:true })

    // Component life cycle
    componentWillUnmount() {
        const { monitorChatOff, activeChat } = this.props

        monitorChatOff(activeChat)
    }

    componentDidMount() {
        const { navigation, monitorChat, activeChat } = this.props

        navigation.setParams({
            handleBackButton: this.handleBackButton
        })

        monitorChat(activeChat)
    }

    render() {
        return (
            <ImageBackground
                source={chatBackgroundImage}
                style={styles.container}
            >
                <FlatList 
                    data={this.props.messages}
                    renderItem={({ item }) => <MessageItem
                        data={item}
                        authUserUid={this.props.uid}
                    />}
                    keyExtractor={this._keyExtractor}
                    ref={this._ref}
                    onContentSizeChange={this._onContentSizeChange}
                    onLayout={this._onLayout}
                />

                <View style={styles.sendArea}>
                    <TextInput
                        style={styles.sendInput}
                        value={this.props.message}
                        onChangeText={this.handleInputChange} 
                    />

                    <TouchableHighlight
                        style={styles.sendButton}
                        underlayColor='transparent'
                        onPress={this.sendMessage}
                    >
                        <Image source={sendImage} style={styles.sendImage} />
                    </TouchableHighlight>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    imageBack: {
        width: 25,
        height: 25,
        marginLeft: 20,
    },
    container: {
        width: '100%', 
        height: '100%'
    },
    sendArea: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: '#EEEEEE'
    },
    sendInput: {
        flex: 1,
        height: 50,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    sendButton: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendImage: {
        height: 40,
        width: 40,
    }
})

const mapStateToProps = state => ({
    uid: state.AuthReducer.uid,
    activeChat: state.ChatReducer.activeChat,
    message: state.ChatReducer.message,
    messages: state.ChatReducer.messages
})

const ConnectChat = connect(mapStateToProps, {
    setActiveChat,
    sendMessage,
    handleInputChange,
    monitorChat,
    monitorChatOff
})(Chat)

export default ConnectChat
