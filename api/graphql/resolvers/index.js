const userResolver = require("./userResolver");
const taskResolver = require("./taskResolver");

module.exports = {
  Query: {
    ...userResolver.Query,
    ...taskResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...taskResolver.Mutation,
  },
};
