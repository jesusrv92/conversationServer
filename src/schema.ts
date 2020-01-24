import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLInt,
} from 'graphql';

import ConversationModel from './models/conversation';
import MessageModel from './models/message'

const messageType = new GraphQLObjectType({
    name: 'message',
    fields: {
        sender: {
            type: GraphQLString
        },
        timestamp: {
            type: GraphQLInt
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
            type: GraphQLInt
        },
        messages: {
            type: new GraphQLList(messageType)

        }
    }
});

const rootQuery = new GraphQLObjectType({
    name: 'Query',
    fields: {
        findConversation: {
            description: "Looks for conversations in database",
            type: conversationType,
            args: {
                _id: { type: GraphQLNonNull(GraphQLString) }
            },
            async resolve(r, args) {
                const { _id } = args;
                const conversation = await ConversationModel.findById(_id);
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