import React, { Component } from "react";
import { StyleSheet,Alert } from 'react-native'
import { Content, Left, Right, Card, CardItem, Text, Body, Button } from "native-base";

export default class ApplicationCard extends Component {

    render() {
        const education = this.props.education || ""
        const subjectName = this.props.subjectName || ""
        const universityName = this.props.universityName || ""
        const majorName = this.props.majorName || ""
        const provinceName = this.props.provinceName || ""
        const personNum = this.props.personNum || 0
        const lowwestScore = this.props.lowwestScore || 0
        const proLowwestScore = this.props.proLowwestScore || 0
        const twoBtn = this.props.twoBtn || false

        return (

            <Card>
                <CardItem bordered>
                    <Left style={styles.left}>
                        <Text>{`学历:${education}`}</Text>
                    </Left>
                    <Right style={styles.right}>
                        <Text>{`学校名称:${universityName}`}</Text>
                    </Right>
                </CardItem>
                <CardItem bordered>
                    <Left style={styles.left}>
                        <Text>{`报考省份:${provinceName}`}</Text>
                    </Left>
                    <Right style={styles.right}>
                        <Text>{`专业名称:${majorName}`}</Text>
                    </Right>
                </CardItem>

                <CardItem>
                    <Left style={styles.left} >
                        <Text>{`报考分科:${subjectName}`}</Text>
                    </Left>
                    <Right style={styles.right}>
                        <Text>已报考人数:
                                <Text style={{ color: 'blue', fontWeight: 'bold' }}>{personNum}</Text>
                        </Text>
                    </Right>
                </CardItem>

                <CardItem bordered>
                    <Left style={styles.left} >
                        <Text>文化最低分:
                                <Text style={{ color: 'blue', fontWeight: 'bold' }}>{lowwestScore}</Text>
                        </Text>
                    </Left>
                    <Right style={styles.right}>
                        <Text>专业最低分:
                                <Text style={{ color: 'blue', fontWeight: 'bold' }}>{proLowwestScore}</Text>
                        </Text>
                    </Right>
                </CardItem>
                {
                    twoBtn
                    ?(
                        <CardItem
                            footer
                            >
                            <Left>
                                <Button
                                onPress={this.props.handleToDetail}
                                >
                                <Text  >查看报名者详情</Text>
                                </Button>
                                </Left>
                            <Right >
                                <Button
                                onPress={this.props.handleToChat}
                                >
                                    <Text  >进入群聊</Text>
                                    </Button>
                                </Right>
                        </CardItem>
                    )
                    :(
                        <CardItem
                            footer
                            button
                            onPress={this.props.handlePress}>
                            <Left />
                            <Body>
                                <Text style={styles.text}>报 名</Text>
                            </Body>
                            <Right />
                        </CardItem>
                    )
                }

                
            </Card>

        );
    }
}

const styles = StyleSheet.create({
    left: {
        flex: 0.4,
        alignItems: 'flex-start'
    },
    right: {
        flex: 0.5,
        alignItems: 'flex-end'
    },
    text: {
        fontWeight: 'bold',
        color: 'red'
    }

})