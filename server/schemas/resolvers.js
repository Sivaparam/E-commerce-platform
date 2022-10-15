const { AuthenticationError } = require('apollo-server-express');
const { User, Board, List, Card } = require('../models');
const ObjectId = require('mongodb').ObjectID;
const { signToken } = require('../utils/auth');

//create the functions that fulfill the queries defined in typedefs.js
// query would get and return all the documents from the mentioned collection below
const resolvers = {
    Query: {
        users: async () => {
            return await User.find().populate('boards').populate({
                path: 'boards',
                populate: 'lists'
            });
        },
      

        userBoards: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findOne({_id: context.user._id}).populate('boards');
                return user;
            }
            throw new AuthenticationError('Not logged in');
        },
                      
        board: async () => {
            return await Board.find().populate('lists').populate({
                path: 'lists',
                populate: 'cards'
            });
        },
        list: async () => {
            return await List.find().populate('cards');
        },
        card: async () => {
            return await Card.find().populate('users');
        },
        boards: async (parents, { boardId }) => {
            return await Board.findById(boardId).populate('lists').populate({
                path: 'lists',
                populate: 'cards'
            });
        },
        lists: async (parents, { listId }) => {
            return await List.findById(listId);
        },
        cards: async (parents, { cardId }) => {
            return await Card.findById(cardId);
        },
      
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
       addMember: async (parent, { email,boardId }) => {
         const user = await User.findOneAndUpdate({email: email},
           { $addToSet: { boards: boardId } }
         )
         const token = signToken(user);
         return user;
       },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },

        addBoard: async (parent, { bTitle }, context ) => {
            if (context.user){
            const board = await Board.create({ bTitle });
            await User.findOneAndUpdate( 
                {_id: context.user._id },
                { $addToSet: { boards: board._id } }
            );
            return board;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        addList: async (parent, { lTitle, boardId }, context ) => {
            if (context.user) {
            const list = await List.create({ lTitle });
            await Board.findOneAndUpdate(
                { _id: boardId },
                { $addToSet: { lists: list._id } }
            );
            return list;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        addCard: async (parent, { cTitle, listId }, context ) => {
            if (context.user) {
            const card = await Card.create({ cTitle });
            await List.findOneAndUpdate(
                { _id: listId },
                { $addToSet: { cards: card._id } }
            );
            return card;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        
        editCard: async (parent, { cardId }, context ) => {
            if (context.user) {
             return Card.findByIdAndUpdate({ cTitle, description });
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        removeCard: async (parent, { cardId }) => {
            return await Card.findOneAndDelete( { _id: cardId });
            
        },
        dragCard: async (parent, {listId, cardId }) => {
            
            return await List.findOneAndUpdate(
                {_id: listId},
                { $pull: {cards: cardId }},
                { new: true }
                );
        },   
        
        dropCard: async (parent, {listId, cardId }) => {
            const card = await Card.findById(cardId);
            return await List.findOneAndUpdate(
                {_id: listId },
                {$addToSet: {cards: cardId}},
                
            );
        },
        
    },
};

module.exports = resolvers;

