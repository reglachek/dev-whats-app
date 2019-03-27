import React, { Component } from 'react'
import { View, Text, Platform, StyleSheet, Button } from 'react-native'
import { connect } from 'react-redux'
import { checkLogin } from '../actions/AuthActions'

class Home extends Component {
    constructor(props) {
        super(props)
    }

    static navigationOptions = {
        header: null
    }

    handleSignIn = () => this.props.navigation.navigate('SignIn')
    handleSignUp = () => this.props.navigation.navigate('SignUp')

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.h1}>DevsApp 1.0</Text>

                <View style={styles.buttonArea}>
                    <Button title='Sign In' onPress={this.handleSignIn} />
                    <Button title='Sign Up' onPress={this.handleSignUp} />
                </View>
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
    h1: {
        fontSize: 30,
        marginBottom: 50,
    },
    buttonArea: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around'
    }
})

const mapStateToProps = state => {
    return {
        status: state.AuthReducer.status
    }
}

const HomeConnect = connect(mapStateToProps, { checkLogin })(Home)

export default HomeConnect
