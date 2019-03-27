import React, { Component } from 'react'
import { View, Text, Platform, StyleSheet, TouchableHighlight, Image } from 'react-native'
import { setActiveChat } from '../../actions/ChatActions'
import { connect } from 'react-redux'

const backImage = require('../../../node_modules/react-navigation-stack/src/views/assets/back-icon.png')


class Chat extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Olá',
        headerLeft: () => (
            <TouchableHighlight
                onPress={navigation.getParam('handleBackButton')}
                underlayColor={'transparent'}
            >
                <Image source={backImage} style={styles.imageBack} />
            </TouchableHighlight>
        )
    })

    handleBackButton = async () => {
        const { setActiveChat, navigation } = this.props

        await setActiveChat()

        navigation.goBack()
    }

    componentDidMount() {
        console.log(this.handleBackButton)
        this.props.navigation.setParams({
            handleBackButton: this.handleBackButton
        })
    }

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

const ConnectChat = connect(mapStateToProps, { setActiveChat })(Chat)

export default ConnectChat
