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

export const BOARD_DETAILS = gql`
query getBoardDetails($boardId: ID!) {
  boards(boardId: $boardId) {
    _id
    bTitle
    lists {
      _id
      lTitle
      cards {
        _id
        cTitle
      }
    }
  }
}
`;
