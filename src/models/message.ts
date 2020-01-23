import conn from '../db/conversationsDB';

const MessageModel = conn.model('Message', new conn.Schema({
    sender: {
        type: String,
        required: true,
        minlength: 8,
        trim: true
    },
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    timestamp: {
        type: Number,
        default: new Date()
    }
}))

export default MessageModel