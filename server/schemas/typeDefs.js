const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
   userId: ID
    name: String
    email: String
    password: String
    boards: [Board]
  }

  type Board {
    boardId: ID
    bTitle: String
    lists: [List]
  }

  type List {
    listId: ID
    lTitle: String
    cards: [Card]
  }

  type Card {
    cardId: ID
    cTitle: String
    description: String
   users: [User]
  }

  type Query {
    users: [User]
    board: [Board]
    list: [List]
    card: [Card]
      boards(boardId: ID!): Board
      lists(listId: ID!): List
      cards(cardId: ID!): Card
      boardDetails(userId: ID!): Board
  }

  type Mutation {
      addBoard(userId: ID!, bTitle: String!): Board
      addList(boardId: ID!, lTitle: String!): List
      addCard(cTitle: String!, listId: ID!): Card
      removeCard(cardId: ID!): Card
      removeList(listId: ID!): List
      editList(listId: ID!, lTitle: String!): List
      editCard(cardId: ID!, cTitle: String!, descritpion: String): Card
    }



 


  
`;

module.exports = typeDefs;
