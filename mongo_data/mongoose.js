const mongoose = require('mongoose');
const mongo = "mongodb://localhost:27017/ss_test"
// set mongoose Promise to Bluebird
mongoose.Promise = Promise;

// Exit application on error
mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

/**
* Connect to mongo db
*
* @returns {object} Mongoose connection
* @public
*/

exports.connect = () => {
  mongoose.connect(mongo, {
    keepAlive: 1,
    useNewUrlParser: true,
  });
  return mongoose.connection;
};
