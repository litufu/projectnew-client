export const getRelationshipName = (relationship)=>{
  switch (relationship) {
    case "father":
      return "父"
      break;
    case "mother":
      return "母"
      break;
    case 'oldbrother':
      return "兄"
      break;
    case 'youngbrother':
      return "弟"
      break;
    case 'oldsister':
      return "姐"
      break;
    case 'youngsister':
      return "妹"
      break;
    case 'wife':
      return "妻"
      break;
    case 'husband':
      return "夫"
      break;
    case 'son':
      return "儿"
      break;
    case 'daughter':
      return "女"
      break;
    case 'sister':
      return "姐妹"
      break
    case 'brother':
      return "兄弟"
      break
    default:
      return null
  }
}


export const getRelationshipNameTwo = (relationship)=>{
  switch (relationship) {
    case "father":
      return "父亲"
      break;
    case "mother":
      return "母亲"
      break;
    case 'oldbrother':
      return "兄长"
      break;
    case 'youngbrother':
      return "弟弟"
      break;
    case 'oldsister':
      return "姐姐"
      break;
    case 'youngsister':
      return "妹妹"
      break;
    case 'wife':
      return "妻子"
      break;
    case 'husband':
      return "丈夫"
      break;
    case 'son':
      return "儿子"
      break;
    case 'daughter':
      return "女儿"
      break;
    case 'sister':
      return "姐妹"
      break
    case 'brother':
      return "兄弟"
      break
    default:
      return null
  }
}

