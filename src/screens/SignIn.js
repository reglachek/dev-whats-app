import React, { Component } from 'react'
import {
    View,
    Text,
    Platform,
    StyleSheet,
    Button,
    TextInput,
    ActivityIndicator,
} from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions, StackActions } from 'react-navigation'

import LoadingItem from '../components/LoadingItem'

import {
    checkLogin,
    changeEmail,
    changePassword,
    signInAction
} from '../actions/AuthActions'

class SignIn extends Component {
    static navigationOptions = {
        title: 'Sign In'
    }

    handleInputEmail = email => this.props.changeEmail(email)
    handleInputPassword = password => this.props.changePassword(password)

    handleSingUp = () => {
        const { email, password, signInAction } = this.props

        if(email, password) {
            signInAction(email, password)
        } else {
            alert('Preencha todos os campos')
        }
    }

    componentDidUpdate() {
        if(this.props.status == 1) {
            this.props.navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'BottomTabNavigator' })
                ]
            }))
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Digite seu e-mail</Text>
                <TextInput 
                    style={styles.input}
                    value={this.props.email}
                    onChangeText={this.handleInputEmail}
                />

                
                <Text>Digite sua senha</Text>
                <TextInput 
                    style={styles.input}
                    value={this.props.password}
                    onChangeText={this.handleInputPassword}
                    secureTextEntry
                />

                <LoadingItem visible={this.props.isLoading} />
                
                <Button title='Sign Up' onPress={this.handleSingUp} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '80%',
        height: 50,
        fontSize: 23,
        backgroundColor: '#DDDDDD',
        marginBottom: 10,
    }
})

const mapStateToProps = state => {
    return {
        uid: state.AuthReducer.uid,
        email: state.AuthReducer.email,
        password: state.AuthReducer.password,
        isLoading: state.AuthReducer.isLoading,
        status: state.AuthReducer.status
    }
}

const SignInConnect = connect(mapStateToProps, { checkLogin, changeEmail, changePassword, signInAction })(SignIn)

export default SignInConnect
