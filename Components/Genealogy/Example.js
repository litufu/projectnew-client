import React from 'react'
import { View, StyleSheet, ScrollView, Dimensions, Text } from 'react-native'
import { withNavigation } from 'react-navigation'

import Square from './Square'
import HorizontalLine from './HorizontalLine'
import VerticalLine from './VerticalLine'
import FatherAndMotherLine from './FatherAndMotherLine'
import FirstMiddleLevel from './FirstMiddleLevel'
import SecondLevelTop from './SecondLevelTop'
import ThirdLevelTop from './ThirdLevelTop'
import SecondMiddleLevel from './SecondMiddleLevel'
import { getRelationshipNameTwo } from '../../utils/relationship'

import { SQURE_HEIGHT, SQURE_WIDTH, BORDER_WIDTH, SQURE_H_DISTANCE, SQURE_V_DISTANCE } from './settings'


class Example extends React.Component {

    state = {
        layouts: {}
    }

    has_child=(id,arr)=>{
        // arr:[{id1:[1,2,3],id2:[4,5,6]}]
        for(let obj  of arr){
            if(Object.keys(obj)[0]===id){
                return (obj[id]).length > 0
            }
        }
        return false
    }

    render() {
        const { me } = this.props.navigation.getParam('data', '')
        // 家人数据整理
        const familiesdata = this.props.data
        // 父母数据
        const father = familiesdata.family.filter(f => f.relationship === "father")
        const mother = familiesdata.family.filter(f => f.relationship === "mother")
        // 兄弟姐妹数据
        const sistersAndBrothersRelaionship = ["oldbrother", "youngbrother", "oldsister", "youngsister", 'sister', 'brother']
        const sistersAndBrothers = familiesdata.family.filter(f => !!~sistersAndBrothersRelaionship.indexOf(f.relationship))
        const brotherAndSisterNum = sistersAndBrothers.length
        // 配偶数据
        const spouseRelationship = ['wife', 'husband']
        const spouses = familiesdata.family.filter(f => !!~spouseRelationship.indexOf(f.relationship)).sort(
            (a,b)=>{
                if(a.id>b.id){
                    return 1
                }
                return -1
            })
            
        const spouseNum = spouses.length
        // 子女数据
        const sonAndDaughterRelationship = ['son', 'daughter']
        const sonAndDaughters = familiesdata.family.filter(f => !!~sonAndDaughterRelationship.indexOf(f.relationship))
        let sortedSonAndDaughters = []
        const spouseIdAndSonDaughter = []
        for(let spouse of spouses){
            let temp
            temp = sonAndDaughters.filter(sonAndDaughter=>sonAndDaughter.spouse.id===spouse.id)
            sortedSonAndDaughters = sortedSonAndDaughters.concat(temp)
            spouseIdAndSonDaughter.push({[spouse.id]:temp})
        }
        const sonAndDaughterNum = sonAndDaughters.length

        let { height,width} = Dimensions.get('window');
        const width1 = (spouseNum+1+brotherAndSisterNum)>sonAndDaughterNum ? (spouseNum+1+brotherAndSisterNum)*120 :sonAndDaughterNum*120
        width1>width ? width=width1 : width

        // firstLevel
        const firstLevelMarginLeft = (width - 2 * SQURE_WIDTH - SQURE_H_DISTANCE) / 2
        const firstLevelMarginTop = (height - 3 * SQURE_HEIGHT - SQURE_V_DISTANCE * 2) / 2

        // firstMiddleLevel

        // secondLevel
        const secondLevelMarginLeft = (width - (brotherAndSisterNum + 1 + spouseNum) * SQURE_WIDTH - (brotherAndSisterNum + spouseNum) * SQURE_V_DISTANCE) / 2
        // secondMiddleLevel

        // thirdLevel
        const thirdLevelMarginLeft = (width - sonAndDaughterNum * SQURE_WIDTH - (sonAndDaughterNum - 1) * SQURE_H_DISTANCE) / 2
        return (
            <ScrollView
                horizontal={true}
            >
                <View style={{width,height}}>

                    <View style={{ flexDirection: 'row', marginLeft: firstLevelMarginLeft, marginTop: firstLevelMarginTop }}   >
                        <View >
                            <Square
                                relationship={getRelationshipNameTwo('father')}
                                name={father.length > 0 ? father[0].to.name : "未填写"}
                                isUser={father.length > 0 ? !!father[0].to.user : false}
                            />
                        </View>

                        <FatherAndMotherLine
                            height={SQURE_HEIGHT}
                            width={SQURE_H_DISTANCE}
                            hasChild={true}
                        />

                        <View  >
                            <Square
                                relationship={getRelationshipNameTwo('mother')}
                                name={mother.length > 0 ? mother[0].to.name : "未填写"}
                                isUser={mother.length > 0 ? !!mother[0].to.user : false}
                            />
                        </View>
                    </View>

                    <View >
                        <FirstMiddleLevel
                            width={width}
                            firstLevelMarginLeft={firstLevelMarginLeft}
                            firstLevelMarginTop={firstLevelMarginTop}
                            secondLevelMarginLeft={secondLevelMarginLeft}
                            brotherAndSisterNum={brotherAndSisterNum}
                        />
                    </View>

                    <View style={{ marginLeft: secondLevelMarginLeft, flexDirection: 'row'}}>
                        {
                            sistersAndBrothers.map((sisterAndBrother, index) => (
                                <View style={{ flexDirection: 'row' }} key={index}>
                                    <View key={index}>
                                        <SecondLevelTop />
                                        <Square
                                            relationship={getRelationshipNameTwo(sisterAndBrother.relationship)}
                                            name={sisterAndBrother.to.name}
                                            isUser={!!sisterAndBrother.to.user}
                                        />
                                    </View>
                                    <View style={{ width: SQURE_H_DISTANCE }}></View>
                                </View>
                            ))
                        }

                        <View>
                            <SecondLevelTop />
                            <Square
                                relationship="自己"
                                name={me ? me.name: ""}
                                isUser={true}
                            />
                        </View>

                        {
                            spouses.map((family,index) => (
                                <View style={{ flexDirection: 'row' }} key={index}>
                                    <View >
                                        <View style={{ height: SQURE_V_DISTANCE / 2 }}></View>
                                        <FatherAndMotherLine
                                            height={SQURE_HEIGHT}
                                            width={SQURE_H_DISTANCE}
                                            hasChild={this.has_child(family.id,spouseIdAndSonDaughter)}
                                        />
                                    </View>

                                    <View>
                                        <View style={{ height: SQURE_V_DISTANCE / 2 }}></View>
                                        <Square
                                            name={family.to.name}
                                            relationship={getRelationshipNameTwo(family.relationship)}
                                            isUser={!!family.to.user}
                                        />
                                    </View>
                                </View>
                            ))
                        }

                    </View>


                    <View >
                        <SecondMiddleLevel
                            width={width}
                            secondLevelMarginLeft={secondLevelMarginLeft}
                            thirdLevelMarginLeft={thirdLevelMarginLeft}
                            brotherAndSisterNum={brotherAndSisterNum}
                            sonAndDaughterNum={sonAndDaughterNum}
                            spouseIdAndSonDaughter={spouseIdAndSonDaughter}
                        />
                    </View>

                    <View style={{ marginLeft: thirdLevelMarginLeft, flexDirection: 'row' }}>

                        {
                            sortedSonAndDaughters.map((family,index)=>(
                                <View key={index} style={{flexDirection:'row'}}>
                                    <View >
                                        <ThirdLevelTop spouseNum={spouseNum} />
                                        <Square
                                        relationship={getRelationshipNameTwo(family.relationship)} 
                                        name={family.to.name}
                                        isUser={!!family.to.user}
                                        />
                                    </View>
                                    <View style={{ marginLeft: SQURE_H_DISTANCE }}></View>
                                </View>
                            ))
                        }
                        
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
 
    position1: {
        marginLeft: SQURE_H_DISTANCE
    },
    firstLevel: {
        flexDirection: 'row'
    },
    secondLevel: {
        flexDirection: 'row',
    },
    thirdLevel: {
        flexDirection: 'row'

    }

})

export default withNavigation(Example)






