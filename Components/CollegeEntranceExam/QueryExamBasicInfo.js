import React from 'react'
import { StyleSheet, View, Text, TextInput,Alert } from 'react-native'
import {Query}  from 'react-apollo'
import  {Spinner} from 'native-base'

import {errorMessage}  from '../../utils/tools'
import GET_EXAMBASICINFO from '../../graphql/get_exam_basicInfo.query'
import ExamBasicInfo from './ExamBasicInfo'

export default class QueryExamBasicInfo extends React.Component{

    render(){
        return(
            <Query
                query={GET_EXAMBASICINFO}
                >
                {({ loading, error, data }) => {
                    console.log("data",data)
                    if (loading) return <Spinner/>;
                    if(error) return <View><Text>{errorMessage(error)}</Text></View>
                    if(data && data.getExamBasicInfo){
                        return (
                            <ExamBasicInfo 
                                province={parseInt(data.getExamBasicInfo.province.code)}
                                section={data.getExamBasicInfo.subject}
                                hasSpecial={data.getExamBasicInfo.proscore===0?false:true}
                                score={data.getExamBasicInfo.culscore.toString()}
                                specialScore={data.getExamBasicInfo.proscore.toString()}
                                examineeCardNumber={data.getExamBasicInfo.candidatenum}
                                updateInfo={true}
                            />
                        );
                    }
                    return (
                        <ExamBasicInfo 
                        updateInfo={false}
                        />
                    ) 
                    
                }}
                </Query>
        )
    }
}


