import React from 'react'
import { StyleSheet, View ,Alert} from 'react-native'
import { Container, Header, Title, Content, Footer, Spinner, Button, Left, Right, Body, Icon, Text, List, ListItem,Item } from 'native-base';
import {Query} from 'react-apollo'
import { errorMessage } from '../../utils/tools';
import GET_EXAMBASICINFO from '../../graphql/get_exam_basicInfo.query'
import {headerBackgroundColor,headerFontColor,statusBarHeight,headerButtonColor} from '../../utils/settings'


export default class CollegeEntranceExam extends React.Component {

    _handleBasicInfo=()=>{
        const data=this.props.navigation.getParam('data', '')
        this.props.navigation.navigate('QueryExamBasicInfo',{data})
    }

    _handleUniversityAndMajor=(data,loading,error)=>{
        if(loading) return
        if(error) return 
        if(data && data.getExamBasicInfo){
            this.props.navigation.navigate('UniversityAndMajor',{data})
        }else{
            Alert.alert('需要先填写高考基本信息')
            return
        }
    }

    _handleApplicationResult=()=>{
        const data=this.props.navigation.getParam('data', '')
        this.props.navigation.navigate('QueryResult')
    }

    render() {
        return (
            <Container style={{flex:1}}>
                <Header style={{marginTop:statusBarHeight}}>
                    <Left>
                        <Button 
                        transparent
                        onPress={()=>this.props.navigation.goBack()}
                        >
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title >高考报名</Title>
                    </Body>
                    <Right />
                </Header>
                <Content style={{flex:0.5}}>
                    <List>
                     
                        <ListItem
                            onPress={this._handleBasicInfo}>
                            <Left>
                                <Text >高考基本信息</Text>
                            </Left>
                            <Right>
                                <Icon type="FontAwesome" name="arrow-right" />
                            </Right>
                        </ListItem>
                        <Query query={GET_EXAMBASICINFO}>
                            {
                                ({loading,error,data})=>{
                                    return (
                                        <ListItem
                                        onPress={()=>this._handleUniversityAndMajor(data,loading,error)}
                                            >
                                            <Left>
                                                <Text >选择学校和专业</Text>
                                            </Left>
                                            <Right>
                                                <Icon type="FontAwesome" name={loading ? "spinner":"arrow-right"} />
                                            </Right>
                                            {error && Alert.alert(errorMessage(error))}
                                        </ListItem>
                                    )
                                }
                            }
                        </Query>
                        
                        <ListItem 
                            onPress={this._handleApplicationResult}
                        >
                            <Left>
                                <Text>报名结果</Text>
                            </Left>
                            <Right>
                                <Icon type="FontAwesome" name="arrow-right" />
                            </Right>
                        </ListItem>
                    </List>
                    
                </Content>
                <Footer style={{flex:0.3,backgroundColor:'white'}}>
                    <View>
                    <View><Text>报名流程说明:</Text></View>
                    <View><Text>第一步:填写个人高考基本信息</Text></View>
                    <View><Text>第二步:选择学校和专业进行报名</Text></View>
                    <View><Text>第三步:在报名结果页面查看最新的报名情况</Text></View>
                    <View><Text>注意:每人每天仅有3次免费报名机会</Text></View>
                    </View>
                </Footer>
            </Container>
        )
    }
}

const styles=StyleSheet.create({
    text:{
        color:'blue'
    }
})

