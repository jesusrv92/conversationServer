import './config/config';

import schema from './schema'

import http from 'http'
import express from 'express';
import graphqlHTTP from 'express-graphql';
console.log('Creating server.');

const port = process.env.PORT;
const app = express();
const server = http.createServer(app);

app.use(express.json());

app.use('/api/conversations', graphqlHTTP(req => ({
  schema,
  graphiql: true
})))

server.listen(port, () => {
  console.log('Server is up on port ' + port);
});