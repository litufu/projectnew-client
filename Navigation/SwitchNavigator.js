import { createSwitchNavigator } from 'react-navigation'

import Loading from '../Components/Loading'
import LoginNavigator from './LoginNavigator'
import AppNavigator from './AppNavigator'

export default createSwitchNavigator(
    {
        Loading,
        Login: LoginNavigator,
        App:AppNavigator
    },
    {
        initialRouteName: 'Loading'
    }
)
