import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class MessageItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dateMsg: this.getFormattedDate(this.props.data.currentDate)
        }
    }

    getFormattedDate = originalDate => {
        const currentDate = new Date()
        const messageDate = originalDate.split(' ') //['2019-3-28', '14:39:40']
        let todayDate = `${currentDate.getFullYear()}-`
        todayDate += `${currentDate.getMonth() + 1}-`
        todayDate += `${currentDate.getDate()}`

        let newFormat = messageDate[1].split(':') //['14','39']
        newFormat = `${newFormat[0]}:${newFormat[1]}`

        // Verifica se a data de agora é diferente da data da msg enviada
        if(todayDate != messageDate[0]) {
            newDiferentFormat = messageDate[0].split('-')//['2019', '3', '28']

            newFormat = `
                ${newDiferentFormat[2]}/${newDiferentFormat[1]}/${newDiferentFormat[0]} ${newFormat}
            `
        }

        /*
            Se tiver passado passado pelo if retorna o dia e os minutos,
            se não retorna apenas a hora e minuto
        */
        return newFormat
    }

    render() {
        const { message, author } = this.props.data

        const dinamicContainer = author == this.props.authUserUid ? styles.authUserContainer : styles.otherUserContainer

        const dinamicMessage = author == this.props.authUserUid ? styles.authUserMessage : styles.otherUserMessage

        return (
            <View style={[styles.container, dinamicContainer]}>
                <Text style={dinamicMessage}>{message}</Text>
                <Text style={styles.dateText}>{this.state.dateMsg}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        maxWidth: '80%',
        marginHorizontal: 10,
        marginVertical: 5,
        padding: 10,
        borderRadius: 5,
    },
    authUserContainer: {
        backgroundColor: '#9999FF',
        alignSelf: 'flex-end'
    },
    authUserMessage: {
        textAlign: 'right'
    },
    otherUserContainer: {
        backgroundColor: '#EEEEEE',
        alignSelf: 'flex-start'
    },
    otherUserMessage: {
        textAlign: 'left'
    },
    dateText: {
        fontSize: 11,
        textAlign: 'right'
    },
})