import gql from 'graphql-tag';

export const typeDefs = gql`
  type NewSchool {
    id: String!
    name: String!
  }

  type Mutation {
    addNewSchool(schoolId:String!,schoolName: String!): NewSchool
  }

  type Query {
    newSchool:NewSchool
  }
`;