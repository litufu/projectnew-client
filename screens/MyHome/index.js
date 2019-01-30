import React from 'react'
import { StyleSheet, View, Alert, Dimensions, Image } from 'react-native'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, List, ListItem, Spinner } from 'native-base';
import { Query } from 'react-apollo'
import Swiper from 'react-native-swiper'

import GET_ME from '../../graphql/get_me.query'
import ADVERTISEMENTS from '../../graphql/get_advertisement.query'
import { errorMessage } from '../../utils/tools';
import { defaultAdvertisements } from '../../utils/settings'
import MyIcon from '../../Components/MyIcon'
import { headerBackgroundColor, headerFontColor, statusBarHeight, headerButtonColor } from '../../utils/settings'

const { width } = Dimensions.get('window')

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
                    ({ loading, error, data, refetch }) => {

                        if (loading) return <Spinner />
                        if (error) return <View style={{ alignItems: "center" }}><Text>{errorMessage(error)}</Text></View>
                        return (<Container>
                            <Header style={{ marginTop: statusBarHeight }}>
                                <Left />
                                <Body style={{ alignItems: 'flex-end', justifyContent: "center", }}>
                                    <Title>水滴</Title>
                                </Body>
                                <Right />
                            </Header>
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

                            <Query
                                query={ADVERTISEMENTS}
                                pollInterval={60000}
                            >
                                {
                                    ({ loading, error, data }) => {
                                        if (loading) return <Spinner />
                                        if (error) return <Text>{errorMessage(error)}</Text>

                                        let image1
                                        let image2
                                        let image3
                                        let image4
                                        let image5
                                        if (data.advertisements.length > 0) {
                                            image1 = data.advertisements[0].image1 ? data.advertisements[0].image1 : defaultAdvertisements[0].image1
                                            image2 = data.advertisements[0].image2 ? data.advertisements[0].image2 : defaultAdvertisements[0].image2
                                            image3 = data.advertisements[0].image3 ? data.advertisements[0].image3 : defaultAdvertisements[0].image3
                                            image4 = data.advertisements[0].image4 ? data.advertisements[0].image4 : defaultAdvertisements[0].image4
                                            image5 = data.advertisements[0].image5 ? data.advertisements[0].image5 : defaultAdvertisements[0].image5
                                        } else {
                                            image1 = defaultAdvertisements[0].image1
                                            image2 = defaultAdvertisements[0].image2
                                            image3 = defaultAdvertisements[0].image3
                                            image4 = defaultAdvertisements[0].image4
                                            image5 = defaultAdvertisements[0].image5
                                        }

                                        return (
                                            <Swiper style={styles.wrapper} height={480}
                                                autoplay={true}
                                                autoplayTimeout={3}
                                                paginationStyle={{
                                                    bottom: -23, left: null, right: 10
                                                }} loop>
                                                <View style={styles.slide} >
                                                    <Image resizeMode='contain' style={styles.image} source={{ uri: image1 }} />
                                                </View>
                                                <View style={styles.slide}>
                                                    <Image resizeMode='contain' style={styles.image} source={{ uri: image2 }} />
                                                </View>
                                                <View style={styles.slide} >
                                                    <Image resizeMode='contain' style={styles.image} source={{ uri: image3 }} />
                                                </View>
                                                <View style={styles.slide} >
                                                    <Image resizeMode='contain' style={styles.image} source={{ uri: image4 }} />
                                                </View>
                                                <View style={styles.slide} >
                                                    <Image resizeMode='contain' style={styles.image} source={{ uri: image5 }} />
                                                </View>
                                            </Swiper>
                                        )
                                    }
                                }

                            </Query>
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
    },
    wrapper: {
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    image: {
        width,
        flex: 1
    }
})