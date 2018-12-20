import React from 'react'
import {StyleSheet,View,Alert} from 'react-native'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text,List,ListItem } from 'native-base'; 
import {Query} from 'react-apollo'

import GET_ME from '../../graphql/get_me.query'
import { errorMessage } from '../../utils/tools';
import MyIcon from '../../Components/MyIcon'


export default class Home extends React.Component {

    _handleCollegeEntranceExam=(data)=>{
        if(!(data.me.studies.length!==0 && data.me.studies.filter(study=>study.school.kind==="HighSchool").length!==0)){
            Alert.alert('请在“我-学习经历”中添加学习经历至高中')
            return 
        }
        if(!(data.me.families.length!==0 && data.me.families.filter(family=>family.status==='3').length!==0)){
            Alert.alert('请在“我-家庭成员”的界面添加家庭成员，并至少与一人连接')
            return 
        }
        this.props.navigation.navigate('CollegeEntranceExam',{data})
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Header</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <List>
                        <ListItem style={styles.item}>
                        <Query query={GET_ME}>
                            {
                                ({loading,error,data})=>{
                                    return(
                                        <View>
                                        <MyIcon
                                            iconName={loading?'spinner':'road'}
                                            iconType='font-awesome'
                                            color="#517fa4"
                                            handlePress={()=>this._handleCollegeEntranceExam(data)}
                                            name="高考报名"
                                        />
                                        {error && Alert.alert(errorMessage(error))}
                                        </View>
                                    )
                                }
                            }
                        </Query>
                            
                            <MyIcon
                                iconName='road'
                                iconType='font-awesome'
                                color="blue"
                                handlePress={() => console.log('123')}
                                name="高考报名"
                            />
                            <MyIcon
                                iconName='road'
                                iconType='font-awesome'
                                color="red"
                                handlePress={() => console.log('123')}
                                name="高考报名"
                            />
                            <MyIcon
                                iconName='road'
                                iconType='font-awesome'
                                color="yellow"
                                handlePress={() => console.log('123')}
                                name="高考报名"
                            />
                        </ListItem>
                    </List>


                        
                    
                </Content>
                <Footer>
                    <FooterTab>
                        <Button full>
                            <Text>Footer</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    content:{
        flex:1,
        flexDirection:'row',
    },
    item:{
        flexDirection:"row",
        justifyContent:'space-around',
        alignItems:"stretch",
    }
})