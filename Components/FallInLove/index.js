import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo'
import {
    Container,
    Header,
    Content,
    List,
    Icon,
    ListItem,
    Title,
    Text,
    Left,
    Body,
    Right,
    Button,
    Spinner,
    FooterTab,
    Footer,
    Thumbnail,
} from 'native-base';

import GET_ME from '../../graphql/get_me.query'
import ADD_UPDATE_LOVESIGNUP from '../../graphql/add_loveSignUp.mutation'
import { DateStartTime } from '../../utils/settings'
import { errorMessage } from '../../utils/tools'


export default class FallInLove extends Component {

    constructor(props) {
        super(props);
        const {me} = props.navigation.getParam('data')
        const now = new Date()
        const phase = parseInt(`${(now.getTime() - DateStartTime.getTime()) / 1000 / 60 / 60 / 24 / 7}`) + 1
        let status
        if(me.signUpLove){
            if(me.signUpLove.period===`${phase}`){
                status = "1"
            }else{
                status = "0"
            }
        }else{
            status = "0"
        }
        this.state={
            status
        }
      }

    render() {
        const {status} = this.state
        const week = new Date().getDay();
        let signUp
        if (week == 0 || week == 5 || week == 6) {
            signUp = true
        } else {
            signUp = true
        }
        const now = new Date()
        const phase = parseInt(`${(now.getTime() - DateStartTime.getTime()) / 1000 / 60 / 60 / 24 / 7}`) + 1
        return (
            <Query query={GET_ME}>
                {
                    ({ loading, error, data }) => {
                        if (loading) return <Spinner />
                        if (error) return <Text>{errorMessage(error)}</Text>
                        return (
                            <Container>
                                <Header>
                                    <Left>
                                        <Button
                                            onPress={() => this.props.navigation.goBack()}
                                            transparent
                                        >
                                            <Icon name='md-arrow-back' type='Ionicons' />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Title>同城热恋</Title>
                                    </Body>
                                    <Right >
                                        <Button
                                            onPress={() => this.props.navigation.navigate('FallInLoveSettings',{me:data.me})}
                                            transparent
                                        >
                                            <Icon name='md-settings' type='Ionicons' />
                                        </Button>
                                    </Right>
                                </Header>
                                <Content>
                                    <List>
                                        <ListItem>
                                            <Text>{signUp ? `${data.me.residence ? data.me.residence.city.name : ""}相亲报名第${phase}期` : "本期报名已截止"}</Text>
                                        </ListItem>
                                        <Mutation 
                                        mutation={ADD_UPDATE_LOVESIGNUP}
                                        update={(cache, { data: { addOrUpdateLoveSignUp } }) => {
                                            const { me } = cache.readQuery({ query: GET_ME });
                                            cache.writeQuery({
                                              query: GET_ME,
                                              data: { me: {...me,signUpLove:addOrUpdateLoveSignUp}},
                                            });
                                          }}
                                        >
                                        {
                                            addOrUpdateLoveSignUp=>{

                                                return(
                                                    <Button
                                                    full
                                                    info
                                                    rounded
                                                    style={{ marginHorizontal: 20, marginVertical: 15 }}
                                                    disabled={!signUp || status!=="0"}
                                                    onPress={()=>{
                                                        addOrUpdateLoveSignUp()
                                                        this.setState({status:"1"})

                                                    }}
                                                >
                                                    <Text>{status==="0" ?"参与报名" :"已报名"}</Text>
                                                </Button>
                                                )
                                            }
                                        }
                                        </Mutation>
                                        
                                        <ListItem>
                                            {signUp && <Text>见面时间：周五公布结果</Text>}
                                           
                                        </ListItem>
                                        <ListItem>
                                            {signUp && <Text>见面地点：周五公布结果</Text>}
                                        </ListItem>
                                        <ListItem>
                                            {signUp && <Text>本期相亲对象：见面地点：周五公布结果</Text>}
                                        </ListItem>
                                        {
                                            !signUp && (
                                                <ListItem thumbnail>
                                                    <Left>
                                                        <Thumbnail square source={{ uri: 'Image URL' }} />
                                                    </Left>
                                                    <Body>
                                                        <Text>Sankhadeep</Text>
                                                        <Text note numberOfLines={1}>Its time to build a difference . .</Text>
                                                    </Body>
                                                    <Right>
                                                        <Button transparent>
                                                            <Text>View</Text>
                                                        </Button>
                                                    </Right>
                                                </ListItem>
                                            )
                                        }
                                    </List>
                                </Content>
                                <Footer>
                                    <FooterTab style={{ backgroundColor: 'white' }}>
                                        <Button
                                            full
                                            transparent
                                            onPress={() => this.props.navigation.navigate('FallInLoveRules')}
                                        >
                                            <Text style={{ fontSize: 14 }}>
                                                规则和建议
                                </Text>
                                        </Button>
                                    </FooterTab>
                                </Footer>
                            </Container>
                        )
                    }
                }
            </Query>
        );
    }
}