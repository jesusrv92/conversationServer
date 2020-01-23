import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLFloat,
    GraphQLBoolean,
    GraphQLNonNull
} from 'graphql';

import ConversationModel from './models/conversation';

const conversationType = new GraphQLObjectType({
    name: 'Conversation',
    fields: {
        conversationID: {
            type: GraphQLString
        },
        title: {
            type: GraphQLString
        },
        dateCreated: {
            type: GraphQLFloat
        },
        contacts: {
            type: new GraphQLList(new GraphQLObjectType({
                name: 'username',
                fields: {
                    username: {
                        type: GraphQLString
                    },
                    userID: {
                        type: GraphQLString
                    },
                }
            }))

        }
    }
})

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
            resolve() {
                return new ConversationModel().save()
            }
        },
        addMessageToConversation: {
            description: "Adds message to conversation",
            type: GraphQLBoolean,
            args: {
                _id: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve(r, args) {
                const { _id } = args
                console.log('Add message to conversation', _id)
            }
        }
    }
});

export default new GraphQLSchema({ query: rootQuery, mutation: rootMutation })