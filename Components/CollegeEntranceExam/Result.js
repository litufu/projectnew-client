import React, { Component } from 'react';
import {Alert} from 'react-native'
import { Container, Header,Content, Title, Button, Left, Right, Body, Icon,Spinner,Text } from 'native-base';
import {Query}  from 'react-apollo'
import {withNavigation} from 'react-navigation'

import {errorMessage} from '../../utils/tools'
import GET_REGSTATUSAPPLICANTSBYID from '../../graphql/get_regStatusApplicantsById.query'
import ApplicationCard from './ApplicationCard'
import {subjects} from './settings'

class Result extends Component {

_renderApplicationResult = (me)=>(

  <Query 
  query={GET_REGSTATUSAPPLICANTSBYID}
  variables={{regStatusId:me.regStatus.id}}
  fetchPolicy="network-only"
  >
  {
    ({loading,error,data})=>{
      if(loading) return <Spinner />
      if(error) return <Text>{errorMessage(error)}</Text>
      
      const applicants = data.getRegStatusApplicantsById
      const personNum = applicants.length
        let lowwestScore
        let proLowwestScore
        if(personNum===0){
            lowwestScore = 0
            proLowwestScore = 0
        }else{
            lowwestScore = applicants.sort((a,b)=>a.exam.culscore-b.exam.culscore)[0].exam.culscore
            proLowwestScore = applicants.sort((a,b)=>a.exam.proscore-b.exam.proscore)[0].exam.proscore
        }
      
      return (
        <ApplicationCard 
          education={me.regStatus.education==='Undergraduate'?"本科":"专科"}
          subjectName={subjects[me.exam.subject]}
          universityName={me.regStatus.university.name}
          majorName={me.regStatus.major.name}
          provinceName={me.exam.province.name}
          personNum={personNum}
          lowwestScore={lowwestScore}
          proLowwestScore={proLowwestScore}
          twoBtn={true}
          handleToChat={()=>Alert.alert('开始聊天')}
          handleToDetail={()=>this.props.navigation.navigate('Applicants',{applicants})}
      />
      )
    }
  }

  </Query>
)

_hanleEnter = ()=>{

}



  render() {
    const me = this.props.me || ''
    return (

      <Container>
        <Header>
          <Left>
            <Button 
            transparent
            onPress={()=>this.props.navigation.navigate('CollegeEntranceExam')}
            >
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>报名结果</Title>
          </Body>
          <Right />
        </Header>
        <Content>
            {me 
              ? this._renderApplicationResult(me)
              :<Text>请先报名然后查看结果</Text>
            }
        </Content>
      </Container>
    );
  }
}

export default withNavigation(Result)