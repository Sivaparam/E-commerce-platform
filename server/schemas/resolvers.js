const { User, Board, List, Card } = require('../models');

const resolvers = {
    Query: {
        users: async () => {
            return await User.find({});
        },
        boards: async () => {
            return await Board.find({});
        },
        lists: async () => {
            return await List.find({});
        },
        cards: async () => {
            return await Card.find({});
        }
    }
};

module.exports = resolvers;
