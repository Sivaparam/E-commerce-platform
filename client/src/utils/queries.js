import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query users {
    users {
      _id
      username
      email
    }
  }
`;

export const USER_BOARDS = gql`
  query userboards {
   users {
      _id
      username
     boards {
       _id
       bTitle
     }
   }
  }
`;