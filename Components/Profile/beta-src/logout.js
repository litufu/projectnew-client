import { SecureStore } from 'expo'

const logout = (navigation) =>{
  SecureStore.deleteItemAsync('token')
  navigation.navigate('Login')
}

export default logout;
