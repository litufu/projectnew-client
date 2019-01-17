import React, { Component } from 'react';
import QueryMessages from './QueryMessages'
import UnReadMessage from './UnReadMessage'

export default class Chat extends Component{

    render(){
        const userInfo = this.props.navigation.getParam('user')
        const me = this.props.navigation.getParam('me')
        return(
            <UnReadMessage
                userInfo={userInfo}
                me={me}
                navigation={this.props.navigation}
            />
        )
    }
}