import React, { Component } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { connect } from 'react-redux'
import { signOut } from '../../actions/AuthActions'
import { resetState } from '../../actions/ChatActions'
import { StackActions, NavigationActions } from 'react-navigation'

class Config extends Component {
    constructor(props) {
        super(props)
    }

    static navigationOptions = {
    }

    signOut = () => {
        this.props.resetState()
        this.props.signOut()

        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Home' })
            ]
        }))
    }

    render() {
        return (
            <View>
                <Text>Config</Text>

                <Button title='Sign Out' onPress={this.signOut} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

const mapStateToProps = state => {
    return {
    }
}

const ConfigConnect = connect(mapStateToProps, { signOut, resetState })(Config)

export default ConfigConnect
