import { createStackNavigator,createBottomTabNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
// import Feed from '../Components/Feed'
// import Camera from '../Components/Camera'
// import Profile from '../Components/Profile'
// import Explore from '../Components/Explore'
// import Notifications from '../Components/Notifications'
// import Comments from '../Components/Comments'
// import ProfileOptions from '../Components/ProfileOptions'
// import EditProfile from '../Components/EditProfile'
// import AddPhoto from '../Components/AddPhoto'
// import UsersList from '../Components/UsersList'
// import UserProfile from '../Components/UserProfile'
// import Photo from '../Components/Photo'
//
// const FeedNavigation = createStackNavigator(
//     {
//         Main: {
//             screen: Feed
//         },
//         Comments: {
//             screen: Comments
//         }
//     },
//     {
//         navigationOptions: {
//             header: null
//         }
//     }
// )
//
// const ExploreNavigation = createStackNavigator(
//     {
//         Main: {
//             screen: Explore
//         },
//         UsersList: {
//             screen: UsersList
//         },
//         UserProfile: {
//             screen: UserProfile
//         },
//         Photo: {
//             screen: Photo
//         },
//         Comments: {
//             screen: Comments
//         }
//     },
//     {
//         navigationOptions: {
//             header: null
//         }
//     }
// )
//
// const CameraNavigation = createStackNavigator(
//     {
//         Main: {
//             screen: Camera
//         },
//         AddPhoto: {
//             screen: AddPhoto
//         }
//     },
    // {
    //     navigationOptions: {
    //         header: null
    //     }
    // }
// )
//


// const NotificationsNavigation = createStackNavigator(
//     {
//         Main: {
//             screen: Notifications
//         }
//     },
//     {
        // navigationOptions: {
        //     header: null
        // }
//     }
// )

import Group from '../Components/Group'
import Home from '../screens/MyHome'
import Profile from '../screens/Profile'

// 引入home
import CollegeEntranceExam from '../Components/CollegeEntranceExam'
import QueryExamBasicInfo from '../Components/CollegeEntranceExam/QueryExamBasicInfo'
import UniversityAndMajor from '../Components/CollegeEntranceExam/UniversityAndMajor'
import SearchMajor from '../Components/CollegeEntranceExam/SearchMajor'
import SelectUniversity from '../Components/CollegeEntranceExam/SelectUniversity'
import QueryResult from '../Components/CollegeEntranceExam/QueryResult'
import Applicants from '../Components/CollegeEntranceExam/Applicants'
import QueryFamilies from '../Components/Genealogy/QueryFamilies'
// 引入profile
import ChangePassword from '../Components/ChangePassword'
import BasicInfo from '../Components/BasicInfo'
import Region from '../Components/Region'
import MyDatetime from '../Components/MyDatetime'
import Family from '../Components/Family'
import Histroy from '../Components/Histroy'
import Work from '../Components/Work'
import AddFamily from '../Components/Family/AddFamily'
import SearchFamily from '../Components/SearchFamily'
import SelectSchool from '../Components/Histroy/SelectSchool'
import SelectMajor from '../Components/Histroy/SelectMajor'
import SelectClass from '../Components/Histroy/SelectClass'
import CreateClass from '../Components/Histroy/CreateClass'
import Events from '../Components/Histroy/Events'
import Study from '../Components/Histroy/Study'
import MyIcon from '../Components/MyIcon'

const HomeNavigation = createStackNavigator(
    {
        Home: {
            screen: Home,
        },
        CollegeEntranceExam: {
            screen: CollegeEntranceExam,
        },
        QueryExamBasicInfo:{
            screen:QueryExamBasicInfo
        },
        UniversityAndMajor:{
            screen:UniversityAndMajor
        },
        SearchMajor:{
            screen:SearchMajor
        },
        SelectUniversity:{
            screen:SelectUniversity
        },
        QueryResult:{
            screen:QueryResult
        },
        Applicants:{
            screen:Applicants
        },
        QueryFamilies:{
            screen:QueryFamilies
        }
       
    },
    {
        initialRouteName:"Home",
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
        Histroy: {
            screen: Histroy,
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
        Family: {
            screen: Family,
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
    },
    {
        initialRouteName:"Profile",
        navigationOptions: {
            header: null
        },
    }
)

export default createBottomTabNavigator(
    {
        Home: {
            screen: HomeNavigation
        },
        Group: {
            screen: Group
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
            iconName = 'md-people' ;
          }else if (routeName === 'Profile') {
            iconName = 'md-person' ;
          }

          // You can return any component that you like here! We usually use an
          // icon component from react-native-vector-icons
          return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
        },
      }),
      tabBarOptions: {
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
        showLabel:false,
    },
  }
)
