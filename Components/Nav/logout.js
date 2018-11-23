import { SecureStore } from 'expo'

const logout = (navigation,client) =>{
  SecureStore.deleteItemAsync('token')
  client.resetStore()
  navigation.navigate('Login')
}

export default logout;
