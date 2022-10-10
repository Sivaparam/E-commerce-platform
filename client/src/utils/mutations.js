import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($email: String!,$username: String!, $password: String!) {
    addUser(email: $email,username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_BOARD = gql`
  mutation addboard($userId: ID!, $bTitle: String!) {
    addBoard(userId: $userId, bTitle: $bTitle) {
    _id
    bTitle
    }
  }
`;

export const ADD_LIST = gql`
  mutation addlist($boardId: ID!, $lTitle: String!) {
    addList(boardId: $boardId, lTitle: $lTitle) {
      _id
      lTitle
    }
  }
`;