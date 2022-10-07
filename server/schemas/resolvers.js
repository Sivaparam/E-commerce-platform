const { User, Board, List, Card } = require('../models');

//create the functions that fulfill the queries defined in typedefs.js
// query would get and return all the documents from the mentioned collection below
const resolvers = {
    Query: {
        users: async () => {
            return await User.find({});
        },
        board: async () => {
            return await Board.find({});
        },
        list: async () => {
            return await List.find({});
        },
        card: async () => {
            return await Card.find({});
        },
        boards: async (parents, { userId }) => {
            return await Board.findById(userId);
        },
        lists: async (parents, { boardId }) => {
            return await List.findById(boardId);
        },
        cards: async (parents, { listId }) => {
            return await Card.findById(listId);
        },
        boardDetails: async (parents, { userId }) => {
            return await board.findById(userId).populate('lists').populate({
                path: 'lists',
                populate: 'cards'
            });
        },
    },

    Mutation: {
        addBoard: async (parent, { bTitle, userId }) => {
            return Board.create({ boardId, bTitle, userId });
        },
        addList: async (parent, { lTitle, boardId }) => {
            return List.create({ lTitle, listId, boardId });
        },
        addCard: async (parent, { cTitle, listId }) => {
            return Card.create({ cTitle, cardId, listId });
        },
        editList: async (parent, { listId }) => {
            return List.findByIdAndUpdate({ listId, lTitle });
        },
        editCard: async (parent, { cardId }) => {
            return Card.findByIdAndUpdate({ cardId, cTitle, description, userId, boardId });
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
