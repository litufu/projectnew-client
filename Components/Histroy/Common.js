import React, { Component } from 'react';
import {View ,Text}  from 'react-native'
import {Picker} from 'native-base'

import MyDateTime from '../MyDatetime'


export default class Common extends Component{
    state = {
        startDate:'',
        endDate : '',
        location:'',
    }

    render(){
        return(
            <View >
                <view>
                    <Text>开始时间</Text>
                    <MyDatetime
                        handleDate={(startDate)=>this.setState({startDate})}
                        chosenDate={this.state.startDate}
                        mode="date"
                    />
                </view>
                <view>
                    <Text>结束时间</Text>
                    <MyDatetime
                        handleDate={(startDate)=>this.setState({startDate})}
                        chosenDate={this.state.startDate}
                        mode="date"
                    />
                </view>
                <view>
                    <Text>开始时间</Text>
                    <MyDatetime
                        handleDate={(startDate)=>this.setState({startDate})}
                        chosenDate={this.state.startDate}
                        mode="date"
                    />
                </view>
                

            </View>
        )
    }
}