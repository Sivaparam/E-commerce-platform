import { gql } from '@apollo/client';

export const USER_BOARDS = gql`
query userBoards {
  userBoards {
    _id
    username
    boards {
      _id
      bTitle
    }
  }
}
`;