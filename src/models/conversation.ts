import conn from '../db/conversationsDB';
import MessageModel from './message';

const ConversationModel = conn.model('Conversation', new conn.Schema({
    messages: [MessageModel.schema]
}))

export default ConversationModel