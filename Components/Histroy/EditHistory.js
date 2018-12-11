import React, { Component } from 'react';
import { Container, Content, Form, Item, Picker, Icon,Text  } from 'native-base';

import Live from './Live'
import Study from './Study'
import Work from './Work'

export default class EditHistory extends Component{
    constructor(props) {
        super(props);
        this.state = {
          selected: '0'
        };
      }

      onValueChange=(value)=> {
        this.setState({
          selected: value
        });
      }

      render() {
        return (
          <Container>
            <Content>
              <Form style={{paddingHorizontal:15}} >
                <Item picker style={{flexDirection:'row'}}>
                  <Text>经历类别:</Text>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                    style={{ width: undefined }}
                    selectedValue={this.state.selected}
                    onValueChange={this.onValueChange}
                  >
                    <Picker.Item label="" value="0" />
                    <Picker.Item label="学习经历" value="study" />
                    <Picker.Item label="工作经历" value="work" />
                    <Picker.Item label="生活经历" value="live" />
                    <Picker.Item label="其他经历" value="other" />
                  </Picker>
                </Item>
              </Form>
              {this.state.selected==='study' && <Study />}
              {this.state.selected==='work' && <Work />}
              {this.state.selected==='live' && <Live />}
            </Content>
                
          </Container>
        );
      }

}