import conn from '../db/conversationsDB';
import MessageModel from './message';

const ConversationModel = conn.model('Conversation', new conn.Schema({
    conversationID: {
        type: String,
        unique: true,
        required: true
    },
    messages: [MessageModel.schema]
}))

export default ConversationModel