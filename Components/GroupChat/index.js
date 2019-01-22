import React, { Component } from 'react';
import UnReadMessage from './UnReadMessage'

export default class Chat extends Component{

    render(){
        const group = this.props.navigation.getParam('group',"")
        const type = this.props.navigation.getParam('type',"")
        const me = this.props.navigation.getParam('me',"")
        const groupName = this.props.navigation.getParam('groupName',"")
        return(
            <UnReadMessage
                me={me}
                groupName={groupName}
                type={type}
                group={group}
                navigation={this.props.navigation}
            />
        )
    }
}