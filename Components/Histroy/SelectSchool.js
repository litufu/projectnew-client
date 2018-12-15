import React, { Component } from 'react';
import {View,TouchableHighlight,Alert} from 'react-native'
import {Query,Mutation} from 'react-apollo'
import { Container, Header, Item, Input, Icon, Button, Text, Content,List, ListItem,Left,Body,Right,Title,Spinner,Radio } from 'native-base';

import {trim} from '../../utils/tools'
import GET_SCHOOLS from '../../graphql/get_schools.query'
import ADD_SCHOOL from '../../graphql/add_school.mutation'

export default  class SelectSchool extends Component {
  
  state = {
    selectedId:'',
    hideNew:true,
    schoolName:"",
  }

  validate=(name)=>{
    const rxName =/^[a-zA-Z0-9\u4E00-\u9FA5\uf900-\ufa2d·s]+$/
    if(!rxName.test(name)){
      Alert.alert('学校名称格式暂不支持')
      return false
    }
    return true
  }

  _handlePress=(id)=>{
    this.setState({selectedId:id})
  }

  handleNewSchool=(addSchool)=>{
    const {schoolName} =  this.state
    
    const { navigation } = this.props;
    const locationName = navigation.getParam('locationName', '');
    const kind = navigation.getParam('kind', '');
    if(this.validate(schoolName)){
      addSchool({variables:{name:this.state.schoolName,kind,locationName}})
      this.setState({schoolName:""})
    }
  }


  render() {
    const { navigation } = this.props;
    const {selectedId,hideNew} = this.state
    const locationName = navigation.getParam('locationName', '');
    return (
      <Container>
         <Header >
          <Left style={{justifyContent:'flex-end'}}>
            <Button transparent onPress={()=>this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{alignItems:'center'}}>
            <Title>学习经历</Title>
          </Body>
          <Right>
            <Button

            >
              <Text>确认选择</Text>
              </Button>
          </Right>
        </Header>
        <Content style={{marginTop:5}}>
        <List>
          
            
              {
                hideNew && (
                  <ListItem>
                  <Body>
                <Button 
                block
                warning
                onPress={()=>this.setState({hideNew:false})}
                >
                <Text>创建学校</Text>
                </Button>
                </Body>
                </ListItem>
                )
              }
              {
                !hideNew && (
                  <Mutation 
                  mutation={ADD_SCHOOL}
                  update={(cache, { data: { addSchool } }) => {
                    const {getSchools} = cache.readQuery({ query: GET_SCHOOLS,variables:{locationName} });
                    cache.writeQuery({
                      query: GET_SCHOOLS,
                      variables:{locationName},
                      data: { getSchools: getSchools.concat([addSchool]) }
                    });
                  }}
                  >
                  
                  
                    {(addSchool,{data,error})=>{
                      return (
                        <View>
                        <ListItem>
                          <Body style={{flexDirection:'row'}}>
                          <Input 
                            value={this.state.schoolName}
                            onChangeText={(value)=>this.setState({schoolName:trim(value)})}
                            placeholder="请输入新建学校名称" 
                          />
                        <Button 
                          transparent
                          onPress={()=>this.handleNewSchool(addSchool,data)}
                          >
                            <Text>创建</Text>
                          </Button>
                          </Body>
                          
                          </ListItem>
                          {error && <Text style={{color:'red'}}>{error.message.replace(/GraphQL error:/g, "")}</Text>}
                          </View>
                      )
                    }}
                  
                  </Mutation>
                )
              }
            
          <ListItem>
          <Text>
            已存在的学校:
          </Text>
          </ListItem>
          
           <Query
           query={GET_SCHOOLS}
           variables={{ locationName}}
           >
            {({ loading, error, data }) => {
              if (loading) return <Spinner />;
              if (error) return <Text>{error.message}</Text>;
              
              return (
                data.getSchools.map(school=>(
                  <ListItem key={school.id}>
                  <Left>
                    <Text>{school.name}</Text>
                  </Left>
                  <Right>
                    <Radio 
                      onPress={()=>this._handlePress(school.id)}
                      selected={selectedId===school.id} 
                    />
                  </Right>
                </ListItem>
                ))
              );
            }}
           </Query>
          </List>
        </Content>
      </Container>
    );
  }
}

