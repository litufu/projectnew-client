import React from 'react'
import {Mutation} from 'react-apollo'

import ADD_LOCATION from '../../graphql/add_location.mutation'
import Region from '../Region'

export default class SelectPlace extends React.Component{

    state={
        location:this.props.location
    }

    _handlePlace= async (addLocation)=>{
        const {place} = this.props
        this.setState({location:place})
        const location = {
            province:place.province.code,
            city:place.city.code,
            area:place.area.code,
            street:place.street.code,
            village:place.village.code
        }
        const locationName = place.province.name + place.city.name + place.area.name + place.street.name + place.village.name
        addLocation({ variables: { location,locationName } });
    }

    render(){
        const { location } = this.state
        return(
            <Mutation mutation={ADD_LOCATION}>
                {(addLocation, { data }) => (

                    <TouchableNativeFeedback
                    onPress={()=>this._handlePlace(addLocation)}
                    >
                    <Text>未填写</Text>
                    </TouchableNativeFeedback>
                )}
            </Mutation>
        )
    }

}