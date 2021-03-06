import conn from '../db/conversationsDB';
console.log('Creating message model.');

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
        default: Date.now()
    }
}))

export default MessageModel