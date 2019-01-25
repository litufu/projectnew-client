import React from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, List, ListItem, Spinner } from 'native-base';
import { Query } from 'react-apollo'

import GET_ME from '../../graphql/get_me.query'
import { errorMessage } from '../../utils/tools';
import MyIcon from '../../Components/MyIcon'
import { headerBackgroundColor, headerFontColor, statusBarHeight, headerButtonColor } from '../../utils/settings'


export default class Home extends React.Component {
    static navigationOptions = {
        header: null,
    };

    _handleCollegeEntranceExam = (data, loading, error) => {
        if (loading) return
        if (error) return
        if (!(data.me.studies && data.me.studies.length !== 0 && data.me.studies.filter(study => study.school.kind === "HighSchool").length !== 0)) {
            Alert.alert('请在“我-学习经历”中添加学习经历至高中')
            return
        }
        if (!(data.me.families && data.me.families.length !== 0 && data.me.families.filter(family => family.status === '3').length !== 0)) {
            Alert.alert('请在“我-家庭成员”的界面添加家庭成员，并至少与一人连接')
            return
        }
        this.props.navigation.navigate('CollegeEntranceExam', { data })
    }

    render() {
        return (
            <Query
             query={GET_ME}>
                {
                    ({ loading, error, data }) => {

                        if(loading) return <Spinner />
                        if(error) return <View style={{alignItems:"center"}}><Text>{errorMessage(error)}</Text></View>
                        if(!data.me) this.props.navigation.navigate('Login')
                        return(<Container>
                             <Header style={{marginTop:statusBarHeight}}>
                                <Left />
                                    <Body style={{alignItems:'flex-end',justifyContent:"center",}}>
                                        <Title>水滴</Title>
                                    </Body>
                                    <Right/>
                                </Header>
                            <Content>
                                <List>
                                    <ListItem style={styles.item}>
                                        <MyIcon
                                            iconName={loading ? 'spinner' : 'road'}
                                            iconType='font-awesome'
                                            color="#517fa4"
                                            handlePress={() => this._handleCollegeEntranceExam(data, loading, error)}
                                            name="高考报名"
                                        />
                                    </ListItem>
                                </List>
                            </Content>
                        </Container>)
                    }
                }
            </Query>
        );
    }
}


const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'row',
    },
    item: {
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: "stretch",
    }
})