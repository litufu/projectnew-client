import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import { graphql, compose, withApollo } from 'react-apollo';
import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons'
import { wsClient } from '../apollo'

import GET_ME from '../graphql/get_me.query'
import MESSAGE_ADDED_SUBSCRIPTION from '../graphql/message_added.subscription'
import FAMILYGROUP_CHANGED_SUBSCRIPTION from '../graphql/familyGroup_changed.subscription'

import GET_FAMILYGROUPS from '../graphql/get_familyGroups.query'


import { Spinner } from 'native-base';

import Group from '../screens/Group'
import Home from '../screens/MyHome'
import Profile from '../screens/Profile'

// 引入home
//1、高考
import CollegeEntranceExam from '../Components/CollegeEntranceExam'
import QueryExamBasicInfo from '../Components/CollegeEntranceExam/QueryExamBasicInfo'
import UniversityAndMajor from '../Components/CollegeEntranceExam/UniversityAndMajor'
import SearchMajor from '../Components/CollegeEntranceExam/SearchMajor'
import SelectUniversity from '../Components/CollegeEntranceExam/SelectUniversity'
import QueryResult from '../Components/CollegeEntranceExam/QueryResult'
import Applicants from '../Components/CollegeEntranceExam/Applicants'
//  2、 找工作
import FindJob from '../Components/FindJob'

// 引入group
import FamilyGroup from '../Components/Groups/FamilyGroup'
import ClassGroup from '../Components/Groups/ClassGroup'
import LocationGroup from '../Components/Groups/LocationGroup'
import WorkGroup from '../Components/Groups/WorkGroup'
import Content from '../Components/Groups/Content'
import FamilyContent from '../Components/Groups/FamilyContent'
import FamilyList from '../Components/Groups/FamilyList'
import ClassContent from '../Components/Groups/ClassContent'
import ClassList from '../Components/Groups/ClassList'
import WorkContent from '../Components/Groups/WorkContent'
import WorkList from '../Components/Groups/WorkList'
import OldWorkList from '../Components/Groups/OldWorkList'
import LocationContent from '../Components/Groups/LocationContent'
import LocationList from '../Components/Groups/LocationList'
import Chat from '../Components/Chat'

// 引入profile
import UserProfile from '../Components/UserProfile'
import ChangePassword from '../Components/ChangePassword'
import BasicInfo from '../Components/BasicInfo'
import Region from '../Components/Region'
import MyDatetime from '../Components/MyDatetime'
import FamilyRelationship from '../Components/FamilyRelationship'
import StudyHistroy from '../Components/StudyHistroy'
import Work from '../Components/Work'
import AddFamily from '../Components/Family/AddFamily'
import SearchFamily from '../Components/SearchFamily'
import SelectSchool from '../Components/StudyHistroy/SelectSchool'
import SelectMajor from '../Components/StudyHistroy/SelectMajor'
import SelectClass from '../Components/StudyHistroy/SelectClass'
import CreateClass from '../Components/StudyHistroy/CreateClass'
import Events from '../Components/StudyHistroy/Events'
import Study from '../Components/StudyHistroy/Study'
import MyIcon from '../Components/MyIcon'
import AddPhoto from '../Components/AddPhoto'

const HomeNavigation = createStackNavigator(
    {
        Home: {
            screen: Home,
        },
        CollegeEntranceExam: {
            screen: CollegeEntranceExam,
        },
        QueryExamBasicInfo: {
            screen: QueryExamBasicInfo
        },
        UniversityAndMajor: {
            screen: UniversityAndMajor
        },
        SearchMajor: {
            screen: SearchMajor
        },
        SelectUniversity: {
            screen: SelectUniversity
        },
        QueryResult: {
            screen: QueryResult
        },
        Applicants: {
            screen: Applicants
        },
        FindJob: {
            screen: FindJob
        }

    },
    {
        initialRouteName: "Home",
        navigationOptions: {
            header: null
        },
    }
)


const GroupNavigation = createStackNavigator(
    {
        Group: {
            screen: Group,
        },
        FamilyGroup: {
            screen: FamilyGroup,
        },
        ClassGroup: {
            screen: ClassGroup,
        },
        LocationGroup: {
            screen: LocationGroup,
        },
        WorkGroup: {
            screen: WorkGroup,
        },
        Content: {
            screen: Content,
        },
        FamilyList: {
            screen: FamilyList,
        },
        FamilyContent: {
            screen: FamilyContent,
        },
        ClassContent: {
            screen: ClassContent,
        },
        ClassList: {
            screen: ClassList,
        },
        WorkContent: {
            screen: WorkContent,
        },
        WorkList: {
            screen: WorkList,
        },
        OldWorkList: {
            screen: OldWorkList,
        },
        LocationContent: {
            screen: LocationContent,
        },
        LocationList: {
            screen: LocationList,
        },
        Chat: {
            screen: Chat,
        },
        UserProfile: {
            screen: UserProfile,
        },

    },
    {
        initialRouteName: "Group",
        navigationOptions: {
            header: null
        },
    }
)

