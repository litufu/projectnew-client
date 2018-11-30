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
import Home from '../Components/Explore'
import Profile from '../screens/Profile'
import ChangePassword from '../Components/ChangePassword'
import BasicInfo from '../Components/BasicInfo'
import Region from '../Components/Region'
import MyDatetime from '../Components/MyDatetime'
import Family from '../Components/Family'
import AddFamily from '../Components/Family/AddFamily'
import SearchFamily from '../Components/SearchFamily'

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
            screen: Home
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
