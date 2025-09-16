const { gql } = require("apollo-server-express");

const userTypeDefs = gql`
  type User {
    id: ID!
    username: String!
    password: String!
  }

  type AuthPayload {
    token: String!
  }

  extend type Query {
    users: [User]
  }

  extend type Mutation {
    registerUser(username: String!, password: String!): String
    loginUser(username: String!, password: String!): AuthPayload
  }
`;

module.exports = userTypeDefs;
