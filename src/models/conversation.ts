import conn from '../db/conversationsDB';
import MessageModel from './message';

const ConversationModel = conn.model('Conversation', new conn.Schema({
    messages: [MessageModel.schema],
    title: {
        type: String,
        trim: true,
        uppercase: true
    },
    dateCreated: {
        type: Number,
        default: Date.now()
    }
}))

export default ConversationModel