import React, { Component } from 'react';
import UnReadMessage from './UnReadMessage'

export default class Chat extends Component{

    render(){
        const userInfo = this.props.navigation.getParam('user')
        return(
            <UnReadMessage
                userInfo={userInfo}
                navigation={this.props.navigation}
            />
        )
    }
}