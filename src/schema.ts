import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLFloat,
} from 'graphql';

import ConversationModel from './models/conversation';
import MessageModel from './models/message'
console.log('Creating graphql schema.');

const messageType = new GraphQLObjectType({
    name: 'message',
    fields: {
        sender: {
            type: GraphQLString
        },
        timestamp: {
            type: GraphQLFloat
        },
        text: {
            type: GraphQLString
        }
    }
});

const conversationType = new GraphQLObjectType({
    name: 'Conversation',
    fields: {
        _id: {
            type: GraphQLString
        },
        title: {
            type: GraphQLString
        },
        dateCreated: {
            type: GraphQLFloat
        },
        messages: {
            type: new GraphQLList(messageType)

        }
    }
});

const rootQuery = new GraphQLObjectType({
    name: 'Query',
    fields: {
        findConversationByID: {
            description: "Looks for conversations in database by ID",
            type: conversationType,
            args: {
                _id: { type: GraphQLNonNull(GraphQLString) }
            },
            async resolve(r, args) {
                const { _id } = args;
                console.log('Looking for conversation using ID')
                const conversation = await ConversationModel.findById(_id);
                return conversation;
            }
        },
        findConversationByTitle: {
            description: "Looks for conversations in database by title",
            type: conversationType,
            args: {
                title: { type: GraphQLNonNull(GraphQLString) }
            },
            async resolve(r, args) {
                const { title } = args;
                console.log('Looking for conversation using title')
                const conversation = await ConversationModel.findOne({ title });
                return conversation;
            }
        }
    }
});

const rootMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createNewConversation: {
            description: "Creates a conversation in DB",
            type: conversationType,
            args: {
                title: { type: GraphQLString }
            },
            resolve(r, args) {
                const { title } = args;
                console.log('Creating conversation');
                return new ConversationModel({ title }).save();
            }
        },
        addMessageToConversation: {
            description: "Adds message to conversation",
            type: GraphQLBoolean,
            args: {
                _id: { type: GraphQLNonNull(GraphQLString) },
                sender: { type: GraphQLNonNull(GraphQLString) },
                text: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(r, args) {
                const { _id, sender, text } = args;
                return ConversationModel.findById(_id).then((conversation: any) => {
                    console.log('Add message to conversation', _id);
                    conversation.messages.push(new MessageModel({ sender, text }));
                    conversation.save();
                    return true;
                }).catch(() => {
                    console.log("Couldn't add message to conversation", _id);
                    return false;
                })
            }
        }
    }
});

export default new GraphQLSchema({ query: rootQuery, mutation: rootMutation })