import React, { Component } from 'react';
import { View, StyleSheet,TouchableNativeFeedback,TextInput,Alert } from 'react-native'
import { 
    Container, 
    Content, 
    List, 
    ListItem, 
    Text, 
    Left, 
    Right,
    Input,
    Button, 
    CheckBox,
    Body,
    Label,
    Picker,
    Icon,
    Spinner,
} from 'native-base';
import {Query,Mutation} from 'react-apollo'
import {withNavigation} from 'react-navigation'

import Region from '../Region'
import display from '../../utils/displayplace'
import {grades} from '../../utils/tools'
import ADD_LOCATION from '../../graphql/add_location.mutation'
import GET_NEWSCHOOL from '../../graphql/get_newSchool.query'
import GET_NEWMAJOR from '../../graphql/get_newMajor.query'
import GET_NEWGRADEANDCLASSES from '../../graphql/get_newGradeAndClasses.query'

class Study extends Component {
    state = {
        selected:"0",
        startYear: '',
        endYear: '',
        location: {},
        name:'',
        hasMajor:false,
    }

    onValueChange = (value) => {
        this.setState({
            selected: value,
        });
        if(!!~['PrimarySchool', 'JuniorMiddleSchool', 'HighSchool'].indexOf(value)){
            this.setState({hasMajor:false})
        }
        if(!!~['VocationalHighSchool', 'TechnicalSchool', 'SecondarySpecializedSchool',
                    'JuniorCollege','Undergraduate','Master','Doctor','JuniorToCollege','HighToCollege','HighToJunior'
                ].indexOf(value)){
                    this.setState({hasMajor:true})
                }

        this.setState({location:{},startYear:"",endYear:"",undivided:false})
    }

    _handlePlace = (place,addLocation,client)=>{
        const {selected} = this.state
        if(selected==="0"){
            Alert.alert('你尚未选择学历')
            return
        }
        this.setState( {location:place})
        // 判断地址是否正确
        const hasCity = place.city.code!==""
        const hasArea = place.area.code!==""
        const hasStreet = place.street.code!==""
        const hasVillage = place.village.code!==""
        // 检查地点是否合格
       
        let newlocation
        switch(selected){
            case "PrimarySchool":
                if(hasVillage){
                    newlocation = {
                        province:place.province.code,
                        city:place.city.code,
                        area:place.area.code,
                        street:place.street.code,
                        village:place.village.code
                    }
                }
                break;
            case "JuniorMiddleSchool" :
                if(hasStreet){
                    newlocation = {
                        province:place.province.code,
                        city:place.city.code,
                        area:place.area.code,
                        street:place.street.code,
                        village:""
                    }
                }
                break;
            case "HighSchool":
                if(hasArea){
                    newlocation = {
                        province:place.province.code,
                        city:place.city.code,
                        area:place.area.code,
                        street:"",
                        village:""
                    }
                }
                break;
            case 'VocationalHighSchool':
            case  'TechnicalSchool':
            case  'SecondarySpecializedSchool':
            case 'JuniorCollege':
            case 'Undergraduate':
            case'Master' :
            case 'Doctor':
            case 'JuniorToCollege':
            case 'HighToCollege':
            case 'HighToJunior' :
                if(hasCity){
                    newlocation = {
                        province:place.province.code,
                        city:place.city.code,
                        area:"",
                        street:"",
                        village:""
                    }
                }
                break;
        }

        console.log(newlocation)

        // 新增地址
        if(newlocation){
            const locationName = place.province.name + place.city.name + place.area.name + place.street.name + place.village.name
            // addLocation({ variables: { location:newlocation,locationName } });
        }
        const data = {
            newSchool: {
              __typename: 'NewSchool',
              id: "",
              name:"",
            },
          };
        client.writeData({ data });
        
    }

