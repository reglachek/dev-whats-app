const initial_state = {
    chatList: [],
    contacts: [],
    messages: [],
    activeChat: '',
    activeChatOtherUserName: '',
    message: '',
    isLoading: false
}

const ChatReducer = (state = initial_state, action) => {
    switch(action.type) {
        case 'setContactList':
            return { ...state, contacts: action.payload.users, isLoading: action.payload.isLoading }
        break
        case 'setActiveChat':
            let chatTitle = ''

            for(let i in state.chatList) {
                if(state.chatList[i].key == action.payload.chatId) {
                    chatTitle = state.chatList[i].otherUserName
                }
            }

            return {
                ...state, 
                activeChat: action.payload.chatId, 
                activeChatOtherUserName: chatTitle
            }
        break
        case 'setChatList':
            return { ...state, chatList: action.payload.chats, isLoading: action.payload.isLoading }
        break
        case 'setActiveChatMessages':
            return { ...state, messages: action.payload.messages }
        break
        case 'handleInputChange':
            return { ...state, message: action.payload.message }
        break
        case 'preSendMessage':
            return { ...state, message: '' }
        break
        case 'isLoading':
            return { ...state, isLoading: action.payload.isLoading }
        break
        case 'resetState':
            return { ...initial_state }
        break
    }

    return state
}

export default ChatReducer
