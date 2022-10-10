const { AuthenticationError } = require('apollo-server-express');
const { User, Board, List, Card } = require('../models');
const { populate } = require('../models/Board');
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
        // userBoards: async () => {
        //     const user = await User.find().populate('boards');
        //     return user;
        // },
        // userBoards: async (parents, args, context) => {
        //     const user = await User.findById("6341e3ef1e4f05f682ef3bd8").populate({
        //                 path: 'boards.lists',
        //                 populate: 'cards'
        //             });
        //             return user;
        // },
                      
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
            return await Board.findById(boardId);
        },
        lists: async (parents, { listId }) => {
            return await List.findById(listId);
        },
        cards: async (parents, { cardId }) => {
            return await Card.findById(cardId);
        },
        boardDetails: async (parents, { boardId }) => {
            return await Board.findOne(boardId).populate('lists').populate({
                path: 'lists',
                populate: 'cards'
            });
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
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

        addBoard: async (parent, { bTitle, userId }) => {
            const board = await Board.create({ bTitle });
            await User.findOneAndUpdate(
                { _id: userId },
                { $addToSet: { boards: board._id } }
            );
            return board;
        },
        addList: async (parent, { lTitle, boardId }) => {
            const list = await List.create({ lTitle });
            await Board.findOneAndUpdate(
                { _id: boardId },
                { $addToSet: { lists: list._id } }
            );
            return list;
        },
        addCard: async (parent, { cTitle, listId }) => {
            const card = await Card.create({ cTitle });
            await List.findOneAndUpdate(
                { _id: listId },
                { $addToSet: { cards: card._id } }
            );
            return card;
        },
        editList: async (parent, { listId }) => {
            return List.findByIdAndUpdate({ listId, lTitle });
        },
        editCard: async (parent, { cardId }) => {
            return Card.findByIdAndUpdate({ cTitle, description });
        },
        removeCard: async (parent, { cardId }) => {
            return Card.findOneAndDelete({ cardId });
        },
        removeList: async (parent, { listId }) => {
            return List.findByIdAndDelete({ listId });
        },
    },
};

module.exports = resolvers;

