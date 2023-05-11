const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Department {
    id: ID!
    name: String!
    manager: Person
    teamMembers: [Person]
  }

  type Query {
    department(id: ID!): Department
    departments: [Department!]!
  }
`;

module.exports = typeDefs;
