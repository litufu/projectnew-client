import React, { Component } from 'react';
import { View, StyleSheet, TouchableNativeFeedback, TextInput, Alert, } from 'react-native'
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
    Label,
    Picker,
    Icon,
    Spinner,
    Item,
    Form
} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Query, Mutation } from 'react-apollo'
import { withNavigation } from 'react-navigation'

import { errorMessage } from '../../utils/tools'
import MyDateTime from '../MyDatetime'
import GET_ME from '../../graphql/get_me.query'
import ADD_WORK from '../../graphql/add_work.mutation'

export default class Job extends React.Component {
    state = {
        startTime: "",
        endTime: "",
        companyName: "",
        department: "",
        post: "",
        now: false
    }

    _reconfirm = (addWork, client) => {
        const { startTime, endTime, companyName, department, post, now } = this.state
        const checkCompanyName = /^[（()）\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
        const rxName = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/

        if (startTime === "") {
            Alert.alert('未选择开始工作时间')
            return
        }

        if (endTime === "" && now === false) {
            Alert.alert('未选择离职时间')
            return
        }
        if (companyName === "") {
            Alert.alert('未输入单位名称')
            return
        }
        if (!checkCompanyName.test(companyName)) {
            Alert.alert('单位名称暂不支持')
            return
        }
        if (department === "") {
            Alert.alert('未输入部门名称')
            return
        }
        if (!rxName.test(companyName)) {
            Alert.alert('部门名称暂不支持')
            return
        }
        if (post === "") {
            Alert.alert('未输入职位名称')
            return
        }
        if (!rxName.test(post)) {
            Alert.alert('岗位名称暂不支持')
            return
        }

        if (now) {
            Alert.alert(
                '请确认:',
                `
                单位:${companyName}
                入职时间:${(new Date(startTime)).toLocaleDateString()}
                离职时间:${now ? "在职状态" : (new Date(endTime)).toLocaleDateString()}
                部门:${department}
                职位:${post}
                
                上述信息一经确认将无法修改。
            `,
                [
                    { text: '取消', onPress: () => console.log('取消'), style: 'cancel' },
                    { text: '确认', onPress: () => this._submit(startTime, "9999-12-1", companyName, department, post, addWork, client) },
                ],
                { cancelable: false }
            )
        } else {
            Alert.alert(
                '请确认:',
                `
                单位:${companyName}
                入职时间:${startTime}
                离职时间:${now ? "在职状态" : endTime}
                部门:${department}
                职位:${post}
                
                上述信息一经确认将无法修改。
            `,
                [
                    { text: '取消', onPress: () => console.log('取消'), style: 'cancel' },
                    { text: '确认', onPress: () => this._submit(startTime, endTime, companyName, department, post, addWork, client) },
                ],
                { cancelable: false }
            )
        }
    }

    _submit = (startTime, endTime, companyName, department, post, addWork, client) => {

        const { me } = client.readQuery({ query: GET_ME })
        const startYear = (new Date(startTime)).getFullYear()
        const endYear = (new Date(endTime)).getFullYear()
        const birthyear = new Date(me.birthday).getFullYear()
        if (birthyear > startYear) {
            Alert.alert('出生后才能上班，请检查出生日期是否正确')
            return
        }
        if (birthyear + 10 > parseInt(startYear)) {
            Alert.alert('太小了，无法上班，请检查出生日期是否设置错误')
            return
        }
        if (parseInt(startYear) > parseInt(endYear)) {
            Alert.alert('入职年份必须小于离职年份')
            return
        }

        addWork({
            variables: {
                startTime,
                endTime,
                companyName,
                department,
                post
            },
            optimisticResponse: {
                __typename: "Mutation",
                addWork: {
                    __typename: "Work",
                    id: '123',
                    startTime: startTime,
                    endTime: endTime,
                    department: department,
                    post: post,
                    company: {
                        __typename: "Company",
                        id: "456",
                        name: companyName
                    }
                }
            },
            update: (cache, { data }) => {
                const data1 = cache.readQuery({ query: GET_ME });
                data1.me.works.push(data.addWork);
                cache.writeQuery({
                    query: GET_ME,
                    data: data1
                });
            }
        })

    }


    render() {
        const { companyName, department, post, now } = this.state
        return (

            <Container>
                <Content>
                    <List >
                        <ListItem>
                            <Left style={styles.left}>
                                <Text>单位:</Text>
                            </Left>
                            <Input
                                style={styles.input}
                                placeholder="单位全称"
                                value={companyName}
                                onChangeText={(companyName) => this.setState({ companyName })}
                            />
                        </ListItem>
                        <ListItem>
                            <Left style={styles.left}>
                                <Text>部门:</Text>
                            </Left>
                                <Input
                                    style={styles.input}
                                    placeholder="部门名称"
                                    value={department}
                                    onChangeText={(department) => this.setState({ department })}
                                />
                            
                        </ListItem>
                        <ListItem>
                        <Left style={styles.left}>
                                <Text>职位:</Text>
                            </Left>
                            <Input
                                style={styles.input}
                                placeholder="职位名称"
                                value={post}
                                onChangeText={(post) => this.setState({ post })}
                            />
                        </ListItem>

                        <ListItem >
                            <Left >
                                <Text>开始工作:</Text>
                            </Left>
                            <View>
                                <MyDateTime
                                    mode="date"
                                    handleDate={(startTime) => this.setState({ startTime })}
                                />
                            </View>
                        </ListItem>
                        {
                            !now && (<ListItem >
                                <Left >
                                    <Text>结束工作:</Text>
                                </Left>
                                <View >
                                    <MyDateTime
                                        mode="date"
                                        handleDate={(endTime) => this.setState({ endTime })}
                                    />
                                </View>
                            </ListItem>)
                        }
                        <ListItem>
                            <CheckBox
                                checked={now}
                                onPress={() => { this.setState({ now: !now }) }}
                            />
                            <Body style={{ paddingHorizontal: 10 }}>
                                <Text >目前在职</Text>
                            </Body>
                        </ListItem>
                        <ListItem>
                            <Body>
                                <Mutation
                                    mutation={ADD_WORK}
                                    onCompleted={()=>Alert.alert('保存完成')}

                                >
                                    {
                                        (addWork, { loading, error, client }) => {
                                            return (<Button
                                                block
                                                onPress={() => this._reconfirm(addWork, client)}
                                            >
                                                <Text>确定</Text>
                                                {loading && <Spinner />}
                                                {error && Alert.alert(errorMessage(error))}
                                            </Button>)
                                        }
                                    }
                                </Mutation>
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
    body: {
        flex: 0.3
    },
    right: {
        flex: 0.5,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    left: {
        flex: 0.2,
    },
    input: {
        flex: 1,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        paddingHorizontal: 5,
    }

})