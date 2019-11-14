const userResolver = require('./user');
const taskResolver = require('./task');

const rootResolver = {
  ...userResolver,
  ...taskResolver,
};

module.exports = rootResolver;
