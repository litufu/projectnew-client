import { graphql } from 'react-apollo';
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Alert } from 'react-native'

import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon, Title, Spinner } from 'native-base';

import { errorMessage } from '../../utils/tools'
import GET_FAMILIES from '../../graphql/get_families.query'
import FAMILY_CHANGED_SUBSCRIPTION from '../../graphql/family_changed.subscription'

class QureyFamilies extends Component {
    componentDidMount() {
        const { data: { refetch, subscribeToMore } } = this.props;

        this.unsubscribe = subscribeToMore({
            document: FAMILY_CHANGED_SUBSCRIPTION,
            updateQuery: (prev) => {
                refetch();
                return prev;
            },
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.data && this.props.data){
            this.props = nextProps
        }
    }

    _renderAddBtn=(spouseId)=>(
        <Button block
          style={styles.addButton}
          onPress={()=>this.props.onPressAdd(spouseId)}
        >
          <Text>添加成员</Text>
        </Button>
      )

    render() {
        const { data: { family, loading, error } } = this.props;
        const {_renderLeft,_renderBody,_renderConnectBtn,_renderConfirmBtn} = this.props
        console.log(family)
        if (loading) return <Spinner />
        if (error) return <Text>{errorMessage(error)}</Text>
        let spouseId = ''
        if (family && family.length > 0) {
            const wifeOrHusband = family.filter(f => { return f.relationship === "wife" || f.relationship === "husband" })
            if (wifeOrHusband.length > 0) {
                spouseId = wifeOrHusband[0].id
            }
        }

        return (
            <Content>
            <List>
                {
                    family.length > 0 && family.map((who, index) => (
                        <ListItem key={index}>
                            <Left style={styles.left}>
                                {_renderLeft(who, spouseId)}
                            </Left>
                            <Body style={styles.center}>
                                {_renderBody(who, spouseId)}
                            </Body>

                            <Right style={styles.right}>
                                {
                                    (() => {
                                        switch (who.status) {
                                            case "0":
                                                return (_renderConnectBtn(who) )
                                                break;
                                            case "1":
                                                return (<Text>等待认证</Text>)
                                                break;
                                            case '2':
                                                return (_renderConfirmBtn(who))
                                                break;
                                            case '3':
                                                return (<Text>已连接</Text>)
                                                break;
                                            default:
                                                return null
                                        }
                                    })()
                                }
                            </Right>
                        </ListItem>
                    ))
                }
            </List>
            {this._renderAddBtn(spouseId)}
            </Content>
        )
    }
}


export default graphql(GET_FAMILIES)(QureyFamilies)

const styles = StyleSheet.create({
    name: {
      fontSize: 18,
    },
    left: {
      flex: 0.2
    },
    center: {
      flex: 0.6,
      alignItems: "flex-start",
    },
    right: {
      flex: 0.2,
    },
    button: {
      alignItems: "center",
      justifyContent: "center"
    },
    addButton: {
      margin: 10,
    }
  
  })