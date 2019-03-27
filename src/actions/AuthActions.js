import firebase from 'react-native-firebase'

export const signOut = () => {
    firebase.auth().signOut()

    return {
        type: 'changeStatus',
        payload: {
            status: 2
        }
    }
}

export const checkLogin = () => {
    return dispatch => {

        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                dispatch({
                    type: 'changeUid',
                    payload: {
                        uid: user.uid
                    }
                })
            } else {
                dispatch({
                    type: 'changeStatus',
                    payload: {
                        status: 2
                    }
                })
            }
        })
    }
}

export const changeName = name => ({
    type: 'changeName',
    payload: { name }
})

export const changeEmail = email => ({
    type: 'changeEmail',
    payload: { email }
})

export const changePassword = password => ({
    type: 'changePassword',
    payload: { password }
})

export const signUpAction = (name, email, password) => {
    return dispatch => {
        dispatch({
            type: 'changeIsLoading',
            payload: {
                isLoading: true
            }
        })
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(() => {
            const uid = firebase.auth().currentUser.uid

            firebase.database().ref('users').child(uid).set({ name }, erro => {
                if(erro) {
                    alert(erro)
                    dispatch({
                        type: 'changeUid',
                        payload: { isLoading: false }
                    })
                } else {
                    dispatch({
                        type: 'changeUid',
                        payload: { uid, isLoading: false }
                    })


                }
            })
        })
        .catch(error => {
            switch(error.code) {
                case 'auth/email-already-in-use':
                    alert('E-mail já utilizado')
                break
                case 'auth/invalid-email':
                    alert('E-mail inválido')
                break
                case 'auth/operation-not-allowed':
                    alert('Tente mais tarde')
                break
                case 'auth/weak-password':
                    alert('A senha precisa ter no mínimo 6 caracteres')
                break
            }

            dispatch({
                type: 'changeIsLoading',
                payload: { isLoading: false }
            })
        })
    }
}

export const signInAction = (email, password) => {
    return dispatch => {
        dispatch({
            type: 'changeIsLoading',
            payload: { isLoading: true }
        })

        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(() => {
            const uid = firebase.auth().currentUser.uid

            dispatch({
                type: 'changeUid',
                payload: { isLoading: false, uid }
            })

        })
        .catch(error => {
            switch(error.code) {
                case 'auth/invalid-email':
                    alert('E-mail inváladio')
                break
                case 'auth/user-disabled':
                    alert('Sua conta está desativado')
                break
                case 'auth/user-not-found':
                    alert('Essa conta não existe')
                break
                case 'auth/wrong-password':
                    alert('Senha errada')
                break
            }

            dispatch({
                type: 'changeIsLoading',
                payload: { isLoading: false }
            })
        })
    }
}
