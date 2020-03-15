import uuid from 'uuid/v4';

export const initialState = { players: [], games: [], user: null, playersFetched: false };

export const rankingReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_GAME':
    case 'SET_PLAYERS':
      return {
        ...state,
        players: action.players,
        playersFetched: true
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.user
      };
    // case "ADD_BOOK":
    //   return {
    //     ...state,
    //     books: [
    //       ...state.books,
    //       {
    //         title: action.book.title,
    //         author: action.book.author,
    //         id: uuid()
    //       }
    //     ]
    //   };
    // case "EDIT_BOOK":
    //   return {
    //     selected: null,
    //     books: [
    //       ...state.books.filter(book => book.id !== action.book.id),
    //       action.book
    //     ]
    //   };
    // case "SELECT_BOOK":
    //   return { ...state, selected: action.book };
    // case "REMOVE_BOOK":
    //   return {
    //     ...state,
    //     books: state.books.filter(book => book.id !== action.id)
    //   };
    default:
      return state;
  }
};
