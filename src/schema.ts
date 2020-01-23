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
            // description: "Looks for conversations in database",
            // type: userType,
            // args: {
            //     username: { type: GraphQLNonNull(GraphQLString) }
            // },
            // resolve(r, args) {
            //     console.log("User info");
            //     return UserModel.findOne(args).then(e => e)
            // }
        }
    }
});

const rootMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createNewConversation: {
            // description: "Adds contact to user",
            // type: GraphQLBoolean,
            // args: {
            //     username: { type: GraphQLNonNull(GraphQLString) },
            //     contact: { type: GraphQLNonNull(GraphQLString) }
            // },
            // resolve(r, args) {
            //     const { username, contact } = args;
            //     console.log(`Adding contact "${contact}" to user: ${username}`);

            //     return UserModel.findOne({ username })
            //         .then((user: any) => {
            //             return UserModel.findOne({ username: contact })
            //                 .then((contactUser: any) => {
            //                     if (!contactUser) {
            //                         console.log("User doesn't exist");
            //                         return false;
            //                     }
            //                     if (user.contacts.some((addedContact: any) => addedContact.username == contactUser.username)) {
            //                         console.log('Contact already added')
            //                         return false;
            //                     }
            //                     user.contacts.push(contactUser)
            //                     user.save();
            //                     console.log('Contact added successfuly')
            //                     return true

            //                 })
            //         });
            // }
        },
        addMessageToConversation: {
            // description: "Registers user in database",
            // type: GraphQLBoolean,
            // args: {
            //     username: { type: GraphQLNonNull(GraphQLString) },
            //     userID: { type: GraphQLNonNull(GraphQLString) }
            // },
            // resolve(r, args) {
            //     console.log("Registering user");
            //     const { username, userID } = args;
            //     try {
            //         console.log(args);
            //         new UserModel({ username, userID }).save()
            //         return true;
            //     }
            //     catch (e) {
            //         console.log('Error creating user');
            //         console.log(e);
            //         return false;
            //     }
            // }
        }
    }
});

export default new GraphQLSchema({ query: rootQuery, mutation: rootMutation })