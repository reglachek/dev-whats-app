import React, { Component } from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'

import Reducers from './src/Reducers'

import PreLoad from './src/screens/PreLoad'
import Home from './src/screens/Home'
import SignUp from './src/screens/SignUp'
import SignIn from './src/screens/SignIn'
import BottomTabNavigator from './src/screens/BottomTabNavigator/'

const store = createStore(Reducers, applyMiddleware(reduxThunk))

const Navigator = createStackNavigator({
    PreLoad: {
        screen: PreLoad
    },
    Home: {
        screen: Home
    },
    SignUp: {
        screen: SignUp
    },
    SignIn: {
        screen: SignIn
    },
    BottomTabNavigator: {
        screen: BottomTabNavigator,
        navigationOptions: () => ({
            header: null
        })
    },
})

const AppContainer = createAppContainer(Navigator)

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <AppContainer />
            </Provider>
        )
    }
}
