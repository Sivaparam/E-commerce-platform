const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    boards: [Board]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Board {
    _id: ID
    bTitle: String
    lists: [List]
  }

  type List {
    _id: ID
    lTitle: String
    cards: [Card]
  }

  type Card {
    _id: ID
    cTitle: String
    description: String
    users: [User]
  }

  type Query {
    users: [User]
    board: [Board]
    list: [List]
    card: [Card]
    userBoards: User
    user(userId:ID!): User
    boards(boardId: ID!): Board
    lists(listId: ID!): List
    cards(cardId: ID!): Card
    boardDetails(boardId: ID!): Board
  }

  type Mutation {
      addUser(username: String!, email: String!, password: String!): Auth
      login(email: String!, password: String!): Auth
      addBoard(bTitle: String!): Board
      addList(boardId: ID!, lTitle: String!): List
      addCard(cTitle: String!, listId: ID!): Card
      removeCard(cardId: ID!): List
      editCard(cardId: ID!, cTitle: String!, descritpion: String): Card
    } 
`;

module.exports = typeDefs;
