import conn from '../db/conversationsDB';
import MessageModel from './message';
console.log('Creating conversation model.');
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