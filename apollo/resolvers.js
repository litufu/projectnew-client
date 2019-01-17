import GET_NEWGRADEANDCLASSES from '../graphql/get_newGradeAndClasses.query'
import GET_MESSAGES from '../graphql/get_messages.query'
import  GET_NEWUNREADMESSAGES from '../graphql/get_newUnReadMessages.query'

let nextGradeAndClassId = 0;

export const resolvers = {
  
    // Query:{
    //   getmessages:(_, { first,after,toId }, { cache }) => {

    //     const data = cache.readQuery({ GET_MESSAGES });
    //     const allMessages = data.messages.filter(message=>(message.to.id===toId ||message.from.id===toId)).sort(
    //       (a,b)=>(new Date(a.createdAt)-new Date(b.createdAt)
    //       ))
    //     let filterMessges = []
    //     let count = 0
    //     for(const message of allMessages){
    //       if(count>=first){
    //         count = 0
    //         break
    //       }
    //       if(message.id===after){
    //         filterMessges.push(message)
    //         count = count + 1
    //       }
    //     }

    //     return filterMessges;
    //   },
    // },
    Mutation: {
      addNewSchool:(_, { schoolId,schoolName }, { cache }) => {
        const data = {
            newSchool: {
              __typename: 'NewSchool',
              id: schoolId,
              name:schoolName,
            },
          };
        cache.writeData({ data });
        return null;
      },
      addNewMajor:(_, { majorId,majorName }, { cache }) => {
        const data = {
            newMajor: {
              __typename: 'NewMajor',
              id: majorId,
              name:majorName,
            },
          };
        cache.writeData({ data });
        return null;
      },
      selectNewUniversity:(_, { universityId,universityName }, { cache }) => {
        const data = {
          searchNewUniversity: {
              __typename: 'NewSchool',
              id: universityId,
              name:universityName,
            },
          };
        cache.writeData({ data });
        return null;
      },
      selectNewMajor:(_, { majorId,majorName }, { cache }) => {
        const data = {
          searchNewMajor: {
              __typename: 'NewMajor',
              id: majorId,
              name:majorName,
            },
          };
        cache.writeData({ data });
        return null;
      },
      addNewUnReadMessages:(_, { type,id,lastMessageId }, { cache }) => {
        console.log('type',type)
        console.log('id',id)
        console.log('lastMessageId',lastMessageId)
        const previous = cache.readQuery({ query: GET_NEWUNREADMESSAGES });
        console.log(previous)
        // 检查是否存在，存在更新，不存在新增
        const isExist = previous.newUnreadMessages.filter(unReadMessage=>{
          if(unReadMessage.type===type && unReadMessage.typeId===id){
            return true
          }
        }).length>0
        let newUnreadMessages
        if(isExist){
          newUnreadMessages = previous.newUnreadMessages.map(
            unReadMessage=>{
              if(unReadMessage.type===type && unReadMessage.typeId===id){
                return {
                  ...unReadMessage,
                  lastMessageId:lastMessageId
                }
              }else{
                return unReadMessage
              }
            }
          )
        }else{
          const newUnReadMessage = {
            __typename:"UnReadMessage",
            id:`${type}${id}`,
            type,
            typeId:id,
            lastMessageId,
          }
          newUnreadMessages = [...previous.newUnreadMessages,newUnReadMessage]
        }
        console.log('newUnreadMessages',newUnreadMessages)
       
        const data = {
          newUnreadMessages: newUnreadMessages,
        };
        cache.writeData({ data });
        return newUnreadMessages;
      },
      
      addNewGradeAndClass:(_, { grade,className }, { cache }) => {
        console.log('grade',grade)
        console.log('clasname',className)
        const previous = cache.readQuery({ query: GET_NEWGRADEANDCLASSES });
        console.log(previous)
        // 复习生可能存在年级重复的情况
        // if(previous.newGradeAndClasses.filter(newGradeAndClass=>newGradeAndClass.grade===grade).length>0){
        //   throw new Error('年级已存在，无法重复创建年级')
        // }
        const newGradeAndClass = {
            __typename: 'GradeAndClass',
            id: nextGradeAndClassId++,
            grade:grade,
            className:className
          };
        console.log(newGradeAndClass)
        const data = {
          newGradeAndClasses: previous.newGradeAndClasses.concat([newGradeAndClass]),
        };
        console.log('data',data)
        cache.writeData({ data });
        return newGradeAndClass;
      },
    },
  };