    _selectSchool = () =>{
        const {location,selected} = this.state
        if(location===""){
            Alert.alert('你尚未选择地址')
            return
        }

        if(selected==="0"){
            Alert.alert('你尚未选择学历')
            return
        }

        // 判断地址是否正确
        const hasCity = location.city.code!==""
        const hasArea = location.area.code!==""
        const hasStreet = location.street.code!==""
        const hasVillage = location.village.code!==""
        // 检查地点是否合格
       
        let newlocation
        switch(selected){
            case "PrimarySchool":
                if(!hasVillage){
                    Alert.alert('地址选择不完整')
                    return
                }
                break;
            case "JuniorMiddleSchool" :
                if(!hasStreet){
                    Alert.alert('地址选择不完整')
                    return
                }
                break;
            case "HighSchool":
                if(!hasArea){
                    Alert.alert('地址选择不完整')
                    return
                }
                break;
            case 'VocationalHighSchool':
            case  'TechnicalSchool':
            case  'SecondarySpecializedSchool':
            case 'JuniorCollege':
            case 'Undergraduate':
            case'Master' :
            case 'Doctor':
            case 'JuniorToCollege':
            case 'HighToCollege':
            case 'HighToJunior' :
                if(!hasCity){
                    Alert.alert('未选择市')
                    return
                }
                break;
            default:
                Alert.alert("你尚未选择学历")
                break;
        }
        // 查询地点所有的学校并列示
        this.props.navigation.navigate('SelectSchool', {locationName:display(this.state.location),kind:this.state.selected})
    }

    _selectMajor=()=>{
        const {selected} = this.state
        if(selected==="0"){
            Alert.alert('你尚未选择学历')
            return
        }
        this.props.navigation.navigate('SelectMajor',{education:selected})
    }

    _selectClass=()=>{
        const {startYear,endYear} = this.state
        const reg = /^\d{4}$/;
        if(!reg.test(startYear)){
            Alert.alert('你输入的入学时间有误，请输入四位数字')
            return
        }
        if(!reg.test(endYear)){
            Alert.alert('你输入的毕业时间有误，请输入四位数字')
            return
        }
        this.props.navigation.navigate('SelectClass',{startYear,endYear})
    }

