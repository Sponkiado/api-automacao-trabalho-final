const { gql } = require("apollo-server-express");

const taskTypeDefs = gql`
  type Task {
    id: ID!
    title: String!
    completed: Boolean!
    userId: ID!
  }

  extend type Query {
    tasks: [Task]
  }

  extend type Mutation {
    createTask(title: String!): Task
    completeTask(id: ID!): Task
    deleteTask(id: ID!): String
  }
`;

module.exports = taskTypeDefs;
