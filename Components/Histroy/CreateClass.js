import React, { Component } from 'react';
import { View, TouchableHighlight, TextInput, Text, StyleSheet } from 'react-native'
import { withNavigation } from 'react-navigation'
import {
    Container,
    Header,
    Item,
    CheckBox,
    Icon,
    Button,
    Label,
    Content,
    Input,
    List,
    ListItem,
    Left,
    Body,
    Right,
    Title,
    Picker,
} from 'native-base';

export default class CreateClass extends Component {
    state = {
        startGrade: '',
        endGrade: "",
        special: false,
        className: '',
        startGrade: '1',
        endGrade: "1",

    }
    render() {
        const { startGrade, endGrade, special, className } = this.state
        const keyboardType = special ? 'default' : 'numeric'
        const grades = { '1': '一', '2': '二', '3': '三', '4': '四', '5': '五', '6': '六', '7': '七', '8': '八', '9': '九', '10': '十' }
        const data1 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
        const data2 = data1.filter(num => num >= startGrade)
        return (
            <Container style={styles.container}>
                <Header >
                    <Left style={{ justifyContent: 'flex-end' }}>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body style={{ alignItems: 'center' }}>
                        <Title>人生轨迹</Title>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <Content style={styles.container}>
                    <List>
                        <ListItem style={styles.row}>
                            <Label>年级:</Label>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                style={{ width: 10 }}
                                selectedValue={startGrade}
                                onValueChange={(startGrade) => this.setState({ startGrade,endGrade:startGrade })}
                            >
                                {data1.map(data => <Picker.Item key={data} label={grades[data]} value={data} />)}
                            </Picker>
                            <Label >年级至</Label>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                style={{ width: 10 }}
                                selectedValue={endGrade}
                                onValueChange={(endGrade) => this.setState({ endGrade })}
                            >
                                {data2.map(data => <Picker.Item key={data} label={grades[data]} value={data} />)}
                            </Picker>
                            <Label >年级</Label>
                        </ListItem>
                        <ListItem style={styles.row}>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                                <CheckBox
                                    checked={special}
                                    onPress={() => { this.setState({ special: !special }) }}
                                />
                                <Body>
                                    <Label > 特色班</Label>
                                </Body>
                            </View>
                        </ListItem>
                        <ListItem style={styles.row}>
                            <Label >班级:</Label>
                            <Input
                                style={[styles.input, styles.bigfont, { flex: 1 }]}
                                value={className}
                                placeholder={special?'请输入特色班名称':'请输入数字'}
                                keyboardType={keyboardType}
                                onChangeText={(className) => this.setState({ className })}
                            />
                            <Label >班</Label>
                        </ListItem>
                        <ListItem style={styles.row}>
                            <Button block style={{ padding: 10, flex: 1 }}>
                                <Text style={{fontSize:15}}> 保 存 </Text>
                            </Button>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        height: 150,

    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    input: {
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    bigfont: {
        fontSize: 12
    }
})
