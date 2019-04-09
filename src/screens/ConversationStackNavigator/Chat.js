import React, { Component } from 'react'
import {
    View, 
    ImageBackground, 
    TextInput, 
    FlatList, 
    StyleSheet, 
    TouchableHighlight, 
    Image
} from 'react-native'
import ImagePicker from 'react-native-image-picker'

import {
    setActiveChat,
    sendMessage,
    sendImage,
    handleInputChange,
    monitorChat,
    monitorChatOff
} from '../../actions/ChatActions'
import { connect } from 'react-redux'

import MessageItem from '../../components/Chat/MessageItem'

// Guarda imagens
const backImage = require('../../../node_modules/react-navigation-stack/src/views/assets/back-icon.png')
const userImage = require('../../assets/img/send.png')
const chooseImage = require('../../assets/img/new_image.png')
const chatBackgroundImage = require('../../assets/img/chatBackground.png')

class Chat extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pct: 0,
        }
    }

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

        sendMessage('text', message, uid, activeChat)
    }

    handleChooseImage = () => {
        const { sendImage, sendMessage, uid, activeChat } = this.props

        const options = {
            title: 'Selecione uma foto'
        }
        
        ImagePicker.showImagePicker(options, image => {
            if(image.uri) {
                const uri = image.uri.replace('file://', '')

                sendImage(uri, snapshot => {
                    let pct = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

                    this.setState({ pct })
                }, imgName => {
                    this.setState({ pct: 0 })
                    sendMessage('image', imgName, uid, activeChat)
                })
            }
        })
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

                <View style={styles.imgTmpArea}>
                    <View style={[
                        {width: this.state.pct+'%'},
                        styles.imgTmpBar
                    ]}></View>
                </View>

                <View style={styles.sendArea}>
                    <TouchableHighlight
                        style={styles.buttonStyle}
                        onPress={this.handleChooseImage}
                        underlayColor='transparent'
                    >
                        <Image source={chooseImage} style={styles.buttonImage} />
                    </TouchableHighlight>

                    <TextInput
                        style={styles.sendInput}
                        value={this.props.message}
                        onChangeText={this.handleInputChange} 
                    />

                    <TouchableHighlight
                        style={styles.buttonStyle}
                        onPress={this.sendMessage}
                        underlayColor='transparent'
                    >
                        <Image source={userImage} style={styles.buttonImage} />
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
    imgTmpArea: {
        height: 10
    },
    imgTmpBar: {
        height: 10,
        backgroundColor: '#FF0000'
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
    buttonStyle: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonImage: {
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
    sendImage,
    handleInputChange,
    monitorChat,
    monitorChatOff
})(Chat)

export default ConnectChat
