import conn from '../db/conversationsDB';
import MessageModel from './message';

const ConversationModel = conn.model('Conversation', new conn.Schema({
    messages: [MessageModel.schema],
    title: {},
    dateCreated: {
        type: Number,
        default: new Date()
    }
}))

export default ConversationModel