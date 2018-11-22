import React, { Component } from 'react';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Picker,
  Button
 } from 'native-base';
import {StyleSheet,TouchableOpacity,Text } from 'react-native'

import Nav from '../Nav'

export default class AddFamily extends Component {
  state={
    gender:"",
    name:"",
    relationship:"",
  }

  render() {
    const {gender,relationship,name} = this.state
    return (
      <Container>
        <Content>
          <Form>
            <Item  style={styles.left}>
              <Label>关系</Label>
              <Picker
                mode="dropdown"
                style={{ width: 100,alignItems:"center", justifyContent:"center",}}
                placeholder="关系"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={relationship}
                onValueChange={(relationship)=>this.setState({relationship})}
              >
                <Picker.Item label="父亲" value="father" />
                <Picker.Item label="母亲" value="mother" />
                <Picker.Item label="哥哥" value="oldbrother" />
                <Picker.Item label="弟弟" value="youngbrother" />
                <Picker.Item label="姐姐" value="oldsister" />
                <Picker.Item label="妹妹" value="youngsister" />
                {
                  gender==="male"
                  ? <Picker.Item label="妻子" value="wife" />
                  : <Picker.Item label="丈夫" value="husband" />
                }
                <Picker.Item label="儿子" value="son" />
                <Picker.Item label="女儿" value="daughter" />
              </Picker>
            </Item>
            <Item  style={styles.right}>
              <Label>姓名</Label>
              <Input
                onChangeText={(name) => this.setState({name})}
              />
            </Item>
            <Button block
              style={styles.saveButton}
              onPress={()=>this.props.navigation.navigate("Family")}
            >
              <Text>保存</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

AddFamily.navigationOptions = ({ navigation }) => ({
  header: (
    <Nav
      title="添加成员"
      navigation={navigation}
      leftIcon={{
        type: 'ionicon',
        name: 'md-arrow-back',
        size: 26,
      }}
      hasLeftIcon={true}
      hasLogoutText={false}
    />
  ),
})

const styles = StyleSheet.create({
  relationship:{
    fontSize:15,
  },
  name:{
    fontSize:20,
  },
  left:{
    flex:0.2,
    alignItems:"center",
    justifyContent:"center",
    padding:10
  },
  right:{
    flex:0.8,
    alignItems:"center",
    justifyContent:"center",
    padding:10
  },
  button:{
    width:80,
    alignItems:"center",
    justifyContent:"center"
  },
  saveButton:{
    margin:10,
  }

})
