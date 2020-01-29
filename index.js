var express = require('express');
var app = express();
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

/* GET home page. */
app.get('/test', function(req, res, next) {
  res.send('index');
});



var schema = buildSchema(`
  type Query {
    quoteOfTheDay: String
    random: Float!
    rollThreeDice: [Int]
  }
`);
// The root provides a resolver function for each API endpoint
// var root = {
//   hello: () => {
//     return 'Hello world!';
//   },
//   name:() =>{
//     return 'Test name'
//   }
// };
var root = {
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
  },
  random: () => {
    return Math.random();
  },
  rollThreeDice: () => {
    return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6));
  },
    hello: () => {
    return 'Hello world!';
  },
  name:() =>{
    return 'Test name'
  }
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));


app.listen(3000, () => {
  console.log("server running on 3000");
});
module.exports = app;
