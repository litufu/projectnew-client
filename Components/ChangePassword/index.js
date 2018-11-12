import React, {Component} from 'react';
import {
  Container,
  Header,
  Left,
  Body,
  Button,
  Icon,
  Title,
  Content,
  Form,
  Item,
  Label,
  Input,
  Text
} from 'native-base';
import { withNavigation } from 'react-navigation';

class ChangePasswordController extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newPassword: "",
            currentPassword: "",
            confirmPassword: ""
        };
    }

    /**
     * Button Save pressed
     */
    onbtnSavePress() {
        if (this.state.currentPassword.trim().length == 0) {
            console.log("Please enter current password");
        } else if (this.state.newPassword.trim().length == 0) {
            console.log("Please enter new password");
        } else if (this.state.newPassword != this.state.confirmPassword) {
            console.log("Password dose not match");
        } else {
            Keyboard.dismiss();
            this.changePassword();
        }
    }

    /**
     * Call your webservice for update password
     */
    changePassword() {

    }

    render() {
        return (
          <Container>
            <Header>
              <Left>
                <Button transparent onPress={()=>this.props.navigation.navigate('Profile')}>
                  <Icon name='arrow-back' />
                </Button>
              </Left>
              <Body>
                <Title >修改密码</Title>
              </Body>
            </Header>
             <Content>
              <Form>
               <Item inlineLabel>
                 <Input
                  placeholder="当前密码"
                  onChangeText={(currentPassword) => this.setState({currentPassword})}
                  value={this.state.currentPassword}
                 />
               </Item>
               <Item inlineLabel last>
                 <Input
                 placeholder="请输入新密码"
                 onChangeText={(newPassword) => this.setState({newPassword})}
                 value={this.state.newPassword}
                  />
               </Item>
               <Item inlineLabel last>
                 <Input
                  placeholder="请再次确认新密码"
                   onChangeText={(confirmPassword) => this.setState({confirmPassword})}
                   value={this.state.confirmPassword}
                  />
               </Item>
               <Button block primary
                onPress={() => this.onbtnSavePress()}
               ><Text > 确 认 </Text></Button>
              </Form>
             </Content>
          </Container>
        );
    }
}

export default withNavigation(ChangePasswordController)
