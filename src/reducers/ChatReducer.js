const initial_state = {
    chatList: [],
    contacts: [],
    activeChat: '',
    isLoading: false
}

const ChatReducer = (state = initial_state, action) => {
    switch(action.type) {
        case 'setContactList':
            return { ...state, contacts: action.payload.users, isLoading: action.payload.isLoading }
        break
        case 'isLoading':
            return { ...state, isLoading: action.payload.isLoading }
        break
        case 'setActiveChat':
            return { ...state, activeChat: action.payload.chatId }
        break
        case 'setChatList':
            return { ...state, chatList: action.payload.chats }
        break
        case 'resetState':
            return { ...initial_state }
        break
    }

    return state
}

export default ChatReducer
