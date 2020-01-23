import './config/config';

import schema from './schema'

import ConversationModel from './models/conversation'
import MessageModel from './models/message'

import http from 'http'
import express from 'express';
import graphqlHTTP from 'express-graphql';

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