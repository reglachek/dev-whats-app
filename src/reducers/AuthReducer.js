const initialState = {
    name: '',
    email: '',
    password: '',
    uid: '',
    status: 0,
    isLoading: false
}

const AuthReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'changeStatus':
            return { ...state, status: action.payload.status }
        break
        case 'changeName':
            return { ...state, name: action.payload.name }
        break
        case 'changeEmail':
            return { ...state, email: action.payload.email }
        break
        case 'changePassword':
            return { ...state, password: action.payload.password }
        break
        case 'changeUid':
            return { ...state, uid: action.payload.uid, isLoading: action.payload.isLoading, status: 1 }
        break
        case 'changeIsLoading':
            return { ...state, isLoading: action.payload.isLoading }
        break
        default: 
            return state
    }
}

export default AuthReducer
