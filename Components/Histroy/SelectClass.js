import React, { Component } from 'react';
import {View ,TouchableHighlight,Alert}  from 'react-native'
import { Container, 
    Header, 
    Item, 
    Input, 
    Icon, 
    Button, 
    Text, 
    Content,
    List,
    ListItem,
    Left,
    Right,
    Body,
    Title,
 } from 'native-base';
 import {Query,Mutation} from 'react-apollo'

 import GET_NEWGRADEANDCLASSES from '../../graphql/get_newGradeAndClasses.query'

export default class SelectClass extends Component {

 

    submitClasses=(gradeAndClasses)=>{
        const { navigation } = this.props;
        const startYear = navigation.getParam('startYear', 0);
        const endYear = navigation.getParam('endYear', 0);
        if(gradeAndClasses.length!== (endYear-startYear)){
            Alert.alert('你输入的班级数与输入的入学时间和毕业时间不符')
            return
        }
    }

  render() {
    const grades = { 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六', 7: '七', 8: '八', 9: '九', 10: '十' }  
    return (
        <Query query={GET_NEWGRADEANDCLASSES}>
                {({ data}) => {
                    console.log('rq',data)
        return(
      <Container>
          <Header >
            <Left style={{ justifyContent: 'flex-end' }}>
                <Button transparent onPress={() => this.props.navigation.goBack()}>
                    <Icon name="arrow-back" />
                </Button>
            </Left>
            <Body style={{ alignItems: 'center' }}>
                <Title>学习经历</Title>
            </Body>
            <Right>
                <Button
                onPress={()=>this.submitClasses(data.newGradeAndClasses)}
                ><Text>确认</Text></Button>
            </Right>
        </Header>
        <Content>
            <List>
                
            {data.newGradeAndClasses.length===0 && <ListItem></ListItem>}
            {data.newGradeAndClasses.length>0 && data.newGradeAndClasses.map(newGradeAndClass=>(
                <ListItem key={newGradeAndClass.id}>
                <TouchableHighlight>
                    <Text>{`${grades[newGradeAndClass.grade]}年级${newGradeAndClass.className}班`}</Text>
                </TouchableHighlight>
                </ListItem>))
                }
                 
            </List>
            <Button block
                onPress={()=>this.props.navigation.navigate('CreateClass')}
            >
            <Text>添加班级</Text>
            </Button>
        </Content>
      </Container>)
    }}
</Query>
    );
  }
}