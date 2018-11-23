
const display=(place)=>{
  let displayPlace
  if(place.village){
    displayPlace = place.province.name+place.city.name+place.area.name+place.street.name+place.village.name
  }else if(place.street){
    displayPlace = place.province.name+place.city.name+place.area.name+place.street.name
  }else if(place.area){
    displayPlace = place.province.name+place.city.name+place.area.name
  }else if(place.city){
    displayPlace = place.province.name+place.city.name
  }else if(place.province){
    displayPlace = place.province.name
  }else{
    displayPlace='未填写'
  }
  return displayPlace
}

export default display
