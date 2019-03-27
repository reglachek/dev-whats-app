import { createStackNavigator } from 'react-navigation'

import ChatList from './ChatList'
import Chat from './Chat'

const ConversationStackNavigator = createStackNavigator({
    ChatList: {
        screen: ChatList
    },
    Chat: {
        screen: Chat
    }
}, {
    navigationOptions: {
        tabBarLabel: 'Conversation'
    }
})

export default ConversationStackNavigator
