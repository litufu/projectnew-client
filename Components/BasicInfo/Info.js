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
  CheckBox,
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
import {trim,errorMessage} from '../../utils/tools'
import ADD_BASICKINFO from '../../graphql/add_basicinfo.mutation'
import {randomId} from '../../utils/settings'
import GET_ME from '../../graphql/get_me.query';

export default class Info extends Component{

  state = {
    name:this.props.name||'',
    gender:this.props.gender||'male',
    birthday:this.props.birthday.calendar?this.props.birthday:{calendar:"gregorian",date:''},
    place:this.props.birthplace.province?this.props.birthplace:{province:'',city:'',area:'',street:'',village:''},
    residence:this.props.residence.province?this.props.residence:{province:'',city:'',area:'',street:'',village:''},
    editable:this.props.editable||false,
    checked:false
  }

  handlePlace=(place)=>{
    this.setState({place:place})
  }

  handleResidence=(place)=>{
    this.setState({residence:place})
  }

  handleDate=(date)=>{
    this.setState({birthday:Object.assign(this.state.birthday,{date:date})})
  }

  validate=(name,gender,birthday,placeCode,residenceCode)=>{
    if(name===""){
      Alert.alert('姓名未填写')
      return false
    }
    const rxName =/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
    if(!rxName.test(name)){
      Alert.alert('姓名格式暂不支持')
      return false
    }
    if(gender!=='male' && gender !== 'female'){
      Alert.alert('性别未选择')
      return false
    }
    if(birthday.calendar!=='lunar' && birthday.calendar!=='gregorian'){
      Alert.alert('未选择日历类别')
      return false
    }
    if(isNaN(Date.parse(birthday.date))){
    　　Alert.alert(`生日选择错误 ${birthday.date}`)
      return false
    }
    if(!placeCode.province || !residenceCode.province  ){
        Alert.alert(`未选择所在省`)
        return false
    }
    if (!placeCode.city || !residenceCode.city ){
      Alert.alert('未选择所在市')
      return false
    }
    if (!placeCode.area || !residenceCode.area ){
      Alert.alert('未选择所在区')
      return false
    }
    if (!placeCode.street || !residenceCode.street ){
      Alert.alert('未选择所在乡镇')
      return false
    }
    if (!placeCode.village || !residenceCode.village ){
      Alert.alert('未选择所在村')
      return false
    }
    return true
  }

  handleSubmit=(addBasicInfo)=>{
    if(!this.state.editable){
      return null
    }
    const {name,gender,birthday,place,residence} = this.state
    const placeCode = {
      province:place.province.code,
      city:place.city.code,
      area:place.area.code,
      street:place.street.code,
      village:place.village.code,
    }
    const residenceCode = {
      province:residence.province.code,
      city:residence.city.code,
      area:residence.area.code,
      street:residence.street.code,
      village:residence.village.code,
    }
    const pass = this.validate(name,gender,birthday,placeCode,residenceCode)
    if(!pass){
      return null
    }
    this.setState({editable:false})
    addBasicInfo({ 
      variables: { name,gender,birthday,birthplace:placeCode,residence:residenceCode },
      update: (cache, { data: { addBasicInfo } }) => {
        const data = {me:{...addBasicInfo}}
        cache.writeQuery({ query: GET_ME, data});
      }
    })
  }

  _handleChecked=()=>{
    const {checked,place} = this.state
    if(!checked){
      this.setState({residence:place})
    }
    this.setState({ checked: !checked })
  }

  render(){

    const {name,gender,birthday,editable,place,residence,checked} = this.state
    const displayPlace = display(place)
    const displayResidence = display(residence)

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
            <Left style={{flex:0.4}}>
              <Text>出生日期</Text>
            </Left>
            {
              editable
              ? (
                <View style={styles.birthday}>
                  <Picker
                    mode="dropdown"
                    style={{height:20,alignItems:"center",width:10}}
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
              :(<View style={styles.birthday}>
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
          {
            editable && (<ListItem>
            <CheckBox
                checked={checked}
                onPress={this._handleChecked}
            />
            <Body style={{ paddingHorizontal: 10 }}>
                <Text >居住地同出生地</Text>
            </Body>
            </ListItem>)
          }
          
          <ListItem >
            <Left >
              <Text>居住地</Text>
            </Left>
            {
              editable ? (
                <View  style={styles.birthplace}>
                  <Region
                  handlePlace={this.handleResidence}
                  place={residence}
                  />
                </View>
              )
              :(<View style={styles.birthplace}>
                  <Text>{displayResidence}</Text>
                </View>
              )
            }
          </ListItem>
        </List>
          <View style={styles.buttonContainer}>
           <Left  style={{flex:1,alignItems:"center" }}>
           <View>
             <Button
               style={styles.button}
               onPress={()=>this.setState({editable:true})}
               disabled={editable?true:false}
               >
              <Text style={styles.whiteText }>编辑</Text>
             </Button>
             </View>
           </Left>
           <Right style={{flex:1,alignItems:"center" }}>
            <Mutation mutation={ADD_BASICKINFO}>
            {(addBasicInfo, { loading, error }) => (
              <Button
                style={styles.button}
                onPress={()=>this.handleSubmit(addBasicInfo)}
                disabled={editable?false:true}
                >
                <Text style={styles.whiteText }>{ loading ? '保存中...':'保存'}</Text>
               {error && Alert.alert(errorMessage(error))}
              </Button>
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
    paddingHorizontal:10,
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
