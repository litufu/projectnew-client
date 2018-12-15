import GET_NEWSCHOOL from '../graphql/get_newSchool.query'

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
    },
  };