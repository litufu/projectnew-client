import { createStackNavigator,createBottomTabNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'

import Group from '../screens/Group'
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


// 引入profile
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
       
    },
    {
        initialRouteName:"Home",
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
        FamilyGroup:{
            screen: FamilyGroup,
        },
        ClassGroup:{
            screen: ClassGroup,
        },
        LocationGroup:{
            screen: LocationGroup,
        },
        WorkGroup:{
            screen: WorkGroup,
        },
        Content:{
            screen:Content,
        },
        FamilyList:{
            screen:FamilyList,
        },
        FamilyContent:{
            screen:FamilyContent,
        },
        ClassContent:{
            screen:ClassContent,
        },
        ClassList:{
            screen:ClassList,
        },

        
       
    },
    {
        initialRouteName:"Group",
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
