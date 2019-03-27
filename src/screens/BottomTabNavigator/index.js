import { createBottomTabNavigator } from 'react-navigation'

import ConversationStackNavigator from '../ConversationStackNavigator/'
import ContactList from './ContactList'
import Config from './Config'

const BottomTabNavigator = createBottomTabNavigator({
    ConversationStackNavigator: {
        screen: ConversationStackNavigator
    },
    ContactList: {
        screen: ContactList
    },
    Config: {
        screen: Config
    },
})

export default BottomTabNavigator
