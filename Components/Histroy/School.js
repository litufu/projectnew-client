import React, { Component } from 'react';
import { View, StyleSheet,TouchableNativeFeedback,TextInput } from 'react-native'
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
    Label
} from 'native-base';
import {withNavigation} from 'react-navigation'

import MyDatetime from '../MyDatetime'
import Region from '../Region'

class School extends Component {
    state = {
        startDate: '',
        endDate: '',
        location: '',
        name:'',
        undivided:false
    }

    render() {
        const {hasMajor} = this.props
        const { startDate, endDate, location,undivided } = this.state
        return (
            <Container>
                <Content>
                    <List>
                        <ListItem>
                            <Left style={styles.left}>
                                <Text>入学时间:</Text>
                            </Left>
                            <Right style={styles.right}>
                                <TextInput
                                style={{width:50,borderBottomColor:'black',borderBottomWidth:1,paddingHorizontal:5}}
                                keyboardType='numeric'
                                maxLength={4}
                                placeholder="年度"
                                value={startDate}
                                onChangeText={(startDate) => this.setState({startDate})}
                                />
                                <Text>年9月</Text>
                            </Right>
                        </ListItem>
                        <ListItem>
                            <Left style={styles.left}>
                                <Text>毕业时间:</Text>
                            </Left>
                            <Right style={styles.right}>
                                <TextInput
                                    style={{width:50,borderBottomColor:'black',borderBottomWidth:1,paddingHorizontal:5}}
                                    keyboardType='numeric'
                                    maxLength={4}
                                    placeholder="年度"
                                    value={endDate}
                                    onChangeText={(endDate) => this.setState({endDate})}
                                    />
                                <Text>年6月</Text>
                            </Right>

                        </ListItem>
                        <ListItem>
                            <Left style={styles.left}>
                                <Text>地点:</Text>
                            </Left>
                            <Right style={styles.right}>
                                <Region
                                    handlePlace={(place) => this.setState({ location: place })}
                                    place={location}
                                    hideStreet={true}
                                />
                            </Right>
                        </ListItem>
                        <ListItem>
                            <Left style={styles.left}>
                                <Text>学校名称:</Text>
                            </Left>
                            <Right style={styles.right}>
                                <TouchableNativeFeedback
                                    onPress={()=>this.props.navigation.navigate('SelectInput')}
                                >
                                    <Text>未填写</Text>
                                </TouchableNativeFeedback>
                            </Right>
                        </ListItem>
                        {
                            hasMajor && (
                                <ListItem>
                                    <Left style={styles.left}>
                                        <Text>专业名称:</Text>
                                    </Left>
                                    <Right style={styles.right}>
                                        <TouchableNativeFeedback
                                            onPress={()=>this.props.navigation.navigate('SelectInput')}
                                        >
                                            <Text>未填写</Text>
                                        </TouchableNativeFeedback>
                                    </Right>
                                </ListItem>
                            )
                        }
                         <ListItem >
                            <CheckBox
                                checked={undivided}
                                onPress={() => { this.setState({ undivided: !undivided }) }}
                            />
                            <Body>
                                <Label > 本界仅有一个班,未分班</Label>
                            </Body>
                        </ListItem>
                        {
                            !undivided && (<ListItem>
                            <Left style={styles.left}>
                                <Text>所在班级:</Text>
                            </Left>
                            <Right style={styles.right}>
                            <TouchableNativeFeedback
                                    onPress={()=>this.props.navigation.navigate('SelectClass')}
                                >
                                    <Text>选择班级</Text>
                                </TouchableNativeFeedback>
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

export default  withNavigation(School)