    render() {
        const { startYear, endYear, location,undivided,hasMajor } = this.state
        return (
            <Container>
                <Content>
                    <List>
                    <ListItem >
                            <Left style={styles.left}>
                                <Text>学历类别:</Text>
                            </Left>
                            <Right style={styles.right}>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                                    style={{ height: 20 }}
                                    selectedValue={this.state.selected}
                                    onValueChange={this.onValueChange}
                                >
                                    <Picker.Item label="" value="0" />
                                    <Picker.Item label="初等教育-小学" value="PrimarySchool" />
                                    <Picker.Item label="中等教育-初中" value="JuniorMiddleSchool" />
                                    <Picker.Item label="中等教育-高中" value="HighSchool" />
                                    <Picker.Item label="中等教育-职业中学" value="VocationalHighSchool" />
                                    <Picker.Item label="中等教育-技工学校" value="TechnicalSchool" />
                                    <Picker.Item label="中等教育-中等专业学校" value="SecondarySpecializedSchool" />
                                    <Picker.Item label="普通高等教育-大专" value="JuniorCollege" />
                                    <Picker.Item label="普通高等教育-本科" value="Undergraduate" />
                                    <Picker.Item label="普通高等教育-硕士" value="Master" />
                                    <Picker.Item label="普通高等教育-博士" value="Doctor" />
                                    <Picker.Item label="成人高等教育-专科起点本科" value="JuniorToCollege" />
                                    <Picker.Item label="成人高等教育-高中起点升本科" value="HighToCollege" />
                                    <Picker.Item label="成人高等教育-高中起点升专科" value="HighToJunior" />
                                </Picker>
                            </Right>
                        </ListItem>
                        <ListItem>

                            <Left style={styles.left}>
                                <Text>入学年份:</Text>
                            </Left>
                            <Right style={styles.right}>
                                <TextInput
                                style={{width:50,borderBottomColor:'black',borderBottomWidth:1,paddingHorizontal:5}}
                                keyboardType='numeric'
                                maxLength={4}
                                placeholder="年度"
                                value={startYear}
                                onChangeText={(startYear) => this.setState({startYear})}
                                />
                            </Right>
                        </ListItem>
                        <ListItem>
                            <Left style={styles.left}>
                                <Text>毕业年份:</Text>
                            </Left>
                            <Right style={styles.right}>
                                <TextInput
                                    style={{width:50,borderBottomColor:'black',borderBottomWidth:1,paddingHorizontal:5}}
                                    keyboardType='numeric'
                                    maxLength={4}
                                    placeholder="年度"
                                    value={endYear}
                                    onChangeText={(endYear) => this.setState({endYear})}
                                    />
                            </Right>

                        </ListItem>
                        <ListItem>
                            <Left style={styles.left}>
                                <Text>地点:</Text>
                            </Left>
                            <Right style={styles.right}>
                            <Mutation 
                                mutation={ADD_LOCATION}
                                >
                                {(addLocation,{client}) => {
                                    return (<Region
                                        handlePlace={(place) => this._handlePlace(place,addLocation,client)}
                                        place={location}
                                    />)
                                }}
                            </Mutation>
                            </Right>
                        </ListItem>
                        <ListItem>
                            <Left style={styles.left}>
                                <Text>学校名称:</Text>
                            </Left>
                            <Right style={styles.right}>
                            
                            
                            <Query 
                            query={GET_NEWSCHOOL}
                            >
                            {({ data}) => {
                                if(data.newSchool.id===""){
                                    return (<TouchableNativeFeedback
                                        onPress={this._selectSchool}
                                        >
                                        <Text>未填写</Text>
                                        </TouchableNativeFeedback>)
                                    
                                }
                                 return (<TouchableNativeFeedback
                                    onPress={this._selectSchool}
                                    >
                                    <Text>{data.newSchool.name}</Text>
                                    </TouchableNativeFeedback>)
                            }}
                            </Query>
                            
                            
                            </Right>
                        </ListItem>
                        {
                            hasMajor && (
                                <ListItem>
                                    <Left style={styles.left}>
                                        <Text>专业名称:</Text>
                                    </Left>
                                    <Right style={styles.right}>
                                    <Query 
                                        query={GET_NEWMAJOR}
                                        >
                                        {({ data}) => {
                                            if(data.newMajor.id===""){
                                                return (<TouchableNativeFeedback
                                                    onPress={this._selectMajor}
                                                    >
                                                    <Text>未填写</Text>
                                                    </TouchableNativeFeedback>)
                                                
                                            }
                                            return (<TouchableNativeFeedback
                                                onPress={this._selectMajor}
                                                >
                                                <Text>{data.newMajor.name}</Text>
                                                </TouchableNativeFeedback>)
                                        }}
                                        </Query>

                                    </Right>
                                </ListItem>
                            )
                        }
                        {
                            !undivided && (<ListItem>
                            <Left style={styles.left}>
                                <Text>所在班级:</Text>
                            </Left>
                            <Right style={styles.right}>
                                <Query 
                                    query={GET_NEWGRADEANDCLASSES}
                                    >
                                    {({ data}) => {
                                        if(data.newGradeAndClasses.length===0){
                                            return (<TouchableNativeFeedback
                                                onPress={this._selectClass}
                                                >
                                                <Text>未填写</Text>
                                                </TouchableNativeFeedback>)
                                            
                                        }
                                        return (<TouchableNativeFeedback
                                            onPress={this._selectClass}
                                            >
                                            <Text>{`${grades[data.newGradeAndClasses[0].grade]}年级${data.newGradeAndClasses[0].className==="0"?"未分":data.newGradeAndClasses[0].className}班...`}</Text>
                                            </TouchableNativeFeedback>)
                                    }}
                                </Query>
                       
                            </Right>
                        </ListItem>)
                        }
                        
                        <ListItem>
                            <Body>
                                <Button block>
                                    <Text>确定</Text>
                                </Button>
                            </Body>
                        </ListItem>
                    </List>

                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    left:{
        flex:0.2
    },
    right:{
        flex:0.8,
        flexDirection:'row',
        justifyContent:'flex-end'

    },
})


export default withNavigation(Study)
