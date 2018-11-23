import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import dateFormat from 'dateformat';

export default class MyDatetime extends Component {
  state = {
    isDateTimePickerVisible: false,
    chosenDate:this.props.chosenDate || ''
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    this.setState({chosenDate:date})
    this.props.handleDate(date)
    this._hideDateTimePicker();
  };

  render () {
    const {chosenDate} = this.state
    let date
    if(chosenDate===''){
      date = '请选择'
    }else{
      date = dateFormat(chosenDate, "yyyy年mm月dd日h时");
    }

    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={this._showDateTimePicker}>
          <Text style={{color:'blue'}}>{date}</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          mode="datetime"
          locale='zh-Hans'
        />
      </View>
    );
  }

}
