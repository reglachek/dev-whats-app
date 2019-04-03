import React, { Component } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { StackActions, NavigationActions } from 'react-navigation'

import { checkLogin } from '../actions/AuthActions'

class PreLoad extends Component {
    static navigationOptions = {
        header: null
    }

    componentDidUpdate(prevProps) {

        if(this.props.status !== prevProps.status) {
            
            let routeName   
            
            switch(this.props.status) {
                case 1:
                    routeName = 'BottomTabNavigator'
                break
                case 2:
                    routeName = 'Home'
                break
            }

            this.props.navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: routeName })
                ]
            }))
        }
    }

    componentDidMount() {
        this.props.checkLogin()
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large' color='green' />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

const mapStateToProps = state => {
    return {
        status: state.AuthReducer.status
    }
}

const PreLoadConnect = connect(mapStateToProps, { checkLogin })(PreLoad)

export default PreLoadConnect
