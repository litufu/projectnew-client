import React, { Component } from 'react';
import {StyleSheet} from 'react-native'
import { Container, Content, Form, Item, Picker, Icon, Text, List, ListItem, Left, Right } from 'native-base';
import School from './School'

export default class Study extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: '0'
        };
    }

    onValueChange = (value) => {
        this.setState({
            selected: value
        });
    }

    render() {
        const { selected } = this.state
        return (
            <Container>
                <Content>
                    <Form style={{paddingHorizontal:15}}>
                        <Item picker style={{ flexDirection: 'row',justifyContent:'space-between' }}>
                            <Text>学历类别:</Text>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                style={{ width: undefined }}
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
                        </Item>
                    </Form>
                    {!!~['PrimarySchool', 'JuniorMiddleSchool', 'HighSchool'].indexOf(selected) && <School hasMajor={false}/>}
                    {!!~['VocationalHighSchool', 'TechnicalSchool', 'SecondarySpecializedSchool',
                    'JuniorCollege','Undergraduate','Master','Doctor','JuniorToCollege','HighToCollege','HighToJunior'
                ].indexOf(selected) && <School hasMajor={true}/>}

                </Content>
            </Container>
        );
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
        flex:0.8
    },
})
