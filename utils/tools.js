// 删除空格
export const trim=(str)=>str.replace(/(^\s*)|(\s*$)/g, ""); 
export const checkName = (name)=>{
    const rxName =/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
    if(!rxName.test(name)){
      throw new Error('你的姓名错误')
    }
  }
export const errorMessage = (error)=>error.message.replace(/GraphQL error:/g, "").replace(/Network error:/g, "")
export const checkNum = (str)=>{
  if(!/^\d+$/.test(str)){
     return false
    }
  return true
}
export const grades = { 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六', 7: '七', 8: '八', 9: '九', 10: '十' }  
export const educations = {
  "PrimarySchool":"初等教育-小学",
  "JuniorMiddleSchool":"中等教育-初中",
  "HighSchool":"中等教育-高中",
  "VocationalHighSchool":"中等教育-职业中学",
  "TechnicalSchool":"中等教育-技工学校",
  "SecondarySpecializedSchool":"中等教育-中等专业学校",
  "JuniorCollege":"普通高等教育-大专",
  "Undergraduate":"普通高等教育-本科",
  "Master":"普通高等教育-硕士",
  "Doctor":"普通高等教育-博士",
  "JuniorToCollege":"成人高等教育-专科起点本科",
  "HighToCollege":"成人高等教育-高中起点升本科",
  "HighToJunior":"成人高等教育-高中起点升专科"
}