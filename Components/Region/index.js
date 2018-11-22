import React, { Component } from 'react';
import {
  View,
  Text,
  Modal,
  Dimensions,
  Picker,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import Location from './Location'

export default class Region extends Component{
  state={
  place:{},
  openProvinceCityArea:false,
}

  handlePlace=(place,closeModal)=>{
    this.setState({place:Object.assign(this.state.place,place),openProvinceCityArea:closeModal},)
  }

  render(){
    const {place} = this.state
    console.log('place',place)
    return(
      <View>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <TouchableOpacity
         onPress={()=>this.setState({openProvinceCityArea:true})}
       >
       <Text>
        {place.province ? place.province.name+place.city.name+place.area.name+place.street.name+place.village.name: '居住地'}
       </Text>
     </TouchableOpacity>
        <Location
        callback={this.handlePlace}
        openProvinceCityArea={this.state.openProvinceCityArea}
        />

      </View>
    )
  }
}
