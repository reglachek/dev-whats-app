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
    navigationOptions: ({ navigation }) => {
        let tabBarVisible = true

        if(navigation.state.index > 0) {
            tabBarVisible = false
        }

        return {
            tabBarLabel: 'Conversation',
            tabBarVisible
        }
    }
})

export default ConversationStackNavigator
