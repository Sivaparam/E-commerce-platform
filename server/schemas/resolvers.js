const { User, Board, List, Card } = require('../models');

//create the functions that fulfill the queries defined in typedefs.js
// query would get and return all the documents from the mentioned collection below
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
