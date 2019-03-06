import React, { Component } from 'react';
import { StyleSheet, Alert } from 'react-native'
import {
    Left,
    Body,
    Right,
    Button,
    Item,
    List,
    ListItem,
    Input,
    Content,
    Text,
    Form,
    Label,
    CheckBox,
    Container,
    Header,
    Icon,
    Title,

} from 'native-base';
import { PullPicker } from 'teaset'
import { ApolloConsumer } from 'react-apollo';
import { SearchBar } from 'react-native-elements'
import { trim } from '../../utils/tools'

import GET_SKILLS from "../../graphql/get_skills.query"

const placeMap = { "0": "本市", "1": "本省", "2": "全国" }
const items = ["本市", "本省", "全国"]

export default class StackedLabelExample extends Component {

    state = {
        display: "partner",
        partaners: [],
        skillName: "",
        number: "",
        selectedIndex: "",
        search: '',
        searchSkills: [],
    }

    _renderSkillName = () => (
        <ApolloConsumer>
            {client => (
                <Content>
                    <Item>
                        <SearchBar
                            placeholder="输入技能名称..."
                            onChangeText={(text) => this.setState({ search: text })}
                            value={this.state.search}
                        />
                        <Button
                            onPress={
                                async () => {
                                    const search = trim(this.state.search).toLowerCase()
                                    if (!/^[A-Za-z0-9\u4e00-\u9fa5]+/.test(search)) {
                                        Alert.alert('格式必须为英文、中文或数字')
                                        return
                                    }
                                    const { data } = await client.query({
                                        query: GET_SKILLS,
                                        variables: { name: search }
                                    });
                                    this.setState({ searchSkills: data.skills });
                                }}
                        >
                            <Text>搜索</Text>
                        </Button>
                    </Item>
                    {this.state.searchSkills.map((skill, index) => (
                        <ListItem key={index}>
                            <CheckBox
                                onPress={() => this.setState({ skillName: skill.name, display: "addPartner" })}
                            />
                            <Body>
                                <Text>{skill.name}</Text>
                            </Body>
                        </ListItem>
                    ))}
                </Content>
            )}
        </ApolloConsumer>
    )

    _renderAddPatenar = () => (
        <Form>
            <Item >
                <Left>
                    <Text>合伙人所需技能</Text>
                </Left>
                <Right>
                    <Button
                        transparent
                        onPress={() => this.setState({ display: "skillName" })}
                    >
                        <Text>{this.state.skillName ? this.state.skillName : "请选择"}</Text>
                    </Button>
                </Right>
            </Item>
            <Item >
                <Text>合伙人数</Text>
                <Input
                    value={this.state.number}
                    onChangeText={(value) => this.setState({ number: value })}
                />
            </Item>
            <Item>
                <Left><Text>寻找范围</Text></Left>
                <Right>
                    <Button
                        transparent
                        onPress={() => PullPicker.show(
                            '发布范围',
                            items,
                            this.state.selectedIndex,
                            (item, index) => this.setState({ selectedIndex: index })
                        )}
                    >
                        <Text>{this.state.selectedIndex ? placeMap[this.state.selectedIndex] :"请选择"}</Text>
                    </Button>
                </Right>
            </Item>
            <Button
                full
                style={{ marginHorizontal: 20, marginVertical: 15 }}
                onPress={() => this.setState({
                    display: "project",
                    partaners: this.state.partaners.push(
                        {
                            skillName: this.state.skillName,
                            number: this.state.number,
                            place: this.state.selectedIndex
                        }
                    ),
                    skillName: "",
                    number: "",
                    selectedIndex: ""
                })}
            >
                <Text>确认添加</Text>
            </Button>
        </Form>
    )

    _renderPatenar = () => (
        <List>
                <Button
                    full
                    style={{ marginHorizontal: 20, marginVertical: 15}}
                    onPress={() => this.setState({ display: "addPartner" })}
                >
                    <Text>添加合伙人</Text>
                </Button>
            <ListItem>
                <Left><Text>合伙人所需技能</Text></Left>
                <Body><Text>人数</Text></Body>
                <Right><Text>地点</Text></Right>
            </ListItem>
            {
                this.state.partaners.map(partaner => (
                    <ListItem>
                        <Left>{partaner.skillName}</Left>
                        <Body>{partaner.number}</Body>
                        <Right>{placeMap[partaner.place]}</Right>
                    </ListItem>
                ))
            }
        </List>
    )

    _renderContent = (display, project) => {
        if (display === "partner") {
            return this._renderPatenar()
        } else if (display === "addPartner") {
            return this._renderAddPatenar()
        } else if (display === "skillName") {
            return this._renderSkillName()
        }
    }


    render() {
        const {display} = this.state
        const  project  = this.props.navigation.getParam('project')
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
                        <Title>{project.name}</Title>
                    </Body>
                    <Right >
                    </Right>
                </Header>
                <Content>
                    {this._renderContent(display,project)}
                </Content>
            </Container>
        );
    }
}
