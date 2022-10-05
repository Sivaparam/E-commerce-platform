const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
  }

  type Board {
    _id: ID
    title: String
    boards: [Board]
    lists: [List]
  }

  type List {
    listId: ID
    title: String
    boards: [Board]
    cards: [Card]
  }

  type Card {
    cardId: ID
    title: String
    description: String
    users: [User]
    lists: [List]
  }

  type Query {
    users: [User]
    boards: [Board]
    lists: [List]
    cards: [Card]
  }
`;

module.exports = typeDefs;
