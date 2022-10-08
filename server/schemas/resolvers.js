const { User, Board, List, Card } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

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
        user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
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
            return Board.create({ bTitle, userId });
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
