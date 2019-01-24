import { SecureStore } from 'expo'
import {wsClient} from '../../apollo'

const logout = (navigation,client) =>{
  navigation.navigate('Login')
  wsClient.unsubscribeAll(); // unsubscribe from all subscriptions
  SecureStore.deleteItemAsync('token')
  client.resetStore()
  wsClient.close()
}

export default logout;
