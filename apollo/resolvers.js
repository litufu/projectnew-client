import GET_NEWGRADEANDCLASSES from '../graphql/get_newGradeAndClasses.query'

let nextGradeAndClassId = 0;

export const resolvers = {
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
      addNewGradeAndClass:(_, { grade,className }, { cache }) => {
        console.log('grade',grade)
        console.log('clasname',className)
        const previous = cache.readQuery({ query: GET_NEWGRADEANDCLASSES });
        console.log(previous)
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