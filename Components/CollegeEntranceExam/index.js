import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, List, ListItem,Item } from 'native-base';



export default class CollegeEntranceExam extends React.Component {

    state={
        selectedItem:""
    }

    _handleBasicInfo=()=>{
        this.setState({selectedItem:"1"})
        this.props.navigation.navigate('QueryExamBasicInfo')
        this.setState({selectedItem:""})
    }

    render() {
        const {selectedItem} = this.state
        return (
            <Container style={{flex:1}}>
                <Header >
                    <Left>
                        <Button transparent>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>高考报名</Title>
                    </Body>
                    <Right />
                </Header>
                <Content style={{flex:0.5}}>
                    <List>
                        <ListItem
                        selected={selectedItem==="1"} 
                        onPress={this._handleBasicInfo}>
                            <Left>
                                <Text >高考基本信息</Text>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem
                        selected={selectedItem==="2"} 
                        >
                            <Left>
                                <Text >选择学校和专业</Text>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem 
                        selected={selectedItem==="3"} 
                        >
                            <Left>
                                <Text>报名结果</Text>
                            </Left>
                            <Right>
                                <Icon name="arrow-forward" />
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

