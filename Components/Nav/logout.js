import { SecureStore } from 'expo'
import {wsClient} from '../../apollo'

const logout = (navigation,client) =>{
  SecureStore.deleteItemAsync('token')
  wsClient.close()
  client.resetStore()
  navigation.navigate('Login')
}

export default logout;
