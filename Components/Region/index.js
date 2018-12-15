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
import display from '../../utils/displayplace'

export default class Region extends Component{
  state={
  place:this.props.place||{},
  openProvinceCityArea:this.props.openProvinceCityArea || false,
}

  componentWillReceiveProps(nextProps) {
    if (nextProps.place !== this.props.place) {
      this.setState({
        place:nextProps.place
    })
    }
  }

  handlePlace=(place,closeModal)=>{
    const newplace = Object.assign(this.state.place,place)
    this.setState({place:newplace,openProvinceCityArea:closeModal})
    this.props.handlePlace(newplace)
  }

  render(){
    const {place} = this.state
    const displayPlace = display(place)
    return(
      <View>
        <TouchableOpacity
         onPress={()=>this.setState({openProvinceCityArea:true})}
       >
       <Text style={{color:'blue'}}>
        {displayPlace}
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
