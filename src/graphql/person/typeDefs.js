const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Person {
    id: ID!
    firstName: String!
    lastName: String!
    jobTitle: String!
    departmentId: ID!
    managerId: ID
    department: Department
    manager: Person
    directReports: [Person]
  }

  type Query {
    person(id: ID!): Person
    people: [Person]
    getUserHierarchy(userId: ID!): Person
    searchPerson(searchValue: String!): [Person]
  }

  type Mutation {
    updatePerson(
      id: ID!
      firstName: String
      lastName: String
      jobTitle: String
      departmentId: ID
      managerId: ID
    ): Person
  }
`;

module.exports = typeDefs;