const ProfileNavigation = createStackNavigator(
    {
        Profile: {
            screen: Profile,
        },
        ChangePassword: {
            screen: ChangePassword,
        },
        BasicInfo: {
            screen: BasicInfo,
        },
        StudyHistroy: {
            screen: StudyHistroy,
        },
        Work: {
            screen: Work,
        },
        SelectSchool: {
            screen: SelectSchool,
        },
        SelectMajor: {
            screen: SelectMajor,
        },
        CreateClass: {
            screen: CreateClass,
        },
        Events: {
            screen: Events,
        },
        Study: {
            screen: Study,
        },
        SelectClass: {
            screen: SelectClass,
        },
        FamilyRelationship: {
            screen: FamilyRelationship,
        },
        AddFamily: {
            screen: AddFamily,
        },
        SearchFamily: {
            screen: SearchFamily,
        },
        Region: {
            screen: Region,
        },
        MyDatetime: {
            screen: MyDatetime,
        },
        MyIcon: {
            screen: MyIcon,
        },
        AddPhoto: {
            screen: AddPhoto,
        },
        UserProfile: {
            screen: UserProfile,
        },
        Chat: {
            screen: Chat,
        }
    },
    {
        initialRouteName: "Profile",
        navigationOptions: {
            header: null
        },
    }
)

const AppNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: HomeNavigation
        },
        Group: {
            screen: GroupNavigation
        },
        Profile: {
            screen: ProfileNavigation
        }
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = 'md-home';
                } else if (routeName === 'Group') {
                    iconName = 'md-people';
                } else if (routeName === 'Profile') {
                    iconName = 'md-person';
                }

                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: 'blue',
            inactiveTintColor: 'gray',
            showLabel: false,
        },
    }
)

class AppWithNavigationState extends Component {
    static router = AppNavigator.router;
    static navigationOptions = {
        header: null,
    };

    async componentDidMount() {
        const { subscribeToMore, client } = this.props;

        this.familyGroupSubscription = await subscribeToMore({
            document: FAMILYGROUP_CHANGED_SUBSCRIPTION,
            updateQuery: (prev) => {
                client.query({
                    query: GET_FAMILYGROUPS,
                    fetchPolicy: "network-only"
                }).then(({ data }) => {
                    const newMe = {
                        ...prev.me,
                        relativefamilyGroups: data.getFamilyGroups
                    }
                    const result = { ...prev, me: newMe }
                    return result
                });
            },
        });
    }

    componentWillUnmount() {
        this.familyGroupSubscription();
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.me) {
            //   如果新的props当中没有me，则取消订阅
            console.log('取消订阅')
            if (this.messagesSubscription) {
              this.messagesSubscription();
            }

            // clear the event subscription
            // 关闭连接
            if (this.reconnected) {
                console.log('关闭连接')
                this.reconnected();
            }
        } else if (!this.reconnected) {
            //   重新连接，检查数据完整性。
            console.log('重新连接')
            this.reconnected = wsClient.onReconnected(() => {
                this.props.refetch(); // check for any data lost during disconnect
            }, this);
        }

          if (!this.messagesSubscription && nextProps.me ) {
              console.log('开始订阅')
              console.log(nextProps.me.id)
            this.messagesSubscription = nextProps.subscribeToMore({
                document: MESSAGE_ADDED_SUBSCRIPTION,
                variables: { userId: nextProps.me.id },
                updateQuery: (prev, { subscriptionData }) => {
                    const newMessage = subscriptionData.data.messageAdded;
                    prev.me.messages.push(newMessage)
                    return prev
                },
            });
          }
    }


    render() {
        if (this.props.loading) return <Spinner />
        if (this.props.error) return <Text>{"error"}</Text>
        return (
            <AppNavigator navigation={this.props.navigation} />
        );
    }
}

export default compose(
    withApollo,
    graphql(GET_ME, {
        props: ({ data: { loading, me, refetch, subscribeToMore } }) => ({ loading, me, refetch, subscribeToMore })
    }),
)(AppWithNavigationState);
