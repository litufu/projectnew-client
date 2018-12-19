import React from 'react'
import { StyleSheet, View, Text, TextInput ,Alert} from 'react-native'
import {
    Container,
    Header,
    Title,
    Content,
    Input,
    Label,
    Button,
    Left,
    Right,
    Body,
    Icon,
    List,
    ListItem,
    Form,
    Item,
    Picker,
    CheckBox,
    Spinner
} from 'native-base';
import {Mutation} from 'react-apollo'
import {withNavigation} from 'react-navigation'

import { provinces } from '../../utils/provinces'
import ADD_EXAMBASICINFO from '../../graphql/add_examBasicInfo.mutation'
import {errorMessage}  from '../../utils/tools'
import GET_EXAMBASICINFO from '../../graphql/get_exam_basicInfo.query'

class ExamBasicInfo extends React.Component {

    state = {
        province: this.props.province || 11,
        section: this.props.section || "arts",
        hasSpecial: this.props.hasSpecial || false,
        score: this.props.score || '0',
        specialScore: this.props.specialScore || '0',
        examineeCardNumber: this.props.specialScore || '',
        updateInfo: this.props.updateInfo || false
    }

    _confirm=(addExamBasicInfo)=>{
        const { province, section, score, specialScore, examineeCardNumber } = this.state
        
        if(province===31 || province===33){
            addExamBasicInfo({
                variables:{province:province.toString(), section:"none", score, specialScore, examineeCardNumber},
                update: (cache, { data }) => {
                    cache.writeQuery({
                        query: GET_EXAMBASICINFO,
                        data: {getExamBasicInfo:data.addExamBasicInfo}
                    });
                }
            })
        }else{
            addExamBasicInfo({
                variables:{province:province.toString(), section, score, specialScore, examineeCardNumber},
                update: (cache, { data }) => {
                    cache.writeQuery({
                        query: GET_EXAMBASICINFO,
                        data: {getExamBasicInfo:data.addExamBasicInfo}
                    });
                }
            })
        }
    }


    render() {
        const { province, section, score, specialScore, examineeCardNumber, hasSpecial, updateInfo } = this.state
        return (
            <Container >
                <Header >
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>高考基本信息</Title>
                    </Body>
                    <Right />
                </Header>
                <Content >
                    <Form>
                        <Item
                            style={styles.item}
                        >
                            <Left>
                                <Text>参加高考的省份:</Text>
                            </Left>
                            <Right>
                                <Picker
                                    note
                                    mode="dropdown"
                                    style={{ width: 200 }}
                                    selectedValue={province}
                                    onValueChange={(value) => this.setState({ province: value })}
                                >
                                    {provinces.map(province => <Picker.Item key={province.id} label={province.name} value={province.id} />)}
                                </Picker>
                            </Right>
                        </Item>

                        <Item
                            style={styles.item}
                        >
                            <Left><Text>准考证号</Text></Left>
                            <Right>
                                <TextInput
                                    style={styles.input}
                                    keyboardType='numeric'
                                    placeholder="请输入14位考生号"
                                    onChangeText={(value) => this.setState({ examineeCardNumber: value })}
                                    value={examineeCardNumber}
                                />
                            </Right>
                        </Item>
                        {
                            !(province === 31 || province===33)  &&
                            (<Item
                            style={styles.item}
                            >
                                <Left>
                                    <Text>文理科:</Text>
                                </Left>
                                <Right>
                                    <Picker
                                        note
                                        mode="dropdown"
                                        style={{ width: 120 }}
                                        selectedValue={section}
                                        onValueChange={(value) => this.setState({ section: value })}
                                    >
                                        <Picker.Item label="文科" value="arts" />
                                        <Picker.Item label="理科" value="science" />
                                    </Picker>
                                </Right>
                            </Item>)
                        }
                        

                        <Item
                            style={styles.item}
                        >
                            <Left><Text>文化课分数</Text></Left>
                            <Right>
                                <TextInput
                                    style={styles.input}
                                    keyboardType='numeric'
                                    placeholder="请输入文化课总成绩"
                                    onChangeText={(value) => { this.setState({ score: value }) }}
                                    value={score}
                                />
                            </Right>
                        </Item>
                        <Item
                            style={styles.item}
                        >
                            <CheckBox
                                checked={this.state.hasSpecial}
                                onPress={() => this.setState({ hasSpecial: !hasSpecial })}
                            />
                            <Body>
                                <Text>参加美术、体育等专业课考试</Text>
                            </Body>
                        </Item>
                        {
                            hasSpecial && (
                                <Item
                                    style={styles.item}
                                >
                                    <Left><Text>专业课分数</Text></Left>
                                    <Right>
                                        <TextInput
                                            style={styles.input}
                                            keyboardType='numeric'
                                            placeholder="请输入专业课总成绩"
                                            onChangeText={(value) => { this.setState({ specialScore: value }) }}
                                            value={specialScore}
                                        />
                                    </Right>
                                </Item>
                            )
                        }
                        <Mutation mutation={ADD_EXAMBASICINFO}>
                            {(addExamBasicInfo, { data,loading,error }) => (
                                    <Button
                                    onPress={()=>{this._confirm(addExamBasicInfo)}}
                                        block
                                    >
                                        <Text>确定</Text>
                                        {loading && <Spinner />}
                                        {error && Alert.alert(errorMessage(error))}
                                    </Button>
                            )}
                            </Mutation>

                    </Form>

                </Content>

            </Container>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        color: 'blue'

    },
    item: {
        height: 50,
        padding: 10,
    },
    input: {
        textAlign: 'right',
    }
})

export default withNavigation(ExamBasicInfo)