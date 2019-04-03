import firebase from 'react-native-firebase'

export const getContactList = userUid => {
    return dispatch => {
        dispatch({
            type: 'isLoading',
            payload: { isLoading: true }
        })

        firebase.database().ref('users').orderByChild('name').once('value') 
        .then(snapshot => {
            let users = []

            snapshot.forEach(childItem => {
                if(childItem.key != userUid) {
                    users.push({
                        key: childItem.key,
                        name: childItem.val().name
                    })
                }
            })

            dispatch({
                type: 'setContactList',
                payload: { users, isLoading: false }
            })
        })
        .catch(error => {
            alert(error)

            dispatch({
                type: 'isLoading',
                payload: { isLoading: false }
            })
        })
    }
}

export const createChat = (userUid, otherUserUid) => {
    return dispatch => {
        // Criando a estrutura do banco de dados do chat entre duas pessoas 
        const newChat = firebase.database().ref('chats').push()

        newChat.child('members').child(userUid).set({ id: userUid })
        
        newChat.child('members').child(otherUserUid).set({ id: otherUserUid })

        // Associando aos individuos
        const chatId = newChat.key

        // Pega o nome do usuário ao qual foi iniciado a conversa e salva no nó do usuário autenticado o id do chat criado e o nome do outro usuário
        firebase.database().ref('users').child(otherUserUid).once('value')
        .then(snapshot => {
            firebase.database().ref('users').child(userUid).child('chats').child(chatId).set({
                id: chatId,
                otherUserName: snapshot.val().name
            })
        })

        firebase.database().ref('users').child(userUid).once('value')
        .then(snapshot => {
            firebase.database().ref('users').child(otherUserUid).child('chats').child(chatId).set({
                id: chatId,
                otherUserName: snapshot.val().name
            })
            .then(() => dispatch({
                type: 'setActiveChat',
                payload: { chatId }
            }))
        })
        
        
    }
}

export const setActiveChat = chatId => ({
    type: 'setActiveChat',
    payload: { chatId }
})

export const getChatList = userUid => dispatch => {
    dispatch({
        type: 'isLoading',
        payload: { isLoading: true }
    })

    firebase.database().ref('users').child(userUid).child('chats')
    .on('value', snapshot => {
        let chats = []

        snapshot.forEach(childItem => {
            chats.push({
                key: childItem.key,
                otherUserName: childItem.val().otherUserName
            })
        })

        dispatch({
            type: 'setChatList',
            payload: { chats, isLoading: false }
        })
    })
}

export const handleInputChange = message => ({
    type: 'handleInputChange',
    payload: { message }
})

export const sendMessage = (message, author, activeChat) => dispatch => {
    let currentDate = ''
    let date = new Date()

    currentDate = `${date.getFullYear()}-`
    currentDate += `${(date.getMonth() + 1)}-`
    currentDate += `${date.getDate()} `
    currentDate += `${date.getHours()}:`
    currentDate += `${date.getMinutes()}:`
    currentDate += `${date.getSeconds()}`

    const msgId = firebase.database().ref('chats').child(activeChat).child('messages').push()

    msgId.set({ currentDate, message, author })

    dispatch({ type: 'preSendMessage' })
}

export const monitorChat = activeChat => dispatch => {
    firebase.database().ref('chats').child(activeChat).child('messages')
    .on('value', snapshot => {
        let messages = []

        snapshot.forEach(childItem => messages.push({
            key: childItem.key,
            currentDate: childItem.val().currentDate,
            message: childItem.val().message,
            author: childItem.val().author
        }))

        dispatch({
            type: 'setActiveChatMessages',
            payload: { messages }
        })
    })
}

export const monitorChatOff = activeChat => dispatch => {
    firebase.database().ref('chats').child(activeChat).child('messages')
    .off('value')
}

export const resetState = () => ({ type: 'resetState' })
