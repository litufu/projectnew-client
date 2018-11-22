import React, {Component} from 'react'
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
  Spinner,
  DatePicker,
  Right,
  ListItem,
  List,
  Picker
} from 'native-base'
import {
  Text,
  Alert,
  TouchableOpacity,
  View,
  Dimensions,
  TextInput,
  StyleSheet,
} from "react-native"

import Region from '../Region'



export default class Info extends Component{

  state = {
    name:this.props.name||'',
    gender:this.props.gender||'male',
    birthday:this.props.birthday||{calendar:"lunar",year:'',month:'',day:'',hour:''},
    birthplace:this.props.birthplace||{province:'',city:'',area:'',street:'',village:''},
    editable:this.props.editable||false,
    place:this.props.birthplace
          ?(this.props.birthplace.province+this.props.birthplace.city+
            this.props.birthplace.area+this.props.birthplace.street+this.props.birthplace.village)
            :"",
  }

  _handlePlace=(place)=>{
    const {selectedProvince,selectedCity,selectedArea,selectedStreet,selectedVillage} = place
    const newplace = selectedProvince + selectedCity + selectedArea +selectedStreet + selectedVillage
    this.setState({place:newplace})
  }

  handleSubmit=()=>{
    this.setState({editable:false})
  }

  render(){

    const {name,gender,birthday,birthplace,editable} = this.state
    const place = birthplace.province+birthplace.city+birthplace.area+birthplace.street+birthplace.village

    return(
      <Container>
        <Content>
        <List>
          <ListItem >
            <Left>
              <Text>姓名</Text>
            </Left>
            <Right>
               <TextInput
                onChangeText={(name) => this.setState({name})}
                value={name}
                editable={editable}
                placeholder={name===""?"未填写":name}
                />
            </Right>
          </ListItem>
          <ListItem style={{alignItems:"center",justifyContent:"center"}}>
            <Left>
              <Text>性别</Text>
            </Left>
            <Right>
            {editable
              ? (<Picker
                mode="dropdown"
                style={{ width: 90 ,height:20}}
                selectedValue={gender}
                onValueChange={gender=>this.setState({gender})}
              >
                <Picker.Item label="男" value="male" />
                <Picker.Item label="女" value="female" />
              </Picker>)
              :(<Text>{gender==="male" ? "男":"女"}</Text>)
            }

            </Right>
          </ListItem>
          <ListItem>
            <Left>
              <Text>出生日期</Text>
            </Left>
            {
              editable
              ? (<Picker
                mode="dropdown"
                style={{ width: 80 ,height:20,alignItems:"center"}}
                selectedValue={birthday.calendar}
                onValueChange={value=>this.setState({...birthday,calendar:value})}
              >
                <Picker.Item label="公历" value="Gregorian" />
                <Picker.Item label="阴历" value="lunar" />
              </Picker>)
              :(
                <Text>{this.state.calendar==="lunar" ?"阴历":"阳历"}</Text>
              )
            }

              <TextInput
                placeholder= {birthday.year==="" ?"1989":birthday.year}
                keyboardType="numeric"
                maxLength={4}
                editable={editable}
                style={{width:50,justifyContent:"center"}}
              />
              <Text>年</Text>
              <TextInput
                placeholder={birthday.month==="" ?"12":birthday.month}
                keyboardType="numeric"
                editable={editable}
                maxLength={2}
                style={{width:25,justifyContent:"center"}}
              />
              <Text>月</Text>
              <TextInput
                placeholder={birthday.day==="" ?"31":birthday.day}
                keyboardType="numeric"
                editable={editable}
                maxLength={2}
                style={{width:25,justifyContent:"center"}}
              />
              <Text>日</Text>
              <TextInput
                placeholder={birthday.hour==="" ?"23":birthday.hour}
                keyboardType="numeric"
                editable={editable}
                maxLength={2}
                style={{width:25,justifyContent:"center"}}
              />
              <Text>时</Text>
          </ListItem>
          <ListItem >
            <Left style={{flex:0.2}}>
              <Text>出生地</Text>
            </Left>
            {
              editable ? (
                <View style={{flex:0.8}}>
                  <Region handlePlace={(place)=>this._handlePlace(place)}/>
                </View>
              )
              :(<View style={{flex:0.8,alignItems:"flex-end"}}>
                  <Text>{place ? place : "未填写"}</Text>
                </View>
              )
            }
          </ListItem>
        </List>
          <View style={styles.buttonContainer}>
           <Left  style={{flex:1,alignItems:"center"}}>
             <TouchableOpacity
               style={styles.button}
               onPress={()=>this.setState({editable:true})}>
              <Text style={styles.whiteText }>编辑</Text>
             </TouchableOpacity>
           </Left>
           <Right style={{flex:1,alignItems:"center"}}>
             <TouchableOpacity
               style={styles.button}
               onPress={this.handleSubmit}>
              <Text style={styles.whiteText }>保存</Text>
             </TouchableOpacity>
           </Right>
          </View>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  countContainer: {
    alignItems: 'center',
    padding: 10
  },
  countText: {
    color: '#FF00FF'
  },
  buttonContainer:{
    flex:1,
    flexDirection:"row",
    alignItems:"center",
    margin:5,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 10,
  },
  whiteText:{
    color:"white"
  }
})
