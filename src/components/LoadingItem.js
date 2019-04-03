import React, { Component } from 'react'
import { View, Modal, StyleSheet, ActivityIndicator } from 'react-native'

export default class LoadingItem extends Component {
    render() {
        return (
            <Modal animationTyp='none' transparent visible={this.props.visible}>
                <View style={styles.loading}>
                    <ActivityIndicator size='large' color='green' />
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
        opacity: 0.5
    }
})
