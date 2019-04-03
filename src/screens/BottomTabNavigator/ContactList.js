import React, { Component } from 'react'
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'

import { getContactList, createChat } from '../../actions/ChatActions'

import ContactItem from '../../components/ContactList/ContactItem'

class ContactList extends Component {
    static navigationOptions = {
        title: 'Contacts'
    }

    handleContact = item => {
        this.props.createChat(this.props.uid, item.key)

        this.props.navigation.navigate('ConversationStackNavigator')
    }

    componentDidMount() {
        this.props.getContactList(this.props.uid)
    }

    render() {
        return (
            <View style={styles.container}>
                {!this.props.isLoading && 
                <FlatList 
                    data={this.props.contacts}
                    renderItem={({ item }) => <ContactItem data={item} onPress={this.handleContact} />}
                    keyExtractor={item => `contact-key-${item.key}`}
                />}

                {this.props.isLoading && <ActivityIndicator size='large' color='green' />}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    }
})

const mapStateToProps = state => {
    return {
        uid: state.AuthReducer.uid,
        contacts: state.ChatReducer.contacts,
        isLoading: state.ChatReducer.isLoading,
    }
}

const ContactListConnect = connect(mapStateToProps, { getContactList, createChat })(ContactList)

export default ContactListConnect
