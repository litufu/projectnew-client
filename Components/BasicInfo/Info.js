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
  Picker,
  Text,

} from 'native-base'
import {
  Alert,
  TouchableOpacity,
  View,
  Dimensions,
  TextInput,
  StyleSheet,
} from "react-native"
import dateFormat from 'dateformat';
import { Mutation } from "react-apollo";

import Region from '../Region'
import MyDatetime from '../MyDatetime'
import display from '../../utils/displayplace'
import {trim} from '../../utils/tools'
import ADD_BASICKINFO from '../../graphql/add_basicinfo.mutation'
import GET_ME from '../../graphql/get_me.query'

export default class Info extends Component{

  state = {
    name:this.props.name||'',
    gender:this.props.gender||'male',
    birthday:this.props.birthday.calendar?this.props.birthday:{calendar:"gregorian",date:''},
    place:this.props.birthplace.province?this.props.birthplace:{province:'',city:'',area:'',street:'',village:''},
    editable:this.props.editable||false,
  }

  handlePlace=(place)=>{
    this.setState({place:place})
  }

  handleDate=(date)=>{
    this.setState({birthday:Object.assign(this.state.birthday,{date:date})})
  }

  validate=(name,gender,birthday,placeCode)=>{
    let pass = true
    if(name===""){
      Alert.alert('姓名未填写')
      pass = false
    }
    const rxName =/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
    if(!rxName.test(name)){
      Alert.alert('姓名格式暂不支持')
      pass = false
    }
    if(gender!=='male' && gender !== 'female'){
      Alert.alert('性别未选择')
      pass = false
    }
    if(birthday.calendar!=='lunar' && birthday.calendar!=='gregorian'){
      Alert.alert('未选择日历类别')
      pass = false
    }
    if(isNaN(Date.parse(birthday.date))){
    　　Alert.alert(`生日选择错误 ${birthday.date}`)
        pass = false
    }
    if(!placeCode.province){
        Alert.alert(`未选择所在省 ${placeCode.province}`)
        pass = false
    }
    if (placeCode.province!=null && placeCode.province !="" && isNaN(placeCode.province)){
        Alert.alert(`未选择所在省 ${placeCode.province}`)
        pass = false
    }
    if (placeCode.city!=null && placeCode.city !="" && isNaN(placeCode.city)){
      Alert.alert('未选择所在市')
      pass = false
    }
    if (placeCode.area==null && placeCode.area =="" && isNaN(placeCode.area)){
      Alert.alert('未选择所在区')
      pass = false
    }
    if (placeCode.street==null && placeCode.street =="" && isNaN(placeCode.street)){
      Alert.alert('未选择所在乡镇')
      pass = false
    }
    if (placeCode.village==null && placeCode.village =="" && isNaN(placeCode.village)){
      Alert.alert('未选择所在村')
      pass = false
    }
    return pass
  }

  handleSubmit=(addBasicInfo)=>{
    if(!this.state.editable){
      return null
    }
    const {name,gender,birthday,place} = this.state
    const placeCode = {
      province:place.province.code,
      city:place.city.code,
      area:place.area.code,
      street:place.street.code,
      village:place.village.code,
    }
    const pass = this.validate(name,gender,birthday,placeCode)
    if(!pass){
      return null
    }
    this.setState({editable:false})
    addBasicInfo({ 
      variables: { name,gender,birthday,birthplace:placeCode }
    })
  }

  render(){

    const {name,gender,birthday,editable,place} = this.state
    const displayPlace = display(place)

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
                onChangeText={(name) => this.setState({name:trim(name)})}
                value={name}
                editable={editable}
                placeholder={name===""?"未填写":name}
                style={{color:this.state.editable?'blue':'black'}}
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
              ? (
                <View style={styles.birthday}>
                  <Picker
                    mode="dropdown"
                    style={{height:20,alignItems:"center"}}
                    selectedValue={birthday.calendar}
                    onValueChange={value=>this.setState({birthday:Object.assign(this.state.birthday,{calendar:value})})}
                  >
                    <Picker.Item label="公历" value="gregorian" />
                    <Picker.Item label="阴历" value="lunar" />
                  </Picker>
                  <MyDatetime
                    showtime={true}
                    handleDate={this.handleDate}
                    chosenDate={this.state.birthday.date}
                  />
              </View>
            )
              :(<View>
                {
                  this.state.birthday.date
                  ? (
                    <View style={styles.birthday}>
                      <Text>{this.state.birthday.calendar==="lunar" ?"阴历":"阳历"}</Text>
                      <Text>{dateFormat(this.state.birthday.date, "yyyy年mm月dd日h时")}</Text>
                    </View>
                  )
                : (
                  <View style={styles.birthday}>
                    <Text>未填写</Text>
                  </View>
                 )
                }
                </View>
              )
            }
          </ListItem>
          <ListItem >
            <Left >
              <Text>出生地</Text>
            </Left>
            {
              editable ? (
                <View  style={styles.birthplace}>
                  <Region
                  handlePlace={this.handlePlace}
                  place={place}
                  />
                </View>
              )
              :(<View style={styles.birthplace}>
                  <Text>{displayPlace}</Text>
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
            <Mutation mutation={ADD_BASICKINFO}>
            {(addBasicInfo, { loading, error }) => (
              <TouchableOpacity
                style={styles.button}
                onPress={()=>this.handleSubmit(addBasicInfo)}>
                <Text style={styles.whiteText }>{ loading ? '保存中...':'保存'}</Text>
               {error && Alert.alert(error.message.replace(/GraphQL error:/g, ""))}
              </TouchableOpacity>
            )}

            </Mutation>
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
  },
  birthday:{
    flex:1,
    flexDirection:'row',
    alignItems:'flex-end',
    justifyContent:'flex-end'
  },
  birthplace:{
    flex:1,
    flexDirection:'row',
    alignItems:'flex-end',
    justifyContent:'flex-end',
  }
})
