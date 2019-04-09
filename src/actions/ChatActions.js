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

export const sendMessage = (msgType, msgContent, author, activeChat) => dispatch => {
    let currentDate = ''
    let date = new Date()

    currentDate = `${date.getFullYear()}-`
    currentDate += `${(date.getMonth() + 1)}-`
    currentDate += `${date.getDate()} `
    currentDate += `${date.getHours()}:`
    currentDate += `${date.getMinutes()}:`
    currentDate += `${date.getSeconds()}`

    const msgId = firebase.database().ref('chats').child(activeChat).child('messages').push()

    switch(msgType) {
        case 'text':
            msgId.set({ msgType, currentDate, msgContent, author })
        break
        case 'image':
            msgId.set({ msgType, currentDate, msgContent, author })
        break
    }
    
    dispatch({ type: 'preSendMessage' })
}

export const sendImage = (img, progressCalback, successCalback) => dispatch => {
    const tmpKey = firebase.database().ref('chats').push().key

    const fbImage = firebase.storage().ref().child('images').child(tmpKey)

    fbImage.put(img, { contentType: 'image/jpeg' })
    .on('state_changed', 
    progressCalback,
    error => alert(error.code),
    () => fbImage.getDownloadURL().then(url => {
        successCalback(url)
    }))
}

export const monitorChat = activeChat => dispatch => {
    firebase.database().ref('chats').child(activeChat).child('messages')
    .on('value', snapshot => {
        let messages = []

        snapshot.forEach(childItem => {
            switch(childItem.val().msgType) {
                case 'text':
                    messages.push({
                        key: childItem.key,
                        currentDate: childItem.val().currentDate,
                        msgContent: childItem.val().msgContent,
                        author: childItem.val().author,
                        msgType: childItem.val().msgType
                    })
                break
                case 'image':
                    messages.push({
                        key: childItem.key,
                        currentDate: childItem.val().currentDate,
                        msgContent: childItem.val().msgContent,
                        author: childItem.val().author,
                        msgType: childItem.val().msgType
                    })
                break
            }
        })
        
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
