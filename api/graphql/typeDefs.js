const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    password: String!
  }

  type AuthPayload {
    token: String!
  }

  type Task {
    id: ID!
    title: String!
    completed: Boolean!
    userId: ID!
  }

  type Query {
    users: [User]
    tasks: [Task]
  }

  type Mutation {
    registerUser(username: String!, password: String!): String
    loginUser(username: String!, password: String!): AuthPayload
    createTask(title: String!): Task
    completeTask(id: ID!): Task
    deleteTask(id: ID!): String
  }
`;

module.exports = typeDefs;
