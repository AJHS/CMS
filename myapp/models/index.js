var db = require('mongoose').createConnection(
  'mongodb://localhost:27017'
);
// var db = require('mongoose').createConnection(
//   'mongodb://test:password@ds047720.mongolab.com:47720/db_example'
// );

module.exports = {
    'User': require('./user')(db),
    'Post': require('./post')(db),
    'Blog': require('./blog')(db),
    'CanEdit': require('./canEdit')(db)
};
