import React from 'react'
import {StyleSheet,View} from 'react-native'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text,List,ListItem } from 'native-base'; 

import MyIcon from '../../Components/MyIcon'

export default class Home extends React.Component {

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
                            <MyIcon
                                iconName='road'
                                iconType='font-awesome'
                                color="#517fa4"
                                handlePress={() => this.props.navigation.navigate('CollegeEntranceExam')}
                                name="高考报名"
                            />
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