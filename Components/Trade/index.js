import React, { Component } from 'react';
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
     Spinner ,
     FooterTab,
     Footer,
} from 'native-base';
import {Stepper} from 'teaset'

export default class Tradde extends Component {
    state={
        valueCustom:1,
    }
    render() {
        const product = this.props.navigation.getParam('product')
        const {valueCustom} = this.state
        const amount = valueCustom * (product.price)
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
                        <Title>提交订单页</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <List>
                        <ListItem>
                        <Left>
                            <Text>{product.subject}</Text>
                        </Left>
                        </ListItem>
                        <ListItem>
                        <Left>
                            <Text>数量</Text>
                        </Left>
                        <Right>
                        <Stepper 
                            defaultValue={1} 
                            min={1} 
                            step={1}
                            max={10} 
                            onChange={v => this.setState({valueCustom: v})}
                            />
                        </Right>
                        </ListItem>
                        <ListItem>
                        <Left>
                            <Text>金额</Text>
                        </Left>
                        <Right>
                            <Text>{amount}</Text>
                        </Right>
                        </ListItem>
                    </List>
                </Content>
                <Footer>
                <FooterTab style={{backgroundColor:'orange'}}>
                    <Button full>
                    <Text style={{fontSize:15,color:'white'}}>{`${amount}元 提交订单`}</Text>
                    </Button>
                </FooterTab>
                </Footer>
            </Container>
        );
    }
}