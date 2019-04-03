import React, { Component } from 'react'
import { View, FlatList, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { getChatList, setActiveChat } from '../../actions/ChatActions'

import ChatItem from '../../components/ChatList/ChatItem'

class ChatList extends Component {
    static navigationOptions = {
        title: 'Conversations',
        headerTitleStyle: {
            fontSize: 25
        }
    }

    handleChatItemClick = data => this.props.setActiveChat(data.key)

    _keyExtractor = item => `item-key-${item.key}`

    componentDidUpdate(lastProps) {
        const { activeChat, navigation, activeChatOtherUserName } = this.props

        if(activeChat !== lastProps.activeChat) {
            navigation.navigate('Chat', { otherUserName: activeChatOtherUserName })
        }
    }

    componentDidMount() {
        const { uid, getChatList } = this.props

        getChatList(uid)
    }

    render() {
        return (
            <View>
                {!this.props.isLoading && <FlatList 
                    data={this.props.chatList}
                    renderItem={({item}) => <ChatItem data={item} onPress={this.handleChatItemClick} />}
                    keyExtractor={this._keyExtractor}
                />}

                {this.props.isLoading && <ActivityIndicator size='large' color='green' />}
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        uid: state.AuthReducer.uid,
        chatList: state.ChatReducer.chatList,
        activeChat: state.ChatReducer.activeChat,
        activeChatOtherUserName: state.ChatReducer.activeChatOtherUserName,
        isLoading: state.ChatReducer.isLoading,
    }
}

const ChatListConnect = connect(mapStateToProps, {
    getChatList,
    setActiveChat
})(ChatList)

export default ChatListConnect
