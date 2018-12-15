// 删除空格
export const trim=(str)=>str.replace(/(^\s*)|(\s*$)/g, ""); 
export const checkName = (name)=>{
    const rxName =/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
    if(!rxName.test(name)){
      throw new Error('你的姓名错误')
    }
  }
export const errorMessage = (error)=>error.message.replace(/GraphQL error:/g, "")