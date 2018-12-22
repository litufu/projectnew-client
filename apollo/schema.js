import gql from 'graphql-tag';

export const typeDefs = gql`
  type NewSchool {
    id: String!
    name: String!
  }

  type NewMajor {
    id: String!
    name: String!
  }

  type GradeAndClass {
    id:Int
    grade:Int,
    className:String
  }

  type Mutation {
    addNewSchool(schoolId:String!,schoolName: String!): NewSchool
    addNewMajor(majorId:String!,majorName: String!): NewMajor
    selectNewMajor(majorId:String!,majorName: String!):NewMajor
    selectNewUniversity(universityId:String!,universityName: String!):NewSchool
    addNewGradeAndClass(grade:Int,className:String): GradeAndClass

  }

  type Query {
    newSchool:NewSchool
    newMajor:NewMajor
    searchNewMajor:NewMajor
    searchNewUniversity:NewSchool
    newGradeAndClasses:[GradeAndClass]
  }
`;